G.AddData({
    name:'Agricultura',
    author:'Luckius_',
    desc:'A mod that adds agriculture and a lot of other things related to food.',
    engineVersion:1,
    manifest: 0,
    requires:['Default dataset*'],
    sheets:{
        'agricultura': 'https://mrlucky974.github.io/NeverEnding%20Legacy%20Mods/AgriculturaMod/iconSheet.png'
    },

    func:function() {

        /* Categories */
        
        //Adds agriculture category
        G.resCategories['agriculture'] = {
            name: 'Agriculture',
            base: [],
            side: ['seed', 'root']
        };

        //Adds ingredients category
        G.resCategories['ingredients'] = {
            name: 'Ingredients',
            base: [],
            side: []
        };

        /* Ressources */
        
        new G.Res({
            name:'vegetable',
            desc:'[vegetable, Vegetables] are grown by planting [root]s found in nature.',
            icon:[0,1,'agricultura'],
            turnToByContext:{'eat':{'health':0.02,'happiness':0.02}, 'decay':{'spoiled food':1}}, //When decaying, always transform to spoiled food
            partOf:'food',
            category:'food',
        });

        new G.Res({
            name:'cereal',
            desc:'[cereal, Cereals] are grown by planting [seed]s found in grass.',
            icon:[],
            turnToByContext:{'eat':{'health':0.005,'happiness':-0.03}, 'decay':{'cereal':0.7, 'spoiled food':0.3}},
            partOf:'food',
            category:'food',
        });

        //Seeds are used in farmlands to produce various fruits and cereals
        new G.Res({
            name:'seed',
            desc:'[seed]s grow fruits and cereals.',
            icon:[0,0,'agricultura'],
            turnToByContext:{'eating':{'health':0.005,'happiness':-0.03}, decay:{'seed':1}}, //Seeds can't spoil
            partOf:'food',
            tick:function(me,tick)
		    {
                if (me.amount > 0)
                {
                    if (tick % 5 == 0)
                    {
                        var farmlandUnit = G.getUnitByName('farmland');
                        if (farmlandUnit)
                        {
                            var farmlandCount = G.getUnitAmount('farmland');
                            if (farmlandCount > 0)
                            {
                                var farmlandMode = farmlandUnit.mode.id;
                                switch (farmlandMode) {
                                    case 'any':
                                        var toConsume = 3.5 * farmlandCount / 2;
                                        if (toConsume > me.amount) {
                                            G.setUnitMode(farmlandUnit, farmlandUnit.unit.modes.off);
                                        } else {
                                            G.lose(me.name, toConsume, 'agriculture');
                                        } 
                                        break;

                                    case 'cereals':
                                        var toConsume = 15 * farmlandCount / 2;
                                        if (toConsume > me.amount) {
                                            G.setUnitMode(farmlandUnit, farmlandUnit.unit.modes.off);
                                        } else {
                                            G.lose(me.name, toConsume, 'agriculture');
                                        }
                                        break;
                                }
                            }
                        }
                    }
                }
            }
        });

        //Roots are used in farmlands to produce vegetables
        new G.Res({
            name:'root',
            desc:'[root]s are found in the wild, you can grow a lot of different vegetables.',
            icon:[3,1,'agricultura'],
            turnToByContext:{'eating':{'health':0.005,'happiness':-0.005}, 'decay':{'root':0.4, 'spoiled food':0.6}},
            partOf:'food',
            tick:function(me,tick)
		    {
                if (me.amount > 0)
                {
                    if (tick % 5 == 0)
                    {
                        var farmlandUnit = G.getUnitByName('farmland');              
                        if (farmlandUnit)
                        {
                            var farmlandCount = G.getUnitAmount('farmland');
                            if (farmlandCount > 0)
                            {
                                var farmlandMode = farmlandUnit.mode.id;
                                switch (farmlandMode) {
                                    case 'any':
                                        var toConsume = 3.5 * farmlandCount / 2;
                                        if (toConsume > me.amount) {
                                            G.setUnitMode(farmlandUnit, farmlandUnit.unit.modes.off);
                                        } else {
                                            G.lose(me.name, toConsume, 'agriculture');
                                        } 
                                        break;

                                    case 'vegetables':
                                        var toConsume = 15 * farmlandCount / 2;
                                        if (toConsume > me.amount) {
                                            G.setUnitMode(farmlandUnit, farmlandUnit.unit.modes.off);
                                        } else {
                                            G.lose(me.name, toConsume, 'agriculture');
                                        }
                                        break;
                                }
                            }
                        }
                    }
                }
            }
        });

        //Flour : new ingredient, used to make dough
        new G.Res({
            name:'flour',
            desc:'[flour] is produced from the conversion of [cereal]s in the [mill].',
            icon:[1,0,'agricultura'],
            turnToByContext:{'eat':{'health':0.0025,'happiness':-0.05}, 'decay':{'flour':0.9, 'spoiled food':0.1}},
            partOf:'food',
            category:'ingredients',
        });

        //Dough : new ingredient, used to make bread
        new G.Res({
            name:'dough',
            desc:'[dough] is made by an [artisan] from [flour] and [water].//Used to make [bread] on the [furnace].',
            icon:[2,0,'agricultura'],
            turnToByContext:{'eat':{'health':0.05,'happiness':-0.007}, 'decay':{'dough':0.1, 'spoiled food':0.9}},
            partOf:'food',
            category:'ingredients',
        });

        new G.Res({
            name:'compost',
            desc:'[compost] is used to grow farmlands faster.',
            icon:[2,1,'agricultura'],
            turnToByContext:{/*'eat':{'health':0.0025,'happiness':-0.05},*/ 'decay':{/*'flour':0.9, 'spoiled food':0.1*/}},
            //partOf:'food',
            category:'agriculture',
        });

        new G.Res({
            name:'manure',
            desc:'[manure] is the byproduct of animal/human food consumption.',
            icon:[1,1,'agricultura'],
            turnToByContext:{/*'eat':{'health':0.0025,'happiness':-0.05},*/ 'decay':{'compost':0.7}},
            //partOf:'food',
            category:'agriculture',
        });

        ///Dough recipe
        //Adds the new mode
        G.getDict('artisan').modes['dough']= {
            name:'Make dough', 
            desc:'Turn 3 [flour] and 2 [water]s into 4 [dough].', 
            icon:[2,0,'agricultura'],
            req:{}, 
            use:{'knapped tools':1}
        };
        
        //Adds the recipe
        G.getDict('artisan').effects.push({
            type:'convert',
            from:{'flour':3, 'water':2}, 
            into:{'dough':4}, 
            every:3, 
            mode:'dough'
        });

        ///Bread recipe
        //Adds the new mode
        G.getDict('furnace').modes['bread']= {
            name:'Cook bread', 
            desc:'Turn 1 [dough] into a loaf of [bread].', 
            req:{}, 
            use:{'worker':1}
        };

        //Adds the recipe
        G.getDict('furnace').effects.push({
            type:'convert',
            from:{'dough':1}, 
            into:{'bread':1}, 
            every:3, 
            mode:'bread'
        });

        /* Goods */

        ///"World" generation
        G.getDict('grass').res['gather']['seed']=1.25; //Chance to gather seeds on grass
        G.getDict('grass').res['gather']['root']=1.5; //Chance to gather roots on grass
        
        G.contextNames['farming']='Farming'; //New production context (seperates the units from the others)

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
        
        //Adds the farmland, used to plant crops to produce vegetables and cereals
        new G.Unit({
            name: 'farmland',
            desc: '@A [farmland] is build to plant various crops to produce a substainable stock of food, mainly [vegetable]s and [cereal]s.',
            icon: [3,0,'agricultura'],
            cost:{'archaic building materials':100, 'stone tools':1},
            use:{'worker':1, 'land': 1},
		    upkeep:{'water':0.35},
            gizmos: true,
            modes: {
                'off': G.MODE_OFF,
                'any':{name:'Any', icon: [3,0,'agricultura'], desc:'Farm using any random [seed] or [root] you have. You may not get optimal results.', use:{'knapped tools':1}},
                'vegetables':{name:'Farm vegetables', icon:[0,1,'agricultura'], desc:'Produce [vegetable]s using [root]s.', use:{'knapped tools':1}},
                'cereals':{name:'Farm cereals', icon:[14,4], desc:'Produce [cereal]s using [seed]s.', use:{'knapped tools':1}},
            },
            effects: [
                {type:'gather', what:{'herb':5}, chance:1/3, mode:'off'},
                
                //"Any" mode ressources
                {type:'gather', what:{'vegetable':3.5, 'cereal':3.5}, mode:'any'},
                {type:'gather', what:{'seed':1.75}, chance:1/2, mode:'any'},
                {type:'gather', what:{'root':1.75}, chance:1/2, mode:'any'},
                
                //"Cereals" mode ressources
                {type:'gather', what:{'cereal':15}, mode:'cereals'},
                {type:'gather', what:{'seed':2.5}, chance:1/2, mode:'cereals'},
                
                //"Vegetables" mode ressources
                {type:'gather', what:{'vegetable':15}, mode:'vegetables'},
                {type:'gather', what:{'root':2.5}, chance:1/2, mode:'vegetables'},
                
                {type:'mult', value:1.7, req:{'harvest rituals':'on'}},
                {type:'mult', value:1.7, req:{'compost':G.getRes('compost').amount >= 10}}
            ],
            req: {'agriculture': true},
            category: 'production',
        });

        new G.Unit({
            name: 'mill',
            desc: '@A truly wonderful building used to produce [flour] from [cereal]s like wheat.',
            icon: [0,2,'agricultura'],
            cost:{'basic building materials':150, 'stone tools':10},
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
            desc:'@the power of the wheel unlocks a whole new dimension.',
            icon:[],
            cost:{'insight':10},
            req:{'tool-making':true},
            effects:[],
        });

        new G.Tech({
            name:'milling',
            desc:'@unlocks the [mill].',
            icon:[],
            cost:{'insight':10},
            req:{'wheel':true, 'building':true},
            effects:[],
        });

        new G.Tech({
            name:'agriculture',
            desc:'@unlocks [farmland]s.',
            icon:[1,2,'agricultura'],
            cost:{'insight':15},
            req:{'sedentism':true},
            effects:[],
        });

    }

});