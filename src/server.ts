import service from "./services";

const tracer = require("./tracer");
const StatsD = require('hot-shots')
const client = new StatsD({
    port: 8125,
    globalTags: { env: 'development' },
    errorHandler: function (error) {
      console.log("Socket errors caught here: ", error);
    }
});

const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;

app.use(cors());

const httpTransportOptions = {
  host: "http-intake.logs.ap1.datadoghq.com",
  path: "/api/v2/logs?dd-api-key=3bc16e8813a16fa68e9649a3977769d3&ddsource=nodejs&service=localtodobackend",
  ssl: true,
};

const { createLogger, format, transports } = require("winston");
const logger = createLogger({
  level: "info",
  exitOnError: false,
  format: format.json(),
  transports: [
    new transports.Http(httpTransportOptions),
    new transports.Console(),
  ],
});

app.get("/api/v1/todos", (req, res) => {
  client.increment('/v1_todos/counter');
  logger.info(`todos is called`);

  const todoResultFromService = service.todoResultService();

  res.json({
    data: todoResultFromService,
  });
});

app.get("/api/v1/health", (req, res) => {
  res.json({
    data: "ok",
  });
});

app.listen(port, () => {
  console.log(`backend listening on port ${port}`);
});
