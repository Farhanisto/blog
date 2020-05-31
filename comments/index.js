const express = require('express')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypo')

const app = express()
app.use(bodyParser.json())

app.get('/comments/:id/comments', ()=> {

})

app.post('/comments/:id/comments', ()=> {
    
})

app.listen(4001, ()=> console.log('listening on port 4001'))