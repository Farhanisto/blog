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
    comments.push({id: commentId, content, status: 'pending'})
    commentsByPostId[postId] = comments
    await axios.post('http://localhost:4005/events', {
        type: 'commentCreatedEvent',
        data: {
            id:commentId,
            content,
            postId,
            status: 'pending'
        }
    })
    res.status(201).send(comments)
})

app.post('/events', (req, res) => {
    const {type, data} = req.body.event
    console.log(`recieved event of type ${type}`)
    if (type === 'commentModeratedEvent') {
        const {id, postId, content, status } = data
        const post = commentsByPostId[postId]
        const commentToUpdate = post[postId].comments.find(comment=> comment.id ===id)
        commentToUpdate.status = status

        await axios.post('http://localhost:4005/events', {
            type: 'commentUpdatedEvent',
            data: {
                id, postId, content, status
            }
        })
    }
    res.send({})
})

app.listen(4001, ()=> console.log('listening on port 4001'))