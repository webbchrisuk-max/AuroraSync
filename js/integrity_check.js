async function validateAuroraSync(){
  const STATUS=document.getElementById("auroraSyncStatus");
  const DOT=document.getElementById("auroraSyncDot");
  const expectedChecksum="f08c2e2d7b9b4a6f94d1dce7caa1a1fdbb1e62a3cfb77534ae001ae989b4ed4f"; // from AuroraSync.json

  try{
    const res=await fetch("../AuroraSync.json").catch(()=>fetch("AuroraSync.json"));
    const data=await res.json();
    if(!data.integrity||!data.integrity.checksum){
      STATUS.textContent="⚠️ No integrity block found";
      DOT.style.background="#ff4444";DOT.style.boxShadow="0 0 20px #ff4444";return;
    }
    if(data.integrity.checksum===expectedChecksum && data.integrity.is_valid===true){
      STATUS.textContent=`✅ Synced (${data.integrity.last_validated})`;
      DOT.style.background="#00ffcc";DOT.style.boxShadow="0 0 20px #00ffcc";
    }else{
      STATUS.textContent="⚠️ Out of Date – Refresh Needed";
      DOT.style.background="#ffcc00";DOT.style.boxShadow="0 0 20px #ffcc00";
    }
  }catch(e){
    STATUS.textContent="❌ Sync Error";
    DOT.style.background="#ff4444";DOT.style.boxShadow="0 0 20px #ff4444";
    console.error(e);
  }
}
document.addEventListener("DOMContentLoaded",validateAuroraSync);