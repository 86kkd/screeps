const config = {
  harvester: {
    body: [MOVE, CARRY, WORK],
    body_cost_assign: {
      move: 0.25,
      carry: 0.25,
      work: 0.5,
    },
    role: "harvester",
    count: 2,
  },
  upgrader: {
    body: [MOVE, CARRY, WORK],
    body_cost_assign: {
      move: 0.25,
      carry: 0.25,
      work: 0.5,
    },
    role: "upgrader",
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
    count: 1,
  },

  recycler: {
    body: [MOVE, CARRY, WORK],
    body_cost_assign: {
      move: 0.25,
      carry: 0.25,
      work: 0.5,
    },
    role: "recycler",
    count: 1,
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
