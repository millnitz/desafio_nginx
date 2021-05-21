const express = require("express")
const mysql = require("mysql")
const faker = require("faker")

const config = {
  host: "mysql",
  user: "root",
  password: "root",
  database: "desafio"
}

const app = new express()
const conndb = mysql.createConnection(config)

app.get('/', (req, res) => {
  let body = "<h1>Full Cycle Rocks!</h1>"

  const name = faker.name.findName()

  conndb.query(`insert into people (name) values ("${name}");`)

  conndb.query("select name from from people;", (err, rows) => {
    if (err) throw err
    if (rows) {
      rows.forEach(row => {
        body = body + `<p>${row.NAME}</p>`
      })
    }
    res.send(`${body}`)
  })
})


app.listen(3000, () => console.log('Rodando na porta 3000'))
