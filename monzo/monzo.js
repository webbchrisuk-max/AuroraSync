// === Monzo Aurora Dashboard – Live JSON Data Loader === //

async function loadMonzoData() {
  try {
    const response = await fetch("/AuroraSync.json?nocache=" + Date.now());
    const data = await response.json();

    // confirm data loaded
    console.log("✅ Monzo data loaded:", data);

    // ===============================
    //  MONZO ACCOUNT SUMMARY
    // ===============================
    const monzo = data.monzo || data; // adjust if nested later

    document.getElementById("main-balance").textContent =
      "£" + monzo.main_balance.toFixed(2);

    document.getElementById("flex-balance").textContent =
      "£" + monzo.flex_balance.toFixed(2);

    document.getElementById("weekly-allowance").textContent =
      "£" + monzo.weekly_allowance.toFixed(2);

    document.getElementById("daily-allowance").textContent =
      "£" + monzo.daily_allowance.toFixed(2);

    document.getElementById("next-payday").textContent =
      monzo.next_payday;

    // ===============================
    //  POTS OVERVIEW
    // ===============================
    const potsList = document.getElementById("pots-list");
    potsList.innerHTML = ""; // clear placeholder items

    for (const [potName, pot] of Object.entries(monzo.pots)) {
      const li = document.createElement("li");

      // show current vs target (rounded to 2dp)
      li.innerHTML = `
        <strong>${potName}</strong><br>
        £${pot.current.toFixed(2)} / £${pot.target.toFixed(2)}
      `;

      potsList.appendChild(li);
    }

    // ===============================
    //  LAST SYNC
    // ===============================
    if (document.getElementById("last-sync")) {
      document.getElementById("last-sync").textContent = monzo.last_sync;
    }

  } catch (err) {
    console.error("⚠️ Failed to load Monzo data:", err);
    const error = document.createElement("p");
    error.style.color = "#ff8080";
    error.textContent = "Error loading data. Please refresh.";
    document.body.appendChild(error);
  }
}

// run when page finishes loading
document.addEventListener("DOMContentLoaded", loadMonzoData);
