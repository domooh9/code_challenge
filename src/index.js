//link to JSON live server
const url = 'http://localhost:3000/characters'
//using querySelector to get IDs
let characterVotes = document.querySelector('#vote-count')
const characterInfo = document.querySelector('#detailed-info')
const characterBar = document.querySelector('#character-bar')

//requesting for resources using fetch() method and returning a promise using .then method
fetch(url)
    .then(res => res.json())
    .then(characters => {
        //images to characterBar
        const name = characterInfo.querySelector('#name')
        const image = characterInfo.querySelector('#image')
        name.textContent = characters[0].name
        image.src = characters[0].image
        characterVotes.textContent = characters[0].votes
        characters.forEach(character => addToCharacterBar(character))
    })
    //catching errors in the console
    .catch(error => { throw error })

//function to submit votes using "submit" eventListener 
const form = document.querySelector('#votes-form')
form.addEventListener('submit', (e) => {
    // doing away with the browser default behaviour 
    e.preventDefault()
    // adding a reset button to default votes to 0
    let currentVotes = parseInt(characterVotes.textContent, 10)
    let addedVotes = parseInt(e.target.votes.value, 10)
    characterVotes.textContent = (currentVotes += addedVotes)
    form.reset()
    // Use reseting votes characters in JSON using patch
    fetch(url)
        .then(res => res.json())
        .then(characters => {
            const charName = document.querySelector('#name')
            const charID = characters.find(character => character.name === charName.textContent)
            fetch(`${url}/${charID.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    votes: characterVotes.textContent
                })
            })
//calling asynchronous voters data using .then() method
                .then(res => res.json())
                .then(data => {
                    characterVotes.textContent = data.votes
                    console.log(data.votes)
                })
        })
})