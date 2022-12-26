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
                charCard.innerHTML = personaje.name + "<br>" + "<img src=" + personaje.image+">";
                $("#feed").append(charCard);
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
                charCard.innerHTML = personaje.name + "<br>" + "<img src=" + personaje.image + ">"; 
                $("#feed").append(charCard);
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
        nextURL = "https://rickandmortyapi.com/api/character";
        const charCard = document.createElement('div')
        charCard.innerHTML = "NO PREVIOUS PAGE"
        $("#feed").append(charCard);
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
        const charCard = document.createElement('div')
        charCard.innerHTML = "NO NEXT PAGE"
        $("#feed").append(charCard)
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
    $("#feed").html("");
    getPrevNames(prevURL);
});

$("#getCharactersButton").on('click', function (e) {
    $("#feed").html("");
    showCharacters();    
});


$("#nextButton").on('click', function (e) {
    $("#feed").html("");
    getNextNames(nextURL);
});