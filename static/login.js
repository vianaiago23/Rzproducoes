function login(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const msg = document.getElementById("msgLogin");
    msg.innerText = ""; // limpa mensagem anterior

    auth.signInWithEmailAndPassword(email, senha)
        .then(() => {
            window.location.href = "/";  
        })
        .catch((error) => {
            let mensagem = "";

            switch (error.code) {
                case "auth/user-not-found":
                    mensagem = "Usuário não encontrado.";
                    break;
                case "auth/wrong-password":
                    mensagem = "Senha incorreta.";
                    break;
                case "auth/invalid-email":
                    mensagem = "E-mail inválido.";
                    break;
                default:
                    mensagem = "Erro: " + error.message;
            }

            msg.style.color = "red";
            msg.innerText = mensagem;
        });
}