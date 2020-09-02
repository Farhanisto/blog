const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
const events = []

app.post('/events',async (req, res)=>{
    const event = req.body
    events.push(event)
    await axios.post('http://post-cluster-ip:4000/events', {
        event
    })
    await axios.post('http://comments-service:4001/events', {
        event
    })
    await axios.post('http://query-srv:4002/events', {
        event
    })
    await axios.post('http://moderation-srv:4003/events', {
        event
    })
    res.send({status: '0k'})
})

app.get('/events', (req, res)=> {
    res.send(events)
    res.status('ok')
})

app.listen(4005, ()=>{
    console.log('listening on port 4005')
})