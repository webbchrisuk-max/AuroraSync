// === Monzo Aurora Dashboard Loader – Stable Fixed Build ===
// Fetch and load Monzo section from AuroraSync.json

async function loadMonzoData() {
  try {
    const response = await fetch("/AuroraSync/AuroraSync.json?nocache=" + Date.now());
    if (!response.ok) throw new Error("Network error: " + response.status);
    const data = await response.json();

    // ✅ Use lowercase "monzo" key from JSON
    const monzo = data.monzo;
    console.log("✅ Monzo data loaded:", monzo);

    // === BALANCES ===
    document.getElementById("main-balance").textContent =
      "£" + (monzo.main_balance ?? 0).toFixed(2);

    document.getElementById("flex-balance").textContent =
      "£" + (monzo.flex_balance ?? 0).toFixed(2);

    // === WEEKLY TRACKER ===
    document.getElementById("weekly-spent").textContent =
      "£" + (monzo.weekly_spent ?? 0).toFixed(2);

    document.getElementById("weekly-allowance").textContent =
      "£" + (monzo.weekly_allowance ?? 0).toFixed(2);

    document.getElementById("daily-allowance").textContent =
      "£" + (monzo.daily_allowance ?? 0).toFixed(2);

    document.getElementById("next-payday").textContent =
      monzo.next_payday ?? "—";

    // === POTS OVERVIEW ===
    const potsContainer = document.getElementById("pots-list");
    potsContainer.innerHTML = "";

    if (monzo.pots && Object.keys(monzo.pots).length) {
      for (const [name, pot] of Object.entries(monzo.pots)) {
        const li = document.createElement("li");
        const current = pot.current ?? 0;
        const target = pot.target ?? 0;
        li.innerHTML = `
          <strong>${name}</strong><br>
          £${current.toFixed(2)} / £${target.toFixed(2)}
        `;
        potsContainer.appendChild(li);
      }
    } else {
      potsContainer.innerHTML = "<em>No pots found in JSON</em>";
    }

    // === LAST SYNC TIMESTAMP ===
    const lastSyncElement = document.getElementById("last-sync");
    if (monzo.last_sync) {
      const parsed = new Date(monzo.last_sync);
      lastSyncElement.textContent = "Last Sync: " + parsed.toLocaleString();
    } else {
      lastSyncElement.textContent = "Last Sync: " + new Date().toLocaleString();
    }

  } catch (err) {
    console.error("❌ Error loading Monzo data:", err);
    const lastSyncElement = document.getElementById("last-sync");
    if (lastSyncElement)
      lastSyncElement.textContent = "Error loading data. Please refresh.";
  }
}

// === Trigger once DOM ready ===
document.addEventListener("DOMContentLoaded", loadMonzoData);
