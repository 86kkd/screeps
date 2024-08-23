const config = {
  harvester: {
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
    body_cost_assign: {
      move: 0.25,
      carry: 0.25,
      work: 0.5,
    },
    role: "upgrader",
    energy_plan: 3000,
    count: 1,
  },

  builder: {
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
    body_cost_assign: {
      move: 0.25,
      carry: 0.25,
      work: 0.5,
    },
    role: "recycler",
    energy_plan: 3500,
    count: 2,
  },

  transfer: {
    body_cost_assign: {
      move: 0.3,
      carry: 0.6,
    },
    role: "transfer",
    energy_plan: 3000,
    count: 1,
  },
};
module.exports = config;
