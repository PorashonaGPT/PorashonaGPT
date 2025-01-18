import { MongoClient, ServerApiVersion, Db } from 'mongodb'

const uri = process.env.MONGODB_URI
if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local or Vercel environment variables')
}

const options = {
  serverApi: ServerApiVersion.v1,
  maxPoolSize: 10,
  connectTimeoutMS: 5000,
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export const getMongoClient = async (): Promise<MongoClient> => {
  try {
    const client = await clientPromise
    return client
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error)
    throw new Error('Unable to connect to MongoDB')
  }
}

export const getDb = async (): Promise<Db> => {
  try {
    const client = await getMongoClient()
    return client.db("porashonagpt")
  } catch (error) {
    console.error('Failed to get MongoDB database:', error)
    throw new Error('Unable to access MongoDB database')
  }
}

export const getCollection = async (collectionName: string) => {
  try {
    const db = await getDb()
    return db.collection(collectionName)
  } catch (error) {
    console.error('Failed to get MongoDB collection:', error)
    throw new Error('Unable to access MongoDB collection')
  }
}

