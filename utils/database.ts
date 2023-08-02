import mongoose from 'mongoose'
import { formatErrorResponse } from './response'

const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017'
const DB_NAME = process.env.DB_NAME || 'mv'
let isConnected: boolean = false

export const connectDB = async () => {
  mongoose.set('strictQuery', true)

  if (isConnected) {
    return Promise.resolve()
  }

  try {
    await mongoose.connect(DB_URL, {
      dbName: DB_NAME,
    })
    isConnected = true
  } catch (error) {
    return formatErrorResponse(error)
  }
}
