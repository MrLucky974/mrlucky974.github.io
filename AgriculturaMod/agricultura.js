G.AddData({
    name:'Agricultura',
    author:'Luckius_',
    desc:'A mod that adds agriculture and a lot of other things related to food.',
    engineVersion:1,
    manifest: 0,
    requires:['Default dataset*'],
    sheets:{

    },

    func:function() {

        /* Categories */
        
        //Adds agriculture category
        G.resCategories['agriculture'] = {
            name: 'Agriculture',
            base: [],
            side: []
        };

        /* Ressources */
        
        new G.Res({
            name:'wheat',
            desc:'[wheat] is a product of a long and natural process, you can use it to produce food.',
            icon:[],
            turnToByContext:{'eat':{'health':0.01,'happiness':0.03},'decay':{'spoiled food':0.5}},//this basically translates to : "when eaten, generate some health and happiness; when rotting, turn into either nothing or some spoiled food"
            partOf:'food',
            category:'agriculture',
        });

        //Seeds are used in farmfields to produce various vegetables, fruits and other plants
        new G.Res({
            name:'seed',
            desc:'[seed] can be found on grass, maybe we can do something with that...',
            icon:[],
            turnToByContext:{},
            category:'agriculture',
        });

        G.getDict('grass').res['gather']['seeds']=1;

        /* Units */
        new G.Unit({
            name: 'farmfield',
            desc: '@plants crops and give all sorts of food',
            icon: [],
            cost: {'land': 1},
            use:  {'worker': 1},
            modes: {
                'off': G.MODE_OFF, 
                'wheat': {
                    name:'Plant wheat',
                    desc:'Turn 1 [seed] into 1 [wheat].',
                    //req:{'hot sauce preparing':true},
                    use:{
                        'ground stone tools':1
                    }
                }
            },
            effects: [
                {type:'convert', from:{'seed':1}, into:{'wheat':1}, every:3, mode:'wheat'}
            ],
            gizmos: true,
            req: {/*'agriculture': true*/},
            category: 'storage'
        });

        /* Techs */

        /*new G.Tech({
            name:'agriculture',
            desc:'@unlocks [farmfield]s<>',
            icon:[],
            cost:{'insight':15},
            req:{'building':true},
            effects:[
            ],
        });*/

    }

});