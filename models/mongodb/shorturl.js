import { model } from 'mongoose'
import { urlSchema } from "../../schemas/shorturls.js"

export const Url = model('Url', urlSchema)

export class ShortUrlModel {
    static async buscarShortUrl ({ url }) {
        return Url.findOne({ original_url: url })
    }

    static async createShortUrl ({ url }) {
        const count = await Url.countDocuments()

        const newUrl = new Url({
            original_url: url,
            short_url: count + 1
        })

        newUrl.save()
        return Url.findOne({ original_url: url })
    }

    static async obtenerShortUrl ({ index }) {
        return Url.findOne({ short_url: index})
    }
}