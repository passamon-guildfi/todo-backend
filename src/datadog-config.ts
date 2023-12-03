import { createLogger, format, transports } from "winston";
import tracer from "dd-trace";
import StatsD from "hot-shots";

// logger
const httpTransportOptions = {
  host: "http-intake.logs.ap1.datadoghq.com",
  path: "/api/v2/logs?dd-api-key=3bc16e8813a16fa68e9649a3977769d3&ddsource=nodejs&service=localtodobackend",
  ssl: true,
};
const logger = createLogger({
  level: "info",
  exitOnError: false,
  format: format.json(),
  transports: [
    new transports.Http(httpTransportOptions),
    new transports.Console(),
  ],
});

// tracer
tracer.init({
  logInjection: true,
});

// metrics
const metrics = new StatsD({
  port: 8125,
  globalTags: { env: "development" },
  errorHandler: function (error) {
    console.log("Socket errors caught here: ", error);
  },
});

export default {
  logger,
  tracer,
  metrics,
};
