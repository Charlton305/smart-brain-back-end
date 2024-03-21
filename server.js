import express from "express"
import bcrypt from "bcrypt"
import cors from "cors"
import knex from "knex"

import { register } from "./controllers/register.js"
import { signin } from "./controllers/signin.js"
import { profile } from "./controllers/profile.js"
import { image } from "./controllers/image.js"

const PORT = process.env.PORT || 3000

const { DATABASE_HOST, DATABASE_URL, DATABASE_USER, DATABASE_PW, DATABASE_DB } = process.env

const db = knex({
  client: "pg",
  connection: {
    connectionString: DATABASE_URL,
    host: DATABASE_HOST,
    port: 5432,
    user: DATABASE_USER,
    password: DATABASE_PW,
    database: DATABASE_DB
  }
})

const app = express()
app.use(express.json());
app.use(cors())

app.get("/", (req, res) => res.send("App is working!"))
app.post("/signin", (req, res) => { signin(req, res, db, bcrypt) })
app.post("/register", (req, res) => { register(req, res, db, bcrypt) })
app.get("/profile/:id", (req, res) => { profile(req, res, db) })
app.post("/image", (req, res) => { image(req, res, db) })

app.listen(PORT, () => {
  console.log("Server is up!")
})