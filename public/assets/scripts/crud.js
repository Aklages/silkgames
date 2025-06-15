function list(){
    let table = $("#tabela");
    table.html("");
    fetch("games")
    .then(res => res.json())
    .then(data => {
        data.forEach(element => {
            table.append(`<tr id="${element.id}">
                                <td>${element.id}</td>
                                <td>${element.destaque}</td>
                                <td>${element.titulo}</td>
                                <td>${element.descricao}</td>
                                <td>${element.conteudo}</td>
                                <td>${element.plataformas}</td>
                                <td>${element.genero}</td>
                                <td>${element.lancamento}</td>
                                <td>${element.desenvolvedora}</td>
                                <td>${element.editora}</td>
                            </tr>`);
        $(`#${element.id}`).on("click", ()=>{complete(element)})
        });

    })
}

function complete(element){
    $("#formId").val(element.id)   
    $("#formDestaque").val(`${element.destaque}`).change()
    $("#formTitulo").val(element.titulo)
    $("#formDescricao").val(element.descricao)
    $("#formConteudo").val(element.conteudo)
    $("#formPlataformas").val(element.plataformas)
    $("#formGenero").val(element.genero)
    $("#formLancamento").val(element.lancamento)
    $("#formDesenvolvedora").val(element.desenvolvedora)
    $("#formEditora").val(element.editora)
}

$("#corpo").on("load", list());

function click(){
    return `{
            "id":"${$("#formId").val()}",
            "destaque":"${$("#formDestaque").val()}",
            "titulo":"${$("#formTitulo").val()}",
            "descricao":"${$("#formDescricao").val()}",
            "conteudo":"${$("#formConteudo").val()}",
            "plataformas":"${$("#formPlataformas").val()}",
            "genero":"${$("#formGenero").val()}",
            "lancamento":"${$("#formLancamento").val()}",
            "desenvolvedora":"${$("#formDesenvolvedora").val()}",
            "editora":"${$("#formEditora").val()}",
            "imagem_principal":"${$("#formImagem_principal").val()}",
            "imagens_complementares":[
                {
                    "id":"${$("#formImagens_complementares").val()}",
                    "src":"${$("#formImagens_complementares").val()}",
                    "descricao":"${$("#formImagens_complementares").val()}"
                }
            ]
        }`;
}

$("#Create").on("click", ()=>{
    let game = click();
    fetch("games", {
        method: "POST",
        body: game,
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(list())
})

$("#Update").on("click", ()=>{
    let game = click();
    let json = JSON.parse(game)
    fetch(`games/${json.id}`, {
        method: "PUT",
        body: game,
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(list())
})

$("#Delete").on("click", ()=>{
    let game = click();
    let json = JSON.parse(game)
    fetch(`games/${json.id}`, {
        method: "DELETE",
    })
    .then(list())
})

$("#Clear").on("click", ()=>{
    $("#formId").val("")
    $("#formDestaque").val("")
    $("#formTitulo").val("")
    $("#formDescricao").val("")
    $("#formConteudo").val("")
    $("#formPlataformas").val("")
    $("#formGenero").val("")
    $("#formLancamento").val("")
    $("#formDesenvolvedora").val("")
    $("#formEditora").val("")
})