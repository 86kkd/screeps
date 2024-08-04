const roleTower = {
    run: (tower_id) => {
        const tower = Game.getObjectById(tower_id);
        if (tower) {
            const closestHostile = tower.pos.findClosestByRange(
                FIND_HOSTILE_CREEPS,
            );
            if (closestHostile) {
                tower.attack(closestHostile);
            }
            const closestDamagedStructure = tower.pos.findClosestByRange(
                FIND_STRUCTURES,
                {
                    filter: (structure) => {
                        if (
                            structure.structureType == "constructedWall" ||
                            structure.structureType == "rampart"
                        ) {
                            return structure.hits < 5000;
                        } else {
                            return structure.hits < structure.hitsMax;
                        }
                    },
                },
            );
            if (closestDamagedStructure) {
                tower.repair(closestDamagedStructure);
            }
        } else {
            // sys_log("tower id error"+tower_id)
        }
    },
};
module.exports = roleTower;
