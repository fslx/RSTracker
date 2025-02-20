const fetchButton = document.getElementById("fetch-data");
const username = document.getElementById("username").value;
const xpRateInput = document.getElementById("custom-xp-rate").value;
const xpRateDropdown = document.getElementById("xp-rate").value;
const xpRate = xpRateInput ? parseInt(xpRateInput) : parseInt(xpRateDropdown);

fetchButton.addEventListener("click", async function () {
    if (!username) {
        document.getElementById("result").textContent = "Please enter a username!";
        return;
    }

    try {
        const response = await fetch(`https://api.wiseoldman.net/v2/players/${username}`);
        if (!response.ok) {
            throw new Error("Player not found!");
        }
        const data = await response.json();
        const totalXp = data.exp;
        const maxExp = 4600000000;
        const remainingExp = maxExp - totalXp;
        const hoursToMax = remainingExp / xpRate;
        const daysToMax = hoursToMax / 24;
        const yearsToMax = daysToMax / 365;
        document.getElementById("result").textContent = `Estimated time to max: ${yearsToMax.toFixed(2)} years`;
    } catch (error) {
        console.error(error);
        document.getElementById("result").textContent = "Error fetching player data!";
    }
})

