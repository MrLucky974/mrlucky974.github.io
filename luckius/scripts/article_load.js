//Temp variable to hold articles because I can't access files with GiHub lmao
var articles = {
    "unigeon": {
        "title": "UNIGEON",
        "article": "The latest (playable) version of Unigeon was supposed to be a rogue-like game with Dark Souls mecanics. You would wonder around a procedurally generated dungeon to "
    },
    "space_invader": {
        "title": "Sp@ce 1vaDé 3 : War in Typetopia",
        "article": "This is my inner HTML."
    }
}

function splitIntoSub(string, char)
{

    var start = [];
    var end = [];

    var variables = [];

    for (let index = 0; index < string.length; index++) {
        const element = string[index];
        if (element == char)
        {
            start.push(index);
            if (index != start[0])
            {
                end.push(index);
            }
        }
    }

    if (start.length > end.length)
    {
        end.push(string.length);
    }

    for (let index = 0; index < start.length; index++) {
        const first = start[index];
        const last = end[index];

        var full = [];
        var text = "";

        for (let index = first; index < last; index++) {
            const element = string[index];
            full[index] = []
            full[index].push(element);
        }

        full = full.filter(Boolean);

        for (let index = 0; index < full.length; index++) {
            const element = full[index];
            text = text.concat(element);
        }

        text = text.replace("#", "");

        variables.push(text);
        
    }

    return variables;

}

function getHash()
{
    if(window.location.hash)
    {
        
        var hash = window.location.hash.substring(0);
        var hashes = splitIntoSub(hash, '#');
        var name = hashes[0].replace('article=', '');
        var lang = hashes[1].replace('lang=', '');

        //alert(hashes)

        if (articles.hasOwnProperty(name))
        {
            
            document.getElementById("article-name").innerText = articles[name]["title"];
            document.getElementById("article-text").innerHTML = articles[name]["article"];
        
        } else {
            //window.location = 'https://mrlucky974.github.io/luckius/portfolio_main.html';
        }
    
    } else {
        
        //window.location = 'https://mrlucky974.github.io/luckius/portfolio_main.html';
    
    }
}

function readJSONFile(path)
{
    return fetch(path);
}