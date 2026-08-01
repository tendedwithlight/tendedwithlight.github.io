fetch("voices.json",{cache:"force-cache"}).then(function(r){return r.json();}).then(function(d){window.AUDIO=d;}).catch(function(){});
