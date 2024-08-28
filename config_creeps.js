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
    memory: {},
  },
  upgrader: {
    body_cost_assign: {
      move: 0.25,
      carry: 0.25,
      work: 0.5,
    },
    role: "upgrader",
    energy_plan: 2000,
    count: 0,
    memory: {},
  },

  builder: {
    body_cost_assign: {
      move: 0.25,
      carry: 0.25,
      work: 0.5,
    },
    role: "builder",
    energy_plan: 3000,
    count: 1,
    memory: {},
  },

  recycler: {
    body_cost_assign: {
      move: 0.25,
      carry: 0.25,
      work: 0.5,
    },
    role: "recycler",
    energy_plan: 1000,
    count: 1,
    memory: {},
  },

  transfer: {
    body_cost_assign: {
      move: 0.3,
      carry: 0.6,
    },
    role: "transfer",
    energy_plan: 3000,
    count: 2,
    memory: {},
  },
  remote_harvester: {
    body_cost_assign: {
      work: 0.5,
      carry: 0.5,
    },
    role: "remote_harvester",
    energy_plan: 1000,
    count: 1,
    memory: { destinationId: "26f20772347f879" },
  },
  remote_harvester2: {
    body_cost_assign: {
      work: 0.5,
      carry: 0.5,
    },
    role: "remote_harvester2",
    energy_plan: 1000,
    count: 1,
    memory: { destinationId: "71ac0772347ffe6" },
  },
  puller: {
    body_cost_assign: {
      move: 1,
    },
    role: "puller",
    energy_plan: 500,
    count: 1,
    memory: {},
  },
};
module.exports = config;
