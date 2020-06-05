const express = require('express')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res)=> {

    const postId = req.params.id 
    comments = commentsByPostId[postId] || []
    res.status(200).send(comments)
})

app.post('/posts/:id/comments', (req, res)=> {
    const commentId = randomBytes(4).toString('hex')
    const {content} = req.body
    const postId = req.params.id
    const comments = commentsByPostId[postId] || []
    console.log(comments, 'comments')
    comments.push({id: commentId, content})
    commentsByPostId[postId] = comments

    res.status(201).send(comments)
})

app.listen(4001, ()=> console.log('listening on port 4001'))