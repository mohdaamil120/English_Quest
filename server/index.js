const express = require("express")
const { connection } = require("./db")
const { userRouter } = require("./routes/userRoutes")
const { bootRouter } = require("./routes/bookRoutes")
const cors = require('cors')

require("dotenv").config()

const app = express()
app.use(express.json())
app.use(cors())

app.use("/users",userRouter)
app.use("/books",bootRouter)

const PORT = process.env.PORT || 8080

app.listen(PORT, async()=>{
    try {
        await connection
        console.log("Conneced to DB")
        console.log(`Server is runnig at port ${PORT}`)
    } catch (error) {
        console.log(error)
    }
})