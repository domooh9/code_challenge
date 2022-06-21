// ADD NEW CHARACTER

//creating new character
const addNewForm = document.querySelector("#character-form")
 // Adding eventListener to the form of new character created.
addNewForm.addEventListener('submit', (e) => {
    //prevent browser default behavoir of reloading using preventDefault() function
    e.preventDefault()
    // create new value of character name
    const newName = e.target.name.value
    // create new image of character created
    const newImage = e.target['image-url'].value
////requesting for resources from server using POST method and returning a promise using .then method
    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            name : newName,
            image : newImage,
            votes : '0',
        })
    })
    .then(res => res.json())
    .then(data => addToCharacterBar(data))
    .catch(err => console.log(err))
//restores form elements default values
    addNewForm.reset()
})