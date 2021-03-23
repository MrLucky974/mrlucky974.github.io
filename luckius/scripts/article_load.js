function getHash()
{
    if(window.location.hash)
    {
        
        var hash = window.location.hash.substring(1);
        var name = hash.replace('article=', '');
        alert(name);
        
        var requestFile = 'luckius/data/portfolio/'+name+'.js';

        console.log(readJSONFile(requestFile));
    
    } else {
        
        window.location = '';
    
    }
}

function readJSONFile(path)
{
    return fetch(path);
}