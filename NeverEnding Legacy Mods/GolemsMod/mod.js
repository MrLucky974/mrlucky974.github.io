function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

G.AddData({
    name:'Golems',
    author:'Luckius_',
    desc:'A mod that adds the golem, new workers.',
    engineVersion:1,
    manifest: 0,
    requires:['Default dataset*'],
    sheets:{
        
    },

    func:function() {

        G.resCategories['golems'] = {
            name: 'Golems',
            base: [],
            side: []
        };

        M = {}; //Short term for mod

        M.golems = []

        M.GolemData=function(maxLife) {
            this.maxLife = maxLife;
            this.lifetime=0;
            M.golems.push(this);
        }

        new G.Res({
            name:'mud golem',
            desc:'[mud golem, Golems] made from mud.//[mud golem, Golems] make are an addition to your [worker,workforce].//Dies after 1 year (365 days).',
            //startWith:5,
            visible:true,
            partOf:'worker',
            category:'golems',
            icon:[0,0],
            tick:function(me,tick)
		    {  
                if (me.amount>0)
			    {
                    if (tick%1==0) 
                    {
                        var golemAmount = M.golems.length;
                        if (golemAmount < me.amount)
                        {
                            new M.GolemData(20);
                        }

                        for (let golemId = 0; golemId < golemAmount; golemId++) {
                            const golem = M.golems[golemId];
                            M.golems[golemId].lifetime += 1;

                            if (golem.lifetime >= golem.maxLife) 
                            {
                                G.lose(me.name, 1, 'golem death');
                                delete M.golems[golemId];
                            }
                        }
                    }
                }
            }
        });

    }

});