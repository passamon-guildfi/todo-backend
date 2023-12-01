const express = require('express')
const cors = require('cors')
const app = express()
const port = 8080

app.use(cors())

app.get('/api/v1/todos', (req, res) => {
  res.json({
    data: [
        {
            todoID: 1,
            todoTitle: "test 1",
        },
        {
            todoID: 2,
            todoTitle: "test 2",
        },
        {
            todoID: 3,
            todoTitle: "test 3",
        }
    ]
  })
})

app.get('/api/v1/health', (req, res) => {
    res.json({
        "data": "ok"
    })  
})

app.listen(port, () => {
  console.log(`backend listening on port ${port}`)
})