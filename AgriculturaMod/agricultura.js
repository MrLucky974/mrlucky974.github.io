G.AddData({
    name:'Agricultura',
    author:'Luckius_',
    desc:'A mod that adds agriculture and a lot of other things related to food.',
    engineVersion:1,
    manifest: 'https://mrlucky974.github.io/AgriculturaMod/agriculturaModManifest.js',
    requires:['Default dataset*'],
    /*sheets:{},*/

    func:function() {

        new G.Res({
            name:'wheat',
            desc:'[wheat] is good',
            icon:[],
            turnToByContext:{'eat':{'health':0.01,'happiness':0.03},'decay':{'spoiled food':0.5}},//this basically translates to : "when eaten, generate some health and happiness; when rotting, turn into either nothing or some spoiled food"
            partOf:'food',
            category:'food',
        });

    }

});