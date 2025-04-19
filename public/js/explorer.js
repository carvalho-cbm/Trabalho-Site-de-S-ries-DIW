function seriesDisponiveis() {
    let telaSeries = document.getElementById("explorerSeries");
    let str = ``;

    const url = 'https://api.themoviedb.org/3/trending/tv/day?language=pt-BR';

    const url2 ='https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=pt-BR&page=1&sort_by=popularity.desc';

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjgyZDI1MGM2MTFhYjAyMmI4ZjZmMWUyMGY5ZTg0YSIsIm5iZiI6MTczMzI1NzU2Ni45NjUsInN1YiI6IjY3NGY2OTVlNTIwMWY4YzE1ZjE3NjU3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bclz_SdwXRAkSMcENf9Cpd1NtjYtYrw_9_PnP6ba1y4'
        }
    };

    fetch(url, options,url2)
        .then(res => res.json())
        .then(json => {
            const imageBaseUrl = 'https://image.tmdb.org/t/p/w500/';


            function exibirSeries(filtradas) {
                telaSeries.innerHTML = '';
                if (filtradas.length === 0) {
                    telaSeries.innerHTML = `
                    <div class="my-5"></div>
                        <div class="col-12 text-center">
                            <h3 class="text-light ">Nenhuma série com esse nome. Tente outro.</h3>
                        </div>`;
                    return;
                }
                filtradas.forEach((serie, index) => {

                    const imageUrl = serie.poster_path ? imageBaseUrl + serie.poster_path : 'img/default.jpg';
                    telaSeries.innerHTML += `
                        <div class="col-12 col-sm-6 col-md-3 mb-4 d-flex justify-content-center">
                            <div class="card text-center text-bg-primary" style="width: 18rem;">
                                <img src="${imageUrl}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">${serie.name}</h5>
                                    <p class="card-text">${serie.original_name}</p>
                                    <a href="series.html?id=${serie.id}" class="btn btn-primary">Acessar</a>
                                </div>
                            </div>
                        </div>`;
                });
            }

            exibirSeries(json.results);

            const searchButton = document.getElementById("searchButton");
            const searchInput = document.getElementById("searchInput");

            searchButton.addEventListener("click", (event) => {
                event.preventDefault();
                const textoBusca = searchInput.value.toLowerCase();
                const filtradas = json.results.filter(serie =>
                    serie.name.toLowerCase().includes(textoBusca) ||

                    // Verifica o titulo e abaixo o original tambem


                    serie.original_name.toLowerCase().includes(textoBusca)
                );
                exibirSeries(filtradas);
            });
        })
        .catch(err => console.error(err));
}

seriesDisponiveis();
