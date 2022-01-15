G.AddData({
    name:'Philosophers',
    author:'Luckius_',
    desc:'Adds a new unit (philosopher) and new ressources concerning insight and culture. Based on the Thot mod created by "fancy and torcado" and fixed by "pelletsstarPL".',
    engineVersion:1,
    manifest: 0,
    requires:['Default dataset*'],
    sheets:{
        
    },

    func:function() {

        new G.Unit({
            name:'philosopher',
            desc:'@generates [insight] a lot more frequently than a [dreamer]<>The [philosopher] is a [culture, cultured] being that spends their time observing, thinking, and wondering why things are the way they are.',
            icon:[10,5],
            cost:{'food':25},
            use:{'worker':1},
            upkeep:{'culture':0.2},
            effects:[
                {type:'gather', what:{'insight':0.35}},
                {type:'gather', what:{'insight':0.2625}, req:{'cultivation':true}},
                {type:'mult',value:1.2, req:{'wisdom rituals':'on'}}
            ],
            req:{'symbolism':true},
            category:'discovery',
            //priority:5,
            limitPer:{'population':100},
        });

        new G.Tech({
            name:'cultivation',
            desc:'@[philosopher]s produce 75% more [insight].@provides 50 [inspiration].<>Thoughts are shared, and the [population] becomes more and more cultured as they learn to think as a society.',
            icon:[6,5],
            cost:{'culture':10,'insight':20},
            req:{'symbolism':true},
            effects:[
                {type:'provide res',what:{'inspiration':50}},
            ],
        });

    }

});