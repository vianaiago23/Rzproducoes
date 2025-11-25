from flask import Flask, render_template

app = Flask(__name__)

# Rota da Home
@app.route("/")
def homepage():
    return render_template("index.html")

# Rota da Eventos
@app.route("/eventos")
def eventos():
    return render_template("eventos.html")

# Rota do Contato
@app.route("/contato")
def contato():
    return render_template("contato.html")

# Nova Rota: Checkout
@app.route("/checkout")
def checkout():
    return render_template("checkout.html")

# Rotas de Login/Cadastro (Para funcionar a navegação limpa)
@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/cadastro")
def cadastro():
    return render_template("cadastro.html")

# Rota de Sucesso
@app.route("/comprasucesso")
def compra_certa():
    return render_template("compracerta.html")

# Rota de Erro
@app.route("/compraerrada")
def compra_errada():  
    return render_template("compraerrada.html")

if __name__ == "__main__":
    app.run(debug=True)