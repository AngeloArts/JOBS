require('dotenv').config()
require('express-async-errors');
//connect Db
const connectDB = require('./db/connectDB.js')
//express
const express = require('express')
const app = express()
//middleware
const notFound = require('./middleware/notFound')
const errorHandlerMiddleware = require('./middleware/errorHandler')
const authMiddleware = require('./middleware/authMiddleware')
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
app.use('/jobs', authMiddleware, jobsRouter)


app.use(notFound)
app.use(errorHandlerMiddleware)

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