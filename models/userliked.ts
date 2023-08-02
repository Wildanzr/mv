import { Schema, models, model } from 'mongoose'

const userLikedSchema = new Schema({
  postId: {
    type: Schema.Types.Number,
    ref: 'Post',
    required: true,
  },
  userId: {
    type: Schema.Types.Number,
    ref: 'User',
    required: true,
  },
})

export const UserLiked = models.UserLiked || model('UserLiked', userLikedSchema)
