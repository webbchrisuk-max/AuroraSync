async function load(){
  const res=await fetch("../AuroraSync.json");
  const data=await res.json();
  const m=data.monzo;

  // Balances
  const balEl=document.getElementById("balances");
  balEl.innerHTML=`
    <div class="row"><strong>Main:</strong> £${m.main_balance.toFixed(2)}</div>
    <div class="row"><strong>Flex:</strong> £${m.flex_balance.toFixed(2)}</div>
    <div class="row"><span class="badge">Next payday: ${m.next_payday}</span></div>
    <div class="row"><span class="badge">Daily allowance: £${m.daily_allowance.toFixed(2)}</span></div>
  `;

  // Weekly
  const w=m.weekly_spending;
  const remaining=(w.weekly_allowance - w.spent);
  document.getElementById("weekly").innerHTML=`
    <div>Week: ${w.week_start} → ${w.week_end}</div>
    <div>Spent: £${w.spent.toFixed(2)}</div>
    <div>Remaining: £${remaining.toFixed(2)}</div>
    <div class="progress"><div style="width:${(w.spent/w.weekly_allowance*100).toFixed(1)}%"></div></div>
  `;

  // Pots
  const potsEl=document.getElementById("pots");
  const pots=m.pots;
  const rows=[];
  for(const [name,val] of Object.entries(pots)){
    const current=val.current??val.current_total??0;
    const target=val.target??val.target_total??val.target??0;
    const pct=target>0?Math.min(100,(current/target*100)):0;
    rows.push(`
      <tr><td>${name}</td><td>£${current.toFixed(2)}</td><td>£${(target||0).toFixed(2)}</td></tr>
      <tr><td colspan="3"><div class="progress"><div style="width:${pct.toFixed(1)}%"></div></div></td></tr>
    `);
  }
  potsEl.innerHTML=`<table class="table"><thead><tr><th>Pot</th><th>Current</th><th>Target</th></tr></thead><tbody>${rows.join("")}</tbody></table>`;
}
document.addEventListener("DOMContentLoaded",load);