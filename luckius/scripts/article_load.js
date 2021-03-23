function getHash()
{
    if(window.location.hash)
    {
        
        var hash = window.location.hash.substring(1);
        var name = hash.replace('article=', '');
        alert(name);
        
        var requestFile = '../data/portfolio/'+name+'.js';

        fetch(requestFile)
    
    } else {
        
        window.location = '';
    
    }
}