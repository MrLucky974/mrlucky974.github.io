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
            side: ['seed', 'root']
        };

        /* Ressources */
        
        new G.Res({
            name:'vegetable',
            desc:'[vegetable, Vegetables]',
            icon:[],
            turnToByContext:{'eat':{'health':0.02,'happiness':0.02},'decay':{'spoiled food':1}},
            partOf:'food',
            category:'food',
        });

        new G.Res({
            name:'cereal',
            desc:'[cereal, Cereals]',
            icon:[],
            turnToByContext:{'eat':{'health':0.005,'happiness':-0.03},'decay':{'spoiled food':0.3}},
            partOf:'food',
            category:'food',
        });

        //Seeds are used in farmfields to produce various fruits and cereals
        new G.Res({
            name:'seed',
            desc:'[seed]s grow fruits and cereals.',
            icon:[],
            turnToByContext:{'eating':{'health':0.005,'happiness':-0.03}},
            category:'agriculture',
        });

        new G.Res({
            name:'root',
            desc:'[root]s are found in the wild, you can grow a lot of different vegetables.',
            icon:[],
            turnToByContext:{'eating':{'health':0.005,'happiness':-0.005}},
            category:'agriculture',
        });

        /* Goods */

        G.getDict('grass').res['gather']['seed']=0.01;
        G.getDict('grass').res['gather']['root']=0.015;
        
        G.contextNames['farming']='Farming';

        new G.Goods({
            name:'wild vegetables',
            desc:'[wild vegetables, Wild vegetables] are a good source of [root]s;',
            icon:[],
            res:{
                'gather':{'root':5},
            },
            mult:10,
        });

        /* Units */
        
        new G.Unit({
            name: 'farmland',
            desc: '@',
            icon: [],
            cost:{'archaic building materials':0},
            use:{'worker':1, 'land': 1},
		    upkeep:{'water':0.35},
            gizmos: true,
            modes: {
                'off': G.MODE_OFF,
                'any':{name:'Any', icon:[], desc:'Farm using any random [seed] or [root] you have. You may not get optimal results.', use:{'knapped tools':1}},
                'vegetables':{name:'Farm vegetables', icon:[], desc:'Produce [vegetable]s using [root]s.', use:{'knapped tools':1}, upkeep:{'root':10}},
                'cereals':{name:'Farm cereals', icon:[], desc:'Produce [cereal]s using [seed]s.', use:{'knapped tools':1}, upkeep:{'seed':10}},
            },
            effects: [
                {type:'gather', context:'gather', what:{'herb':50}, amount:5, max:30, mode:'off'},
                {type:'gather', context:'farming', what:{'wheat':0.1, 'parsnip':0.2}, amount:1, max:3, mode:'any'},
                {type:'gather', context:'farming', what:{'wheat':1}, amount:7, max:10, mode:'cereals'},
                {type:'gather', context:'farming', what:{'parsnip':1}, amount:7, max:10, mode:'vegetables'},
                {type:'mult', value:2.0, req:{'harvest rituals':'on'}}
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