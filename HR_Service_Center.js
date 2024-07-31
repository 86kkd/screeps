const roleHarvester = require("role.harvester");
const roleUpgrader = require("role.upgrader");
const roleBuilder = require("role.builder");
const roleTower = require("role.tower");

const tover_id = "6cf4753c8d85837";

const room_targets_ctl = {
    source_target: null,

    /** @param {Creep} creep **/
    search: (creep) => {
        // sys_log('bug here');
        this.source_target = creep.room.find(FIND_SOURCES);
        // sys_log('bug not here');
        return this;
    },
};

const source_to_harvest = {
    builder1_source: 1,
};

class HRSC {
    /**
     * @function constructer initialize the creep_type
     */
    constructor() {
        // this.creep_type = ["harvester","upgrader","builder"];
    }

    /**
     * @function run the main loop
     */
    run() {
        const creep_type = ["harvester", "upgrader", "builder"];

        const room_source = Game.spawns["Spawn1"].room.find(FIND_SOURCES);

        roleTower.run(tover_id);
        for (const name in Game.creeps) {
            const creep = Game.creeps[name];
            if (!creep_type.includes(creep.memory.role)) {
                sys_log(creep.memory.role + " is not in creep_type");
            }
            if (creep.memory.role == "harvester") {
                roleHarvester.run(creep, room_source[0]);
            }
            if (creep.memory.role == "upgrader") {
                roleUpgrader.run(creep, room_source[1]);
            }
            if (creep.memory.role == "builder") {
                roleBuilder.run(creep, room_source[1]);
            }
        }
    }
}

module.exports = {
    HRSC,
    CreateHRSC() {
        return new HRSC();
    },
};
