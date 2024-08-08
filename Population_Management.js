"use strict";
const spawn_name = "Spawn1";

const spawn = Game.spawns[spawn_name];
const room = spawn.room;
const ctl_level = room.controller.level;
const energy_available = room.energyAvailable;
const energy_capacity = room.energyCapacityAvailable;

const get_creeps_cout = (role, mother) => {
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

class Body extends Array {
  #body_cost = {
    move: 50,
    work: 100,
    carry: 50,
    attack: 80,
    heal: 250,
    claim: 600,
    tough: 10,
  };
  constructor(...args) {
    super(...args);
    this.cost = 0;
  }

  push(...items) {
    for (const i = 0; i < items.length; i++) {
      this.cost += this.#body_cost[items[i]];
    }
    return this.cost;
  }

  pop() {
    this.cost -= this.#body_cost[super.pop()];
    return this.cost;
  }
}

class creep_factory {
  constructor() {
    this.creep_body = new Body();
  }

  create_creep(body, creep_role, count) {
    let result;
    let number = 0;
    if (get_creeps_cout(creep_role, spawn_name) < count) {
      do {
        result = spawn.spawnCreep(
          body,
          worker.role + number + "_" + spawn_name,
          {
            memory: { role: creep_role, mother: spawn_name },
          },
        );
        number++;
      } while (result == ERR_NAME_EXISTS);
    }
  }
}
