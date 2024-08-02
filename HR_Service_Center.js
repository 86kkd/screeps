const roleHarvester = require("role.harvester");
const roleUpgrader = require("role.upgrader");
const roleBuilder = require("role.builder");
const roleTower = require("role.tower");

const tover_id = "6cf4753c8d85837";
class HRSC {
    /**
     * @function constructer initialize the creep_type
     */
    constructor() {
        // this.source_id = ["26f20772347f879", "71ac0772347ffe6"];
        this.creep_type = ["harvester", "upgrader", "builder"];
    }

    /**
     * @function run the main loop
     */
    run() {
        const spawn_name = "Spawn1";

        const spawn = Game.spawns[spawn_name];
        const room = spawn.room;
        const room_source = room.find(FIND_SOURCES);
        const ctl_level = room.controller.level;
        const energy_avail = room.energyAvailable;
        const energy_max = room.energyCapacityAvailable;

        console.log("find source id:" + room_source[0] + " " + room_source[1]);
        console.log("Game controller level:" + ctl_level);
        console.log(spawn_name + " energy_availble:" + energy_avail);
        console.log(spawn_name + " energy_max:" + energy_max);

        for (let i = 0; i < room_source.length; i++) {
            const id = room_source[i].id;
            const Source = Game.getObjectById(id);
            const last_energy = Source.energy;
            console.log("source_" + id + " energy:" + last_energy);
        }

        roleTower.run(tover_id);

        for (const name in Game.creeps) {
            const creep = Game.creeps[name];
            if (!this.creep_type.includes(creep.memory.role)) {
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
