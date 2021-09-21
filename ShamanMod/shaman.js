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
                'heal':{name:'Heal', icon:[], desc:'Heal the [sick] and the [wounded] with [medicine] and 1 [insight].'},
                'medicine':{name:'Make medicine', icon:[3,5], desc:'Produce 7 [medicine] from 3 [water] and 10 [herb]s.'},
                'youth':{name:'Cure elders', icon:[4,3], desc:'The [shaman] have a very small chance to cure [elder]s, them becoming [adult]s again.<>Use 20 [medicine], 1 [insight] & 3 [faith].'},
                'necromancy':{name:'Ressurect corpse', icon:[14,1], desc:'Using [necromancy], a [shaman] can ressurect [corpse, dead] people back to life, making a [zombie].<>Use 1 [faith].', req:{'necromancy':true}},
            },
            effects:[
                {type:'convert', from:{'sick':1, 'medicine':7, 'insight':1}, into:{'adult':1}, chance:1/2, every:1.5, mode:'heal'},
                {type:'convert', from:{'wounded':1, 'medicine':7, 'insight':1}, into:{'adult':1}, chance:1/3, every:5, mode:'heal'},
                {type:'convert', from:{'water':3, 'herb':10}, into:{'medicine':7}, every:3, mode:'medicine'},
                {type:'convert', from:{'elder':1, 'medicine':20, 'insight':1, 'faith':3}, into:{'adult':1}, chance:1/7, every:10, mode:'youth'},
                {type:'convert', from:{'corpse':1, 'faith':1}, into:{'zombie':1}, chance:1/4, every:10, mode:'necromancy'},
            ],
            req:{'healing':true, 'ritualism':true},
            category:'spiritual',
            priority:5,
        });

        new G.Tech({
            name:'necromancy',
            desc:'@unlocks new options for [shaman]s<>',
            icon:[14,1],
            cost:{'insight':10, 'faith':1},
            req:{'ritualism':true, 'burial':true, 'healing':true},
            effects:[
            ],
            chance:2,
        });

        new G.Res({
            name:'zombie',
            desc:'[zombie,Zombies] are [corpse]s bringed back to life by a [shaman] using [necromancy].//Zombies make are an addition to your [worker,workforce].',
            //startWith:5,
            visible:true,
            partOf:'worker',
            category:'demog',
            icon:[4,3],
            tick:function(me,tick)
		    {
                
                if (me.amount>0)
			    {
                    
                    if (tick%3==0)
				    {
                        
                        //eat food
                        var toConsume=me.amount*1;
                        var consumeMult=1;
                        toConsume=randomFloor(toConsume*consumeMult);
                        var consumed=G.lose('food',toConsume,'zombie eating');
                        G.gain('happiness', -consumed*0.5, 'zombie eating');

                        var lacking=toConsume-consumed;
                        if (lacking>0) 
                        {

                            var died = toConsume;
                            G.gain('corpse', died, 'zombie starvation');
                            G.gain('happiness',died*5,'zombie starvation');
                            G.getRes('died this year').amount+=died;
                            if (died>0) G.Message({type:'bad',mergeId:'diedStarvation',textFunc:function(args){return B(args.died)+' '+(args.died==1?'zombie':'zombies')+' died from starvation.';},args:{died:died},icon:[5,4]});
                        
                        }
                    
                    }
                
                }
            
            }
        
        });

    }

});