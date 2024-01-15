const { sys_log } = require("./function");

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep,source_targets) {
        var spawn=Game.spawns['Spawn1'];
        if(creep.store[RESOURCE_ENERGY]==0&&creep.memory.building){
            creep.memory.trans = false;
            creep.memory.building=false;
        }
        if(creep.store[RESOURCE_ENERGY]==0&&creep.memory.trans){
            creep.memory.trans=false;
            creep.memory.building=false;
        }

	    if(creep.store.getFreeCapacity() > 0&&!creep.memory.building&&!creep.memory.trans) {
            if(creep.harvest(source_targets) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source_targets,{visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || 
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_TOWER) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            // sys_log("targets:"+targets)
            if(targets) {
                creep.memory.trans = true;
                if(creep.transfer(targets, 
                    RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets, 
                        {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else{
                creep.memory.building = true;
                var targets = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                if(targets) {
                    if(creep.build(targets) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets, 
                        {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        }
	}
};

module.exports = roleHarvester;