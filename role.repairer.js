const roleRepairer = {
	/** @param {Creep} creep **/
	run: function(creep) {
		if (creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
			creep.memory.working = false;
		}
		if (!creep.memory.working && creep.store.getFreeCapacity() == 0) {
			creep.memory.working = true;
		}
		if (creep.memory.working) {
			const targets = creep.room.find(FIND_STRUCTURES, {
				filter: (object) => object.hits < object.hitsMax,
			});
			if (targets.length) {
				creep.say("repair");
				targets.sort((a, b) => a.hits - b.hits); //find lowest hit wall
				if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0], {
						visualizePathStyle: { stroke: "#ffffff" },
					});
				}
			}
		} else {
			const sources = creep.room.find(FIND_SOURCES);
			if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
				creep.moveTo(sources[1], { visualizePathStyle: { stroke: "#ffaa00" } });
			}
		}
	},
};

module.exports = roleRepairer;
