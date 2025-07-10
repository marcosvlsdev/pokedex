let offset = 0
const limit = 12
const maxOffSet = 807
const pokemons = document.getElementById("pokemons")
const loadMoreButton = document.getElementById('loadMore')

function loadPokemons(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((listaDeInfos = []) => {
            
            pokemons.innerHTML += listaDeInfos.map((pokemon) =>
                `<li class="pokemon ${pokemon.type}">
                <section class="esquerda">
                    <h2 class="name">${pokemon.name}</h2>
                    <ul class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ul>
                </section>
                <section class="direita">
                    <span class="number">#0${pokemon.id}</span>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </section>
            </li>`
            ).join("")
        })
}

loadPokemons(offset, limit)

loadMoreButton.addEventListener("click", () => {
    offset+=limit
    const maxOffSetNextPage = offset + limit
    if(maxOffSetNextPage >= maxOffSet){
        let newLimit = maxOffSet - offset
        loadPokemons(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemons(offset,limit)
    }
    
})



