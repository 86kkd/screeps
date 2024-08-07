const spawn_name = "Spawn1";

const spawn = Game.spawns[spawn_name];
const room = spawn.room;
const ctl_level = room.controller.level;
const energy_available = room.energyAvailable;
const energy_capacity = room.energyCapacityAvailable;

const get_num_creeps = (role, mother) => {
  let num = 0;

  for (const name in Game.creeps) {
    const creep = Game.creeps[name];
    if (
      creep.memory.role == role &&
      creep.memory.mother == mother
    ) num++;
  }
  return num;
};

console.log(body_cost[MOVE]);

const worker = {
  own_body: [MOVE, WORK, CARRY],
  role: { "harvester": 3, "upgrader": 3, "builder": 2, "recycler": 2 },
};

class Body extends Array {
  constructor(...args) {
    super(...args);
    this.cost = 0;
  }

  push(...items) {
    const body_cost = {
      move: 50,
      work: 100,
      carry: 50,
      attack: 80,
      heal: 250,
      claim: 600,
      tough: 10,
    };
    for (const i = 0; i < items.length; i++) {
      this.cost += body_cost[items[i]];
    }
    return super.push(...items);
  }

  pop() {
    this.cost -= body_cost[super.pop()];
  }
}

for (const creep_role in worker.role) {
  const body = new Body();
  let result;
  let number = 0;
  do {
    body.push(WORK);
    body.push(MOVE);
    body.push(CARRY);
    body.push(MOVE);
  } while (body.cost < energy_capacity);
  if (body_cost > energy_capacity) {
    body.pop();
    body.push(MOVE);
  }

  if (get_num_creeps(creep_role, spawn_name) < worker.role[creep_role]) {
    do {
      result = spawn.spawnCreep(body, worker.role + number + "_" + spawn_name, {
        memory: { role: creep_role, mother: spawn_name },
      });
      number++;
    } while (result == ERR_NAME_EXISTS);
  }
}
