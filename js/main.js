
const form = document.getElementById('novoItem');
const lista = document.getElementById('lista');
const listaItens = JSON.parse(localStorage.getItem('listaItens')) || [];

function criarElemento(itemAdd){
    const novoItem = document.createElement('li');
    novoItem.classList.add('item');
    const quantItem = document.createElement('strong');
    quantItem.innerHTML = itemAdd.quantidade;
    quantItem.dataset.id = itemAdd.id;
    novoItem.appendChild(quantItem);
    novoItem.innerHTML += itemAdd.nome;
    lista.appendChild(novoItem);
    novoItem.appendChild(btnDeletar(itemAdd.id));
}

function atualizarElemento(item){
    document.querySelector('[data-id="'+item.id+'"]').innerHTML = item.quantidade;
}

function btnDeletar(id){
    const elementoBtn = document.createElement('button');
    elementoBtn.innerText = "X";
    elementoBtn.addEventListener('click', function() {
        deletarElemento(this.parentNode, id);
    });
    return elementoBtn;
}

function deletarElemento(tag, id){
    tag.remove();
    listaItens.splice(listaItens.findIndex(elemento => elemento.id === id), 1);
    localStorage.setItem('listaItens', JSON.stringify(listaItens));
}

form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];
    const itemAtual = {
        'nome': nome.value,
        'quantidade': quantidade.value
    };
    const existeItem = listaItens.find(elemento => elemento.nome === nome.value);
    
    if(existeItem){
        itemAtual.id = existeItem.id;
        atualizarElemento(itemAtual);
        listaItens[listaItens.findIndex(elemento => elemento.id === existeItem.id)] = itemAtual;
    }else{
        itemAtual.id = listaItens[listaItens.length - 1] ? 
                                (listaItens[listaItens.length - 1]).id + 1 : 0 ;
        criarElemento(itemAtual);
        listaItens.push(itemAtual);
    }

    localStorage.setItem('listaItens', JSON.stringify(listaItens));
    nome.value = "";
    quantidade.value = "";
});

listaItens.forEach((elemento) => {
    criarElemento(elemento);
});

