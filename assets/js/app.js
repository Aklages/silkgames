const dados = {
    "games":[
        {
            "id": 1,
            "destaque": true,
            "titulo": "Hollow Knight: Silksong",
            "descricao": "Silk",
            "conteudo": "Song",
            "plataformas" : "PC, Nintendo Switch, XBOX Game Pass, Playstation 5",
            "genero": "Ação, Aventura, Plataforma, Indie",
            "lancamento": "Setembro de 2025",
            "desenvolvedora": "Team Cherry",
            "editora": "Team Cherry",
            "imagem_principal": "https://picsum.photos/1800/600?random=1",
            "imagens_complementares": [
                {
                    "id": 1,
                    "src": "",
                    "descricao": ""
                }
            ]
        },
        {
            "id": 2,
            "destaque": true,
            "titulo": "Hollow Knight: Silkson",
            "descricao": "Silk",
            "conteudo": "Song",
            "plataformas" : "PC, Nintendo Switch, XBOX Game Pass, Playstation 5",
            "genero": "Ação, Aventura, Plataforma, Indie",
            "lancamento": "Setembro de 2025",
            "desenvolvedora": "Team Cherry",
            "editora": "Team Cherry",
            "imagem_principal": "https://picsum.photos/1800/600?random=2",
            "imagens_complementares": [
                {
                    "id": 1,
                    "src": "",
                    "descricao": ""
                }
            ]
        },
        {
            "id": 3,
            "destaque": true,
            "titulo": "Hollow Knight: Silkso",
            "descricao": "Silk",
            "conteudo": "Song",
            "plataformas" : "PC, Nintendo Switch, XBOX Game Pass, Playstation 5",
            "genero": "Ação, Aventura, Plataforma, Indie",
            "lancamento": "Setembro de 2025",
            "desenvolvedora": "Team Cherry",
            "editora": "Team Cherry",
            "imagem_principal": "https://picsum.photos/1800/600?random=3",
            "imagens_complementares": [
                {
                    "id": 1,
                    "src": "",
                    "descricao": ""
                }
            ]
        },
    ]
}

const games_carousel = $("#games_carousel");

if(games_carousel){
    for(i = 0; i < dados.games.length; i++){
        if(dados.games[i].destaque == true){
            if(i == 0){
                games_carousel.append(`
                <div class="carousel-item active">
                <img src="${dados.games[i].imagem_principal}" class="d-block w-100" alt="...">
                <div class="carousel-caption d-none d-md-block">
                  <h5>${dados.games[i].titulo}</h5>
                  <p>${dados.games[i].descricao}</p>
                </div>
              </div>
            `)
            }
            else{
                games_carousel.append(`
                <div class="carousel-item">
                <img src="${dados.games[i].imagem_principal}" class="d-block w-100" alt="...">
                <div class="carousel-caption d-none d-md-block">
                  <h5>${dados.games[i].titulo}</h5>
                  <p>${dados.games[i].descricao}</p>
                </div>
              </div>
            `);
            }
        }
    }
}