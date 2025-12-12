import { sendResponse } from "../utils/sendResponse.js"
import { parseJSONBody } from "../utils/parseJSONBody.js"
import { addNewInvestment } from "../utils/addNewInvestment.js"
import { getPrice } from "../utils/getPrice.js"


export async function handlePost(req, res) {
    try {
        const parsedBody = await parseJSONBody(req)

        await addNewInvestment(parsedBody)

        sendResponse(res, 201, "application/json", JSON.stringify(parsedBody))
    } catch (err) {
        console.log(err)
        sendResponse(res, 400, "application/json", JSON.stringify({ error: err }))
    }
}

export async function handlePrice(req, res) {
    res.statusCode = 200

    res.setHeader("Content-Type", "text/event-stream")
    res.setHeader("Cache-Control", "no-cache")
    res.setHeader("Connection", "keep-alive")

    setInterval(() => {
        const price = getPrice()

        res.write(
            `data: ${JSON.stringify({
                event: 'price-update',
                price: price
            })}\n\n`
        )
    }, 3000)
}