const TAG = "MAIN :";
const { HRSC, CreateHRSC } = require("HR_Service_Center");
const PopMgr = require("Population_Management");
const creep_config = require("config_creeps")

module.exports.loop = function() {
    const startCpu = Game.cpu.getUsed();

    const spawn = "Spawn1";
    const population_mgr = PopMgr.get_instance(spawn);
    const HR = HRSC.get_instance();
    for (const config in creep_config) {
        console.log(`start creat creep`)
        // population_mgr.create_creep(creep_config[config])
    }
    HR.run();

    const elapsed = Game.cpu.getUsed() - startCpu;
    console.log(`${TAG} cpu has used ${elapsed} CPU time`);
    console.log(`${TAG} cpu tickLimit: ${Game.cpu.tickLimit}`);
    // for (const spawn in Game.spawns) {
    //     console.log(spawn);
    // }
};
