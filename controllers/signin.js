export const signin = (req, res, db, bcrypt) => {
  const { password, email } = req.body

  if (!email || !password) {
    return res.status(400).json("Bad details")
  }

  db.select("hash").from("login")
    .where("email", "=", email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash)
      if (isValid) {
        return db.select("*").from("users")
          .where("email", "=", email)
          .then(user => {
            res.json(user[0])
          })
          .catch(err => res.status(400).json("Unable to get user"))
      } else {
        res.status(400).json("Wrong login details")
      }
    })
    .catch(err => res.status(400).json("Wrong login details"))
}