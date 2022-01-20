const setLogging = (filename = '/var/log/app.log') => {
  const isDebug = (process.env.DEBUG || 'true') === 'true';

  if (isDebug) {
    // const console = new winston.transports.Console({
    //   format: winston.format.cli(),
    //   level: 'info',
    // });
    // winston.add(console);
  }

  // const files = new winston.transports.File({
  //   filename: filename,
  //   maxsize: 512000000,
  //   maxFiles: 4,
  //   format: winston.format.json(),
  //   level: 'debug',
  // });

  // winston.add(files);

  // console.log = (...args) => winston.info(args);
  // console.info = (...args) => winston.info(args);
  // console.warn = (...args) => winston.warn(args);
  // console.error = (...args) => winston.error(args);
  // console.debug = (...args) => winston.debug(args);
};

export default setLogging;
