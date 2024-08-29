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
<<<<<<< HEAD
    energy_plan: 4000,
    count: 1,
=======
    energy_plan: 2000,
    count: 0,
>>>>>>> master
    memory: {},
  },

  builder: {
    body_cost_assign: {
      move: 0.25,
      carry: 0.25,
      work: 0.5,
    },
    role: "builder",
    energy_plan: 4000,
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
    energy_plan: 4000,
    count: 1,
    memory: {},
  },

  transfer: {
    body_cost_assign: {
      move: 0.333,
      carry: 0.666,
    },
    role: "transfer",
    energy_plan: 1550,
    count: 1,
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
    memory: { destinationId: "5bbcab5d9099fc012e6335df" },
  },
  remote_harvester2: {
    body_cost_assign: {
      work: 0.5,
      carry: 0.5,
    },
    role: "remote_harvester2",
    energy_plan: 1000,
    count: 1,
    memory: { destinationId: "5bbcab5d9099fc012e6335e0" },
  },
  puller: {
    body_cost_assign: {
      move: 1,
    },
    role: "puller",
    energy_plan: 750,
    count: 1,
    memory: {},
  },
};
module.exports = config;
