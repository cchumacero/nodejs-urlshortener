import { Router } from 'express'
import { getUrl , redirectUrl} from '../controllers/shorturlController.js'
export const shorturlRouter = Router()

shorturlRouter.post('/', getUrl)
shorturlRouter.get('/:index', redirectUrl)