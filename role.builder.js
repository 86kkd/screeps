const roleBuilder = {
  /** @param {Creep} creep **/
  run: function (creep, source, construct_set) {
    if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
      creep.memory.building = false;
      creep.say("🔄 harvest");
    }
    if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
      creep.memory.building = true;
      creep.say("🚧 build");
    }

    if (creep.memory.building) {
      if (construct_set.length) {
        if (creep.build(construct_set[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(construct_set[0], {
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
