function novas_series() {

    let cardRecentes = document.getElementById("cardsRecentes");
    var str = ``;

    const url = 'https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=pt-BR&page=1&sort_by=popularity.desc';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjgyZDI1MGM2MTFhYjAyMmI4ZjZmMWUyMGY5ZTg0YSIsIm5iZiI6MTczMzI1NzU2Ni45NjUsInN1YiI6IjY3NGY2OTVlNTIwMWY4YzE1ZjE3NjU3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bclz_SdwXRAkSMcENf9Cpd1NtjYtYrw_9_PnP6ba1y4'
        }
    };

    fetch(url, options)
        .then(res => res.json())
        .then(json => {
            console.log(json)
            const imageBaseUrl = 'https://image.tmdb.org/t/p/w500/';
            for (let i = 0; i < json.results.length && i < 4; i++) {
                const imageUrl = json.results[i].poster_path ? imageBaseUrl + json.results[i].poster_path : 'img/default.jpg';
                str += `<div class="col-12 col-sm-6 col-md-3 mb-4 d-flex justify-content-center">
        <div class="card text-center text-bg-primary" style="width: 18rem;">
          <img src="${imageUrl}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${json.results[i].name}</h5>
            <p class="card-text">Nome original -  ${json.results[i].original_name}</p>
            <a href="series.html?id=${json.results[i].id}" class="btn btn-primary">Acessar</a>
          </div>
        </div>
      </div>`;
            }
            cardRecentes.innerHTML = str;
        }
        ).catch(err => console.error(err));

}

function meu_carrossel() {
    let meuCarrossel = document.getElementById("carouselExampleCaptions");
    let str1 = ``;

    const url = 'https://api.themoviedb.org/3/trending/tv/day?language=pt-BR';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjgyZDI1MGM2MTFhYjAyMmI4ZjZmMWUyMGY5ZTg0YSIsIm5iZiI6MTczMzI1NzU2Ni45NjUsInN1YiI6IjY3NGY2OTVlNTIwMWY4YzE1ZjE3NjU3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bclz_SdwXRAkSMcENf9Cpd1NtjYtYrw_9_PnP6ba1y4'
        }
    };

    fetch(url, options)
        .then(res => res.json())
        .then(json => {
            if (json.results && json.results.length >= 3) {
                const imgBaseUrl = 'https://image.tmdb.org/t/p/w500';
                str1 += `
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <a href="series.html?id=${json.results[0].id}">
                                <img src="${imgBaseUrl}${json.results[0].backdrop_path}" class="d-block w-100" width="900" height="350" alt="...">
                            </a>
                            <div class="carousel-caption d-none d-md-block">
                                <h4>${json.results[0].name}</h4>
                                <p>${json.results[0].overview}</p>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <a href="series.html?id=${json.results[1].id}">
                                <img src="${imgBaseUrl}${json.results[1].backdrop_path}" class="d-block w-100" width="900" height="350" alt="...">
                            </a>
                            <div class="carousel-caption d-none d-md-block">
                                <h4>${json.results[1].name}</h4>
                                <p>${json.results[1].overview}</p>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <a href="series.html?id=${json.results[2].id}">
                                <img src="${imgBaseUrl}${json.results[2].backdrop_path}" class="d-block w-100" width="900" height="350" alt="...">
                            </a>
                            <div class="carousel-caption d-none d-md-block">
                                <h4>${json.results[2].name}</h4>
                                <p>${json.results[2].overview}</p>
                            </div>
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>`;

                meuCarrossel.innerHTML = str1;
                const carousel = new bootstrap.Carousel(meuCarrossel);

            } else {
                meuCarrossel.innerHTML = `<p>Não há itens suficientes para exibir no carrossel.</p>`;
            }
        })
        .catch(err => {
            console.error(err);
            meuCarrossel.innerHTML = `<p>Erro ao carregar o carrossel.</p>`;
        });
}

