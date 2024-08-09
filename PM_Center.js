"use strict";
const TAG = "PopMgr: ";
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
  constructor(...args) {
    super(...args);
    this.cost = 0;
    this.body_cost = {
      move: 50,
      work: 100,
      carry: 50,
      attack: 80,
      heal: 250,
      claim: 600,
      tough: 10,
    };
  }
  get_body_cost(body) {
    return this.body_cost[body];
  }

  push(...items) {
    let totalCost = 0;
    for (const item of items) {
      this.cost += this.body_cost[item];
      totalCost += this.body_cost[item];
    }
    super.push(...items);
    return totalCost;
  }

  unshift(...items) {
    let totalCost = 0;
    for (const item of items) {
      this.cost += this.body_cost[item];
      totalCost += this.body_cost[item];
    }
    super.unshift(...items);
    return totalCost;
  }

  pop() {
    this.cost -= this.body_cost[super.pop()];
    return this.cost;
  }
  //
  // toString() {
  //   return `${this.join(",")}`;
  // }
}

class creep_factory {
  static get_instance(spawn) {
    if (!creep_factory.instance) {
      creep_factory.instance = new creep_factory(spawn);
    }
    return creep_factory.instance;
  }

  constructor(spawn) {
    this.spawn_name = spawn;
    this.spawn = Game.spawns[this.spawn_name];
    this.room = this.spawn.room;
    this.ctl_level = this.room.controller.level;
    this.energy_available = this.room.energyAvailable;
    this.energy_capacity = this.room.energyCapacityAvailable;
    this.creep_body;
  }

  config_creep_body(config, assign_by_capacity = true) {
    // count body cost to use
    this.creep_body = new Body();
    let energy_to_use;
    if (assign_by_capacity) {
      energy_to_use = this.energy_capacity;
    } else {
      this.energy_capacity = this.energy_available;
    }
    console.log(TAG + `come in config creep body`);
    for (const body_type in config.body_cost_assign) {
      let body_part_num = Math.floor(
        config.body_cost_assign[body_type] * energy_to_use,
      );
      while ((body_part_num - this.creep_body.get_body_cost(body_type)) > 0) {
        body_part_num -= this.creep_body.push(body_type);
        console.log(TAG + `in assign body while`);
      }
    }
    // check if all energy planned is assiged
    while (this.creep_body.cost > energy_to_use) {
      this.creep_body.pop();
    }
    console.log(TAG + `check if energy used overflow`);
    while (this.creep_body.cost < energy_to_use) {
      console.log(TAG + `check if assigned all body:${this.creep_body}`);
      //   // if the lest energy can afford for MOVE then push ahead
      if ((energy_to_use - this.creep_body.cost) >= 50) {
        this.creep_body.unshift(MOVE);
      } else if ((energy_to_use - this.creep_body.cost) >= 10) {
        this.creep_body.unshift(TOUGH);
      } else {
        console.log(
          TAG + `assign body error from config error:${this.creep_body.cost}`,
        );
        break;
      }
    }
    console.log(TAG + `finish body assign:${this.creep_body}`);
  }

  create_creep(config, assign_by_capacity = true) {
    let result;
    let number = 0;
    const creep_role = config.role;
    const count = config.count;
    this.config_creep_body(config, assign_by_capacity);
    let array = [];
    array.push(
      MOVE,
      MOVE,
      MOVE,
      MOVE,
      MOVE,
      MOVE,
      MOVE,
      CARRY,
      CARRY,
      CARRY,
      CARRY,
      CARRY,
      CARRY,
      WORK,
      WORK,
      WORK,
      WORK,
      WORK,
      WORK,
      WORK,
    );

    if (get_creeps_cout(creep_role, this.spawn_name) < count) {
      do {
        result = this.spawn.spawnCreep(
          array,
          creep_role + number + "_" + this.spawn_name,
          {
            memory: { role: creep_role, mother: this.spawn_name },
          },
        );
        console.log(TAG + `spawn result:${result}`);
        console.log(TAG + `creep body:${this.creep_body.length}`);
        console.log(TAG + `creep body array:${[MOVE, MOVE]}`);
        number++;
      } while (result == ERR_NAME_EXISTS);
    }
  }
}
module.exports = { creep_factory };
