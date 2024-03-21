import express from "express"
import bcrypt from "bcrypt"
import cors from "cors"
import knex from "knex"

import { register } from "./controllers/register.js"
import { signin } from "./controllers/signin.js"
import { profile } from "./controllers/profile.js"
import { image } from "./controllers/image.js"

const PORT = process.env.PORT || 3000

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "postgres",
    database: "smartbrain"
  }
})

const app = express()
app.use(express.json());
app.use(cors())

app.post("/signin", (req, res) => { signin(req, res, db, bcrypt) })
app.post("/register", (req, res) => { register(req, res, db, bcrypt) })
app.get("/profile/:id", (req, res) => { profile(req, res, db) })
app.post("/image", (req, res) => { image(req, res, db) })

app.listen(PORT, () => {
})