var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var {creep_counter,room_targets: room_targets_ctl,
    init_serval_workers,sys_log}= require('function');
var roleTower = require('role.tower');
const { CreateHRSC } = require('./HR_Service_Center');

var spawn=Game.spawns['Spawn1'];
// TODO开采地区选择
var source_to_harvest = {
    builder1_source: 1,
};
// tower_ids
var tower_ids = {
    tower1: "6cf4753c8d85837",
};
require("HR_Service_Center");

//TODO rewrite creep_counter and finish group
//TODO source target ctl center
//TODO Game.spawns['Spawn1'].room.controller.activateSafeMode(); most important
//TODO construct preority
//TODO defain constract center
//TODO tombstone recycle
//注释

// Game.spawns['Spawn1'].room.createConstructionSite( 23, 22, STRUCTURE_TOWER );
var stage_ploy = {
    test: "test",
    ploy: [
        {
            worker_body: [
                WORK,
                WORK,
                CARRY,
                MOVE,
            ],
            num_harvester: 6,
            num_upgrader: 6,
            num_builder: 4,
            level: 1,
        },
        {
            worker_body: [
                WORK,
                WORK,
                WORK,
                CARRY,
                CARRY,
                MOVE,
                MOVE,
                MOVE,
            ],
            num_harvester: 4,
            num_upgrader: 5,
            num_builder: 1,
            level: 2,
        },
        {
            worker_body: [
                WORK,
                WORK,
                WORK,
                WORK,
                CARRY,
                CARRY,
                CARRY,
                CARRY,
                MOVE,
                MOVE,
                MOVE,
                MOVE,
            ],
            num_harvester: 4,
            num_upgrader: 6,
            num_builder: 1,
            level: 3,
        },
        {
            worker_body: [
                WORK,
                WORK,
                WORK,
                WORK,
                WORK,
                WORK,
                WORK,
                CARRY,
                CARRY,
                CARRY,
                CARRY,
                CARRY,
                MOVE,
                MOVE,
                MOVE,
                MOVE,
                MOVE,
                MOVE,
                MOVE,
            ],
            num_harvester: 2,
            num_upgrader: 3,
            num_builder: 1,
            level: 4,
        },
        {
            worker_body: [
                WORK,
                WORK,
                WORK,
                WORK,
                WORK,
                WORK,
                WORK,
                CARRY,
                CARRY,
                CARRY,
                CARRY,
                CARRY,
                MOVE,
                MOVE,
                MOVE,
                MOVE,
                MOVE,
                MOVE,
                MOVE,
            ],
            num_harvester: 4,
            num_upgrader: 4,
            num_builder: 2,
            level: 5,
        },
        {
            worker_body: [
                WORK,
                WORK,
                WORK,
                WORK,
                WORK,
                WORK,
                WORK,
                WORK,
                CARRY,
                CARRY,
                CARRY,
                CARRY,
                CARRY,
                CARRY,
                CARRY,
                MOVE,
                MOVE,
                MOVE,
                MOVE,
                MOVE,
                MOVE,
                MOVE,
                MOVE,
            ],
            num_harvester: 4,
            num_upgrader: 4,
            num_builder: 2,
            level: 6,
        },
        {
            worker_body: [
                WORK,
                WORK,
                WORK,
                WORK,
                WORK,
                WORK,
                WORK,
                WORK,
                WORK,
                CARRY,
                CARRY,
                CARRY,
                CARRY,
                CARRY,
                CARRY,
                CARRY,
                CARRY,
                CARRY,
                MOVE,
                MOVE,
                MOVE,
                MOVE,
                MOVE,
                MOVE,
                MOVE,
                MOVE,
                MOVE,
            ],
            num_harvester: 4,
            num_upgrader: 4,
            num_builder: 2,
            level: 7,
        },
        {
            worker_body: [
                WORK,
                WORK,
                WORK,
                WORK,
                WORK,
                WORK,
                WORK,
                WORK,
                WORK,
                WORK,
                CARRY,
                CARRY,
                CARRY,
                CARRY,
                CARRY,
                CARRY,
                CARRY,
                CARRY,
                CARRY,
                CARRY,
                MOVE,
                MOVE,
                MOVE,
                MOVE,
                MOVE,
                MOVE,
                MOVE,
                MOVE,
                MOVE,
                MOVE,
                MOVE,
            ],
            num_harvester: 4,
            num_upgrader: 4,
            num_builder: 2,
            level: 8,
        },
    ],
    choise: function (room_level) {
        return this.ploy[room_level - 1];
    },
};

module.exports.loop = function () {
    var counter = new creep_counter.count();
    // sys_log(`counter success ${counter.count()}`);j
    //    sys_log(counter.harvester+'counter.harvester');
    var room_level = spawn.room.controller.level;
    sys_log("roomlevel" + room_level);
    init_serval_workers(spawn, counter, stage_ploy.choise(1));

    roleTower.run(tower_ids.tower1);
    const HR_Service_Center = CreateHRSC();
    sys_log(`HR_Service_Center ${HR_Service_Center.creep_type}`);
    HR_Service_Center.run();
};
