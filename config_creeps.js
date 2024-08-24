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
    energy_plan: 3000,
    count: 1,
    memory: {},
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
    memory: {},
  },

  recycler: {
    body_cost_assign: {
      move: 0.25,
      carry: 0.25,
      work: 0.5,
    },
    role: "recycler",
    energy_plan: 3500,
    count: 4,
    memory: {},
  },

  transfer: {
    body_cost_assign: {
      move: 0.3,
      carry: 0.6,
    },
    role: "transfer",
    energy_plan: 3000,
    count: 0,
    memory: {},
  },
  remote_harvester: {
    body_cost_assign: {
      work: 1,
    },
    role: "remote_harvester",
    energy_plan: 1000,
    count: 1,
    memory: { source_id: "9263077296e02bb", room: "W7N3" },
  },
};
module.exports = config;
