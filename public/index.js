const priceDisplay = document.getElementById("price-display")
const connectionStatus = document.getElementById("connection-status")

const investmentAmount = document.getElementById("investment-amount")
const formFootnote = document.getElementsByClassName("footnote")[0]

const dialog = document.querySelector("dialog")

document.getElementById("invest-btn").addEventListener("click", async (e) => {
    e.preventDefault()

    try {
        const response = await fetch("/invest", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ amount: investmentAmount.value })
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