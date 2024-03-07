import { Schema , model } from 'mongoose'

const urlSchema = new Schema({
    original_url: String,
    short_url: Number
  })
      
export const Url = model('Url', urlSchema)