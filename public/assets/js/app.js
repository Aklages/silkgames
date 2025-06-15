const games_carousel = $("#games_carousel");
const games_section = $("#games_section");
const games_pages = $("#games_pages");

if(games_carousel){
    fetch(`games?destaque=true`)
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
    fetch(`games?_page=${page}&_limit=10&destaque=false`)
    .then(res => res.json())
    .then(games => {
        games_section.html("");
        games.forEach(game => {
            games_section.append(`
            <div class="col d-flex flex-column align-items-center">
                <div id="${game.id}" class="card my-3 p-3 link">
                <img src="${game.imagem_principal}" class="card-img-top img-fluid corte" alt="...">
                <div class="card-body">
                    <h3>${game.titulo}</h3>
                    <p class="card-text">${game.descricao}</p>                    
                </div>
            </div>
            </div>
            `);
            let index = game.id;
            $(`#${index}`).on("click", ()=>{
                window.location.href = `detalhe.html?id=${index}`;
            })
        });
    })
}

function click(current_page, final_page){
    games_pages.html(`<p class="px-3">Páginas:</p>`);
    for(let i = 1; i <= final_page; i++){
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
            click(i, final_page);
            pages(i);
        })
    }
}

if(games_pages){
    fetch("games?_page=1&_limit=10&destaque=false")
    .then(res => res.headers.get("link"))
    .then(info => {
        const links = info.split(",");
        const final_link = links[2].match("page=\\d");
        const final_page = final_link[0][5];
        click(1, final_page);
        pages(1);
    })
}

const game_main = $("#game_main");
const game_itens = $("#game_itens");

let params = new URLSearchParams(document.location.search);
let id = params.get("id");

if(game_main && game_itens){
    fetch(`games/${id}`)
    .then(res => res.json())
    .then(game =>{
        game_main.html(`
                <div class="primeiro d-flex flex-column align-items-lg-start align-items-center">
                    <h2>${game.titulo}</h2>
                    <img class="img-fluid corte" src="${game.imagem_principal}" alt="">
                </div>
                <div class="d-flex flex-column justify-content-between segundo">
                    <div class="my-1">
                        <h3 class="mt-3">Sobre</h3>
                        <p class="d-inline">${game.conteudo}</p>
                    </div>
                    <div class="my-1">
                        <h3 class="mt-3">Plataformas</h3><p class="d-inline">${game.plataformas}</p>
                    </div>
                    <div class="my-1">
                        <h3 class="mt-3">Gêneros</h3><p class="d-inline">${game.genero}</p>
                    </div>
                    <div class="my-1">
                        <h3 class="mt-3">Lançamento</h3><p class="d-inline">${game.lancamento}</p>
                    </div>
                    <div class="my-1">
                        <h3 class="mt-3">Desenvolvedora</h3><p class="d-inline">${game.desenvolvedora}</p>
                    </div>
                    <div class="my-1">
                        <h3 class="mt-3">Editora</h3><p class="d-inline">${game.editora}</p>
                    </div>
                </div>
            `);
            for(let n = 0; n < game.imagens_complementares.length; n++){
                game_itens.append(`
                <div class="col">
                    <h3>${game.imagens_complementares[n].descricao}</h3><img class="imgs" src="${game.imagens_complementares[n].src}" alt="">
                </div>
                `)
            }
    })
}