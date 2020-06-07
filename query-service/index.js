const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())
const postsNComments = {} // {postId:{postId, postTitle, comments: [{id, comment, postids}]}}
app.post('/events',(req, res)=> {
  const {type, data} = req.body.event
  console.log(eventType, 'eventType')
  if(type === 'postCreatedEvent'){
      const {id, title} = data
      postsNComments[id] = {id, title, comments: []}
  }
  if(type === 'commentCreatedEvent'){
      const {id, content, postId} = data
      postsNComments[postId].comments.push({id,content})
  }
  res.send({status:201})
})

app.get('/posts', (req, res)=>{
    res.status({"status": 200}).send(postsNComments)
})

app.listen(4002, ()=> {
    console.log('listening on port 4002')
})