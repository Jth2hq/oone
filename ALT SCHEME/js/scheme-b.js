(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function readyKineticTitle() {
    var el = document.querySelector(".sb-kinetic-title");
    if (!el) return;
    if (reduceMotion) {
      el.classList.add("is-ready");
      return;
    }
    requestAnimationFrame(function () {
      el.classList.add("is-ready");
    });
  }

  function wrapChars(node) {
    var text = node.textContent;
    var frag = document.createDocumentFragment();
    for (var i = 0; i < text.length; i++) {
      var ch = text[i];
      if (ch === " ") {
        frag.appendChild(document.createTextNode(" "));
        continue;
      }
      var span = document.createElement("span");
      span.className = "sb-char";
      span.style.setProperty("--ci", String(i));
      span.textContent = ch;
      frag.appendChild(span);
    }
    node.textContent = "";
    node.appendChild(frag);
  }

  function initLedeWords() {
    document.querySelectorAll(".sb-lede-word").forEach(function (w) {
      wrapChars(w);
    });
    if (reduceMotion) {
      document.querySelectorAll(".sb-lede-word").forEach(function (w) {
        w.classList.add("is-visible");
      });
      return;
    }
    var lede = document.querySelector(".hero-lede");
    if (!lede) return;
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          en.target.querySelectorAll(".sb-lede-word").forEach(function (w, j) {
            setTimeout(function () {
              w.classList.add("is-visible");
            }, j * 80);
          });
          io.disconnect();
        });
      },
      { threshold: 0.2 }
    );
    io.observe(lede);
  }

  function initScrollTitles() {
    var titles = document.querySelectorAll(".sb-title-ink");
    if (!titles.length) return;

    var supportsView = false;
    try {
      supportsView = CSS.supports("animation-timeline", "view()");
    } catch (e) {
      supportsView = false;
    }
    titles.forEach(function (t) {
      if (supportsView) t.classList.add("sb-view-fill");
    });

    if (supportsView || reduceMotion) {
      if (reduceMotion) titles.forEach(function (t) { t.classList.add("sb-inview"); });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) en.target.classList.add("sb-inview");
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" }
    );
    titles.forEach(function (t) { io.observe(t); });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  function init() {
    readyKineticTitle();
    initLedeWords();
    initScrollTitles();
  }
})();
