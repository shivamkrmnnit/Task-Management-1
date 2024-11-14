const connectToMongo = require('./db');
const express = require('express')
var  cors = require('cors')

const cors = require('cors');


connectToMongo();

const app = express()
const port = 5000



app.use(cors({
  origin: 'https://task-management-1-snowy.vercel.app', // Replace with your actual frontend URL
}));

app.use(cors())
app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.get('/', (req, res) => {
  res.send('Hello Shivam!')
})

app.listen(port, () => {
  console.log(`iNodebook backend listening on port ${port}`)
})
