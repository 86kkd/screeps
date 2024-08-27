const TAG = "builder :";
const roleBuilder = {
  /**
   * @param {Creep} creep
   * @param {(Source|StructureContainer|StructureStorage)} source
   */
  run: function (creep, source) {
    if (creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
      creep.memory.working = false;
      creep.say("harvest");
    }
    if (!creep.memory.working && creep.store.getFreeCapacity() == 0) {
      creep.memory.working = true;
      creep.say("build");
    }

    if (creep.memory.working) {
      const construct_set = creep.pos.findClosestByPath(
        FIND_CONSTRUCTION_SITES,
      );
      if (construct_set) {
        if (creep.build(construct_set) == ERR_NOT_IN_RANGE) {
          creep.say("🚧");

          creep.moveTo(construct_set, {
            visualizePathStyle: { stroke: "#ffffff" },
          });
        }
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
      if (resources) {
        console.log(TAG + creep.withdraw(resources, RESOURCE_ENERGY));
        if (creep.withdraw(resources, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(resources);
        }
      } else if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source, { visualizePathStyle: { stroke: "#ffaa00" } });
      } else console.log(TAG + "there is something error");
    }
  },
};
// export default roleBuilder;
module.exports = roleBuilder;
