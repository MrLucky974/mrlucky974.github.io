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

        new G.Res({
            name:'medicine',
            desc:'[medicine] helps to heal the [sick] and the [wounded].',
            icon:[],
            //turnToByContext:{'decay':{'medicine':0.3,}},
            //partOf:'food',
            category:'food',
        });

        new G.Unit({
            name:'shaman',
            desc:'@uses [medicine]s to heal the [sick] and the [wounded] with a greater success rate than the [healer]<>Produce [medicine] by combining [herb]s secret powers and the magic of spirits.<>The [shaman] knows the secrets of special plants that make illness stay away by transforming them.',
            icon:[23,3],
            cost:{},
            use:{'worker':1},
            staff:{'knapped tools':1},
            upkeep:{'coin':0.2},
            gizmos: true,
            modes: {
                'heal':{name:'Heal', icon:[], desc:''},
                'medicine':{name:'Make medicine', icon:[3,5], desc:''},
            },
            effects:[
                {type:'convert', from:{'sick':1,'medicine':2.5, 'spirituality':1}, into:{'adult':1}, chance:1/2, every:1.5, mode:'heal'},
                {type:'convert', from:{'wounded':1, 'medicine':2.5, 'spirituality':1}, into:{'adult':1}, chance:1/3, every:5, mode:'heal'},
                {type:'convert', from:{'water':3, 'herb':10}, into:{'medicine':7}, every:3, mode:'medicine'},
            ],
            req:{'healing':true, 'ritualism':true},
            category:'spiritual',
            priority:5,
        });

    }

});