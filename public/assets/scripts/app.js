const key = "670a9003706a4ef584c943665c087a24";

const games_carousel = $("#games_carousel");
const games_section = $("#games_section");
const games_pages = $("#games_pages");

if(games_carousel){
    fetch(`destaques?ativo=true`)
    .then(res => res.json())
    .then(games => {
        games.forEach(game => {
            if(game.id == 1){
                games_carousel.append(`
                <div id="${game.id}" class="carousel-item active link">
                <img src="${game.imagem_principal}" class="d-block w-100 corte rounded banner" alt="...">
                <div class="carousel-caption d-block">
                <h5>${game.titulo}</h5>
                <p>${game.descricao}</p>
                </div>
            </div>
            `)
            }
            else{
                games_carousel.append(`
                <div id="${game.id}" class="carousel-item link">
                <img src="${game.imagem_principal}" class="d-block w-100 corte rounded banner" alt="...">
                <div class="carousel-caption d-block">
                <h5>${game.titulo}</h5>
                <p>${game.descricao}</p>
                </div>
            </div>
            `);
            }
        });
    })
}

function pages(page){
    games_section.html("Carregando...");
    fetch(`https://api.rawg.io/api/games?key=${key}&page=${page}&page_size=15`)
    .then(res => res.json())
    .then(games => {
        games_section.html("");
        games.results.forEach(game => {
            fetch(`https://api.rawg.io/api/games/${game.id}?key=${key}`)
            .then(res => res.json())
            .then(game_info => {
                descricao = game_info.description.substr(0, 60);
                games_section.append(`
                <div class="col d-flex flex-column align-items-center">
                    <div id="${game.id}" class="card my-3 p-3 link">
                    <img src="${game.background_image}" class="card-img-top img-fluid corte" alt="...">
                    <div class="card-body">
                        <h3>${game.name}</h3>
                        <p class="card-text"><light>${descricao}.</light></p>                    
                    </div>
                </div>
                </div>
                `);
            })
            let index = game.id;
            $(`#${index}`).on("click", ()=>{
                window.location.href = `detalhe.html?id=${index}`;
            })
        })
    })
}

function click(current_page, final_page){
    games_pages.html(`<p class="px-3">Páginas:</p>`);
    for(let i = current_page - 1; i <= final_page - 1; i++){
        if(i > 0){
            if(i == current_page){
                games_pages.append(`
                    <button id="link_${i}" type="button" class="btn btn-danger px-3 disabled">${i}</button>
                `)
            }
            else{
                games_pages.append(`
                    <button id="link_${i}" type="button" class="btn btn-danger px-3">${i}</button>
                `)
            }
            $(`#link_${i}`).on("click", ()=>{
                click(i, i + 4);
                pages(i);
            })
        }
    }
}

if(games_pages){
    click(1, 5);
    pages(1);
}

$(`#searchbutton`).on("click", ()=>{
    value = $("#searchbar").val();
    fetch(`https://api.rawg.io/api/games?key=${key}&search=${value}&page_size=15`)
    .then(res => res.json())
    .then(games => {
        console.log(games)
        games_section.html("");
        games.results.forEach(game => {
            fetch(`https://api.rawg.io/api/games/${game.id}?key=${key}`)
            .then(res => res.json())
            .then(game_info => {
                descricao = game_info.description.substr(0, 60);
                games_section.append(`
                <div class="col d-flex flex-column align-items-center">
                    <div id="${game.id}" class="card my-3 p-3 link">
                    <img src="${game.background_image}" class="card-img-top img-fluid corte" alt="...">
                    <div class="card-body">
                        <h3>${game.name}</h3>
                        <p class="card-text"><light>${descricao}.</light></p>                    
                    </div>
                </div>
                </div>
                `);
            })
            let index = game.id;
            $(`#${index}`).on("click", ()=>{
                window.location.href = `detalhe.html?id=${index}`;
            })
        })
    })
})

$(`#searchbar`).on("blur", ()=>{
    value = $("#searchbar").val();
    if(value == ""){
        pages(1);
    }
})

const game_main = $("#game_main");
const game_itens = $("#game_itens");

let params = new URLSearchParams(document.location.search);
let id = params.get("id");

if(game_main && game_itens){
    fetch(`https://api.rawg.io/api/games/${id}?key=${key}`)
    .then(res => res.json())
    .then(game =>{
        game_main.html(`
                <div class="primeiro d-flex flex-column align-items-lg-start align-items-center">
                    <h2>${game.name}</h2>
                    <img class="img-fluid corte" src="${game.background_image}" alt="">
                </div>
                <div class="d-flex flex-column justify-content-between segundo">
                    <div class="my-1">
                        <h3 class="mt-3">Sobre</h3>
                        <p class="d-inline">${game.description}</p>
                    </div>
                    <div class="my-1">
                        <h3 class="mt-3">Plataformas</h3><p class="d-inline">${game.platforms[0].name}</p>
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
            fetch(`https://api.rawg.io/api/games?key=${key}&search_exact=${game.slug}`)
            .then(res => res.json())
            .then(game_info => {
                let screenshots = game_info.results[0].short_screenshots;
                console.log(screenshots.length);
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