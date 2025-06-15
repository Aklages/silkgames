const key = "670a9003706a4ef584c943665c087a24";

let div = $("#principal");
let user_id = JSON.parse(sessionStorage.getItem('usuarioCorrente')).id;

fetch(`favoritos?usuarioId=${user_id}`)
.then(res => res.json())
.then(data => {
    data.forEach(element => {
        div.html("");
        fetch(`https://api.rawg.io/api/games/${element.gameId}?key=${key}`)
        .then(res => res.json())
        .then(game_info => {
            console.log(game_info)
            div.append(`
            <div class="col d-flex flex-column align-items-center">
                <div class="card my-3 p-3">
                    <div id="${game_info.id}" class="link">
                        <img src="${game_info.background_image}" class="card-img-top img-fluid corte" alt="...">
                        <div class="card-body">
                            <h3>${game_info.name}</h3>                    
                        </div>
                    </div>
                    <button id="${game_info.id}" class="btn btn-danger">Remover</button>
                </div>
            </div>
            `);
            let index = game_info.id;
            $(`#${index}.link`).on("click", ()=>{
                window.location.href = `detalhe.html?id=${index}`;
            })
            $(`#${index}.btn`).on("click", ()=>{
                fetch(`favoritos/${element.id}`, {
                    method: "DELETE"
                })
                .then(response => {
                    if (response.ok) {
                        window.location.href = "favoritos.html";
                    }
                })
            })
        })
    })
})