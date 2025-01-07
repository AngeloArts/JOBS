require('dotenv').config()
require('express-async-errors');
//connect Db
const connectDB = require('./db/connectDB.js')
//express
const express = require('express')
const app = express()
//middleware
const notFound = require('./middleware/notFound')

//routers
const authRouter = require('./routes/authRouter')
const jobsRouter = require('./routes/jobsRouter')
//json parse
app.use(express.json())

//routes
app.get('/', (req, res)=>{
  res.send('wabadabadapdap')
})

app.use('/auth', authRouter)
app.use('/jobs', jobsRouter)


app.use(notFound)

//connect to DB then start server
const port = process.env.PORT || 3000;

const start = async ()=>{
  try {
    await connectDB(process.env.MONGO_URI)
    console.log("CONNECTED TO DATABASE")

    await app.listen(port)
    console.log(`Listening on Port:${port}...`)
  } catch (err) {
    console.log(err)
  }
}

start()