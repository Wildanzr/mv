import { Schema, models, model } from 'mongoose'

const counterSchema = new Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
  },
  seq: {
    type: Number,
    default: 0,
  },
})

const Counter = models.Counter || model('Counter', counterSchema)

export async function getNextSequence(name: string): Promise<number> {
  const count = await Counter.findByIdAndUpdate(
    name,
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  )

  return count.seq
}
