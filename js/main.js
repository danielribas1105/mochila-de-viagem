
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
}

function atualizarElemento(item){
    document.querySelector('[data-id="'+item.id+'"]').innerHTML += Number(item.quantidade);

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
    }else{
        itemAtual.id = listaItens.length;
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

