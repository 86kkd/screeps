// var {creep_counter,room_targets,init_serval_workers,group,sys_log} = rquire("function")

var roleTower = {
    run:(tower_id)=>{
        var tower = Game.getObjectById(tower_id);
        if(tower) {
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            });
            if((closestDamagedStructure.structureType == "constructeWall"&&
                closestDamagedStructure.hits<1000)||
                (closestDamagedStructure.structureType =="rampart"||
                closestDamagedStructure.hits<1000)) {
                tower.repair(closestDamagedStructure);
            }
            else if(closestDamagedStructure.structureType != 'constructedWall'&&
                closestDamagedStructure.structureType != 'rampart' ){
                tower.repair(closestDamagedStructure)
            }

            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile) {
                tower.attack(closestHostile);
            }
        }
        else{
            // sys_log("tower id error"+tower_id)
        }
    }
}
module.exports = roleTower;