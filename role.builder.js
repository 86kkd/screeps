const roleBuilder = {
  /** @param {Creep} creep **/
  run: function(creep, source) {
    if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
      creep.memory.building = false;
      creep.say("🔄 harvest");
    }
    if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
      creep.memory.building = true;
      creep.say("🚧 build");
    }

    if (creep.memory.building) {
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
      if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source, { visualizePathStyle: { stroke: "#ffaa00" } });
      }
    }
  },
};

module.exports = roleBuilder;
