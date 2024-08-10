const TAG = "RECYCLER :";
const roleRecycler = {
    run_to_another_room: function (room_name) {
        room = Game.room[room_name];
        const exitDir = creep.room.findExitTo(room);
        const exit = creep.pos.findClosestByRange(exitDir);
        creep.moveTo(exit);
    },

    /** @param {Creep} creep **/
    run: function (creep, source_targets) {
        // act as a harvester
        if (creep.store[RESOURCE_ENERGY] == 0 && creep.memory.trans) {
            creep.memory.trans = false;
        }

        creep.say("recycleing");
        if (
            creep.store.getFreeCapacity() > 0
        ) {
            console.log(TAG + "recycler droped resources:" + source_targets);
            console.log(
                TAG +
                    "resources in range:" +
                    (creep.withdraw(source_targets, RESOURCE_ENERGY) + " or " +
                        (creep.pickup(source_targets, RESOURCE_ENERGY))),
            );
            if (
                creep.withdraw(source_targets, RESOURCE_ENERGY) ==
                    ERR_NOT_IN_RANGE ||
                creep.pickup(source_targets, RESOURCE_ENERGY) ==
                    ERR_NOT_IN_RANGE
            ) {
                creep.moveTo(source_targets, {
                    visualizePathStyle: { stroke: "#ffaa00" },
                });
            }
        } else {
            const targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ((
                        structure.structureType == STRUCTURE_CONTAINER ||
                        structure.structureType == STRUCTURE_STORAGE ||
                        structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN
                    ) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0) ||
                        (structure.structureType == STRUCTURE_TOWER &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) >
                                200);
                },
            });
            if (targets) {
                creep.memory.trans = true;
                if (
                    creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE
                ) {
                    creep.moveTo(targets, {
                        visualizePathStyle: { stroke: "#ffffff" },
                    });
                }
            }
        }
    },
};
module.exports = roleRecycler;
