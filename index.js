import express, { json } from 'express' // require -> commonJS
import cors from 'cors'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import isUrl from 'is-url'
import dotenv from 'dotenv'
import './database.js'
dotenv.config()

// Basic Configuration
const port = process.env.PORT || 3000;




const app = express()
app.use(cors('*'));
app.use(express.static('public'))
app.use(json())
app.disable('x-powered-by')


app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.use(bodyParser.urlencoded({
  extended: false
}))

// Schemas
const urlSchema = new mongoose.Schema({
  original_url: String,
  short_url: Number
})

const Url = mongoose.model('Url', urlSchema)

// Your first API endpoint

app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

// Agrega nuevas, las enumera bien
// El problema es que si hay repetidas, las agrega como nuevas, tambien no devuelve nada
app.post('/api/shorturl', async (req, res) => {
  const url = req.body.url
  if (!isUrl(url)) {
    res.json({ error: "invalid url" });
  }
  console.log(url)
  //const u = await Url.find({original_url: url}).exec()
  const u = await Url.findOne({original_url: url})
  console.log(u)
  if(u) {
    console.log('entre')
    res.json({
      original_url: u.original_url,
      short_url: u.short_url
    })
    return
  }
  const count = await Url.countDocuments()
  console.log('count', count)
  const newUrl = new Url({
    original_url : url,
    short_url: count + 1
  })

  newUrl.save().then((savedUrl) => {
    res.json({
      original_url: savedUrl.original_url,
      short_url: savedUrl.short_url
    })
  })

})

app.get('/api/shorturl/:index', async (req, res) => {
  const url = await Url.findOne({short_url: req.params.index})
  res.redirect(url.original_url)
})
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
