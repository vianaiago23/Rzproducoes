// ------------------------------------------------------------
// CONFIGURAÇÃO DO FIREBASE (VERSÃO COMPAT)
// ------------------------------------------------------------
const firebaseConfig = {
    apiKey: "AIzaSyBQ9HlDjTNhSqR-hCMDUyoWEVQ68jRWbWs",
    authDomain: "rz-producoes.firebaseapp.com",
    projectId: "rz-producoes",
    storageBucket: "rz-producoes.firebasestorage.app",
    messagingSenderId: "772972117220",
    appId: "1:772972117220:web:2c6097f100fc73173740f1",
    measurementId: "G-YGNPGQN7K0"
};

// Inicializa Firebase (compat)
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore ? firebase.firestore() : null;

// ------------------------------------------------------------
// ALTERAÇÃO AUTOMÁTICA DO HEADER
// ------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {

    const containerAcoes = document.querySelector(".acoes-header");
   const btnLogin = document.querySelector(".btn-acesso");

    if (!containerAcoes) return; // Proteção

    // Criar botões (mas só adicionar depois)
    const btnConta = document.createElement("button");
    btnConta.innerText = "Minha Conta";
    btnConta.className = "btn-acesso";
    btnConta.onclick = () => window.location.href = "/conta";

    const btnSair = document.createElement("button");
    btnSair.innerText = "Sair";
    btnSair.className = "btn-acesso";
    btnSair.onclick = () => firebase.auth().signOut();

    // Detecta login
    firebase.auth().onAuthStateChanged(user => {

        // Se logado → esconder login e mostrar conta + sair
        if (user) {

            if (btnLogin) btnLogin.style.display = "none";

            // Adiciona os botões no container correto
            if (!containerAcoes.contains(btnConta)) containerAcoes.appendChild(btnConta);
            if (!containerAcoes.contains(btnSair)) containerAcoes.appendChild(btnSair);

        } else {
            // Se não logado → remover botões e mostrar login
            if (btnLogin) btnLogin.style.display = "inline-block";

            if (containerAcoes.contains(btnConta)) containerAcoes.removeChild(btnConta);
            if (containerAcoes.contains(btnSair)) containerAcoes.removeChild(btnSair);
        }
    });

});