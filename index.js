const express = require('express')
require('dotenv').config()

const app = express()

const cors = require('cors')

const mongoose = require('mongoose')
app. use( express.json() )

app.use (cors())

app.get('/' , (req , res) => {
    res.send('my app !')

}) 


mongoose.connect( process.env.CONNECTION_STRING ,
    {
        useNewUrlParser : true ,
        useUnifiedTopology : true
    })

    const db = mongoose.connection ;

db.on("error", console.error.bind(console , "connection error:"));
db.once("open" , function(){
    console.log("database connected successufuly ...")
})

app.listen(process.env.PORT, ()=> {
    console.log(` app play on port ${process.env.PORT}`);

})
