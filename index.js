import express, { json } from 'express' // require -> commonJS
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
//import './database.js'
import { shorturlRouter } from './routes/shorturl.js'
dotenv.config()

// Basic Configuration
const port = process.env.PORT || 3000;

const app = express()
app.use(cors('*'));
app.use(express.static('public'))
app.use(json())
app.disable('x-powered-by')


app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.use(bodyParser.urlencoded({
  extended: false
}))

// Your first API endpoint
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.use('/api/shorturl', shorturlRouter)

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
