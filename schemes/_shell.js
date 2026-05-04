/* ─────────────────────────────────────────────────────────────
   _shell.js — shared minimal logic for scheme pilots.
   Each scheme imports + defines a `drawField(ctx,T,MX,MY)` hook.
   ───────────────────────────────────────────────────────────── */

(function(){
  const CV = document.getElementById('cv');
  if(!CV) return;
  const CTX = CV.getContext('2d');
  let VW=0, VH=0, MX=0, MY=0, T=0;

  function resize(){
    const dpr = window.devicePixelRatio||1;
    VW = window.innerWidth; VH = window.innerHeight;
    CV.width = Math.round(VW*dpr); CV.height = Math.round(VH*dpr);
    CV.style.width = VW+'px'; CV.style.height = VH+'px';
    CTX.setTransform(dpr,0,0,dpr,0,0);
  }
  resize(); window.addEventListener('resize', resize);

  window.addEventListener('mousemove', e=>{ MX=e.clientX; MY=e.clientY;
    const cur = document.getElementById('cur');
    if(cur){ cur.style.left=MX+'px'; cur.style.top=MY+'px'; }
  });

  function tick(){
    T += 1/60;
    if(typeof window.drawField === 'function'){
      window.drawField(CTX, T, MX, MY, VW, VH);
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  /* drawer */
  window.openDrawer = function(cat, title, body){
    document.body.classList.add('drawer-open');
    const dw = document.getElementById('drawer');
    document.getElementById('dw-cat').textContent = cat||'';
    document.getElementById('dw-body').innerHTML =
      `<h1>${title||''}</h1><p>${body||''}</p>`;
    dw.classList.add('open');
  };
  window.closeDrawer = function(){
    document.body.classList.remove('drawer-open');
    document.getElementById('drawer').classList.remove('open');
    document.getElementById('drawer').classList.remove('expanded');
  };
  window.toggleDrawerExpand = function(){
    document.getElementById('drawer').classList.toggle('expanded');
  };

  /* theme chooser */
  window.openThemeChooser = function(){ document.getElementById('theme-chooser').classList.add('on'); };
  window.closeThemeChooser = function(){ document.getElementById('theme-chooser').classList.remove('on'); };

  /* tutorial */
  window.closeTut = function(){ document.getElementById('tut').classList.remove('on'); };
  window.nextTut  = function(){ window.closeTut(); };

  /* gallery */
  window.openGallery = function(){ document.getElementById('image-view').classList.add('on'); };
  window.closeGallery = function(){ document.getElementById('image-view').classList.remove('on'); };

  /* tip helpers */
  const tip = document.getElementById('tip');
  window.showTip = function(x,y,cat,title,sub,time){
    if(!tip) return;
    document.getElementById('tip-cat').textContent = cat||'';
    document.getElementById('tip-title').textContent = title||'';
    document.getElementById('tip-sub').textContent = sub||'';
    document.getElementById('tip-time').textContent = time||'';
    tip.style.left = (x+18)+'px'; tip.style.top = (y+18)+'px';
    tip.style.opacity = '1';
  };
  window.hideTip = function(){ if(tip) tip.style.opacity='0'; };
})();
