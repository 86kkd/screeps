"use strict";

const TAG = "PULLER :";

const rolePuller = {
  /**
   * @param {Creep} creep
   * @param {Creep} creep_to_pull
   */
  run: function(creep) {
    creep.say("🚂");
    const target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
      filter: function(object) {
        return (object.ticksToLive > 0 &&
          object.getActiveBodyparts(MOVE) == 0) &&
          object.memory.destinationId &&
          !object.pos.isNearTo(Game.getObjectById(object.memory.destinationId));
      },
    });

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
    } else {
      const targets = creep.pos.findInRange(FIND_MY_CREEPS, 2);
      if (targets.length > 0) {
        const direction = creep.pos.getDirectionTo(targets[0]);
        const get_unti_direction = (direction) => {
          switch (direction) {
            case TOP:
              return BOTTOM;
            case BOTTOM:
              return TOP;
            case RIGHT:
              return LEFT;
            case LEFT:
              return RIGHT;
            case TOP_RIGHT:
              return BOTTOM_LEFT;
            case TOP_LEFT:
              return BOTTOM_RIGHT;
            case BOTTOM_RIGHT:
              return TOP_LEFT;
            case BOTTOM_LEFT:
              return TOP_RIGHT;
          }
        };
        creep.move(get_unti_direction(direction));
      }
    }
  },
};

module.exports = rolePuller;
