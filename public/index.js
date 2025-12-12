const eventSource = new EventSource("/price/live")

const priceDisplay = document.getElementById("price-display")
const connectionStatus = document.getElementById("connection-status")

const investmentAmount = document.getElementById("investment-amount")
const formFootnote = document.getElementsByClassName("footnote")[0]

const dialog = document.querySelector("dialog")
const dialogBtn = document.querySelector("dialog button") 

eventSource.onmessage = (event) => {
    connectionStatus.textContent = "Live Price 🟢"

    const data = JSON.parse(event.data)
    const price = data.price
    priceDisplay.textContent = price
}

eventSource.onerror = () => {
    connectionStatus.textContent = "Disconnected 🔴"
    priceDisplay.textContent = "----.--"
}



document.getElementById("invest-btn").addEventListener("click", async (e) => {
    e.preventDefault()

    try {
        const response = await fetch("/invest", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                 timestamp: new Date(),
                 amount: Number(investmentAmount.value),
                 price: 0.6 
            })
        })

        if (response.ok) {
            dialog.showModal()
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
})