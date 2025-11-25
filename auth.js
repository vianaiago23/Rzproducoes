function login(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const msg = document.getElementById("msgLogin");

    firebase.auth().signInWithEmailAndPassword(email, senha)
        .then(() => {
            msg.style.color = "green";
            msg.innerText = "Login realizado com sucesso! Redirecionando...";

            // 🔥 Aguarda 1 segundo e vai para a home logado
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000);
        })
        .catch(error => {
            msg.style.color = "red";
            msg.innerText = "Email ou senha incorretos!";
            console.error(error);
        });
}