var prevURL = null;
var nextURL = "https://rickandmortyapi.com/api/character";
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
                nextURL = characters.info.next
                prevURL = characters.info.prev
            if (characters.info.next != null) {
                getAllNames(characters.info.next)
            }
        }   
        else {
            return;
        }
    }
    xhr.send()
}
function getCharacterNames(enlace) {
    document.getElementById("feed").innerHTML = ""
    let xhr = new XMLHttpRequest()
    xhr.open('GET', enlace, true)
    xhr.onload = function () {
        if (xhr.status == 200) {
            console.log("Success")
            let characters = JSON.parse(this.response)
            console.log(characters.results)
            prevURL = characters.info.prev
            nextURL = characters.info.next
            characters.results.forEach(personaje => {
                const charCard = document.createElement('div')
                charCard.innerHTML = personaje.name
                document.getElementById("feed").appendChild(charCard)
            });
        }
        else {
            return;
        }
    }
    xhr.send()
}
function getPrevNames(actualURL) {
    if (prevURL == null) {
        document.getElementById("feed").innerHTML = ""
        const charCard = document.createElement('div')
        charCard.innerHTML = "NO PREVIOUS PAGE"
        document.getElementById("feed").appendChild(charCard)
        return;
    }
    let xhr = new XMLHttpRequest()
    xhr.open('GET', actualURL, true)
    xhr.onload = function () {
        if (xhr.status == 200) {
            console.log("Success")
            let characters = JSON.parse(this.response)
            getCharacterNames(actualURL)
        }
        else {
            return;
        }
    }
    xhr.send()
}

function getNextNames(actualURL) {
    if (nextURL == null) {
        document.getElementById("feed").innerHTML = ""
        const charCard = document.createElement('div')
        charCard.innerHTML = "NO NEXT PAGE"
        document.getElementById("feed").appendChild(charCard)
        return;
    }
    let xhr = new XMLHttpRequest()
    xhr.open('GET', actualURL, true)
    xhr.onload = function () {
        if (xhr.status == 200) {
            console.log("Success")
            let characters = JSON.parse(this.response)
            getCharacterNames(actualURL)
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

$("#prevButton").on('click', function (e) {
    document.getElementById("feed").innerHTML = ""
    getPrevNames(prevURL);
});

$("#getCharactersButton").on('click', function (e) {
    document.getElementById("feed").innerHTML = ""
    showCharacters();    
});


$("#nextButton").on('click', function (e) {
    document.getElementById("feed").innerHTML = ""
    getNextNames(nextURL);
});