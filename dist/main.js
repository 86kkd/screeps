var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var creep_counter = require('function')
const creep_type = ["harvester","upgrader","builder"];

var spawn=Game.spawns['Spawn1'];
// TODO开采地区选择


module.exports.loop = function () {

    var counter = creep_counter.count();
//    console.log(counter.harvester+'counter.harvester');
    if(counter.harvester<3){
        spawn.spawnCreep( [WORK,WORK,CARRY,MOVE],'Harvester'
        +(counter.harvester+1), { memory: { role: 'harvester' } } );
    }
    else if(counter.upgrader<3){
        spawn.spawnCreep( [WORK,WORK,CARRY,MOVE],'Upgrader'
        +(counter.upgrader+1),{memory:{role:'upgrader'}});
    }
    else if(counter.builder<5||spawn.store.getFreeCapacity()){
        spawn.spawnCreep( [WORK,WORK,CARRY,MOVE],'Builder'
        +(counter.builder+1),{memory:{role:'builder'}});
        // console.log('spawnCreep signal '+success);
    }
    for(var name in Game.creeps) {
        
        var creep = Game.creeps[name];
        if (!creep_type.includes(creep.memory.role)){
            console.log(creep.memory.role + " is not in creep_type")
        }
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}
