function list(){
    let table = $("#tabela");
    table.html("");
    fetch("destaques")
    .then(res => res.json()) 
    .then(data => {
        data.forEach(element => {
            table.append(`
                <tr id="${element.id}">
                    <td>${element.id}</td>
                    <td>${element.ativo}</td>
                    <td>${element.titulo}</td>
                    <td>${element.descricao}</td>
                    <td>${element.imagem}</td>
                    <td>${element.informacao_externa}</td>
                </tr>`);

            $(`#${element.id}`).on("click", () => { complete(element) })
        });
    })
    .catch(err => console.error(err)); 
}

function complete(element){
    $("#formId").val(element.id);
    $("#formAtivo").val(element.ativo);
    $("#formTitulo").val(element.titulo);
    $("#formDescricao").val(element.descricao);
    $("#formImagem").val(element.imagem);
    $("#formInformacao_externa").val(element.informacao_externa);
}

function getFormData(){
    return {
        id: $("#formId").val(), 
        ativo: $("#formAtivo").val(), 
        titulo: $("#formTitulo").val(), 
        descricao: $("#formDescricao").val(), 
        imagem: $("#formImagem").val(), 
        informacao_externa: $("#formInformacao_externa").val()
    };
}

$('#Create').on('click', () => {
    fetch('destaques')
    .then(res => res.json()) 
    .then(data => {
        let tamanho = data.length + 1;
        let destaque = getFormData();
        $("#formId").val(tamanho);
        destaque.id = tamanho;

        return fetch('destaques', {
            method: "POST",
            body: JSON.stringify(destaque),
            headers: { "Content-Type": "application/json" }
        });
    })
    .then(() => list())
    .catch(err => console.error(err)); 
});

$('#Update').on('click', () => {
    let destaque = getFormData();

    fetch(`destaques/${destaque.id}`, {
        method: "PUT",
        body: JSON.stringify(destaque),
        headers: { "Content-Type": "application/json" }
    })
    .then(() => list()) 
    .catch(err => console.error(err)); 
});

$('#Delete').on('click', () => {
    let destaque = getFormData();

    fetch(`destaques/${destaque.id}`, { method: "DELETE" })
    .then(() => list()) 
    .catch(err => console.error(err)); 
});

$('#Clear').on('click', () => {
    $("#formId").val('');
    $("#formTitulo").val('');
    $("#formDescricao").val('');
    $("#formImagem").val('');
    $("#formInformacao_externa").val('');
});

$(document).ready(function(){
    list();
});
