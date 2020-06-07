const express = require('express')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res)=> {

    const postId = req.params.id 
    comments = commentsByPostId[postId] || []
    res.status(200).send(comments)
})

app.post('/posts/:id/comments', async (req, res)=> {
    const commentId = randomBytes(4).toString('hex')
    const {content} = req.body
    const postId = req.params.id
    const comments = commentsByPostId[postId] || []
    console.log(comments, 'comments')
    comments.push({id: commentId, content})
    commentsByPostId[postId] = comments
    await axios.post('http://localhost:4005/events', {
        type: 'commentCreatedEvent',
        data: {
            commentId,
            content,
            postId
        }
    })
    res.status(201).send(comments)
})

app.post('/events', (req, res) => {
    console.log(`recieved event of type ${req.body.event.type}`)
    res.send({})
})

app.listen(4001, ()=> console.log('listening on port 4001'))