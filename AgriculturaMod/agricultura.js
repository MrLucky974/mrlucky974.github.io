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

        G.getDict('grass').res['gather']['seed']=0.05;

        /* Units */
        new G.Unit({
            name: 'farmfield',
            desc: '@plants [seed]s and give all sorts of food',
            icon: [],
            cost:{'archaic building materials':50},
            use:{'land': 1},
		    //staff:{'knapped tools':1},
		    upkeep:{'water':1},
            gizmos: true,
            modes: {
                'off': G.MODE_OFF,
                //'any':{name:'Any',icon:[], desc:'Farm using any random [seed] you find. You may not get optimal results.',use:{'worker':1, 'knapped tools':1, 'seed':10}},
                'wheat':{name:'Farm Wheat',icon:[], desc:'Farm [wheat] using [seed] you find.',use:{'worker':1, 'knapped tools':1, 'seed':10}},
                /*'wheat': {
                    name:'Plant wheat',
                    desc:'Turn 1 [seed] into 1 [wheat].',
                    //req:{'hot sauce preparing':true},
                    use:{
                        'ground stone tools':1
                    }
                }*/
            },
            effects: [
                {type:'gather', context:'gather', what:{'herb':5},max:30, notMode:'off'},
                //{type:'gather',context:'gather',amount:10,max:30,mode:'any'},
                {type:'gather',context:'gather',what:{'Wheat':50},max:30,mode:'wheat'},
            ],
            req: {/*'agriculture': true*/},
            category: 'crafting'
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