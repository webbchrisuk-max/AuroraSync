async function load(){
  const res=await fetch("../AuroraSync.json"); const d=await res.json();
  const plan=d.dividend_planner;
  const months=plan.monthly_breakdown.map(m=>m.month);
  const values=plan.monthly_breakdown.map(m=>m.total_estimated_income);

  // Chart
  Plotly.newPlot('chart',[{x:months,y:values,type:'bar'}],{
    margin:{t:10,l:40,r:10,b:60},
    paper_bgcolor:'rgba(0,0,0,0)',plot_bgcolor:'rgba(0,0,0,0)',
    xaxis:{tickangle:-30,color:'#fff'},yaxis:{color:'#fff',title:'£ / month'},
  },{displayModeBar:false});

  // Table
  const rows=plan.monthly_breakdown.map(m=>`<tr><td>${m.month}</td><td>£${m.total_estimated_income.toFixed(2)}</td></tr>`).join("");
  document.getElementById("table").innerHTML=`
    <table class="table"><thead><tr><th>Month</th><th>Expected (£)</th></tr></thead><tbody>${rows}</tbody></table>
  `;
}
document.addEventListener("DOMContentLoaded",load);