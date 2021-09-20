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

        new G.Res({
            name:'parsnip',
            desc:'[parsnip] can be found out in the wild and grown on farms.',
            icon:[],
            turnToByContext:{'eat':{'health':0.01,'happiness':0.03},'decay':{'spoiled food':0.5}},//this basically translates to : "when eaten, generate some health and happiness; when rotting, turn into either nothing or some spoiled food"
            partOf:'food',
            category:'agriculture',
        });

        //Seeds are used in farmfields to produce various fruits and cereals
        new G.Res({
            name:'seed',
            desc:'[seed]s can be found on grass, maybe we can do something with that...',
            icon:[],
            turnToByContext:{'eating':{'health':0.005,'happiness':-0.03}},
            category:'agriculture',
        });

        new G.Res({
            name:'root',
            desc:'[root]s are found in the wild, you can grow a lot of vegetables.',
            icon:[],
            turnToByContext:{'eating':{'health':0.005,'happiness':-0.03}},
            category:'agriculture',
        });

        G.getDict('grass').res['gather']['seed']=0.05;
        G.getDict('grass').res['gather']['root']=0.05;

        G.contextNames['farming']='Farming';

        /* Units */
        
        new G.Unit({
            name: 'farmfield',
            desc: '@plants [seed]s and give all sorts of food',
            icon: [],
            cost:{'archaic building materials':50},
            use:{'worker':1, 'land': 1},
		    upkeep:{'water':0.5},
            gizmos: true,
            modes: {
                'off': G.MODE_OFF,
                'any':{name:'Any',icon:[], desc:'Farm using any random [seed] or [root] you have. You may not get optimal results.', use:{'knapped tools':1, 'seed':10, 'root':10}},
                'wheat':{name:'Farm Wheat', icon:[], desc:'Produce [wheat] using [seed]s.', use:{'knapped tools':1, 'seed':10}},
            },
            effects: [
                //{type:'gather', context:'gather', what:{'herb':5}, max:30, notMode:'off'},
                {type:'gather', context:'farming', what:{'wheat':0.1, 'parsnip':0.2}, amount:5, mode:'any'},
                {type:'gather', context:'farming', what:{'wheat':1}, amount:5, mode:'wheat'},
            ],
            req: {/*'agriculture': true*/},
            category: 'production'
        });

        /* Techs */

        new G.Tech({
            name:'agriculture',
            desc:'@unlocks [farmfield]s<>',
            icon:[],
            cost:{'insight':15},
            req:{'building':true},
            effects:[],
        });

    }

});