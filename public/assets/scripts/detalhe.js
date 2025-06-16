const key = "670a9003706a4ef584c943665c087a24";

const game_main = $("#game_main");
const game_itens = $("#game_itens");

let params = new URLSearchParams(document.location.search);
let id = params.get("id");

function checar(game_id) {
    let usuario = JSON.parse(sessionStorage.getItem('usuarioCorrente'));

    if (!usuario) {
        return Promise.resolve('fa-regular'); 
    }
    
    let user_id = usuario.id;
    return fetch(`favoritos?usuarioId=${user_id}&gameId=${game_id}`)
        .then(res => res.json()) 
        .then(data => {
            if (data.length > 0) {
                return 'fa-solid';
            } else {
                return 'fa-regular';
            }
        })
}

if(game_main && game_itens){
    fetch(`https://api.rawg.io/api/games/${id}?key=${key}`)
    .then(res => res.json())
    .then(game =>{
        checar(id).
        then(element => {
            game_main.html(`
                <div class="primeiro d-flex flex-column align-items-lg-start align-items-center">
                    <h2>${game.name}</h2>
                    <img class="img-fluid corte" src="${game.background_image}" alt="">
                </div>
                <div class="d-flex flex-column justify-content-between segundo">
                    <div>
                        <h3 class="mt-3 d-inline">Clique aqui para favoritar: </h3><i id="${id}" class="favoritar ${element} fa-heart mb-2"></i>
                    </div>
                    <div class="my-1">
                        <h3 class="mt-3">Sobre</h3>
                        <p class="d-inline">${game.description}</p>
                    </div>
                    <div class="my-1">
                        <h3 class="mt-3">Plataformas</h3><p class="d-inline">${game.platforms[0].platform.name}</p>
                    </div>
                    <div class="my-1">
                        <h3 class="mt-3">Gêneros</h3><p class="d-inline">${game.genres[0].name}</p>
                    </div>
                    <div class="my-1">
                        <h3 class="mt-3">Lançamento</h3><p class="d-inline">${game.released}</p>
                    </div>
                    <div class="my-1">
                        <h3 class="mt-3">Desenvolvedora</h3><p class="d-inline">${game.developers[0].name}</p>
                    </div>
                    <div class="my-1">
                        <h3 class="mt-3">Editora</h3><p class="d-inline">${game.publishers[0].name}</p>
                    </div>
                </div>
            `);
        })
        .then(()=>{
            let index = game.id;
            $(`#${index}.favoritar`).on("click", ()=>{
                let icon = $(`#${index}.favoritar`);
                let user_id = JSON.parse(sessionStorage.getItem('usuarioCorrente')).id;
                if (icon.hasClass("fa-regular")){
                    icon.removeClass("fa-regular").addClass("fa-solid");
                    fetch("favoritos", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ 
                            usuarioId: user_id,
                            gameId: index 
                        })
                    })
                }
                else{
                    icon.removeClass("fa-solid").addClass("fa-regular");
                    fetch(`favoritos?gameId=${index}&usuarioId=${user_id}`)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data[0])
                        fetch(`favoritos/${data[0].id}`, {
                            method: "DELETE"
                        })
                    })
                }
            })
        })
        fetch(`https://api.rawg.io/api/games?key=${key}&search=${game.slug}&search_exact=true`)
        .then(res => res.json())
        .then(game_info => {
            let screenshots = game_info.results[0].short_screenshots;
            for(let i = 1; i < screenshots.length; i++){
                game_itens.append(`
                <div class="col">
                    <h3>Game Screenshot ${i}</h3><img class="imgs" src="${screenshots[i].image}" alt="">
                </div>
                `)
            }
        })
    })
}