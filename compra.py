from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def homepage():
    return render_template("teste.html")

# Rota de Sucesso
@app.route("/comprasucesso")
def compra_certa():
    return render_template("compracerta.html")

# Rota de Erro
@app.route("/compraerrada")
def compra_errada():  
    return render_template("compraerrada.html")

if __name__ == "__main__":
    app.run()