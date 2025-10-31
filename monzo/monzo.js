async function loadMonzoData() {
  try {
    const response = await fetch("/AuroraSync/AuroraSync.json?nocache=" + Date.now());
    if (!response.ok) throw new Error("HTTP " + response.status);
    const data = await response.json();
    console.log("Fetched data:", data);

    const monzo = data.monzo;
    if (!monzo) throw new Error("No 'monzo' key found in JSON");

    document.getElementById("main-balance").textContent = "£" + (monzo.main_balance ?? 0).toFixed(2);
    document.getElementById("weekly-tracker").textContent =
      "Spent £" + (monzo.weekly_spent ?? 0).toFixed(2) + " / £" + (monzo.weekly_allowance ?? 0).toFixed(2);

    const pots = monzo.pots || {};
    const list = document.getElementById("pots-list");
    list.innerHTML = "";
    for (const [name, pot] of Object.entries(pots)) {
      const div = document.createElement("div");
      div.textContent = `${name}: £${(pot.current ?? 0).toFixed(2)} / £${(pot.target ?? 0).toFixed(2)}`;
      list.appendChild(div);
    }

    const last = monzo.last_sync || data.last_sync || "—";
    document.getElementById("last-sync").textContent = "Last Sync: " + last;
    document.getElementById("last-sync").style.color = "#0ff";
  } catch (err) {
    console.error("Load error →", err);
    const msg = document.getElementById("last-sync");
    msg.textContent = "⚠️ " + err.message;
    msg.style.color = "#f55";
  }
}
document.addEventListener("DOMContentLoaded", loadMonzoData);
