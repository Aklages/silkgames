const key = "670a9003706a4ef584c943665c087a24";

let div = $("#principal");
let user_id = JSON.parse(sessionStorage.getItem('usuarioCorrente')).id;

// Objetos pra ir somando
let parent_count = {};
let tag_count = {};
let store_count = {};

fetch(`favoritos?usuarioId=${user_id}`)
  .then(res => res.json()) 
  .then(async data => {

    div.html(`
      <h1>Jogos favoritados: </h1>
      <hr>
    `);
  
    await Promise.all(data.map(async (element) => {
      let res = await fetch(`https://api.rawg.io/api/games/${element.gameId}?key=${key}`);
      let game = await res.json();

      // Contar parent platforms
      game.parent_platforms?.forEach(plat => {
        let nome = plat.platform?.name;
        if (nome) {
          parent_count[nome] = (parent_count[nome] || 0) + 1;
        }
      });

      // Contar tags
      game.tags?.forEach(tag => {
        let nome = tag.name;
        if (nome) {
          tag_count[nome] = (tag_count[nome] || 0) + 1;
        }
      });

      // Contar stores
      game.stores?.forEach(s => {
        let nome = s.store?.name;
        if (nome) {
          store_count[nome] = (store_count[nome] || 0) + 1;
        }
      });

      // Agora joga o game na tela
      div.append(`
        <div class="col d-flex flex-column align-items-center">
          <div class="card my-3 p-3">
            <div id="${game.id}" class="link">
              <img src="${game.background_image}" class="card-img-top img-fluid corte" alt="...">
              <div class="card-body">
                <h3>${game.name}</h3>                    
              </div>
            </div>
            <button id="${game.id}" class="btn btn-danger dark-red">Remover</button>
          </div>
        </div>
      `);
      let index = game.id;
      $(`#${index}.link`).on("click", () => {
        window.location.href = `detalhe.html?id=${index}`;
      })
      $(`#${index}.btn`).on("click", () => {
        fetch(`favoritos/${element.id}`, { method: "DELETE" })
          .then(response => {
            if (response.ok) {
              window.location.href = "favoritos.html";
            }
          })
      })
    }));

    // Agora que temos todos os dados, montamos os 3 gráficos
    let parent_labels = Object.keys(parent_count);
    let parent_values = Object.values(parent_count);

    let tag_labels = Object.keys(tag_count);
    let tag_values = Object.values(tag_count);

    let store_labels = Object.keys(store_count);
    let store_values = Object.values(store_count);

    new Chart(document.getElementById('Plataformas'), {
      type: 'pie',
      data: {
        labels: parent_labels,
        datasets: [{
          data: parent_values,
          backgroundColor: ['#ff6384', '#ff9f40', '#ffcd56', '#4bc0c0', '#36a2eb', '#9966ff'],
          hoverBackgroundColor: ['#ff6384cc', '#ff9f40cc', '#ffcd56cc', '#4bc0c0cc', '#36a2ebcc', '#9966ffcc']
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { labels: {color: "#ffffff"}, position: 'top' }, title: { display: true, text: 'Plataformas categorizadas', color: "#ffffff"} }
      }
    });

    new Chart(document.getElementById('Tags'), {
      type: 'bar',
      data: {
        labels: tag_labels,
        datasets: [{
          label: 'Quantidade',
          data: tag_values,
          backgroundColor: ['#ff6384', '#ff9f40', '#ffcd56', '#4bc0c0', '#36a2eb', '#9966ff'],
          hoverBackgroundColor: ['#ff6384cc', '#ff9f40cc', '#ffcd56cc', '#4bc0c0cc', '#36a2ebcc', '#9966ffcc']
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { labels: {color: "#ffffff"}, position: 'top' }, title: { display: true, text: 'Tags mais presentes', color: "#ffffff"} },
        scales: {
            x: { 
                ticks: { color: "#ffffff" }
            },
            y: { 
                ticks: { color: "#ffffff" }
            }
        }
      }
    });

    new Chart(document.getElementById('Stores'), {
      type: 'polarArea',
      data: {
        labels: store_labels,
        datasets: [{
          data: store_values,
          backgroundColor: ['#ff6384', '#ff9f40', '#ffcd56', '#4bc0c0', '#36a2eb', '#9966ff'],
          hoverBackgroundColor: ['#ff6384cc', '#ff9f40cc', '#ffcd56cc', '#4bc0c0cc', '#36a2ebcc', '#9966ffcc']
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { labels: {color: "#ffffff"}, position: 'top' }, title: { display: true, text: 'Lojas presentes', color: "#ffffff"} }
      }
    });

  })
  .catch(err => console.error(err));