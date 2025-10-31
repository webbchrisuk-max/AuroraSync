// === Monzo Aurora Dashboard – Stable Build (No false errors) === //

async function loadMonzoData() {
  try {
    const response = await fetch("/AuroraSync/AuroraSync.json?nocache=" + Date.now());
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();
    const monzo = data.account_name === "Monzo Main" ? data : data.monzo || data;

    console.log("✅ Monzo data loaded:", monzo);

    // === BALANCES ===
    document.getElementById("main-balance").textContent =
      "£" + (monzo.main_balance ?? 0).toFixed(2);
    document.getElementById("flex-balance").textContent =
      "£" + (monzo.flex_balance ?? 0).toFixed(2);
    document.getElementById("weekly-allowance").textContent =
      "£" + (monzo.weekly_allowance ?? 0).toFixed(2);
    document.getElementById("daily-allowance").textContent =
      "£" + (monzo.daily_allowance ?? 0).toFixed(2);
    document.getElementById("next-payday").textContent = monzo.next_payday ?? "—";

    // === POTS ===
    const potsContainer = document.getElementById("pots-list");
    potsContainer.innerHTML = "";
    if (monzo.pots && Object.keys(monzo.pots).length) {
      for (const [potName, pot] of Object.entries(monzo.pots)) {
        const li = document.createElement("li");
        li.innerHTML = `
          <strong>${potName}</strong><br>
          £${(pot.current ?? pot.current_total ?? 0).toFixed(2)} / £${(pot.target ?? 0).toFixed(2)}
        `;
        potsContainer.appendChild(li);
      }
    } else {
      potsContainer.innerHTML = "<li>No pots found in JSON</li>";
    }

    // === LAST SYNC ===
    const lastSyncElement = document.getElementById("last-sync");
    const syncValue =
      monzo.last_sync ||
      data.last_sync ||
      data.MonzoSync ||
      null;

    if (syncValue) {
      const parsed = new Date(syncValue);
      lastSyncElement.textContent =
        parsed.toString() !== "Invalid Date"
          ? parsed.toLocaleString()
          : syncValue;
    } else {
      lastSyncElement.textContent = "—";
    }

  } catch (err) {
    console.warn("⚠️ Partial Monzo data issue:", err.message);
    const lastSyncElement = document.getElementById("last-sync");
    if (lastSyncElement) lastSyncElement.textContent = "Sync error – retry later.";
  }
}

document.addEventListener("DOMContentLoaded", loadMonzoData);
