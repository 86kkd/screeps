"use strict";
const roleHarvester = require("role.harvester");
const roleUpgrader = require("role.upgrader");
const roleBuilder = require("role.builder");
const roleTower = require("role.tower");
const roleRecycler = require("role.recycler");
const roleTransfer = require("role.transfer");
const roleRepairer = require("role.repairer");
const roleRemoteTranfer = require("role.remoteharvester");
const rolePuller = require("role.puller");

const TAG = "HR_SERVICE_CENTER :";
class HRSC {
    static get_instance() {
        if (!HRSC.instance) {
            HRSC.instance = new HRSC();
        }

        return HRSC.instance;
    }
    /**
     * @function constructer initialize the creep_type
     */
    constructor() {
    }

    /**
     * @function run the main loop
     */
    run() {
        const spawn_name = "Spawn1";

        const spawn = Game.spawns[spawn_name];
        const room = spawn.room;
        const ctl_level = room.controller.level;
        const energy_available = room.energyAvailable;
        const energy_capacity = room.energyCapacityAvailable;

        const construct_set = room.find(FIND_CONSTRUCTION_SITES);
        const room_source = room.find(FIND_SOURCES, {
            filter: (source) => {
                return (source.energy > 0);
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

        console.log(TAG + "Game controller level:" + ctl_level);
        console.log(TAG + spawn_name + " energy_availble:" + energy_available);
        console.log(TAG + spawn_name + " energy_max:" + energy_capacity);

        const tower = room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_TOWER);
            },
        });

        for (let i = 0; i < tower.length; i++) {
            const tower_id = tower[i].id;
            roleTower.run(tower_id);
        }

        for (const creep in Memory.creeps) {
            if (
                !Object.keys(Game.creeps).includes(creep)
                // !Game.creeps[creep].spawning
            ) {
                delete Memory.creeps[creep];
                console.log(
                    TAG +
                    `Info delete unused Mesory(${creep})`,
                );
            }
        }

        for (const name in Game.creeps) {
            const creep = Game.creeps[name];
            if (creep.memory.role == "harvester") {
                if (global_store_struct.length) {
                    roleHarvester.run(creep, room_source[0], store_filter);
                } else if (construct_set.length) {
                    roleBuilder.run(creep, room_source[0]);
                } else {
                    roleUpgrader.run(creep, room_source[0]);
                }
            }
            if (creep.memory.role == "upgrader") {
                roleUpgrader.run(creep, room_source[0]);
            }
            if (creep.memory.role == "recycler") {
                creep.say("♵");
                const room_resources = room.find(FIND_DROPPED_RESOURCES, {
                    filter: (source) => {
                        return (source.amount > 10);
                    },
                });
                const room_tombstones = room.find(FIND_TOMBSTONES, {
                    filter: (structure) => {
                        return structure.store[RESOURCE_ENERGY] > 0;
                    },
                });
                const room_ruins = room.find(FIND_RUINS, {
                    filter: (structure) => {
                        return structure.store[RESOURCE_ENERGY] > 0;
                    },
                });

                if (room_resources.length) {
                    roleRecycler.run(creep, room_resources[0]);
                } else if (room_ruins.length) {
                    roleRecycler.run(creep, room_ruins[0]);
                } else if (room_tombstones.length) {
                    roleRecycler.run(creep, room_tombstones[0]);
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
            if (creep.memory.role == "transfer") {
                const source_t_unsort = creep.room.find(FIND_STRUCTURES, {
                    filter: (constructor) => {
                        return constructor.structureType ===
                            STRUCTURE_CONTAINER &&
                            constructor.store[RESOURCE_ENERGY] > 0;
                    },
                });
                source_t_unsort.sort((a, b) => {
                    return b.store[RESOURCE_ENERGY] - a.store[RESOURCE_ENERGY];
                });

                let source_t;
                if (source_t_unsort.length) {
                    source_t = source_t_unsort[0];
                } else if (
                    creep.room.find(FIND_STRUCTURES, {
                        filter: (constructor) => {
                            return (constructor.structureType ==
                                STRUCTURE_SPAWN ||
                                constructor.structureType ==
                                STRUCTURE_EXTENSION) &&
                                constructor.store.getFreeCapacity(
                                    RESOURCE_ENERGY,
                                ) > 0;
                        },
                    }).length
                ) {
                    source_t = creep.room.find(FIND_STRUCTURES, {
                        filter: (constructor) => {
                            return constructor.structureType ==
                                STRUCTURE_STORAGE &&
                                constructor.store[RESOURCE_ENERGY] > 0;
                        },
                    })[0];
                    if (!source_t) {
                        source_t = creep.room.find(FIND_STRUCTURES, {
                            filter: (constructor) => {
                                return constructor.structureType ==
                                    STRUCTURE_CONTAINER &&
                                    constructor.store[RESOURCE_ENERGY] > 0;
                            },
                        })[0];
                    }
                }

                const target_t = creep.room.find(FIND_STRUCTURES, {
                    filter: (constructor) => {
                        return ((constructor.structureType ==
                            STRUCTURE_EXTENSION ||
                            constructor.structureType == STRUCTURE_SPAWN ||
                            constructor.structureType == STRUCTURE_NUKER ||
                            constructor.structureType == STRUCTURE_STORAGE) &&
                            constructor.store.getFreeCapacity(RESOURCE_ENERGY) >
                            0) ||
                            (constructor.structureType == STRUCTURE_TOWER &&
                                constructor.store.getFreeCapacity(
                                    RESOURCE_ENERGY,
                                ) > 200);
                    },
                }).sort((a, b) =>
                    a.store[RESOURCE_ENERGY] - b.store[RESOURCE_ENERGY]
                )[0];

                if (
                    target_t.structureType != STRUCTURE_SPAWN ||
                    target_t.structureType != STRUCTURE_EXTENSION
                ) {
                    const target_t_important = creep.pos.findClosestByPath(
                        FIND_STRUCTURES,
                        {
                            filter: (constructor) => {
                                return (constructor.structureType ==
                                    STRUCTURE_EXTENSION ||
                                    constructor.structureType ==
                                    STRUCTURE_SPAWN) &&
                                    constructor.store.getFreeCapacity(
                                        RESOURCE_ENERGY,
                                    ) >
                                    0;
                            },
                        },
                    );
                    if (target_t_important) {
                        roleTransfer.run(creep, source_t, target_t_important);
                    } else roleTransfer.run(creep, source_t, target_t);
                } else roleTransfer.run(creep, source_t, target_t);
            }

            if (
                creep.memory.role == "remote_harvester" ||
                creep.memory.role == "remote_harvester2"
            ) {
                roleRemoteTranfer.run(creep);
            }
            if (creep.memory.role == "puller") {
                rolePuller.run(creep);
            }

            if (creep.ticksToLive == 0) {
                delete Memory.creeps[name];
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
