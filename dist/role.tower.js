var sys_log = require("function").sys_log;

var roleTower = {
    run:(tower_id)=>{
        var tower = Game.getObjectById(tower_id);
        if(tower) {
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                        if(structure.structureType == "constructedWall"||
                            structure.structureType == "rampart"){
                                return structure.hits<5000;
                            }
                        else{
                            return structure.hits < structure.hitsMax;
                        }
                    
                }
            });
            if(closestDamagedStructure) {
                sys_log("tower repairing "+closestDamagedStructure+","+
                closestDamagedStructure.hits+","+
                (closestDamagedStructure.structureType =="constructedWall"));
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