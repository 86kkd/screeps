"use strict";

const TAG = "FAR_HARVESTER :";

const roleRemoteHarvester = {
  run_to_another_room: function(room_name) {
    room = Game.room[room_name];
    const exitDir = creep.room.findExitTo(room);
    const exit = creep.pos.findClosestByRange(exitDir);
    creep.moveTo(exit);
  },
  run: function(creep, room) {
  },
};
