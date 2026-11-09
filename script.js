//Função para validar as caixas de texto
function validar(){
    let txt_nome = document.querySelector("#txt_nome");
    let txt_email = document.querySelector("#txt_email");
    let txt_email_confirma = document.querySelector("#txt_email_confirma");
    let txt_celular = document.querySelector("#txt_celular");
    let txt_celular_confirma = document.querySelector("#txt_celular_confirma");
    //Receber a variável da caixa de senha da página HTML
    let txt_senha = document.getElementById("txt_senha");
    //Receber a variável da caixa de repetir e confirmar senha da página HTML
    let txt_confirma = document.querySelector("#txt_confirma");
    //Receber a variável da mensagem página HTML
    let mensagem = document.querySelector("#p_mensagem");
    //Cria uma nova tag <ul>
    let lista_tag = document.createElement("ul");
    let item;
    //Cria uma nova tag <li>
    item = document.createElement("li");
    //adiciona o texto na tag: <li>E-mail JS</li>
    item.textContent = "E-mail JS";
    //adiciona a classe na tag: <li class="correto">E-mail JS</li>
    item.classList.add("correto");
    //adiciona o item na lista: <ul><li class="correto">E-mail JS</li></ul>
    lista_tag.appendChild(item);
    //repetindo o processo
    item = document.createElement("li");
    item.textContent = "Celular JS";
    item.classList.add("erro");
    lista_tag.appendChild(item);
    item = document.createElement("li");
    item.textContent = "Senha JS";
    lista_tag.appendChild(item);
    //fim da repetição do processo

    //Apagando mensagens anteriores
    mensagem.innerHTML = "";
    //Adicionando a lista na mensagem
    mensagem.appendChild(lista_tag);

    /*
    //Comparar se o valor das duas caixas de texto estão idênticas
    if(txt_senha.value == txt_confirma.value){
        //Caso VERDADEIRO
        //Exibir a mensagem "As senhas estão iguais"
        mensagem.innerHTML = "As senhas estão iguais";
        //A mensagem deve estar com classe correto
        mensagem.classList.add("correto");
        mensagem.classList.remove("erro");
    }else{
        //Caso FALSO
        //Exibir a mensagem "As senhas não estão iguais"
        mensagem.innerHTML = "As senhas não estão iguais";
        //A mensagem mensagem deve estar com a classe erro
        mensagem.classList.add("erro");
        mensagem.classList.remove("correto");

        //Selecionar a caixa de repetir e confirmar para o usuário digitar
        txt_confirma.focus();
    }
*/
    //Interromper o envio do formulário
    //return false;

    //Exibir cada mensagem de validação de acordo com cada comparação:
		let campos = [
        {nome: "E-mail", campo: txt_email, confirma: txt_email_confirma},
        {nome: "Celular", campo: txt_celular, confirma: txt_celular_confirma},
        {nome: "Senha", campo: txt_senha, confirma: txt_confirma}
    ];
	
    item = document.createElement("li");
    if(txt_nome.value == ""){
        item.textContent = "Nome está vazio";
        item.classList.add("erro");
    }else{
        item.textContent = "Nome preenchido";
        item.classList.add("correto");
    }
    lista_tag.appendChild(item);

    for(let c of campos){
        item = document.createElement("li");
        if(c.campo.value == ""){
            item.textContent = c.nome + " está vazio";
            item.classList.add("erro");
        }else if(c.campo.value != c.confirma.value){
            item.textContent = c.nome + "s são diferentes";
            item.classList.add("erro");
        }else{
            item.textContent = c.nome + "s estão iguais";
            item.classList.add("correto");
        }
        lista_tag.appendChild(item);
    }
    //Se o campo estiver sem texto, Exibir mensagem "[CAMPO] está vazio"
    //Se o campo estiver diferente da repetição, Exibir mensagem "[CAMPO]s são diferentes"
    //Se o campo estiver igual a comparação, Exibir mensagem "[CAMPO]s estão iguais"
}

function limpar(){
    mensagem.innerHTML = "";
}

function adicionar_apelido(){
    let txt_apelido = document.querySelector("#txt_apelido").value;
    let lst_apelido = document.querySelector("#lst_apelido");

    let novo_apelido = document.createElement("option");
    novo_apelido.textContent = txt_apelido;
    lst_apelido.appendChild(novo_apelido);

    let p_lista_apelido = document.querySelector("#p_lista_apelido");
    //Alterna entre display = "none" (invisível) para display = "block" (visível)
    p_lista_apelido.style.display = "block";

    //no final, limpar a caixa de texto de apelido:
	 document.querySelector("#txt_apelido").value = "";
}

function gravar_apelido(){
    let apelido = document.querySelector('#lst_apelido option:checked').innerText;

    cookieStore.set("apelido_favorito", apelido);
    //Gravar todos campos do formulário no cookie:
	cookieStore.set("txt_nome", document.querySelector("#txt_nome").value);
    cookieStore.set("txt_email", document.querySelector("#txt_email").value);
    cookieStore.set("txt_email_confirma", document.querySelector("#txt_email_confirma").value);
    cookieStore.set("txt_celular", document.querySelector("#txt_celular").value);
    cookieStore.set("txt_celular_confirma", document.querySelector("#txt_celular_confirma").value);
    cookieStore.set("txt_senha", document.querySelector("#txt_senha").value);
    cookieStore.set("txt_confirma", document.querySelector("#txt_confirma").value);
    //Gravar lista de apelidos no cookie:
	 let lista_apelidos = Array.from(document.querySelectorAll("#lst_apelido option")).map(opcao => opcao.innerText);
    cookieStore.set("lista_apelidos", JSON.stringify(lista_apelidos));
}

async function carregar_apelido(){
    let apelido = (await cookieStore.get("apelido_favorito")).value;

    let p_lista_apelido = document.querySelector("#p_lista_apelido");
    p_lista_apelido.style.display = "block";

    let lst_apelido = document.querySelector("#lst_apelido");

    let novo_apelido = document.createElement("option");
    novo_apelido.textContent = apelido;
    lst_apelido.appendChild(novo_apelido);

    //Carregar lista de apelido
	 let lista_apelidos = JSON.parse((await cookieStore.get("lista_apelidos")).value);
    for(let nome_apelido of lista_apelidos){
        let apelido_da_lista = document.createElement("option");
        apelido_da_lista.textContent = nome_apelido;
        lst_apelido.appendChild(apelido_da_lista);	
	}
}