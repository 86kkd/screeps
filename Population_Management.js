"use strict";
const TAG = "PM: ";
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
  get_body_cost(body) {
    return this.#body_cost[body];
  }

  push(...items) {
    let cost = 0;
    for (const i = 0; i < items.length; i++) {
      this.cost += this.#body_cost[items[i]];
      cost += this.#body_cost[items[i]];
    }
    return cost;
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
  #assign_by_capacity;
  static get_instance() {
  }

  constructor(spawn) {
    this.#spawn_name = spawn;
    this.#spawn = Game.spawns[spawn_name];
    this.#room = this.#spawn.room;
    this.#ctl_level = this.#room.controller.level;
    this.#energy_available = this.#room.energyAvailable;
    this.#energy_capacity = this.#room.energyCapacityAvailable;
    this.creep_body;
  }

  set_creep_function(config, assign_by_capacity = true) {
    // count body cost to use
    this.creep_body = new Body();
    let energy_to_use;
    if (assign_by_capacity) {
      energy_to_use = this.#energy_capacity;
    } else {
      this.#energy_capacity = this.#energy_available;
    }
    for (const body_type in config.body_cost_assign) {
      let body_part_num = Math.floor(
        config.body_cost_assign[body_type] * energy_to_use,
      );
      while ((body_part_num - this.creep_body.get_body_cost(body_type)) > 0) {
        body_part_num -= this.creep_body.push(body_type);
      }
    }
    // check if all energy planned is assiged
    while (this.creep_body.cost > energy_to_use) {
      this.creep_body.pop();
    }
    while (this.creep_body.cost < energy_to_use) {
      // if the lest energy can afford for MOVE then push ahead
      if ((this.creep_body.cost - energy_to_use) > 50) {
        this.creep_body.unshift(MOVE);
      } else if ((this.creep_body.cost - energy_to_use) > 10) {
        this.creep_body.unshift(TOUGH);
      } else {
        console.log(TAG + `assign body error from config error`);
      }
    }
  }

  create_creep(creep_role, count) {
    let result;
    let number = 0;
    if (get_creeps_cout(creep_role, this.#spawn_name) < count) {
      do {
        result = this.#spawn.spawnCreep(
          this.creep_body,
          worker.role + number + "_" + this.#spawn_name,
          {
            memory: { role: creep_role, mother: this.#spawn_name },
          },
        );
        number++;
      } while (result == ERR_NAME_EXISTS);
    }
  }
}
