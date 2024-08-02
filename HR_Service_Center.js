const roleHarvester = require("role.harvester");
const roleUpgrader = require("role.upgrader");
const roleBuilder = require("role.builder");
const roleTower = require("role.tower");

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
        const ctl_level = room.controller.level;
        const energy_avail = room.energyAvailable;
        const energy_max = room.energyCapacityAvailable;

        const construct_set = room.find(FIND_CONSTRUCTION_SITES);
        const room_source = room.find(FIND_SOURCES, {
            filter: (source) => {
                return (source.energy > 0);
            },
        });
        const tower = room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_TOWER);
            },
        });

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

        for (let i = 0; i < tower.length; i++) {
            const tower_id = tower[i].id;
            roleTower.run(tower_id);
            console.log("tower id:" + tower[0]);
        }

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
                if (construct_set.length) {
                    roleBuilder.run(creep, room_source[1], construct_set);
                } else {
                    roleUpgrader.run(creep, room_source[1]);
                }
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
