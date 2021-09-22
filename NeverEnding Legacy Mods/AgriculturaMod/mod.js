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

        G.resCategories['ingredients'] = {
            name: 'Ingredients',
            base: [],
            side: []
        };

        /* Ressources */
        
        new G.Res({
            name:'vegetable',
            desc:'[vegetable, Vegetables] are grown by planting [root]s found in nature.',
            icon:[],
            turnToByContext:{'eat':{'health':0.02,'happiness':0.02},'decay':{'spoiled food':1}},
            partOf:'food',
            category:'food',
        });

        new G.Res({
            name:'cereal',
            desc:'[cereal, Cereals] are grown by planting [seed]s found in grass.',
            icon:[],
            turnToByContext:{'eat':{'health':0.005,'happiness':-0.03}, 'decay':{'spoiled food':0.3}},
            partOf:'food',
            category:'food',
        });

        //Seeds are used in farmfields to produce various fruits and cereals
        new G.Res({
            name:'seed',
            desc:'[seed]s grow fruits and cereals.',
            icon:[],
            turnToByContext:{'eating':{'health':0.005,'happiness':-0.03}},
            partOf:'food',
        });

        new G.Res({
            name:'root',
            desc:'[root]s are found in the wild, you can grow a lot of different vegetables.',
            icon:[],
            turnToByContext:{'eating':{'health':0.005,'happiness':-0.005}, 'decay':{'spoiled food':0.7}},
            partOf:'food',
        });

        new G.Res({
            name:'flour',
            desc:'[flour] is produced from the conversion of [cereal]s in the [mill].',
            icon:[],
            turnToByContext:{'eat':{'health':0.0025,'happiness':-0.05}, 'decay':{'flour':0.9, 'spoiled food':0.1}},
            partOf:'food',
            category:'ingredients',
        });

        new G.Res({
            name:'dough',
            desc:'[dough] is made by an [artisan] from [flour] and [water].',
            icon:[],
            turnToByContext:{'eat':{'health':0.05,'happiness':-0.007}, 'decay':{'dough':0.1, 'spoiled food':0.9}},
            partOf:'food',
            category:'ingredients',
        });

        //Dough recipe from the artisan
        G.getDict('artisan').modes['dough']={name:'Make dough', desc:'Turn 3 [flour] and 2 [water]s into 4 [dough].', req:{}, use:{'knapped tools':1}};
        G.getDict('artisan').effects.push({type:'convert',from:{'flour':3, 'water':2}, into:{'dough':4}, every:3, mode:'dough'});

        //Bread recipe from the furnace
        G.getDict('furnace').modes['bread']={name:'Cook bread', desc:'Turn 1 [dough] into a loaf of [bread].', req:{}, use:{'worker':1}};
        G.getDict('furnace').effects.push({type:'convert',from:{'dough':1}, into:{'bread':1}, every:3, mode:'bread'});

        /* Goods */

        G.getDict('grass').res['gather']['seed']=0.0015;
        G.getDict('grass').res['gather']['root']=0.002;
        
        G.contextNames['farming']='Farming';

        new G.Goods({
            name:'wild vegetables',
            desc:'[wild vegetables, Wild vegetables] are a good source of [root]s and of course, [vegetable]s;',
            icon:[],
            res:{
                'gather':{'root':5, 'vegetable':3},
            },
            mult:10,
        });

        /* Units */
        
        new G.Unit({
            name: 'farmland',
            desc: '@A [farmland] is build to plant various crops to produce a substainable stock of food, mainly [vegetable]s and [cereal]s.',
            icon: [],
            cost:{'archaic building materials':0},
            use:{'worker':1, 'land': 1},
		    upkeep:{'water':0.35},
            gizmos: true,
            modes: {
                'off': G.MODE_OFF,
                'any':{name:'Any', icon:[], desc:'Farm using any random [seed] or [root] you have. You may not get optimal results.', use:{'knapped tools':1}},
                'vegetables':{name:'Farm vegetables', icon:[], desc:'Produce [vegetable]s using [root]s.', use:{'knapped tools':1}},
                'cereals':{name:'Farm cereals', icon:[], desc:'Produce [cereal]s using [seed]s.', use:{'knapped tools':1}},
            },
            effects: [
                {type:'gather', context:'gather', what:{'herb':50}, amount:1, max:50, mode:'off'},
                {type:'gather', context:'farming', what:{'vegetable':2.5, 'cereal':2.5, 'seed':1.75, 'root':1.75}, amount:5, max:8, mode:'any'},
                {type:'gather', context:'farming', what:{'cereal':5, 'seed':2.5}, amount:5, max:8, mode:'cereals'},
                {type:'gather', context:'farming', what:{'vegetable':5, 'root':2.5}, amount:5, max:8, mode:'vegetables'},
                {type:'mult', value:1.7, req:{'harvest rituals':'on'}}
            ],
            req: {/*'agriculture': true*/},
            category: 'production',
        });

        new G.Unit({
            name: 'mill',
            desc: '@A truly wonderful building used to produce [flour] from [cereal]s like wheat.',
            icon: [],
            cost:{'basic building materials':0},
            use:{'land': 1},
		    upkeep:{},
            gizmos: true,
            modes: {
                'off': G.MODE_OFF,
                'flour':{name:'Produce flour', icon:[], desc:'Create [flour] from [cereal]s.', use:{}},
            },
            effects: [
                {type:'convert', from:{'cereal':10}, into:{'flour':5}, every:5, mode:'flour'},
            ],
            req: {'milling': true},
            category: 'production'
        });

        /* Techs */

        new G.Tech({
            name:'wheel',
            desc:'@the power of the wheel unlocks a whole new dimension<>',
            icon:[],
            cost:{'insight':10},
            req:{'tool-making':true},
            effects:[],
        });

        new G.Tech({
            name:'milling',
            desc:'@unlocks the [mill]<>',
            icon:[],
            cost:{'insight':10},
            req:{'wheel':true, 'building':true},
            effects:[],
        });

        new G.Tech({
            name:'agriculture',
            desc:'@unlocks [farmland]s<>',
            icon:[],
            cost:{'insight':15},
            req:{'sedentism':true},
            effects:[],
        });

    }

});