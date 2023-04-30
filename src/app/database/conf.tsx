import mongoose from 'mongoose'

const connectMongo = async () => {
  try {
    const url = process.env.MONGODB_URL
    if (!url) {
      throw new Error("MONGODB_URL environment variable is not defined")
    }
    const { connection } = await mongoose.connect(url)
    if (connection.readyState === 1) {
      console.log("Connected")
      return connection
    }
  } catch (error) {
    return Promise.reject(error)
  }
}

export default connectMongo
