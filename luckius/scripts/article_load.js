function getHash()
{
    if(window.location.hash)
    {
        
        var hash = window.location.hash.substring(1);
        var name = hash.replace('article=', '');
        alert(name);
        
        var requestFile = '../scripts/data/portfolio/'+name+'.js';
    
    } else {
        
        window.location = '';
    
    }
}