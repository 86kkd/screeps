const TAG = "HARVESTER :";
const roleHarvester = {
    run_to_another_room: function(room_name) {
        room = Game.room[room_name];
        const exitDir = creep.room.findExitTo(room);
        const exit = creep.pos.findClosestByRange(exitDir);
        creep.moveTo(exit);
    },

    /** @param {Creep} creep **/
    run: function(creep, source_targets, store_filter) {
        // act as a harvester
        // source_targets = "297e3b8710cc0c9";
        if (creep.store[RESOURCE_ENERGY] == 0 && creep.memory.working) {
            creep.memory.working = false;
        }

        if (
            creep.store.getFreeCapacity() > 0 && !creep.memory.working
        ) {
            if (
                creep.harvest(source_targets) == ERR_NOT_IN_RANGE ||
                creep.withdraw(source_targets) == ERR_NOT_IN_RANGE
            ) {
                creep.moveTo(source_targets, {
                    visualizePathStyle: { stroke: "#ffaa00" },
                });
            }
        } else {
            const targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return store_filter(structure);
                },
            });
            if (targets) {
                creep.memory.working = true;
                if (
                    creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE
                ) {
                    creep.say("🌾");

                    creep.moveTo(targets, {
                        visualizePathStyle: { stroke: "#ffffff" },
                    });
                }
            }
        }
    },
};

module.exports = roleHarvester;
