const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())

app.post('/events', async (req, res)=>{
    const {type, data} = req.body.event 

    if (type === 'commentCreatedEvent'){
        status = data.content.includes('orange')? 'rejected': 'approved'
        await axios.post('http://localhost:4005/events', {
            type: 'commentModeratedEvent',
            data: {
                content: data.content,
                status,
                postId: data.postId,
                id: data.id
            }
        })
    }
    res.send({})

})

app.listen(4003, ()=>console.log('app listening on port 4003'))
