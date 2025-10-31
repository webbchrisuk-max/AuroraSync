// === Monzo Aurora Dashboard – Live JSON Data Loader (Stable Build) === //

async function loadMonzoData() {
  try {
    // ✅ Load JSON from the repo root
    const response = await fetch("/AuroraSync/AuroraSync.json?nocache=" + Date.now());
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();

    // ✅ Extract Monzo data block
    const monzo = data.account_name === "Monzo Main" ? data : data.monzo || data;

    console.log("✅ Monzo data loaded:", monzo);

    // === BALANCES ===
    document.getElementById("main-balance").textContent =
      "£" + monzo.main_balance.toFixed(2);

    document.getElementById("flex-balance").textContent =
      "£" + monzo.flex_balance.toFixed(2);

    document.getElementById("weekly-allowance").textContent =
      "£" + monzo.weekly_allowance.toFixed(2);

    document.getElementById("daily-allowance").textContent =
      "£" + monzo.daily_allowance.toFixed(2);

    document.getElementById("next-payday").textContent = monzo.next_payday;

    // === POTS SECTION ===
    const potsContainer = document.getElementById("pots-list");
    potsContainer.innerHTML = "";

    if (monzo.pots && Object.keys(monzo.pots).length > 0) {
      for (const [potName, pot] of Object.entries(monzo.pots)) {
        const li = document.createElement("li");
        const current = pot.current ?? pot.current_total ?? 0;
        const target = pot.target ?? 0;

        li.innerHTML = `
          <strong>${potName}</strong><br>
          £${current.toFixed(2)} / £${target.toFixed(2)}
        `;

        potsContainer.appendChild(li);
      }
    } else {
      potsContainer.innerHTML = "<li>No pots found in JSON</li>";
    }

    // === LAST SYNC ===
    const lastSyncElement = document.getElementById("last-sync");
    if (monzo.last_sync) {
      lastSyncElement.textContent = new Date(monzo.last_sync).toLocaleString();
    } else if (data.last_sync) {
      lastSyncElement.textContent = new Date(data.last_sync).toLocaleString();
    } else {
      lastSyncElement.textContent = "N/A";
    }

  } catch (err) {
    console.error("⚠️ Failed to load Monzo data:", err);

    const errorNotice = document.createElement("p");
    errorNotice.style.color = "#ff5f5f";
    errorNotice.textContent = "Error loading data. Please refresh.";
    document.body.appendChild(errorNotice);
  }
}

// Run once page is ready
document.addEventListener("DOMContentLoaded", loadMonzoData);
