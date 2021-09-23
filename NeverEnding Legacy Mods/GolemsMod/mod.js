function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

const year = 365;

G.AddData({
    name:'Golems',
    author:'Luckius_',
    desc:'A mod that adds the golem.',
    engineVersion:1,
    manifest: 0,
    requires:['Default dataset*'],
    sheets:{
        
    },

    func:function() {

        //Golems category
        G.resCategories['creatures'] = {
            name: 'Creatures',
            base: ['golem'],
            side: []
        };

        //Mud golem ressource
        new G.Res({
            name:'golem',
            desc:'[golem] made from [mud] or [clay].//[mud golem] make an addition to your [worker,Workforce].//[golem] dies after a certain amount of time.',
            //startWith:5,
            //visible:true,
            partOf:'worker',
            //category:'creatures',
            icon:[0,0],
            tick:function(me,tick)
		    {  
                if (me.amount>0)
			    {
                    if (tick%1==0) //Every second
                    {
                        var toRemove = [];

                        for (let golemId = 0; golemId < GM.golems.length; golemId++) {
                            const golem = GM.golems[golemId];

                            if (golem != undefined) //Counter an error
                            {
                                golem.lifetime+=Math.random() * 2;

                                if (golem.lifetime >= golem.maxLife) //Golem lived their life
                                {
                                    G.lose(me.name, 1, 'golem death');
                                    toRemove.push(golemId);
                                }
                            }
                        }

                        for (let i = 0; i < toRemove.length; i++) {
                            const id = toRemove[i]; //Remove the data from the list
                            delete GM.golems[id];
                        }
                    }
                }
            }
        });

        G.getDict('artisan').modes['mud golem']={
            name:'Make hot sauce',
            desc:'10 [mud] into 1 [golem].',
            //req:{'hot sauce preparing':true},
            use:{'knapped tools':1}
        };

        G.getDict('artisan').modes['clay golem']={
            name:'Make hot sauce',
            desc:'20 [mud] into 1 [golem].',
            //req:{'hot sauce preparing':true},
            use:{'knapped tools':1}
        };

        G.getDict('artisan').effects.push({
            type:'convert',
            from:{'mud':10},
            into:{'golem':1},
            every:20,
            mode:'mud golem'
        });

        G.getDict('artisan').effects.push({
            type:'convert',
            from:{'clay':20},
            into:{'golem':1},
            every:10,
            mode:'clay golem'
        });

        ///Mod custom elements

        GM = {}; //Short term for golem mod

        GM.golems = [];

        GM.GolemData=function(data) {
            this.maxLife=0;
            this.lifetime=0.0;

            for (var i in data) this[i]=data[i];
            GM.golems.push(this);
        }

        GM.update=function() {
            var golemAmount = G.getRes('golem').amount;
            var golemDataLength = GM.golems.length;

            if (golemDataLength < golemAmount)
            {
                for (let i = 0; i < golemAmount - GM.golems.length; i++) {
                    new GM.GolemData({
                        maxLife:getRandomInt(year/2, year),
                    });
                }
            }
        }

        setInterval(GM.update, 10); //Loop update every 10 ms
    }

});