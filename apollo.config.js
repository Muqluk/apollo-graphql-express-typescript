module.exports = {
  service: {
    // Must match the name of the federated graph in Graph Manager
    // name: 'apfm-owl',

    // Forms Service endpoint (for schema introspection)
    endpoint: {
      url: 'localhost:2593', // `${process.env.GRAPH_SERVICE_URL}`,
    },
  },
};
