import cors from 'cors'
import dotenv from 'dotenv'
import session from 'express-session'
import connection from './config/config'
import express from 'express'

connection.sync({ force: true })

dotenv.config()

const app = express()
const routes = require('./routes/')

const port = process.env.PORT
const secret = process.env.SECRET

const bodyParser = require('body-parser')
const multer = require('multer')
const forms = multer()
const cookieParser = require('cookie-parser')

app.use(cookieParser())

app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: 'auto',
      sameSite: 'none'
    },
  })
)

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
)

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(forms.array())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(routes)

app.listen(port, () => {
  console.log(`Application run on http://localhost:${port}`)
})

export default app
