var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var {creep_counter,room_targets,init_serval_workers,group,sys_log}= require('function');
var roleTower = require('role.tower');
const creep_type = ["harvester","upgrader","builder"];

var spawn=Game.spawns['Spawn1'];
// TODO开采地区选择
var source_to_harvest={
    builder1_source:1
};
// tower_ids
var tower_ids = {
tower1:"65a46e27f7c07dfd1c571830"
};

//TODO rewrite creep_counter and finish group
//TODO if no source get another source
//TODO leve 1 and level 2
//Game.spawns['Spawn1'].room.controller.activateSafeMode(); most important
// construct preority

// Game.spawns['Spawn1'].room.createConstructionSite( 23, 22, STRUCTURE_TOWER ); 

module.exports.loop = function () {

    var counter = creep_counter.count();
//    sys_log(counter.harvester+'counter.harvester');
    sys_log(spawn.room.controller.level);
    init_serval_workers(spawn,counter);
    
    roleTower.run(tower_ids.tower1);

    for(var name in Game.creeps) {
        
        var creep = Game.creeps[name];
        if (!creep_type.includes(creep.memory.role)){
            sys_log(creep.memory.role + " is not in creep_type")
        }
        if(creep.memory.role == 'harvester') {
            var targets = room_targets.search(creep);
            // sys_log(source_to_harvest.builder1_source);
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