function getAllNames(enlace) {
    let xhr = new XMLHttpRequest()
    xhr.open('GET', enlace, true)
    xhr.onload = function () {
        if (xhr.status == 200) {
            console.log("Success")
            let characters = JSON.parse(this.response)
            characters.results.forEach(personaje => {
                const charCard = document.createElement('div')
                charCard.innerHTML = personaje.name
                document.getElementById("feed").appendChild(charCard)
            });
            if (characters.info.next != null)
                getAllNames(characters.info.next)
        }
        else {
            return;
        }
    }
    xhr.send()
}


function showCharacters() {
    getAllNames('https://rickandmortyapi.com/api/character')
}
$("#getCharactersButton").one('click', function (e) {
    showCharacters();    
});