let goldPrice = 2129.23

export function getPrice(min = 784.79, max = 2475.98) {
    const change = Math.random() < 0.5 ? -1 : 1
    goldPrice += change

    goldPrice = Math.max(min, Math.min(max, goldPrice))

    return goldPrice
}