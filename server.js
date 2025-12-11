import http from "node:http"
import { serveStatic } from "./utils/serveStatic.js"
import { handlePost } from "./handlers/routeHandlers.js"

const PORT = 8000

const __dirname = import.meta.dirname

const server = http.createServer(async (req, res) => {

    if (req.url === "/invest") {
        if (req.method === "POST") {
            await handlePost(req, res)
        }
    } else if (!req.url.startsWith("/invest")) {
        return await serveStatic(req, res, __dirname)
    }
})

server.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`))

