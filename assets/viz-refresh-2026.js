/* ─────────────────────────────────────────────────────────────────────
   viz-refresh-2026.js — drop-in patches for oone.html viz layer
   Loaded AFTER the inline script in oone.html. Monkey-patches globals.
   To disable: remove the <script> tag, or set
     window.OONE_USE_PHOTOREAL_BUBBLES = false
   before this file loads.

   Implements direction doc §6:
     1. Time-linked hue drift on thermalColor (±3° via Date.now)
     2. Variable-bandwidth kernel on buildThermal (k-NN bandwidth)
     3. Cursor-to-frame coupling for photoreal soap-bubble sprites
     4. Sprite compositor over procedural lensing in drawBubble
   ───────────────────────────────────────────────────────────────────── */

(function(){
  'use strict';
  if(window.OONE_VIZ_REFRESH_LOADED) return;
  window.OONE_VIZ_REFRESH_LOADED = true;

  /* ── 0. FERRO landing default ────────────────────────────────────
     The OONE scheme version (FERRO infrared) is the canonical landing.
     If the user has never explicitly chosen a scheme — or has only the
     legacy 'oone_v27' state without a saved scheme key — paint FERRO v2
     before first frame so the infrared/photoreal tone takes hold. If
     they HAVE chosen a scheme, respect it. */
  try{
    var explicitlyChosen = localStorage.getItem('oone_scheme_explicit');
    if(!explicitlyChosen && typeof window.applyScheme === 'function'){
      // applyScheme defined in inline script; safe to call after parse.
      window.applyScheme('s-fal', 'v2');
    }
    // Wrap applyScheme so any future call records that the user has
    // explicitly opted in (keeping their choice on next reload).
    if(typeof window.applyScheme === 'function' && !window._origApplyScheme){
      window._origApplyScheme = window.applyScheme;
      window.applyScheme = function(s, v){
        try{ localStorage.setItem('oone_scheme_explicit', '1'); }catch(e){}
        return window._origApplyScheme(s, v);
      };
    }
  }catch(e){ /* localStorage blocked — silent */ }

  /* ── helpers ─────────────────────────────────────────────────────── */
  function rotateHue(rgb, deg){
    var r=rgb[0]/255, g=rgb[1]/255, b=rgb[2]/255;
    var max=Math.max(r,g,b), min=Math.min(r,g,b), h, s, l=(max+min)/2;
    if(max===min){ h=s=0; }
    else {
      var d = max-min;
      s = l>.5 ? d/(2-max-min) : d/(max+min);
      switch(max){
        case r: h=(g-b)/d+(g<b?6:0); break;
        case g: h=(b-r)/d+2; break;
        default: h=(r-g)/d+4;
      }
      h /= 6;
    }
    h = (h + deg/360) % 1; if(h<0) h += 1;
    function hue2rgb(p,q,t){
      if(t<0) t+=1; if(t>1) t-=1;
      if(t<1/6) return p+(q-p)*6*t;
      if(t<.5)  return q;
      if(t<2/3) return p+(q-p)*(2/3-t)*6;
      return p;
    }
    var q = l<.5 ? l*(1+s) : l+s-l*s, p = 2*l-q;
    return [
      Math.round(hue2rgb(p,q,h+1/3)*255),
      Math.round(hue2rgb(p,q,h)*255),
      Math.round(hue2rgb(p,q,h-1/3)*255)
    ];
  }

  /* ── 1. time-linked hue drift on thermalColor ────────────────────── */
  if(typeof window.thermalColor === 'function'){
    var _origTC = window.thermalColor;
    window.thermalColor = function(t){
      var rgb = _origTC(t);
      // ±3° drift over ~14-minute cycle, driven by wall-clock so it
      // continues when the tab is blurred (per direction §5.3).
      var drift = Math.sin(Date.now()/420000) * 3;
      return rotateHue(rgb, drift);
    };
  }

  /* ── 2. variable-bandwidth kernel on buildThermal ────────────────── */
  if(typeof window.buildThermal === 'function'){
    window.buildThermal = function(){
      if(!window.CTX) return null;
      var vis = window.visibleEntries();
      if(!vis || !vis.length) return null;
      var now = Date.now();
      var SC = 4, SW = Math.ceil(window.VW/SC), SH = Math.ceil(window.VH/SC);
      var o = document.createElement('canvas');
      o.width = SW; o.height = SH;
      var ox = o.getContext('2d'); if(!ox) return null;
      ox.clearRect(0,0,SW,SH);
      ox.globalCompositeOperation = 'screen';

      // pre-compute positions
      var pts = vis.map(function(e){
        var p = window.entryPos(e, vis);
        return { e:e, x:p[0]/SC, y:p[1]/SC };
      });

      // per-point bandwidth = mean distance to k=4 nearest neighbours, clamped
      pts.forEach(function(pt){
        var dists = pts.map(function(q){
          return Math.hypot(pt.x-q.x, pt.y-q.y);
        }).filter(function(d){ return d>0; }).sort(function(a,b){ return a-b; });
        var k4 = dists.slice(0, 4);
        var avg = k4.length
          ? k4.reduce(function(a,b){return a+b;},0)/k4.length
          : 100;
        var bw = Math.max(22, Math.min(180, avg * 1.35));
        var age = (now - pt.e.t) / window.DAY;
        var rec = Math.exp(-age/22);

        // outer halo
        var c0 = window.thermalColor(.12);
        var rOut = bw * 1.7;
        var g0 = ox.createRadialGradient(pt.x,pt.y,0,pt.x,pt.y,rOut);
        g0.addColorStop(0,    'rgba('+c0+','+(.11+rec*.09).toFixed(3)+')');
        g0.addColorStop(.45,  'rgba('+c0+','+((.11+rec*.09)*.3).toFixed(3)+')');
        g0.addColorStop(1,    'rgba('+c0+',0)');
        ox.beginPath(); ox.arc(pt.x,pt.y,rOut,0,Math.PI*2);
        ox.fillStyle = g0; ox.fill();

        // inner core
        var c1 = window.thermalColor(.45);
        var rIn = bw * .8;
        var g1 = ox.createRadialGradient(pt.x,pt.y,0,pt.x,pt.y,rIn);
        g1.addColorStop(0,    'rgba('+c1+','+(.26+rec*.2).toFixed(3)+')');
        g1.addColorStop(.4,   'rgba('+c1+','+((.26+rec*.2)*.28).toFixed(3)+')');
        g1.addColorStop(1,    'rgba('+c1+',0)');
        ox.beginPath(); ox.arc(pt.x,pt.y,rIn,0,Math.PI*2);
        ox.fillStyle = g1; ox.fill();
      });

      return o;
    };
  }

  /* ── 3. preload photoreal bubble sprites ─────────────────────────── */
  window.OONE_BUBBLE_FRAMES = window.OONE_BUBBLE_FRAMES || {};
  var SPRITE_NAMES = [
    'about-idle','about-hover',
    'services-idle','services-hover',
    'log-idle','log-hover',
    'theme-idle','hero-beauty'
  ];
  SPRITE_NAMES.forEach(function(name){
    var img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload  = function(){ window.OONE_BUBBLE_FRAMES[name] = img; };
    img.onerror = function(){ /* not yet generated; silent */ };
    img.src = 'assets/bubbles/hero/' + name + '.png';
  });

  /* ── 4. cursor-proximity → frame index (0..1 for nearest bubble) ─ */
  window.bubbleProximityT = function(bx, by){
    var dx = (window.MX||0) - bx;
    var dy = (window.MY||0) - by;
    var d  = Math.sqrt(dx*dx + dy*dy);
    var R  = 360; // px — proximity falloff
    return Math.max(0, Math.min(1, 1 - d/R));
  };

  /* ── 5. sprite compositor + procedural Newton-ring iridescence ─── */
  // Wraps the existing procedural drawBubble. Three passes total:
  //   a) original procedural lensing (refraction of thermal field)
  //   b) procedural Newton-ring iridescence — runs ALWAYS, no asset needed.
  //      This is the heavy "OONE direction" move that makes bubbles
  //      photoreal-feeling without waiting for the sprite batch.
  //   c) sprite compositor — only fires if the matching PNG has loaded
  //      (will be empty until billing on the API key is enabled).
  if(typeof window.drawBubble === 'function' && window.OONE_USE_PHOTOREAL_BUBBLES !== false){
    var _origDB = window.drawBubble;

    // Per-bubble seed for film orientation (so they're not identical)
    var FILM_SEED = [0.0, 1.7, 3.3, 4.9];

    window.drawBubble = function(ctx, bx, by, r, acc, iP, hot, mx, my){
      // (a) procedural lensing
      _origDB.call(this, ctx, bx, by, r, acc, iP, hot, mx, my);

      // (b) procedural Newton-ring iridescence — matches the pilot
      // (schemes/oone.html .bub) gradient geometry exactly:
      //   • white caustic at 30% / 28%      — upper-left
      //   • warm film at  70% / 70%         — lower-right
      //   • cool film at  30% / 75%         — lower-left
      //   • accent tint  at 50% / 50%       — center
      //   • inset white rim glow            — frosted edge
      //   • inset accent interior glow      — warm body
      // Everything is static — no per-frame phase — so the bubbles read
      // as photographs, not as pulsing CSS effects. Proximity bumps
      // intensity only; the geometry holds still.
      var prox = window.bubbleProximityT(bx, by);
      var bump = 1 + 0.18 * prox;       // gentle bloom on hover

      ctx.save();
      ctx.beginPath();
      ctx.arc(bx, by, r * 0.985, 0, Math.PI * 2);
      ctx.clip();
      ctx.globalCompositeOperation = 'screen';

      // 1) white caustic specular — pilot 30% / 28%, falloff to transparent at 18%
      var c1x = bx - r * 0.40, c1y = by - r * 0.44;
      var g1 = ctx.createRadialGradient(c1x, c1y, 0, c1x, c1y, r * 0.55);
      g1.addColorStop(0.0,  'rgba(255,255,255,' + Math.min(1, 0.55 * bump).toFixed(3) + ')');
      g1.addColorStop(0.45, 'rgba(255,255,255,0.18)');
      g1.addColorStop(1.0,  'rgba(255,255,255,0)');
      ctx.fillStyle = g1;
      ctx.fillRect(bx - r, by - r, r * 2, r * 2);

      // 2) warm film — pilot 70% / 70%, --film-warm rgba(255,170,120,.55)
      var c2x = bx + r * 0.40, c2y = by + r * 0.40;
      var g2 = ctx.createRadialGradient(c2x, c2y, 0, c2x, c2y, r * 0.85);
      g2.addColorStop(0.0,  'rgba(255,170,120,' + Math.min(1, 0.55 * bump).toFixed(3) + ')');
      g2.addColorStop(1.0,  'rgba(255,170,120,0)');
      ctx.fillStyle = g2;
      ctx.fillRect(bx - r, by - r, r * 2, r * 2);

      // 3) cool film — pilot 30% / 75%, --film-cool rgba(140,180,210,.45)
      var c3x = bx - r * 0.40, c3y = by + r * 0.50;
      var g3 = ctx.createRadialGradient(c3x, c3y, 0, c3x, c3y, r * 0.92);
      g3.addColorStop(0.0,  'rgba(140,180,210,' + Math.min(1, 0.45 * bump).toFixed(3) + ')');
      g3.addColorStop(1.0,  'rgba(140,180,210,0)');
      ctx.fillStyle = g3;
      ctx.fillRect(bx - r, by - r, r * 2, r * 2);

      // 4) accent center tint — pilot 50% / 50%, rgba(228,68,28,.18)
      // Applied without 'screen' so it tints rather than brightens.
      ctx.globalCompositeOperation = 'overlay';
      var g4 = ctx.createRadialGradient(bx, by, 0, bx, by, r);
      g4.addColorStop(0.0,  'rgba(228,68,28,' + Math.min(1, 0.18 * bump).toFixed(3) + ')');
      g4.addColorStop(1.0,  'rgba(228,68,28,0)');
      ctx.fillStyle = g4;
      ctx.fillRect(bx - r, by - r, r * 2, r * 2);

      // 5) inset frosted-rim glow — pilot box-shadow inset 0 0 30px white .18
      ctx.globalCompositeOperation = 'screen';
      var rim = ctx.createRadialGradient(bx, by, r * 0.68, bx, by, r * 0.985);
      rim.addColorStop(0.0,  'rgba(255,255,255,0)');
      rim.addColorStop(0.85, 'rgba(255,255,255,0.06)');
      rim.addColorStop(1.0,  'rgba(255,255,255,0.22)');
      ctx.fillStyle = rim;
      ctx.fillRect(bx - r, by - r, r * 2, r * 2);

      // 6) inset accent interior glow — pilot box-shadow inset 0 0 60px accent .10
      var inner = ctx.createRadialGradient(bx, by, r * 0.30, bx, by, r * 0.95);
      inner.addColorStop(0.0,  'rgba(228,68,28,0)');
      inner.addColorStop(1.0,  'rgba(228,68,28,0.10)');
      ctx.fillStyle = inner;
      ctx.fillRect(bx - r, by - r, r * 2, r * 2);

      // 7) Fresnel hairline at the absolute edge
      ctx.globalCompositeOperation = 'source-over';
      ctx.lineWidth = Math.max(1, r * 0.014);
      ctx.strokeStyle = 'rgba(255,255,255,' + (0.20 + 0.12 * prox).toFixed(3) + ')';
      ctx.beginPath();
      ctx.arc(bx, by, r * 0.985, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();

      // 8) drop shadow underneath — pilot 0 16px 40px rgba(0,0,0,.55)
      // destination-over so it lands BEHIND the bubble + everything else
      ctx.save();
      ctx.globalCompositeOperation = 'destination-over';
      var ds = ctx.createRadialGradient(bx, by + r * 0.20, r * 0.55, bx, by + r * 0.20, r * 1.55);
      ds.addColorStop(0.0,  'rgba(0,0,0,0.40)');
      ds.addColorStop(1.0,  'rgba(0,0,0,0)');
      ctx.fillStyle = ds;
      ctx.beginPath();
      ctx.ellipse(bx, by + r * 0.20, r * 1.55, r * 0.62, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // (c) photoreal sprite (only if asset has loaded)
      var SLOTS = ['about','services','log','theme'];
      var slot = SLOTS[iP];
      if(!slot) return;
      var key = slot + (prox > 0.35 ? '-hover' : '-idle');
      var img = window.OONE_BUBBLE_FRAMES[key];
      if(!img) return;
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.globalAlpha = 0.82 + 0.16 * prox;
      ctx.drawImage(img, bx - r, by - r, r * 2, r * 2);
      ctx.restore();
    };
  }

  /* ── 6. ground-caustic sprite (replaces drawBubble stage 7) ──────── */
  // Loaded once; drawBubble caller can opt-in via window.OONE_DRAW_GROUND_CAUSTIC(ctx,bx,by,r)
  var groundCaustic = new Image();
  groundCaustic.onload  = function(){ window.OONE_GROUND_CAUSTIC = groundCaustic; };
  groundCaustic.onerror = function(){ /* not present */ };
  groundCaustic.src = 'assets/bubbles/hero/ground-caustic.png';

  window.drawGroundCaustic = function(ctx, bx, by, r){
    var img = window.OONE_GROUND_CAUSTIC;
    if(!img) return;
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    ctx.globalAlpha = 0.55;
    var w = r * 2.4, h = r * 0.45;
    ctx.drawImage(img, bx - w/2, by + r*0.85, w, h);
    ctx.restore();
  };

  console.log('[oone] viz-refresh-2026 active — FERRO landing default · pilot bubble geometry · sprites: '
    + Object.keys(window.OONE_BUBBLE_FRAMES).length + '/8');
})();
