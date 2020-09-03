const express = require("express")
const session = require("express-session")
const KnexSessionStore = require("connect-session-knex")(session)
const db = require("./database/config")
const usersRouter = require("./users/users-router")
const server = express()
const port = process.env.PORT || 5000


server.use(express.json())
server.use(session({
	resave: false, 
	saveUninitialized: false, 
	secret: "keep it secret, keep it safe",
	store: new KnexSessionStore({
		knex: db, 
		createtable: true, 
	}),
}))

server.use(usersRouter)

server.use((err, req, res, next) => {
	console.log(err)
	
	res.status(500).json({
		message: "Something went wrong",
	})
})

server.listen(port, () => {
	console.log(`Running at http://localhost:${port}`)
})