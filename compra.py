from flask import Flask, render_template, request, jsonify
import mercadopago

app = Flask(__name__)

# --- CONFIGURAÇÃO MERCADO PAGO ---
# ⚠️ COLE AQUI O TOKEN QUE VOCÊ COPIOU DO CAMPO "ACCESS TOKEN"
# Ele deve ser um código longo e aleatório (não use o que começa com TESTUSER)
sdk = mercadopago.SDK("APP_USR-4343815085689437-112520-fea56f441b9463587e5b28c454241090-3014215315") 

# --- ROTAS ---
@app.route("/")
def homepage():
    return render_template("index.html")

@app.route("/eventos")
def eventos():
    return render_template("eventos.html")

@app.route("/contato")
def contato():
    return render_template("contato.html")

@app.route("/checkout")
def checkout():
    return render_template("checkout.html")

@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/cadastro")
def cadastro():
    return render_template("cadastro.html")

@app.route("/conta")
def conta():
    return render_template("conta.html")

@app.route("/comprasucesso")
def compra_certa():
    return render_template("compracerta.html")

@app.route("/compraerrada")
def compra_errada():  
    return render_template("compraerrada.html")

# --- ROTA DE PAGAMENTO PIX DINÂMICA ---
@app.route('/processar_pagamento', methods=['POST'])
def processar_pagamento():
    try:
        data = request.get_json()
        
        # AGORA USAMOS OS DADOS QUE O USUÁRIO DIGITOU
        payment_data = {
            "transaction_amount": float(data['valor']),
            "description": data['descricao'],
            "payment_method_id": "pix",
            "payer": {
                "email": data['email'],
                "first_name": data['nome'],       # Dinâmico
                "last_name": data['sobrenome'],   # Dinâmico
                "identification": {
                    "type": "CPF",
                    "number": data['cpf']         # Dinâmico
                }
            }
        }

        print(f"--- Processando PIX para {data['nome']} (CPF: {data['cpf']}) ---")
        
        result = sdk.payment().create(payment_data)
        payment = result["response"]

        # Tratamento de Erro do Mercado Pago
        if payment.get("status") == 400 or "error" in payment:
            mensagem = payment.get("message", "Erro ao criar PIX")
            
            # Melhora a mensagem de erro se for CPF inválido
            if "cause" in payment:
                for cause in payment["cause"]:
                    # CORREÇÃO AQUI: Convertemos para string (str) para evitar o erro de 'int'
                    code = str(cause.get("code", ""))
                    description = cause.get("description", "")
                    
                    # Verifica na descrição ou no código
                    if "identification.number" in description or "identification.number" in code:
                        mensagem = "CPF inválido. Verifique o número digitado."
                    else:
                        mensagem += f" - {description}"
            
            print(f"❌ ERRO MP: {mensagem}")
            return jsonify({"erro": mensagem}), 400

        if "point_of_interaction" in payment:
            pix_copia_cola = payment['point_of_interaction']['transaction_data']['qr_code']
            id_pagamento = payment['id']

            return jsonify({
                "qr_code": pix_copia_cola,
                "id_pagamento": id_pagamento,
                "status": "criado"
            })
        else:
             return jsonify({"erro": "O Mercado Pago não retornou o código PIX."}), 500

    except Exception as e:
        print(f"❌ ERRO NO PYTHON: {e}")
        return jsonify({"erro": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)