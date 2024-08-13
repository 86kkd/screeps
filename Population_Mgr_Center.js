"use strict";

const math = require("math_function");

const TAG = "PopMgr: ";

/**
 * @param {String} role
 * @param {String} mother
 */
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
    this.body = {};
  }
  /**
   * @param {String} spawn
   */
  get_body_cost(body) {
    return this.body_cost[body];
  }
  is_off_capacity() {
    return this.length == 50;
  }

  addItems(items, method) {
    let totalCost = 0;
    if (this.length < 50) {
      for (const item of items) {
        this.cost += this.body_cost[item];
        totalCost += this.body_cost[item];
        if (this.body[item] === undefined) {
          this.body[item] = 0;
        }
        this.body[item] += 1;
      }
      method.call(this, ...items);
    } else {
      console.log(
        TAG + `Error: Body is already full: this.length=${this.length}`,
      );
    }
    return totalCost;
  }

  push(...items) {
    return this.addItems(items, super.push);
  }

  unshift(...items) {
    return this.addItems(items, super.unshift);
  }

  pop() {
    this.cost -= this.body_cost[super.pop()];
    return this.cost;
  }

  toString() {
    let bodyStr = "";

    for (const key in this.body) {
      bodyStr += `${key}[${this.body[key]}],`;
    }

    bodyStr = bodyStr.trim().replace(/,$/, "");
    return `body:${bodyStr}; totalCost:${this.cost}`;
  }
}

class creep_factory {
  static get_instance(spawn) {
    if (!creep_factory.instance) {
      creep_factory.instance = new creep_factory(spawn);
    }
    return creep_factory.instance;
  }
  /**
   * @param {String} spawn
   */
  constructor(spawn) {
    this.spawn_name = spawn;
    this.spawn = Game.spawns[this.spawn_name];
    this.room = this.spawn.room;
    this.ctl_level = this.room.controller.level;
    this.energy_available = this.room.energyAvailable;
    this.energy_capacity = this.room.energyCapacityAvailable;
    this.creep_body;
  }

  config_creep_body(config) {
    // count body cost to use
    this.creep_body = new Body();
    let energy_to_use;
    if (config.energy_plan == "capacity") {
      energy_to_use = this.energy_capacity;
    } else if (
      typeof config.energy_plan === "number" && !isNaN(config.energy_plan)
    ) {
      if (config.energy_plan > this.energy_capacity) {
        energy_to_use = this.energy_capacity;
        console.log(
          TAG +
          `Wornging: erengy_plan:${config.energy_plan} is to huge using room_energy_capacity:${this.energy_capacity} `,
        );
      } else {
        energy_to_use = config.energy_plan;
      }
    } else if (config.energy_plan == "available") { // energy available in a room
      this.energy_capacity = this.energy_available;
    } else {
      console.log(
        TAG +
        `Error: config_plan:{${config.energy_plan}} is not in [Number ,'capacity','available']`,
      );
      return;
    }

    // count body_cost
    const body_part = {};
    let total_body_part = 0;
    let total_cost = 0;
    for (const body_type in config.body_cost_assign) {
      body_part[body_type] = {};
      body_part[body_type].cost = Math.floor(
        config.body_cost_assign[body_type] * energy_to_use,
      );
      body_part[body_type].num = Math.floor(
        body_part[body_type].cost / this.creep_body.body_cost[body_type],
      );
      total_body_part += body_part[body_type].num;
      total_cost += body_part[body_type].cost;
    }
    // console if energy too huge that body > 50
    if (total_body_part > 50) {
      const matric = [];
      for (const body_type_y in config.body_cost_assign) {
        const array = [];
        for (const body_type_x in config.body_cost_assign) {
          if (body_type_x == body_type_y) {
            array.push(
              this.creep_body.body_cost[body_type_x] *
              (1 - total_cost / body_part[body_type_x].cost),
            );
          } else {
            array.push(this.creep_body.body_cost[body_type_x]);
          }
        }
        matric.push(array);
      }

      const result = math.gaussElimination(matric);
      let i;
      let num_result = 0;
      for (i = 0; i < result.length; i++) {
        num_result += result[i];
      }
      i = 0;
      for (const body_type in config.body_cost_assign) {
        body_part[body_type].num = Math.floor((result[i] / num_result) * 50);
        i++;
      }
    }

    // assign body
    for (const body_type in config.body_cost_assign) {
      while (
        --body_part[body_type].num >= 0 &&
        !this.creep_body.is_off_capacity()
      ) {
        this.creep_body.push(body_type);
        // console.log(TAG + `in assign body while`);
      }
    }

    // check if all energy planned is assiged
    while (this.creep_body.cost > energy_to_use) {
      this.creep_body.pop();
    }
    while (
      this.creep_body.cost < energy_to_use &&
      !this.creep_body.is_off_capacity()
    ) {
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
  }

  create_creep(config) {
    this.spawn = Game.spawns[this.spawn_name];
    this.room = this.spawn.room;
    this.ctl_level = this.room.controller.level;
    this.energy_available = this.room.energyAvailable;
    this.energy_capacity = this.room.energyCapacityAvailable;
    let result;
    let number = 0;
    const creep_role = config.role;
    const count = config.count;
    this.config_creep_body(config);

    if (get_creeps_cout(creep_role, this.spawn_name) < count) {
      if (this.creep_body.cost > this.energy_available) {
        console.log(
          TAG +
          `energy is not enouth for creep:\n${this.creep_body}\navaivable energy:${this.energy_available}`,
        );
        return;
      }
      do {
        result = this.spawn.spawnCreep(
          this.creep_body,
          creep_role + number + "_" + this.spawn_name,
          {
            memory: { role: creep_role, mother: this.spawn_name },
          },
        );
        console.log(TAG + `spawn result:${result}`);
        console.log(TAG + `creep body:${this.creep_body}`);
        number++;
      } while (result == ERR_NAME_EXISTS);
    }
  }
}
module.exports = { creep_factory };
