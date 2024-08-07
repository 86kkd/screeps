const roleHarvester = require("role.harvester");
const roleUpgrader = require("role.upgrader");
const roleBuilder = require("role.builder");
const roleTower = require("role.tower");
const roleRecycler = require("role.recycler");

const TAG = "HR_SERVICE_CENTER :";
class HRSC {
    /**
     * @function constructer initialize the creep_type
     */
    constructor() {
        // this.source_id = ["26f20772347f879", "71ac0772347ffe6"];
        this.creep_type = ["harvester", "upgrader", "builder", "recycler"];
    }

    /**
     * @function run the main loop
     */
    run() {
        const spawn_name = "Spawn1";

        const spawn = Game.spawns[spawn_name];
        const room = spawn.room;
        const ctl_level = room.controller.level;
        const energy_avail = room.energyAvailable;
        const energy_max = room.energyCapacityAvailable;

        const construct_set = room.find(FIND_CONSTRUCTION_SITES);
        const room_source = room.find(FIND_SOURCES, {
            filter: (source) => {
                return (source.energy > 0);
            },
        });
        // const room_source = room.find(FIND_STRUCTURES, {
        //     filter: (structure) => {
        //         return ((
        //             structure.structureType == STRUCTURE_CONTAINER ||
        //             structure.structureType == STRUCTURE_STORAGE
        //         ) &&
        //             structure.store[RESOURCE_ENERGY] > 0);
        //     },
        // });

        const tower = room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_TOWER);
            },
        });
        const store_filter = (structure) => {
            return ((structure.structureType == STRUCTURE_EXTENSION ||
                structure.structureType == STRUCTURE_SPAWN) &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0) ||
                (structure.structureType == STRUCTURE_TOWER &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) >
                        200);
        };
        const global_store_struct = room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return store_filter(structure);
            },
        });
        const room_resources = room.find(FIND_DROPPED_RESOURCES, {
            filter: (source) => {
                console.log(TAG + "resources rest energy:", source.energy);
                return (source.energy > 0);
            },
        });
        const room_tombstones = room.find(FIND_TOMBSTONES, {
            filter: (structure) => {
                console.log(
                    TAG +
                        "tombstones rest energy:" +
                        structure.store[RESOURCE_ENERGY],
                );
                return structure.store[RESOURCE_ENERGY] > 0;
            },
        });
        const room_ruins = room.find(FIND_RUINS, {
            filter: (structure) => {
                console.log(
                    TAG +
                        "ruins rest energey:" +
                        structure.store[RESOURCE_ENERGY],
                );
                return structure.store[RESOURCE_ENERGY] > 0;
            },
        });

        // const container = Game.getObjectById("24793b8a1f269af");
        // console.log(
        //     TAG + "container free:" + container.store.getFreeCapacity(),
        // );

        console.log(TAG + "Game controller level:" + ctl_level);
        console.log(TAG + spawn_name + " energy_availble:" + energy_avail);
        console.log(TAG + spawn_name + " energy_max:" + energy_max);

        // for (let i = 0; i < room_source.length; i++) {
        //     const id = room_source[i].id;
        //     const Source = Game.getObjectById(id);
        //     const last_energy = Source.energy;
        //     console.log("source_" + id + " energy:" + last_energy);
        // }

        for (let i = 0; i < tower.length; i++) {
            const tower_id = tower[i].id;
            roleTower.run(tower_id);
        }

        for (const name in Game.creeps) {
            const creep = Game.creeps[name];
            // console.log(TAG + "creep fatigue:" + creep.fatigue);
            if (!this.creep_type.includes(creep.memory.role)) {
                console.log(TAG + creep.memory.role + " is not in creep_type");
            }
            if (creep.memory.role == "harvester") {
                if (global_store_struct.length) {
                    roleHarvester.run(creep, room_source[0], store_filter);
                } else if (construct_set.length) {
                    roleBuilder.run(creep, room_source[0]);
                } else {
                    roleUpgrader.run(creep, room_resources[0]);
                }
            }
            if (creep.memory.role == "upgrader") {
                roleUpgrader.run(creep, room_source[0]);
            }
            if (creep.memory.role == "recycler") {
                creep.say("recycler");
                if (room_resources.length) {
                    roleRecycler.run(creep, room_resources[0]);
                } else if (room_ruins.length) {
                    roleRecycler.run(creep, room_ruins[0]);
                } else if (room_tombstones.length) {
                    roleRecycler.run(creep, room_tombstones[0]);
                } else if (global_store_struct.length) {
                    roleHarvester.run(creep, room_source[0], store_filter);
                } else if (construct_set.length) {
                    roleBuilder.run(creep, room_source[0]);
                } else {
                    roleUpgrader.run(creep, room_source[0]);
                }
            }
            if (creep.memory.role == "builder") {
                if (construct_set.length) {
                    roleBuilder.run(creep, room_source[0]);
                } else {
                    roleUpgrader.run(creep, room_source[0]);
                }
            }
        }
    }
}

module.exports = {
    HRSC,
    CreateHRSC() {
        return new HRSC();
    },
};
