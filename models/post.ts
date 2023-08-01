import { Schema, models, model } from 'mongoose'
import { getNextSequence } from './couter'

const postSchema = new Schema({
  _id: {
    type: Number,
    default: 0,
  },
  userId: {
    type: Schema.Types.Number,
    ref: 'User',
  },
  caption: {
    type: String,
    default: '',
  },
  tags: {
    type: String,
    default: '',
  },
  likes: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
})

postSchema.pre('save', async function (next) {
  if (!this.isNew) return
  this._id = await getNextSequence('post')
  next()
})

export const Post = models.Post || model('Post', postSchema)
