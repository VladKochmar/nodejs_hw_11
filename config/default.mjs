import dotenv from 'dotenv'
dotenv.config()

export default Object.freeze({
  databaseName: process.env.DATABASE_NAME,
  databaseUrl: process.env.MONGODB_URL,
  mongoURI: `${process.env.MONGODB_URL}${process.env.DATABASE_NAME}`,
  sekretKey: process.env.SEKRET_KEY,
  tokenKey: process.env.TOKEN_KEY,
  port: process.env.PORT,
})
