"use strict";

const TAG = "PULLER :";

const rolePuller = {
  /**
   * @param {Creep} creep
   * @param {Creep} creep_to_pull
   */
  run: function (creep) {
    // creep.say("👟");
    const target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
      filter: function (object) {
        return (object.ticksToLive > 0 &&
          object.getActiveBodyparts(MOVE) == 0) &&
          object.memory.destinationId &&
          !object.pos.isNearTo(Game.getObjectById(object.memory.destinationId));
      },
    });

    console.log(TAG + `creep target:${target}`);
    if (target) {
      if (creep.pull(target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
      } else {
        target.move(creep);
        if (
          creep.pos.isNearTo(Game.getObjectById(target.memory.destinationId))
        ) {
          creep.move(creep.pos.getDirectionTo(target));
        } else {
          creep.moveTo(Game.getObjectById(target.memory.destinationId));
        }
      }
    }
  },
};

module.exports = rolePuller;
