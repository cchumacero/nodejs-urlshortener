import { ShortUrlModel } from '../models/postgresql/shorturl.js';
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

}

export const redirectUrl = async (req, res) => {
    const index = req.params.index
    const url = await ShortUrlModel.obtenerShortUrl({ index })
    res.redirect(url.original_url);
}