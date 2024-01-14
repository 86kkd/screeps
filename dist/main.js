var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var {creep_counter,room_targets,init_serval_workers}= require('function');

const creep_type = ["harvester","upgrader","builder"];

var spawn=Game.spawns['Spawn1'];
// TODO开采地区选择
var source_to_harvest={
    builder1_source:0
};

module.exports.loop = function () {

    var counter = creep_counter.count();
//    console.log(counter.harvester+'counter.harvester');
    console.log(spawn.room.controller);
    init_serval_workers(spawn,counter);
    for(var name in Game.creeps) {
        
        var creep = Game.creeps[name];
        if (!creep_type.includes(creep.memory.role)){
            console.log(creep.memory.role + " is not in creep_type")
        }
        if(creep.memory.role == 'harvester') {
            var targets = room_targets.search(creep);
            // console.log(source_to_harvest.builder1_source);
            roleHarvester.run(creep,
                targets.source_target[source_to_harvest.builder1_source]);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}
