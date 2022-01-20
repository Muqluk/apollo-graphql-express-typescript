// https://github.com/knex/knex/issues/3376
// const ConnectionString = require("mssql/lib/connectionstring");
// export const dbConfig = {
//   client: "mssql",
//   connection: ConnectionString.resolve(`mssql://AppDev:${process.env.APP_DEV_PASSWORD}@0.0.0.0:1433/App`),
// };

type KnexConnectionName = string;

// eslint-disable-next-line
const KnexClient = (connection: KnexConnectionName) => require('knex')({
  client: process.env[`KNEX_${connection}_CLIENT`],
  connection: {
    host: process.env[`KNEX_${connection}_HOST`],
    // eslint-disable-next-line
    port: ~~process.env[`KNEX_${connection}_PORT`]!,
    user: process.env[`KNEX_${connection}_USER`],
    password: process.env[`KNEX_${connection}_PASSWORD`],
    database: process.env[`KNEX_${connection}_DATABASE`],
  },
  asyncStackTraces: true,
});

export default KnexClient;
