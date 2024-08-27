const roleUpgrader = {
  /** @param {Creep} creep **/
  run: function (creep, source) {
    if (creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
      creep.memory.working = false;
    }
    if (!creep.memory.working && creep.store.getFreeCapacity() == 0) {
      creep.memory.working = true;
    }

    if (creep.memory.working) {
      if (
        creep.upgradeController(creep.room.controller) ==
          ERR_NOT_IN_RANGE
      ) {
        creep.say("⬆️");

        creep.moveTo(creep.room.controller, {
          visualizePathStyle: { stroke: "#ffffff" },
        });
      }
    } else {
      const resources = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure) => {
          return ((
            structure.structureType == STRUCTURE_CONTAINER ||
            structure.structureType == STRUCTURE_STORAGE
          ) &&
            structure.store[RESOURCE_ENERGY] > 0);
        },
      });
      if (creep.withdraw(resources, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(resources, { visualizePathStyle: { stroke: "#ffaa00" } });
      } else if (
        creep.harvest(source) == ERR_NOT_IN_RANGE
      ) {
        creep.moveTo(source, {
          visualizePathStyle: { stroke: "#ffaa00" },
        });
      }
    }
  },
};

module.exports = roleUpgrader;
