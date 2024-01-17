var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var {creep_counter,room_targets: room_targets_ctl,
    init_serval_workers,sys_log}= require('function');
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
//TODO source target ctl center
//TODO Game.spawns['Spawn1'].room.controller.activateSafeMode(); most important
//TODO construct preority
//TODO defain constract center
//TODO tombstone recycle
//注释

// Game.spawns['Spawn1'].room.createConstructionSite( 23, 22, STRUCTURE_TOWER ); 
var stage_ploy = {
    test : "test",
    ploy:[
        {   
            worker_body:[
                WORK,WORK,
                CARRY,
                MOVE],
            num_harvester:6,
            num_upgrader:6,
            num_builder:4
        },
        {
            worker_body:[
                WORK,WORK,WORK,
                CARRY,CARRY,
                MOVE,MOVE,MOVE],
            num_harvester:4,
            num_upgrader:3,
            num_builder:1
        },
        {
            worker_body:[
                WORK,WORK,WORK,WORK,
                CARRY,CARRY,CARRY,CARRY,
                MOVE,MOVE,MOVE,MOVE],
            num_harvester:4,
            num_upgrader:3,
            num_builder:1
        },
        {
            worker_body:[
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY,CARRY,CARRY,CARRY,CARRY,
                MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
            num_harvester:4,
            num_upgrader:5,
            num_builder:2
        },
        {
            worker_body:[
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY,CARRY,CARRY,CARRY,CARRY,
                MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
            num_harvester:4,
            num_upgrader:4,
            num_builder:2
        
        },
        {
            worker_body:[
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
            num_harvester:4,
            num_upgrader:4,
            num_builder:2
         
        }, 
        {
            worker_body:[
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
            num_harvester:4,
            num_upgrader:4,
            num_builder:2

        },
        {
            worker_body:[
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
            num_harvester:4,
            num_upgrader:4,
            num_builder:2     
        },
     ],
    choise:function(room_level)  {
       return this.ploy[room_level-1]
    }
}


module.exports.loop = function () {

    var counter = creep_counter.count();
//    sys_log(counter.harvester+'counter.harvester');
    var room_level = spawn.room.controller.level;
    sys_log("roomlevel"+room_level);
    init_serval_workers(spawn,counter,
        stage_ploy.choise(room_level));
    
    roleTower.run(tower_ids.tower1);

    for(var name in Game.creeps) {
        
        var creep = Game.creeps[name];
        if (!creep_type.includes(creep.memory.role)){
            sys_log(creep.memory.role + " is not in creep_type")
        }
        if(creep.memory.role == 'harvester') {
            var targets = room_targets_ctl.search(creep);
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