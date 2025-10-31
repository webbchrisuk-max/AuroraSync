// === Monzo Aurora Dashboard – Live JSON Loader (Final Corrected Build) === //

async function loadMonzoData() {
  try {
    // ✅ Absolute path to JSON file in the repo root
    const response = await fetch("/AuroraSync/AuroraSync.json?nocache=" + Date.now());
    if (!response.ok) throw new Error("Network response not ok");

    const data = await response.json();

    // ✅ Match lowercase "monzo" key
    const monzo = data.monzo;
    console.log("✅ Monzo data loaded:", monzo);

    // === BALANCES ===
    document.getElementById("main-balance").textContent = "£" + (monzo.main_balance ?? 0).toFixed(2);
    document.getElementById("weekly-tracker").textContent =
      "Spent £" + (monzo.weekly_spent ?? 0).toFixed(2) + " / £" + (monzo.weekly_allowance ?? 0).toFixed(2);

    // === POTS ===
    const potsContainer = document.getElementById("pots-list");
    potsContainer.innerHTML = "";
    if (monzo.pots && Object.keys(monzo.pots).length) {
      for (const [name, pot] of Object.entries(monzo.pots)) {
        const div = document.createElement("div");
        div.innerHTML = `<strong>${name}</strong><br>£${(pot.current ?? 0).toFixed(2)} / £${(pot.target ?? 0).toFixed(2)}`;
        potsContainer.appendChild(div);
      }
    } else {
      potsContainer.innerHTML = "<em>No pots found in JSON</em>";
    }

    // === LAST SYNC ===
    const lastSync = document.getElementById("last-sync");
    const syncValue = monzo.last_sync || data.last_sync || null;
    if (syncValue) {
      const parsed = new Date(syncValue);
      lastSync.textContent = "Last Sync: " + parsed.toLocaleString();
      lastSync.style.color = "#0ff";
    } else {
      lastSync.textContent = "Last Sync: Unknown";
      lastSync.style.color = "#f44";
    }

  } catch (err) {
    console.error("⚠️ Monzo data error:", err);
    document.getElementById("last-sync").textContent = "Error loading data. Please refresh.";
  }
}

document.addEventListener("DOMContentLoaded", loadMonzoData);
