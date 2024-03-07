import { Router } from 'express'
import isUrl from 'is-url'
import { Url } from '../models/mongodb/shorturl.js'
export const shorturlRouter = Router()

shorturlRouter.post('/', async (req, res) => {
    const url = req.body.url
  if (!isUrl(url)) {
    res.json({ error: "invalid url" });
  }
  const u = await Url.findOne({original_url: url})
  if(u) {
    res.json({
      original_url: u.original_url,
      short_url: u.short_url
    })
    return
  }
  const count = await Url.countDocuments()

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

shorturlRouter.get('/:index', async (req, res) => {
    const url = await Url.findOne({short_url: req.params.index})
    res.redirect(url.original_url)
  })