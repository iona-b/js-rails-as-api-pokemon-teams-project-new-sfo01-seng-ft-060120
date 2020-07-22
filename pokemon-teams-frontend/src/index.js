const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`   

const fetchAllTrainers = () => {
    fetch(`${TRAINERS_URL}`)
    .then(res => res.json())
    .then (json => json.forEach(trainer => showAllTrainers(trainer)))
}
fetchAllTrainers()

const showAllTrainers = (trainer) => { 
    let main = document.querySelector('main')
    let div = document.createElement('div')
    div.id = `div_${trainer.id}`
    div.className = 'card'

    let p = document.createElement('p')
    p.textContent = trainer.name
    div.appendChild(p)

    let addPokemonButton = document.createElement('button')
    addPokemonButton.id = trainer.id
    addPokemonButton.textContent = "Add Pokemon"
    div.appendChild(addPokemonButton)

    let ul = document.createElement('ul')
    ul.id = `ul_${trainer.id}`
    trainer.pokemons.forEach (pokemon => {
        let li = document.createElement('li')
        li.id = pokemon.id
        li.textContent = `${pokemon.nickname} (${pokemon.species})`
        let releasePokemonButton = document.createElement('button')
        releasePokemonButton.textContent = "Release"
        releasePokemonButton.className = "release"
        releasePokemonButton.id = pokemon.id
        li.append(releasePokemonButton)
        releasePokemonButton.addEventListener('click', (e) => {
            releasePokemon(e, pokemon)
        }) 
        ul.appendChild(li)
    })
    div.appendChild(ul)
    main.appendChild(div)

    addPokemonButton.addEventListener('click', (e) => {
        addPokemon(e, trainer)
    })    

}

const addPokemon = (e, trainer) => {
    let data = {
        trainer_id: trainer.id
    }
    fetch(`${POKEMONS_URL}`, {
    method:'POST',
    headers: {
    'Content-Type':'application/json'
    },
    body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then (json => {
        if (json !== null) {
            let ul = document.getElementById(`ul_${trainer.id}`)
            let li = document.createElement('li')
            li.id = json.id
            li.textContent = `${json.nickname} (${json.species})`
            let releasePokemonButton = document.createElement('button')
            releasePokemonButton.textContent = "Release"
            releasePokemonButton.className = "release"
            releasePokemonButton.id = json.id
            li.append(releasePokemonButton)
            releasePokemonButton.addEventListener('click', (e) => {
                releasePokemon(e, json)
            }) 
            ul.appendChild(li)
        }
    })
}

const releasePokemon = (e, pokemon) => {
    fetch(`http://localhost:3000/pokemons/${pokemon.id}`, {
        method:'DELETE'
        })
        .then(res => res.json)
        .then (json => {
            let currentLi = document.getElementById(pokemon.id)
            currentLi.textContent = ''
    }) 
}