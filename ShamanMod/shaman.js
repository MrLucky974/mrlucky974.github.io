G.AddData({
    name:'Shaman',
    author:'Luckius_',
    desc:'A mod that adds upgrades to healing.',
    engineVersion:1,
    manifest: 0,
    requires:['Default dataset*'],
    sheets:{

    },

    func:function() {

        //New modes for the healer
        G.getDict('healer').modes['heal']={name:'Heal', desc:'The [healer] heals the [sick] and [wounded].', req:{}};
        G.getDict('healer').effects[0]['mode'] = 'heal';
        G.getDict('healer').effects[1]['mode'] = 'heal';
        
        //G.getDict('healer').effects.push({type:'convert',from:{'flour':3, 'water':2}, into:{'dough':4}, every:3, mode:'dough'});

    }

});