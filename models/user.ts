import { Schema, models, model } from 'mongoose'
import { getNextSequence } from './couter'

const userSchema = new Schema({
  _id: {
    type: Number,
    default: () => getNextSequence('user'),
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String, // TODO: hash password
    required: true,
  },
  photo: {
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

userSchema.pre('save', async function (next) {
  if (!this.isNew) return
  this._id = await getNextSequence('user')
  next()
})

export const User = models.User || model('User', userSchema)
