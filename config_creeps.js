const config = {
  harvester: {
    body: [MOVE, CARRY, WORK],
    body_cost_assign: {
      move: 0.25,
      carry: 0.25,
      work: 0.5,
    },
    role: "harvester",
    energy_plan: 2000,
    count: 0,
  },
  upgrader: {
    body: [MOVE, CARRY, WORK],
    body_cost_assign: {
      move: 0.25,
      carry: 0.25,
      work: 0.5,
    },
    role: "upgrader",
    energy_plan: 2000,
    count: 1,
  },

  builder: {
    body: [MOVE, CARRY, WORK],
    body_cost_assign: {
      move: 0.25,
      carry: 0.25,
      work: 0.5,
    },
    role: "builder",
    energy_plan: 2000,
    count: 0,
  },

  recycler: {
    body: [MOVE, CARRY, WORK],
    body_cost_assign: {
      move: 0.25,
      carry: 0.25,
      work: 0.5,
    },
    role: "recycler",
    energy_plan: 2000,
    count: 2,
  },
  // transfer: {
  //   body: [MOVE, CARRY, WORK],
  //   body_cost_assign: {
  //     move: 0.25,
  //     carry: 0.25,
  //     work: 0.5,
  //   },
  //   role: "transfer",
  //   count: 2,
  // },
};
module.exports = config;
