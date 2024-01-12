var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
const creep_type = ["harvester","upgrader","builder"];

var spawn=Game.spawns['Spawn1'];
// TODO开采地区选择

function count_num_creeps(){
    var num_creeps = {
        harvester: 0,
        upgrader: 0,
        builder: 0
      };
    for(var name in Game.creeps){
        if(name.includes('Harvester'))num_creeps.harvester+=1;
        else if(name.includes('Upgrader'))num_creeps.upgrader+=1;
        else if(name.includes('Builder'))num_creeps.builder+=1;
    }
    return num_creeps;
}
module.exports.loop = function () {

    var num_creeps = count_num_creeps();
    
    if(num_creeps.harvester<3){
        spawn.spawnCreep( [WORK,WORK,CARRY,MOVE],'Harvester'+(num_creeps.harvester+1), { memory: { role: 'harvester' } } );
    }
    else if(num_creeps.upgrader<3){
        spawn.spawnCreep( [WORK,WORK,CARRY,MOVE],'Upgrader'+(num_creeps.upgrader+1),{memory:{role:'upgrader'}});
    }
    else if(num_creeps.builder<5||spawn.store.getFreeCapacity()){
        spawn.spawnCreep( [WORK,WORK,CARRY,MOVE],'Builder'+(num_creeps.builder+1),{memory:{role:'builder'}});
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