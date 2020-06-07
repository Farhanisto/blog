const express = require('express')
const { randomBytes } = require('crypto')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')

const app =express()
app.use(bodyParser.json())
app.use(cors())


const port = 4000

let posts = {}

app.get('/posts', (req, res) => {res.send(posts)})
app.post('/posts', async (req, res)=>{
  const id = randomBytes(4).toString('hex')
  const { title } = req.body
  posts[id] = {id, title}
  await axios.post('http://localhost:4005/events',{
      type: 'postCreatedEvent',
      data: {
          id,
          title
        }
  })
  res.status(201).send(posts[id])
})

app.listen(port, ()=> console.log(`listening on port ${port}`))