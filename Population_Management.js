const spawn_name = "Spawn1";

const spawn = Game.spawns[spawn_name];
const room = spawn.room;
const ctl_level = room.controller.level;
const energy_avail = room.energyAvailable;
const energy_max = room.energyCapacityAvailable;

const body_cost = {
  move: 50,
  work: 100,
  carry: 50,
  attack: 80,
  heal: 250,
  claim: 600,
  tough: 10,
};

console.log(body_cost[MOVE]);
const worker = {
  own_body: [MOVE, WORK, CARRY],
};
