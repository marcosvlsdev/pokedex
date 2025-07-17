function getParam(param) {
    const urlSearch = new URLSearchParams(window.location.search)
    return urlSearch.get(param)
}

const nomeOuId = getParam("id")

if (nomeOuId) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${nomeOuId}/`)
        .then((res) => res.json())
        .then((pokemonDetails) => {
            const pokemon = convertToBasicModel(pokemonDetails)

            document.getElementById("pokemon-detalhes").innerHTML += `
                <section class="${pokemon.type}">
                    <header>
                        <div>
                            <h1 class="name">${pokemon.name}</h1>
                            <ul class="types">
                                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                            </ul>
                        </div>
                        <span class="number">#0${pokemon.id}</span>
                    </header>
                    <div class="imagem"><img src="${pokemon.photo}" alt="${pokemon.name}"></div>
                </section>
                
            `
        })
        .catch(() => {
            document.getElementById("pokemon-detalhes").innerHTML = `<p>Pokémon não encontrado.</p>`
        })
} else {
    document.getElementById("pokemon-detalhes").innerHTML = `<p>Nenhum parâmetro encontrado na URL.</p>`
}