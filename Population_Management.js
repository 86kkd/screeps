"use strict";
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
  #spawn_name;
  #spawn;
  #room;
  #ctl_level;
  #energy_available;
  #energy_capacity;

  constructor(spawn) {
    this.#spawn_name = spawn;
    this.#spawn = Game.spawns[spawn_name];
    this.#room = this.#spawn.room;
    this.#ctl_level = this.#room.controller.level;
    this.#energy_available = this.#room.energyAvailable;
    this.#energy_capacity = this.#room.energyCapacityAvailable;
    this.creep_body = new Body();
  }

  set_creep_function() {
  }

  create_creep(creep_role, count) {
    let result;
    let number = 0;
    if (get_creeps_cout(creep_role, spawn_name) < count) {
      do {
        result = this.#spawn.spawnCreep(
          this.creep_body,
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
