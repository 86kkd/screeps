const roleRecycler = {
    run_to_another_room: function (room_name) {
        room = Game.room[room_name];
        const exitDir = creep.room.findExitTo(room);
        const exit = creep.pos.findClosestByRange(exitDir);
        creep.moveTo(exit);
    },

    /** @param {Creep} creep **/
    run: function (creep, store_filter) {
        // act as a harvester
        if (creep.store[RESOURCE_ENERGY] == 0 && creep.memory.trans) {
            creep.memory.trans = false;
        }

        // const source_targets = creep.room.find(FIND_TOMBSTONES, {
        //     filter: (structure) => {
        //         console.log("rest energey:" + structure.store[RESOURCE_ENERGY]);
        //         return structure.store[RESOURCE_ENERGY] > 0;
        //     },
        // });
        const source_targets = creep.room.find(FIND_RUINS, {
            filter: (structure) => {
                console.log("rest energey:" + structure.store[RESOURCE_ENERGY]);
                return structure.store[RESOURCE_ENERGY] > 0;
            },
        });
        if (
            creep.store.getFreeCapacity() > 0 && !creep.memory.trans &&
            source_targets.length
        ) {
            console.log("droped resources:" + source_targets);
            console.log(
                "resources in range:" +
                    (creep.withdraw(source_targets[0], RESOURCE_ENERGY)),
            );
            if (
                creep.withdraw(source_targets[0], RESOURCE_ENERGY) ==
                    ERR_NOT_IN_RANGE
            ) {
                creep.moveTo(source_targets[0], {
                    visualizePathStyle: { stroke: "#ffaa00" },
                });
            }
        } else {
            const targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return store_filter(structure);
                },
            });
            console.log(targets);
            if (targets) {
                creep.memory.trans = true;
                if (
                    creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE
                ) {
                    creep.say("harvester");
                    creep.moveTo(targets, {
                        visualizePathStyle: { stroke: "#ffffff" },
                    });
                }
            }
        }
    },
};
module.exports = roleRecycler;
