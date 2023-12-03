import datadog from "./datadog-config";
import service from "./services";
import express from "express";
import cors from "cors";

const app = express();
const port = 8080;

app.use(cors());

app.get("/api/v1/todos", (req, res) => {
  datadog.metrics.increment("todo_view_counter");
  datadog.logger.info(`get todos is called`);

  const todoResult = service.getTodoResult();

  res.json({
    data: todoResult,
  });
});

app.get("/api/v1/health", (req, res) => {
  res.json({
    data: "ok",
  });
});

app.listen(port, () => {
  datadog.logger.info(`backend listening on port ${port}`);
});
