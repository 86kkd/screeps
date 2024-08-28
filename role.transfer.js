const TAG = "TRANSFER: ";
const roleTransfer = {
  /**
   * @param {Creep} creep
   * @param {(StructureStorage|StructureContainer)} source_target
   * @param {(StructureStorage|StructureSpawn|StructureContainer|StructureExtension)} trans_target
   */
  run: function(creep, source_target, trans_target) {
    if (creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
      creep.memory.working = false;
    }
    if (
      !creep.memory.working &&
      (creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0 || !source_target)
    ) {
      creep.memory.working = true;
    }
    creep.say("🚚");
    if (!creep.memory.working) {
      creep.memory.destinationId = source_target.id;
      if (creep.withdraw(source_target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source_target, {
          reusePath: 10,
          visualizePathStyle: { stroke: "#ffa0ff" },
        });
      }
    } else if (
      creep.transfer(trans_target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE
    ) {
      creep.memory.destinationId = trans_target.id;
      creep.moveTo(trans_target, {
        reusePath: 10,
        visualizePathStyle: { stroke: "#ffa0ff" },
      });
    } else {
      console.log(TAG + `unexpected error`);
    }
  },
};

module.exports = roleTransfer;
