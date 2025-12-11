import { sendResponse } from "../utils/sendResponse.js"
import { parseJSONBody } from "../utils/parseJSONBody.js"

export async function handlePost(req, res) {
    try {
        const parsedBody = await parseJSONBody(req)
        sendResponse(res, 201, "application/json", JSON.stringify(parsedBody))
    } catch (err) {
        console.log(err)
        sendResponse(res, 400, "application/json", JSON.stringify({ error: err }))
    }
}