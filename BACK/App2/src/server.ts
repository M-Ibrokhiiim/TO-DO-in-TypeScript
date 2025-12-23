import express from "express"
import  cors from "cors"
import router from "./routers/routers.js"
import { CentralErrorHandler } from "./middlewares/err.middleware.js";

const PORT = 3000;
const server = express()
server.use(cors())
server.use(express.json())

server.use('/api',router)

server.use(CentralErrorHandler)

server.listen(PORT,()=>{
    console.log(`Server is working on ${PORT}`)
})