"use strict";

const TAG = "PULLER :";

const rolePuller = {
  /**
   * @param {Creep} creep
   * @param {Creep} creep_to_pull
   */
  get_creep_name: function () {
    return this.name;
  },
  run: function (creep) {
    creep.say("🚂");
    this.name = creep.name;
    const target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
      filter: function (object) {
        return (object.ticksToLive > 0 &&
          (object.getActiveBodyparts(MOVE) == 0 || object.filter > 0)) &&
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
      const targets = creep.pos.findInRange(FIND_MY_CREEPS, 1, {
        filter: (my_creep) => {
          return my_creep.name != this.get_creep_name();
        },
      });
      const get_unit_direction = (creep, target) => {
        const pos = creep.pos;
        switch (pos.getDirectionTo(target)) {
          case TOP:
            return new RoomPosition(pos.x, pos.y + 1, pos.roomName);
          case BOTTOM:
            return new RoomPosition(pos.x, pos.y - 1, pos.roomName);
          case RIGHT:
            return new RoomPosition(pos.x - 1, pos.y, pos.roomName);
          case LEFT:
            return new RoomPosition(pos.x + 1, pos.y, pos.roomName);
          case TOP_RIGHT:
            return new RoomPosition(pos.x - 1, pos.y + 1, pos.roomName);
          case TOP_LEFT:
            return new RoomPosition(pos.x + 1, pos.y + 1, pos.roomName);
          case BOTTOM_RIGHT:
            return new RoomPosition(pos.x - 1, pos.y - 1, pos.roomName);
          case BOTTOM_LEFT:
            return new RoomPosition(pos.x + 1, pos.y - 1, pos.roomName);
          default:
            return undefined; // Return the same position if the direction is invalid
        }
      };

      for (let i = 0; i < targets.length; i++) {
        const next_pos = get_unit_direction(creep, targets[i]);
        if (!next_pos) continue;
        const next_place = creep.room.lookAt(next_pos);
        let breakout = false;
        for (let i = 0; i < next_place.length; i++) {
          if (next_place[i].terrain == "wall") breakout = true;
        }
        if (breakout) continue;
        const result = creep.moveTo(next_pos);
        if (result == OK) break;
      }
    }
  },
};

module.exports = rolePuller;
