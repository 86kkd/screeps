const roleHarvester = {
    run_to_another_room: function (room_name) {
        room = Game.room[room_name];
        const exitDir = creep.room.findExitTo(room);
        const exit = creep.pos.findClosestByRange(exitDir);
        creep.moveTo(exit);
    },

    /** @param {Creep} creep **/
    run: function (creep, source_targets) {
        // act as a harvester
        // creep.say("🔄 harvest");
        if (creep.store[RESOURCE_ENERGY] == 0 && creep.memory.trans) {
            creep.memory.trans = false;
        }

        if (
            creep.store.getFreeCapacity() > 0 && !creep.memory.trans
        ) {
            if (creep.harvest(source_targets) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source_targets, {
                    visualizePathStyle: { stroke: "#ffaa00" },
                });
            }
        } else {
            const targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
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

module.exports = roleHarvester;
