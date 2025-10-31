// === Monzo Aurora Dashboard – Final Working Build === //

async function loadMonzoData() {
  try {
    // ✅ Fetch from repo root
    const response = await fetch("/AuroraSync/AuroraSync.json?nocache=" + Date.now());
    if (!response.ok) throw new Error("Network error " + response.status);
    const data = await response.json();

    // ✅ Use lowercase "monzo"
    const monzo = data.monzo;
    console.log("✅ Monzo data loaded:", monzo);

    // === BALANCES ===
    document.getElementById("main-balance").textContent = "£" + (monzo.main_balance ?? 0).toFixed(2);
    if (monzo.flex_balance !== undefined)
      document.getElementById("flex-balance").textContent = "£" + monzo.flex_balance.toFixed(2);
    
    // === WEEKLY TRACKER ==
    document.getElementById("weekly-spent").textContent =
  "£" + (monzo.weekly_spent ?? 0).toFixed(2);
document.getElementById("weekly-allowance").textContent =
  "£" + (monzo.weekly_allowance ?? 0).toFixed(2);
document.getElementById("daily-allowance").textContent =
  "£" + (monzo.daily_allowance ?? 0).toFixed(2);
document.getElementById("next-payday").textContent =
  monzo.next_payday ?? "—";

    // === POTS ===
    const potsContainer = document.getElementById("pots-list");
    potsContainer.innerHTML = "";
    if (monzo.pots && Object.keys(monzo.pots).length) {
      for (const [name, pot] of Object.entries(monzo.pots)) {
        const li = document.createElement("li");
        const current = pot.current ?? pot.current_total ?? 0;
        const target = pot.target ?? 0;
        li.innerHTML = `<strong>${name}</strong><br>£${current.toFixed(2)} / £${target.toFixed(2)}`;
        potsContainer.appendChild(li);
      }
    } else {
      potsContainer.innerHTML = "<li><em>No pots found in JSON</em></li>";
    }

    // === LAST SYNC ===
    const sync = monzo.last_sync || data.last_sync || "—";
    document.getElementById("last-sync").textContent = "Last Sync: " + sync;
    document.getElementById("last-sync").style.color = "#0ff";

  } catch (err) {
    console.error("⚠️ Monzo data error:", err);
    document.getElementById("last-sync").textContent = "⚠️ " + err.message;
    document.getElementById("last-sync").style.color = "#f55";
  }
}

document.addEventListener("DOMContentLoaded", loadMonzoData);
