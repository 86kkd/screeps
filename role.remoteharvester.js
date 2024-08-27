"use strict";

const TAG = "FAR_HARVESTER :";

const roleRemoteHarvester = {
  /**
   * @param {Creep} creep
   * @param {Id} source_id
   */
  run: function (creep) {
    creep.say("🗺️");
    // creep.say(creep.room);
    // if (creep.room != creep.memory.room) {
    //   const result = creep.moveTo(new RoomPosition(37, 7, "W7N3"), {
    //     visualizePathStyle: { stroke: "#ffaa00" },
    //   });
    //   creep.say(result);
    // }

    const source_id = creep.memory.destinationId;
    const source = Game.getObjectById(source_id);
    console.log(TAG + source);
    console.log(TAG + creep.harvest(source));
  },
};

module.exports = roleRemoteHarvester;
