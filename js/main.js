
const form = document.getElementById('novoItem');
const lista = document.getElementById('lista');
const listaItens = [];

function criarElemento(nome, quantidade){
    const novoItem = document.createElement('li');
    novoItem.classList.add('item');
    const quantItem = document.createElement('strong');
    quantItem.innerHTML = quantidade;
    novoItem.appendChild(quantItem);
    novoItem.innerHTML += nome;
    lista.appendChild(novoItem);

    const itemAtual = {
        'nome': nome,
        'quantidade': quantidade
    };
    listaItens.push(itemAtual);
    localStorage.setItem('listaItens', JSON.stringify(listaItens));
    
}

form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];
    criarElemento(nome.value, quantidade.value);
    nome.value = "";
    quantidade.value = "";
    
});

