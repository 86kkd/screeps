// const TAG = "TRANSFER";
const roleTransfer = {
  /**
   * @param {Creep} creep
   * @param {(StructureStorage|StructureContainer)} source_target */
  run: function(creep, source_target, trans_target) {
    if (creep.store.getFreeCapacity() > 0) {
      if (creep.withdraw(source_target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source_target, {
          visualizePathStyle: { stroke: "#ffa0ff" },
        });
      }
    } else if (
      creep.transfer(trans_target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE
    ) {
      creep.moveTo(trans_target), {
        visualizePathStyle: { stroke: "#ffa0ff" },
      };
    }
  },
};
