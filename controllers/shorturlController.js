import { ShortUrlModel, Url } from '../models/mongodb/shorturl.js';
import isUrl from 'is-url'

export const getUrl = async (req, res) => {
    const url = req.body.url
    if (!isUrl(url)) {
        res.json({ error: "invalid url" });
    }
    const u = await ShortUrlModel.buscarShortUrl({ url })
    if (u) {
        res.json({
            original_url: u.original_url,
            short_url: u.short_url
        })
        return
    }

    const newShortUrl = await ShortUrlModel.createShortUrl({ url })
    res.json({
        original_url: newShortUrl.original_url,
        short_url: newShortUrl.short_url
        })
    
    /*
    const count = await Url.countDocuments()

    const newUrl = new Url({
        original_url: url,
        short_url: count + 1
    })
    
    newUrl.save().then((savedUrl) => {
        res.json({
            original_url: savedUrl.original_url,
            short_url: savedUrl.short_url
        })
    })
        */

}

export const redirectUrl = async (req, res) => {
    const index = req.params.index
    const url = await ShortUrlModel.obtenerShortUrl({ index })
    res.redirect(url.original_url);
}