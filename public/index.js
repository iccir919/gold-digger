let goldPrice = null
const eventSource = new EventSource("/price/live")

const priceDisplay = document.getElementById("price-display")
const connectionStatus = document.getElementById("connection-status")

const form = document.querySelector("form")
const investmentAmount = document.getElementById("investment-amount")
const formFootnote = document.getElementsByClassName("footnote")[0]

const dialog = document.querySelector("dialog")
const dialogBtn = document.querySelector("dialog button") 

eventSource.onmessage = (event) => {
    connectionStatus.textContent = "Live Price 🟢"

    const data = JSON.parse(event.data)
    console.log(data)
    goldPrice = data.price
    priceDisplay.textContent = goldPrice
}

eventSource.onerror = () => {
    connectionStatus.textContent = "Disconnected 🔴"
    priceDisplay.textContent = "----.--"
}



document.getElementById("invest-btn").addEventListener("click", async (e) => {
    e.preventDefault()


    try {
        const amountPaid = Number(investmentAmount.value)
        if (amountPaid <= 0) throw new Error("Amount paid is below 0")

        const response = await fetch("/invest", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                 timestamp: new Date(),
                 "amount paid": amountPaid,
                 "gold price": goldPrice,
                 "gold sold": amountPaid / goldPrice
            })
        })

        if (response.ok) {
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