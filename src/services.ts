import datadog from "./datadog-config";

const service = {
  getTodoResult: () => {
    return datadog.tracer.trace(
      "getTodoResult",
      { resource: "getTodoResult" },
      () => {
        datadog.metrics.increment("todo_view_counter");

        const span = datadog.tracer.scope().active();
        span.setTag("foo", "bar");

        const output = [];
        for (let i = 0; i < 100; ++i) {
          output.push({
            todoID: i,
            todoTitle: `Hi ${i}`,
          });
        }

        datadog.metrics.close();
        return output;
      }
    );
  },
};
export default service;
