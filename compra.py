from flask import Flask, render_template

app = Flask(__name__)

# Rota Principal: Agora carrega o site real
@app.route("/")
def homepage():
    return render_template("index.html")

# Rota de Login (opcional, se quiser uma URL direta)
@app.route("/login")
def login():
    return render_template("login.html")

# Rota de Cadastro (opcional)
@app.route("/cadastro")
def cadastro():
    return render_template("cadastro.html")

# Rota de Sucesso (mantida)
@app.route("/comprasucesso")
def compra_certa():
    return render_template("compracerta.html")

# Rota de Erro (mantida)
@app.route("/compraerrada")
def compra_errada():  
    return render_template("compraerrada.html")

if __name__ == "__main__":
    app.run(debug=True) # debug=True ajuda a ver erros na tela