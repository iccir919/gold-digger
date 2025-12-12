import { sendResponse } from "../utils/sendResponse.js"
import { parseJSONBody } from "../utils/parseJSONBody.js"
import { addNewInvestment } from "../utils/addNewInvestment.js"


export async function handlePost(req, res) {
    try {
        const parsedBody = await parseJSONBody(req)
        console.log(parsedBody)
        await addNewInvestment(parsedBody)

        sendResponse(res, 201, "application/json", JSON.stringify(parsedBody))
    } catch (err) {
        console.log(err)
        sendResponse(res, 400, "application/json", JSON.stringify({ error: err }))
    }
}