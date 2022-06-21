// Enter your code here
const addToCharacterBar = (character) => {
  const span = document.createElement('span')
  span.textContent = character.name
  characterBar.append(span)
span.addEventListener('click', (e) => {
        const name = characterInfo.querySelector('#name')
      const image = characterInfo.querySelector('#image')
name.textContent = character.name
      image.src = character.image
  })     

}
const resetButton = document.querySelector('#reset-btn')

resetButton.addEventListener('click', (e) => {

  fetch(url)
  .then(res => res.json())
  .then(characters => {
      const charName = document.querySelector('#name')
      const charID = characters.find(character => character.name === charName.textContent)
      fetch(`${url}/${charID.id}`, {
          method: 'PATCH',
          headers: {
              'Content-Type' : 'application/json'
          },
          body: JSON.stringify({
              votes : '0'
          })
      })
      .then(res => res.json())
      .then(data => characterVotes.textContent = data.votes)
  })

})