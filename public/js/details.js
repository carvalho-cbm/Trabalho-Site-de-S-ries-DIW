function pegarURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

function carregarSerie() {

    let strs = ``;
    let telaSerie = document.getElementById("mostrarDetalhes");

    const serieId = pegarURL();
    const url = `https://api.themoviedb.org/3/tv/${serieId}?language=pt-BR`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjgyZDI1MGM2MTFhYjAyMmI4ZjZmMWUyMGY5ZTg0YSIsIm5iZiI6MTczMzI1NzU2Ni45NjUsInN1YiI6IjY3NGY2OTVlNTIwMWY4YzE1ZjE3NjU3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bclz_SdwXRAkSMcENf9Cpd1NtjYtYrw_9_PnP6ba1y4'
        }
    };

    fetch(url, options)
        .then(res => res.json())
        .then(serie => {
            console.log(serie);


            strs += `<div class="card-header">
    
</div>
<div class="container my-5 d-flex justify-content-center">
    <div class="card text-center text-bg-primary" style="width: 18rem;">
        <img src="https://image.tmdb.org/t/p/w500/${serie.poster_path}" class="card-img-top" alt="...">
    </div>
</div>
<div class="card-body">
    <h1 class="card-title">${serie.name}</h1>
    <p>${serie.original_name}</p>
    <p >${serie.overview}</p>
    <p>Data de estreia : ${serie.first_air_date}</p>
    <p>Lingua original : ${serie.original_language}</p>
    <p>Pais de origem : ${serie.origin_country[0]}</p>
    <p>Nota media : ${serie.vote_average}</p>
</div>
<div class="card-footer text-body-light ">
    <div class="container d-flex justify-content-center">
        <button class="btn btn-light" type="submit" onclick='adicionaFavorito(${JSON.stringify(serie)})'>+ Minhas Séries</button>
    </div>
</div>`;
            telaSerie.innerHTML = strs;


        })
        .catch(err => console.error(err));
}

function mostrarElenco() {
    let strs1 = ``;
    let exibeElenco = document.getElementById("telaElenco");
    const serieId = pegarURL();

    const url = `https://api.themoviedb.org/3/tv/${serieId}/aggregate_credits?language=pt-BR`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjgyZDI1MGM2MTFhYjAyMmI4ZjZmMWUyMGY5ZTg0YSIsIm5iZiI6MTczMzI1NzU2Ni45NjUsInN1YiI6IjY3NGY2OTVlNTIwMWY4YzE1ZjE3NjU3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bclz_SdwXRAkSMcENf9Cpd1NtjYtYrw_9_PnP6ba1y4'
        }
    };

    fetch(url, options)
        .then(res => res.json())
        .then(elenco => {
            console.log(elenco)
            const imageBaseUrl = 'https://image.tmdb.org/t/p/w500/';
            for (let i = 0; i < elenco.cast.length && i < 6; i++) {
                const imageUrl = elenco.cast[i].profile_path ? imageBaseUrl + elenco.cast[i].profile_path : 'img/default.jpg';
                strs1 += `<div class="card col-6 col-md-2 text-center text-bg-primary mb-3" style="width: 15rem;">
                <img src="${imageUrl}" class="card-img-top" alt="...">
                <div class="card-body">
                    <p class="card-text">${elenco.cast[i].name}</p>
                    <p class="card-text">${elenco.cast[i].roles[0].character}</p>
                </div>
            </div>`
            }
            exibeElenco.innerHTML = strs1;
        })
        .catch(err => console.error(err));

}

function adicionaFavorito(serie) {

    const url = 'http://localhost:3000/favoritos';

    fetch(url)
        .then(res => res.json())
        .then(favoritos => {
            const existe = favoritos.some(fav => fav.id === serie.id);//retorna um bool
            if (existe) {
                alert("Série já adicionada");
            } else {
                alert("Adicionada a Minhas Séries com sucesso");
                return fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(serie),
                });
            }


        }).then(response => {
            console.log("Tarefa");
        })
        .catch(err => console.error(err));

}

/*function removeFavoritos(){

    const url ='http://localhost:3000/favoritos';

    fetch(url)
        .then(res => res.json())
        .then(data => )

}*/