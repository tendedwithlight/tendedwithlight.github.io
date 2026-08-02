fetch("voices.json",{cache:"force-cache"}).then(function(r){return r.json();}).then(function(d){window.AUDIO=d;}).catch(function(){});
document.addEventListener("click",function(e){
  var t=e.target&&e.target.closest?e.target.closest("#printJournal"):null;
  if(!t) return;
  e.preventDefault(); e.stopImmediatePropagation();
  try{
    var pages=(DATA.pages||[]).slice().sort(function(a,b){return (a.date||"").localeCompare(b.date||"");});
    var title=((typeof CONFIG!=="undefined"&&CONFIG.ownerName)||"My")+"'s Journal";
    var body=pages.map(function(p){return "<article><div class='d'>"+fmt(p.date)+"</div>"+(p.img?"<img src='"+p.img+"'/>":"")+(p.text?"<p>"+esc(p.text)+"</p>":"")+"</article>";}).join("");
    if(!pages.length) body="<p>Your journal is still waiting for its first page.</p>";
    var html="<!doctype html><html><head><meta charset='utf-8'><title>"+esc(title)+"</title><style>body{font-family:Georgia,serif;color:#3B3240;max-width:640px;margin:40px auto;padding:0 24px;line-height:1.65}h1{font-weight:500;text-align:center;margin-bottom:6px}.sub{text-align:center;color:#999;margin-bottom:36px}article{margin:0 0 32px;padding-bottom:22px;border-bottom:1px solid #eee}.d{color:#b08d57;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:8px}img{max-width:100%;border-radius:8px;margin:6px 0}p{white-space:pre-wrap;margin:0}</style></head><body><h1>"+esc(title)+"</h1><div class='sub'>made with love ✦</div>"+body+"</body></html>";
    var blob=new Blob([html],{type:"text/html"});
    var url=URL.createObjectURL(blob);
    var a=document.createElement("a"); a.href=url; a.download=((typeof CONFIG!=="undefined"&&CONFIG.ownerName)||"My")+"-Journal.html";
    document.body.appendChild(a); a.click();
    setTimeout(function(){try{URL.revokeObjectURL(url);a.remove();}catch(_){}} ,4000);
    try{ celebrate("Saved ✦ — open it any time to read, print, or save as PDF"); }catch(_){}
  }catch(err){}
},true);
