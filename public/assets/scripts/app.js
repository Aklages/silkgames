const key = "670a9003706a4ef584c943665c087a24";

const destaques_carousel = $("#destaques_carousel");
const games_section = $("#games_section");
const games_pages = $("#games_pages");

if (destaques_carousel) {
    fetch("destaques?ativo=true")
    .then(res => res.json()) 
    .then(destaques => {
        destaques.forEach((destaque, index) => {
            let activeClass;

            if(index == 0){
                activeClass = "active"
            }
            else{
                activeClass = ""
            }

            destaques_carousel.append(`
                <div id="${destaque.id}" class="carousel-item ${activeClass} link">
                    <img src="${destaque.imagem}" class="d-block w-100 corte rounded banner" alt="...">
                    <div class="carousel-caption d-block bg-black">
                        <h5>${destaque.titulo}</h5>
                        <p>${destaque.descricao}</p>
                    </div>
                </div>
            `);

            let url = destaque.informacao_externa;
            let id = destaque.id;
            $(`#${id}`).on("click", () => {
                window.open(url, '_blank'); 
            });
        });
    })
}

function checar(game_id) {
    let user_id = JSON.parse(sessionStorage.getItem('usuarioCorrente')).id;
    return  fetch(`favoritos?usuarioId=${user_id}&gameId=${game_id}`)
            .then(res => res.json()) 
            .then(data => {
                if (data.length > 0) {
                    return `fa-solid`;
                } 
                else{
                    return `fa-regular`;
                }
            });
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
                checar(game.id)
                .then(element => {
                descricao = game_info.description.substr(0, 60);
                games_section.append(`
                <div class="col d-flex flex-column align-items-center">
                    <div class="card my-3 p-3">
                        <i id="${game.id}" class="favoritar ${element} fa-heart mb-2"></i>
                        <div id="${game.id}" class="link">
                            <img src="${game.background_image}" class="card-img-top img-fluid corte" alt="...">
                            <div class="card-body">
                                <h3>${game.name}</h3>
                                <p class="card-text"><light>${descricao}.</light></p>                    
                            </div>
                        </div>
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
                $(`#${index}.link`).on("click", ()=>{
                    window.location.href = `detalhe.html?id=${index}`;
                })
            })
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
    fetch(`https://api.rawg.io/api/games?key=${key}&search=${value}&search_exact=true&page_size=15&ordering=-metacritic`)
    .then(res => res.json())
    .then(games => {
        console.log(games)
        games_section.html("");
        games.results.forEach(game => {
            fetch(`https://api.rawg.io/api/games/${game.id}?key=${key}`)
            .then(res => res.json())
            .then(game_info => {
                checar(game.id)
                .then(element => {
                descricao = game_info.description.substr(0, 60);
                games_section.append(`
                <div class="col d-flex flex-column align-items-center">
                    <div class="card my-3 p-3">
                        <i id="${game.id}" class="favoritar ${element} fa-heart mb-2"></i>
                        <div id="${game.id}" class="link">
                            <img src="${game.background_image}" class="card-img-top img-fluid corte" alt="...">
                            <div class="card-body">
                                <h3>${game.name}</h3>
                                <p class="card-text"><light>${descricao}.</light></p>                    
                            </div>
                        </div>
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
                $(`#${index}.link`).on("click", ()=>{
                    window.location.href = `detalhe.html?id=${index}`;
                })
            })
            })
        })
        click(1, 2)
    })
})

$(`#searchbar`).on("blur", ()=>{
    value = $("#searchbar").val();
    if(value == ""){
        click(1, 5)
        pages(1);
    }
})