import { Schema } from 'mongoose'

export const urlSchema = new Schema({
    original_url: String,
    short_url: Number
})

