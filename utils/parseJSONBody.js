export async function parseJSONBody(req) {
    let body = ''

    for await (const chunk of req) {
        body += chunk
    }

    try {
        let result = JSON.parse(body)
        return result
    } catch (err) {
        throw new Error(`Invalid JSON formatL: ${err}`)
    }
}