const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || []
    //transformar dados para objeto.

itens.forEach((elemento) => {
    criaElemento(elemento);
});

form.addEventListener("submit", (evento) => {
    evento.preventDefault(); //interrompe o comportamento padrão do formulário

    const nome = evento.target.elements["nome"];
    const quantidade = evento.target.elements["quantidade"];

    const existe = itens.find(elemento => elemento.nome === nome.value); //buscar elemento para atualizar lista

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    };
    // Condicional para conferir se o elemento existe
    if (existe) {
        itemAtual.id = existe.id;

        atualizaElemento(itemAtual);

        //Refatoração da condicional if else, atualizando um id para cada item

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual; //garantir que está buscando e atualizando o elemento correto.

    } else {
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0; //pegar o último ID desse elemento e somar 1, ? representa uma condição "se" e : é a condição final caso não exista. Operadores ternários.

        criaElemento(itemAtual);

        itens.push(itemAtual);
        //inserir novos itens no array

    }

    localStorage.setItem("itens", JSON.stringify(itens));
    //JSON.stringfy transforma objeto em string para que a info seja lida pelo navegador;

    nome.value = "";
    quantidade.value = "";

});

function criaElemento(item) {

    const novoItem = document.createElement('li');
    novoItem.classList.add("item");

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade; //innerHTML recebe a quantidade pois não é atribuição direta e sim uma tag
    numeroItem.dataset.id = item.id //adiciona novo item dependendo da condição de existência.
    novoItem.appendChild(numeroItem); //appendChild para receber novo item no HTML

    novoItem.innerHTML += item.nome;

    novoItem.appendChild(botaoDeleta(item.id)); // Referenciar a função botaoDeleta no node da função principal

    lista.appendChild(novoItem);
}

function atualizaElemento(item) {
    document.querySelector("[data-id='" + item.id + "']").innerHTML = item.quantidade;
}
//Função para criar botão com evento de click nos itens, e retornar os itens clicados
function botaoDeleta(id) {
    const elementoBotao = document.createElement("button");
    elementoBotao.innerText = "x";

    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id); //remove o elemento
    })

    return elementoBotao;
}
//Função para deletar os itens enviados da função botaoDeleta no array de itens e no navegador
function deletaElemento(tag, id) {
    tag.remove();
    //remover item do array
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1);

    //escrever no localStorage
    localStorage.setItem("itens", JSON.stringify(itens));
}