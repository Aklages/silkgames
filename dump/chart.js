const chart_marca = document.getElementById("marca");
const chart_console = document.getElementById("console");

let nintendo = 0, xbox = 0, playstation = 0, pc = 0;

fetch("games")
    .then(res => res.json())
    .then(games => {
        games.forEach(game => {
            let plataformas = game.plataformas.split(",");
            plataformas.forEach(plataforma => {
                plataforma = plataforma.trim();
                if (plataforma.match(/PC/i)) {
                    pc += 1;
                } else if (plataforma.match(/Nintendo/i)) {
                    nintendo += 1;
                } else if (plataforma.match(/Xbox/i)) {
                    xbox += 1;
                } else if (plataforma.match(/Playstation/i)) {
                    playstation += 1;
                }
            });
        });

        new Chart(chart_marca, {
            type: 'pie',
            data: {
                labels: ['Nintendo', 'Xbox', 'Playstation'],
                datasets: [{
                    data: [nintendo, xbox, playstation],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(255, 206, 86, 0.7)'
                    ],
                    borderColor: 'rgba(255, 255, 255, 1)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                    }
                }
            }
        });

        new Chart(chart_console, {
            type: 'pie',
            data: {
                labels: ['Console', 'PC'],
                datasets: [{
                    data: [(nintendo + xbox + playstation) / 3, pc],
                    backgroundColor: [
                        'rgba(153, 102, 255, 0.7)',
                        'rgba(75, 192, 192, 0.7)'
                    ],
                    borderColor: 'rgba(255, 255, 255, 1)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });

    });
