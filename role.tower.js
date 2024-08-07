const TAG = "TOWER :";
const roleTower = {
    run: (tower_id) => {
        const tower = Game.getObjectById(tower_id);
        if (tower) {
            const closestHostile = tower.room.find(
                FIND_HOSTILE_CREEPS,
            );
            if (closestHostile.length) {
                console.log(TAG + "attack" + closestHostile[0]);
                // console.log(TAG + "cheep body:" + closestHostile.body[40].type);
                tower.attack(closestHostile[1]);
            } else {
                const closestDamagedStructure = tower.pos.findClosestByRange(
                    FIND_STRUCTURES,
                    {
                        filter: (structure) => {
                            if (
                                structure.structureType == "constructedWall" ||
                                structure.structureType == "rampart"
                            ) {
                                return structure.hits < 50000;
                            } else {
                                return structure.hits < structure.hitsMax - 100;
                            }
                        },
                    },
                );
                if (closestDamagedStructure) {
                    tower.repair(closestDamagedStructure);
                }
            }
        }
    },
};
module.exports = roleTower;
