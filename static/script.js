// ---------------------------
// SCRIPT GERAL DO PROJETO
// ---------------------------

// Avisa que o JS carregou corretamente
console.log("script.js carregado com sucesso!");


// ------------------------------------------------
// FORMULÁRIO DE CONTATO – Validação simples
// ------------------------------------------------
const formContato = document.querySelector(".form-contato");

if (formContato) {
    formContato.addEventListener("submit", function (e) {
        e.preventDefault();

        const nome = document.querySelector("#nome");
        const email = document.querySelector("#email");
        const mensagem = document.querySelector("#mensagem");

        // Validação básica
        if (nome.value.trim() === "") {
            alert("Por favor, preencha seu nome.");
            nome.focus();
            return;
        }

        if (email.value.trim() === "" || !email.value.includes("@")) {
            alert("Digite um e-mail válido.");
            email.focus();
            return;
        }

        if (mensagem.value.trim() === "") {
            alert("Escreva uma mensagem.");
            mensagem.focus();
            return;
        }

        alert("Mensagem enviada com sucesso!");
        formContato.reset();
    });
}



// ------------------------------------------------
// LOGIN – Validação simples
// ------------------------------------------------
const formLogin = document.querySelector(".form-login");

if (formLogin) {
    formLogin.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.querySelector("#email");
        const senha = document.querySelector("#senha");

        if (email.value.trim() === "" || !email.value.includes("@")) {
            alert("Digite um e-mail válido.");
            email.focus();
            return;
        }

        if (senha.value.trim().length < 4) {
            alert("A senha deve ter pelo menos 4 caracteres.");
            senha.focus();
            return;
        }

        alert("Login realizado com sucesso!");
        formLogin.reset();
    });
}



// ------------------------------------------------
// BOTÃO "COMPRE AGORA" – Demonstração
// ------------------------------------------------
const btnCompreAgora = document.querySelector(".btn-compre-agora");

if (btnCompreAgora) {
    btnCompreAgora.addEventListener("click", () => {
        alert("Compra simulada! (Integração real pode ser adicionada depois)");
    });
}