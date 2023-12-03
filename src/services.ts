import tracer from "./tracer";

const service = {
  todoResultService: () => {
    return tracer.trace(
      "todoResultService",
      { resource: "todoResultService" },
      () => {
        const span = tracer.scope().active();
        span.setTag("foo", "bar");
        const output = [];
        for (let i = 0; i < 100; ++i) {
          span.setTag(`test_${i}`, Math.random());
          output.push({
            todoID: i,
            todoTitle: `Hi ${i}`,
          });
        }
        return output;
      }
    );
  },
};
export default service;
