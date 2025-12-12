let goldPrice = null
const eventSource = new EventSource("/price/live")

const priceDisplay = document.getElementById("price-display")
const connectionStatus = document.getElementById("connection-status")

const form = document.querySelector("form")
const investmentAmount = document.getElementById("investment-amount")
const investBtn = document.getElementById("invest-btn")
const formFootnote = document.getElementsByClassName("footnote")[0]

const dialog = document.querySelector("dialog")
const dialogBtn = document.querySelector("dialog button")
const investmentSummary = document.getElementById("investment-summary") 

eventSource.onmessage = (event) => {
    connectionStatus.textContent = "Live Price 🟢"

    const data = JSON.parse(event.data)
    goldPrice = data.price
    priceDisplay.textContent = goldPrice
}

eventSource.onerror = () => {
    connectionStatus.textContent = "Disconnected 🔴"
    priceDisplay.textContent = "----.--"
}



investBtn.addEventListener("click", async (e) => {
    e.preventDefault()


    try {
        const amountPaid = Number(investmentAmount.value)
        if (amountPaid <= 0) throw new Error("Amount paid is below 0")

        const goldSold = (amountPaid / goldPrice).toFixed(3)

        const response = await fetch("/invest", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                 timestamp: new Date(),
                 "amount paid": amountPaid,
                 "gold price": goldPrice,
                 "gold sold": goldSold
            })
        })

        if (response.ok) {
            investmentSummary.textContent = `You just bought ${goldSold} ounces (ozt) for £${amountPaid}.`

            dialog.showModal()
            formFootnote.textContent = "* 1oz = 1 troy ounce of 24 Carat Gold"
        } else {
            console.log(response)
            throw new Error(response.statusText)
        }


    } catch (err) {
        formFootnote.textContent = "Please try again!"
        console.error("Error:", err)
    }
})

dialogBtn.addEventListener("click", () => {
    dialog.close()
    form.reset()
})