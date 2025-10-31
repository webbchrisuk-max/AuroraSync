function money(n){return "£"+n.toFixed(2)}
async function load(){
  const res=await fetch("../AuroraSync.json"); const d=await res.json();

  // IG ISA
  const ig=d.isa.ig_isa;
  const igTop = `
    <div class="kpi">
      <span class="badge">Balance: ${money(ig.balance)}</span>
      <span class="badge">Book Cost: ${money(ig.book_cost)}</span>
      <span class="badge">Cash: ${money(ig.cash_balance)}</span>
    </div>
  `;
  const igRows=ig.holdings.map(h=>`<tr><td>${h.ticker}</td><td>${h.shares}</td><td>${money(h.value)}</td><td>${money(h.book_cost)}</td></tr>`).join("");
  document.getElementById("ig").innerHTML=igTop+`<table class="table"><thead><tr><th>Ticker</th><th>Sh</th><th>Value</th><th>Book</th></tr></thead><tbody>${igRows}</tbody></table>`;

  // Trade212
  const t=d.isa.trade212;
  const tTop = `
    <div class="kpi">
      <span class="badge">Balance: ${money(t.balance)}</span>
      <span class="badge">Cash: ${money(t.cash_balance)}</span>
      <span class="badge">Investments: ${money(t.investments_value)}</span>
      <span class="badge">Cash APR: ${t.annual_interest_rate}%</span>
    </div>
  `;
  const tRows=t.holdings.map(h=>`<tr><td>${h.ticker}</td><td>${h.shares}</td><td>${money(h.value)}</td></tr>`).join("");
  document.getElementById("t212").innerHTML=tTop+`<table class="table"><thead><tr><th>Ticker</th><th>Sh</th><th>Value</th></tr></thead><tbody>${tRows}</tbody></table>`;

  // Tesco
  const te=d.isa.tesco_shares;
  const teTop = `
    <div class="kpi">
      <span class="badge">Value: ${money(te.total_value)}</span>
      <span class="badge">Book: ${money(te.book_cost)}</span>
      <span class="badge">Gain: ${money(te.unrealised_gain)}</span>
      <span class="badge">Shares: ${te.total_shares}</span>
    </div>
  `;
  document.getElementById("tesco").innerHTML=teTop+`
    <div>Dividend Reinvestment: <strong>${te.dividend_reinvestment}</strong></div>
  `;
}
document.addEventListener("DOMContentLoaded",load);