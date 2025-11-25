function criarConta(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;     // Corrigido!
    const sobrenome = document.getElementById("sobrenome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const nomeCompleto = nome + " " + sobrenome;
    const msgElement = document.getElementById("msgCadastro");

    firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then((userCredential) => {
            const user = userCredential.user;

            // Salvar nome no perfil
            return user.updateProfile({
                displayName: nomeCompleto
            });
        })
        .then(() => {
            // Aguarda o Firebase autenticar de fato
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    // Agora sim o login está ativo → Redireciona
                    window.location.href = "index.html";
                }
            });
        })
        .catch(error => {
            msgElement.innerText = "Erro: " + error.message;
        });
}