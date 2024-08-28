"use strict";

const TAG = "FAR_HARVESTER :";

const roleRemoteHarvester = {
  /**
   * @param {Creep} creep
   * @param {Id} source_id
   */
  run: function(creep) {
    creep.say("⛏️");
    const source_id = creep.memory.destinationId;
    const source = Game.getObjectById(source_id);
    if (!creep.memory.source_id) {
      creep.harvest(source);
    }
    if (creep.store.getFreeCapacity() == 0) {
      const target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (structure) => {
          return structure.structureType == STRUCTURE_CONTAINER;
        },
      });
      if (
        creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE &&
        !creep.memory.source_id
      ) {
        creep.memory.source_id = creep.memory.destinationId;
        creep.memory.destinationId = target.id;
      }
    } else if (creep.memory.source_id) {
      creep.memory.destinationId = creep.memory.source_id;
      delete creep.memory.source_id;
    }
  },
};

module.exports = roleRemoteHarvester;