function dadosAlunos() {

    let str2 = ``;
    let minhaTela = document.getElementById("telaAluno");

    fetch('http://localhost:3000/aluno')
        .then(res => res.json())
        .then(data => {
            const arthur = data[0];
            str2 += `<div class="row">
                <div class="card mb-3 text-bg-primary" style="max-width: 540px;">
                    <div class="row g-0">

                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">Sobre</h5>
                                <p class="card-text">${arthur.sobre}</p>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card mb-3 text-bg-primary" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4" style="border-radius: 10px;">
                            <img src="${arthur.imagem}" class="img-fluid rounded-start" alt="..." >
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">Autoria</h5>
                                <p class="card-text">Aluno: ${arthur.nome}</p>
                                <p class="card-text">Curso: ${arthur.curso}</p>
                                <p class="card-text">Turno: ${arthur.turno}</p>
                                <div style="display: flex; align-items: center; gap: 15px;">
                                    <p class="card-text" style="margin: 0;">Redes Sociais: </p>
                                    <a href="${arthur.facebook} " target="_blank"><svg
                                            xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                            class="bi bi-facebook" style="fill: white" viewBox="0 0 16 16">
                                            <path
                                                d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                                        </svg></a>
                                    <a href="${arthur.twitter}" target="_blank">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                            class="bi bi-twitter" style="fill: white" viewBox="0 0 16 16">
                                            <path
                                                d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334q.002-.211-.006-.422A6.7 6.7 0 0 0 16 3.542a6.7 6.7 0 0 1-1.889.518 3.3 3.3 0 0 0 1.447-1.817 6.5 6.5 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.32 9.32 0 0 1-6.767-3.429 3.29 3.29 0 0 0 1.018 4.382A3.3 3.3 0 0 1 .64 6.575v.045a3.29 3.29 0 0 0 2.632 3.218 3.2 3.2 0 0 1-.865.115 3 3 0 0 1-.614-.057 3.28 3.28 0 0 0 3.067 2.277A6.6 6.6 0 0 1 .78 13.58a6 6 0 0 1-.78-.045A9.34 9.34 0 0 0 5.026 15" />
                                        </svg></a>
                                    <a href="${arthur.instagram}" target="_blank">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                            class="bi bi-instagram" style="fill: white" viewBox="0 0 16 16">
                                            <path
                                                d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                                        </svg></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;

            minhaTela.innerHTML = str2;
        }
        )

}

function telaMinhasSeries() {

    const url = 'http://localhost:3000/favoritos';
    let strf = ` `;
    let telaMinhas = document.getElementById("minhasSeries");


    fetch(url)
        .then(res => res.json())
        .then(favoritos => {
            for (let i = 1; i < favoritos.length; i++) {
                let serie = favoritos[i];
                strf += `<div class="col-12 col-sm-6 col-md-3 mb-4 d-flex justify-content-center">
                        <div class="card text-center text-bg-primary" style="width: 18rem;">
                            <img src="${serie.poster_path ? 'https://image.tmdb.org/t/p/w500/' + serie.poster_path : 'img/default.jpg'}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${serie.name}</h5>
                                <p class="card-text">${serie.original_name}</p>
                                <a href="series.html?id=${serie.id}" class="btn btn-primary">Acessar</a>
                                <div class="my-1"></div>
                                <button class="btn btn-danger" type="submit" onclick="removeFavoritos(${JSON.stringify(favoritos)})">- Remover</button>
                            </div>
                        </div>
                    </div>`;
            }
            telaMinhas.innerHTML = strf;
        }
        )
}

function removeFavoritos(){

    const url ='http://localhost:3000/favoritos/${id}';

    fetch(url,{
        method: 'DELETE'
    }).then(res =>{
        return res.json();
    }).then(data =>{
       alert("Sucesso");
    }).catch(error =>{
        alert("Erro");
    })
}