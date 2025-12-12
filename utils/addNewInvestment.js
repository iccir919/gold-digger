
import path from "node:path"
import fs from "node:fs/promises"
import { getData } from "./getData.js"

export async function addNewInvestment(newInvestment) {
    try {
        const investments = await getData()
        investments.push(newInvestment)

        const pathJSON = path.join("data", "data.json")

        await fs.writeFile(
            pathJSON,
            JSON.stringify(investments, null, 2),
            "utf-8"
        )
    } catch (err) {
        throw new Error(err)
    }
}