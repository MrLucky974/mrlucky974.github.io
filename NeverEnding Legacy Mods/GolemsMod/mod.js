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
        G.resCategories['golems'] = {
            name: 'Golems',
            base: ['clay golem', 'mud golem'],
            side: ['golems']
        };

        //Golems group
        new G.Res({
            name:'golems',
            desc:'[golems] are creatures made of inorganic materials in which life has been deposited.//They can be made of [clay] or [mud] by an [artisan].',
            //startWith:5,
            icon:[0,0],
            visible:true,
            partOf:'worker',
        });

        //Mud golem ressource
        new G.Res({
            name:'mud golem',
            desc:'[mud golem, Golems] made from [mud].//[mud golem, Golems] make an addition to your [worker,Workforce].//[mud golem, Golems] dies after a certain amount of time.',
            //startWith:5,
            visible:false,
            partOf:'golems',
            //category:'golems',
            icon:[0,0],
            tick:function(me,tick)
		    {  
                if (me.amount>0)
			    {
                    if (tick%1==0) 
                    {
                        var toRemove = [];

                        for (let golemId = 0; golemId < GM.golems.length; golemId++) {
                            const golem = GM.golems[golemId];

                            if (golem != undefined)
                            {
                                if (golem.type == 'mud')
                                {
                                    golem.lifetime+=Math.random() * 2;

                                    if (golem.lifetime >= golem.maxLife) 
                                    {
                                        G.lose(me.name, 1, 'golem death');
                                        toRemove.push(golemId);
                                    }
                                }
                            }
                        }

                        for (let i = 0; i < toRemove.length; i++) {
                            const id = toRemove[i];
                            delete GM.golems[id];
                        }
                    }
                }
            }
        });

        //Clay golem ressource
        new G.Res({
            name:'clay golem',
            desc:'[clay golem, Golems] made from [clay].//[clay golem, Golems] make an addition to your [worker,Workforce].//[clay golem, Golems] dies after a certain amount of time.',
            //startWith:5,
            visible:false,
            partOf:'golems',
            //category:'golems',
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
                                if (golem.type == 'clay') //Check that the current golem is compatible
                                {
                                    golem.lifetime+=Math.random() * 2;

                                    if (golem.lifetime >= golem.maxLife) //Golem lived their life
                                    {
                                        G.lose(me.name, 1, 'golem death');
                                        toRemove.push(golemId);
                                    }
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


        ///Mod custom elements

        GM = {}; //Short term for golem mod

        GM.golems = []

        GM.getGolems=function(type) {
            var golems = [];
            GM.golems.forEach(golem => {
                if (golem.type == type) golems.push(golem);
            });
            return golems;
        }

        GM.GolemData=function(data) {
            this.type='';
            this.maxLife=0;
            this.lifetime=0.0;

            for (var i in data) this[i]=data[i];
            GM.golems.push(this);
        }

        let currentTick = 0;

        GM.update=function() {
            var mudGolemAmount = G.getRes('mud golem').amount;
            var clayGolemAmount = G.getRes('clay golem').amount;
            var golemDataLength = GM.golems.length;

            if (golemDataLength < mudGolemAmount + clayGolemAmount)
            {
                for (let i = 0; i < mudGolemAmount - GM.getGolems('mud').length; i++) {
                    new M.GolemData({
                        type:'mud',
                        maxLife:getRandomInt(year, year+10),
                    });
                };

                for (let i = 0; i < clayGolemAmount - GM.getGolems('clay').length; i++) {
                    new M.GolemData({
                        type:'clay',
                        maxLife:getRandomInt(year/2, (year/2) + 10),
                    });
                };
            }

            currentTick++;
        }

        setInterval(GM.update, 1); //Loop update every 1 ms

    }

});