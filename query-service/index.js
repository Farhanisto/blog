const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())
app.use(cors())
const postsNComments = {} // {postId:{postId, postTitle, comments: [{id, comment, postids}]}}
const handleEvents = (type, data)=> {
    if(type === 'postCreatedEvent'){
        const {id, title} = data
        postsNComments[id] = {id, title, comments: []}
    }
    if(type === 'commentCreatedEvent'){
        const {id, content, postId, status} = data
        postsNComments[postId].comments.push({id, content, status})
    }
    if(type === 'commentUpdatedEvent'){
        const {id,status,postId,content} = data
        console.log(postsNComments, 'postsncome')
        const commentToUpdate = postsNComments[postId].comments.find(comment => comment.id === id)
        commentToUpdate.status = status
        commentToUpdate.content = content
    }
}
app.post('/events',(req, res)=> {
  const {type, data} = req.body.event
  handleEvents(type, data)
  res.send({status:201})
})

app.get('/posts', (req, res)=>{
    // res.send(postsNComments)
    res.status(200).send(postsNComments)
})

app.listen(4002, async()=> {
    console.log('listening on port 4002')
    const res = await axios.get('http://localhost:4005/events')
    for(event of res.data){
        const {type, data} = event
        handleEvents(type, data)
    }
})