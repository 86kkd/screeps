var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep,source_targets) {
        var spawn=Game.spawns['Spawn1'];
        if(creep.store[RESOURCE_ENERGY]==0&&creep.memory.building){
            creep.memory.building=false;
        }

	    if(creep.store.getFreeCapacity() > 0&&!creep.memory.building) {
            if(creep.harvest(source_targets) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source_targets,{visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || 
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_TOWER) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], 
                    RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], 
                        {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else{
            creep.memory.building = true;
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], 
                        {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        }
        
        
	}
};

module.exports = roleHarvester;