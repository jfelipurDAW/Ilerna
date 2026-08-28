(function () {
  var SRC = "https://script.google.com/macros/s/AKfycbxHF4nL4giIqypXxJHTvNnQiPpDw7zlBiMcaxcp3BSk1OOWb2P6xa_MR3RN9EySI0rD/exec";
  if (document.getElementById("daw-xat-arrel")) {
    return;
  }

  var css = document.createElement("style");
  css.textContent = [
    "#daw-xat-arrel{position:fixed;right:18px;bottom:18px;z-index:99999;font-family:system-ui,sans-serif;color:#060606;}",
    "#daw-xat-boto{appearance:none;width:56px;height:56px;border:0;border-radius:50%;background:#4fbccd;color:#fff;box-shadow:0 10px 24px rgba(79,188,205,.4);cursor:pointer;display:flex;align-items:center;justify-content:center;}",
    "#daw-xat-boto svg{width:24px;height:24px;fill:currentColor;}",
    "#daw-xat-panell{display:flex;flex-direction:column;position:absolute;right:0;bottom:68px;width:min(22rem,calc(100vw - 28px));height:min(32rem,calc(100vh - 110px));border-radius:16px;overflow:hidden;box-shadow:0 18px 50px rgba(0,0,0,.28);background:#fff;opacity:0;visibility:hidden;pointer-events:none;transform:translateY(18px) scale(.72);transform-origin:bottom right;transition:opacity .28s ease,transform .28s cubic-bezier(.2,.8,.2,1),visibility .28s;}",
    "#daw-xat-arrel.is-obert #daw-xat-panell{opacity:1;visibility:visible;pointer-events:auto;transform:translateY(0) scale(1);}",
    "#daw-xat-boto{transition:transform .28s cubic-bezier(.2,.8,.2,1),filter .22s ease;}",
    "#daw-xat-arrel.is-obert #daw-xat-boto{transform:scale(.88);filter:brightness(.95);}",
    "#daw-xat-arrel.is-quiet #daw-xat-panell,#daw-xat-arrel.is-quiet #daw-xat-boto{transition:none;}",
    "@media (prefers-reduced-motion:reduce){#daw-xat-panell,#daw-xat-boto{transition:none;transform:none;}}",
    "#daw-xat-cap{flex:none;padding:12px 14px;border-bottom:3px solid #4fbccd;font-size:.88rem;font-weight:800;}",
    "#daw-xat-cap span{color:#4fbccd;}",
    "#daw-xat-fil{flex:1;min-height:0;overflow:auto;padding:12px;display:flex;flex-direction:column;gap:8px;}",
    "#daw-xat-fil .buit{margin:auto;color:#6b7280;font-size:.84rem;text-align:center;}",
    "#daw-xat-fil .msg{max-width:92%;padding:8px 11px;border-radius:14px;font-size:.88rem;line-height:1.4;white-space:pre-wrap;overflow-wrap:anywhere;}",
    "#daw-xat-fil .msg strong{font-weight:700;}",
    "#daw-xat-fil .msg em{font-style:italic;}",
    "#daw-xat-fil .msg a.daw-xat-enllac{color:#0e7490;font-weight:700;text-decoration:underline;text-underline-offset:2px;text-decoration-thickness:2px;}",
    "#daw-xat-fil .msg a.daw-xat-enllac:hover{color:#155e75;}",
    "#daw-xat-fil .is-user a.daw-xat-enllac{color:#7ee3f0;}",
    "#daw-xat-fil .is-user a.daw-xat-enllac:hover{color:#fff;}",
    "#daw-xat-fil .msg a.daw-xat-enllac.daw-xat-apartat{color:inherit;font-weight:700;text-decoration:none;cursor:pointer;transition:color .15s ease;}",
    "#daw-xat-fil .msg a.daw-xat-enllac.daw-xat-apartat:hover{color:#4fbccd;}",
    "#daw-xat-fil .is-user a.daw-xat-enllac.daw-xat-apartat:hover{color:#4fbccd;}",
    "#daw-xat-fil .is-user{align-self:flex-end;background:#060606;color:#fff;border-bottom-right-radius:4px;}",
    "#daw-xat-fil .is-bot{align-self:flex-start;background:#f3f4f6;border-bottom-left-radius:4px;}",
    "#daw-xat-fil .is-err{align-self:flex-start;background:#fef3c7;color:#92400e;}",
    "#daw-xat-fil .is-wait{display:inline-flex;align-items:center;gap:3px;min-width:1.6rem;padding-top:10px;padding-bottom:10px;}",
    "#daw-xat-fil .punt{width:4px;height:4px;border-radius:50%;background:#6b7280;animation:daw-xat-ona 1s ease-in-out infinite;}",
    "#daw-xat-fil .punt:nth-child(2){animation-delay:.16s;}",
    "#daw-xat-fil .punt:nth-child(3){animation-delay:.32s;}",
    "@keyframes daw-xat-ona{0%,80%,100%{opacity:.25;transform:translateY(0)}40%{opacity:1;transform:translateY(-2px)}}",
    "@media (prefers-reduced-motion:reduce){#daw-xat-fil .punt{animation:none;opacity:.7;}}",
    "#daw-xat-form{flex:none;display:flex;gap:8px;padding:10px 12px 12px;border-top:1px solid #e5e7eb;}",
    "#daw-xat-input{flex:1;min-height:40px;max-height:96px;resize:none;padding:10px 12px;border:1px solid #e5e7eb;border-radius:12px;font:inherit;font-size:.88rem;outline:none;}",
    "#daw-xat-go{appearance:none;width:40px;height:40px;border:0;border-radius:12px;background:#4fbccd;color:#fff;cursor:pointer;}",
    "#daw-xat-go:disabled{opacity:.5;cursor:default;}",
    "#daw-xat-go svg{width:18px;height:18px;fill:currentColor;display:block;margin:auto;}"
  ].join("");
  document.head.appendChild(css);

  var arrel = document.createElement("div");
  arrel.id = "daw-xat-arrel";
  arrel.innerHTML = [
    '<div id="daw-xat-panell">',
    '  <div id="daw-xat-cap">ILERNA<span>DAW2</span> · assistent virtual</div>',
    '  <div id="daw-xat-fil"><p class="buit">Consulta informació sobre l\'aula o les eines del portal.</p></div>',
    '  <form id="daw-xat-form" autocomplete="off">',
    '    <textarea id="daw-xat-input" rows="1" maxlength="2000" placeholder="Escriu…"></textarea>',
    '    <button type="submit" id="daw-xat-go" aria-label="Envia"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5"/></svg></button>',
    '  </form>',
    '</div>',
    '<button type="button" id="daw-xat-boto" aria-label="Obre l\'assistent"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M2 1a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2z"/></svg></button>'
  ].join("");
  var CLAU_SESSIO = "daw-xat-sessio";
  var desada = null;
  try {
    desada = JSON.parse(sessionStorage.getItem(CLAU_SESSIO) || "");
  } catch (err) {
    desada = null;
  }
  if (desada && desada.obert) {
    arrel.classList.add("is-obert", "is-quiet");
  }
  document.body.appendChild(arrel);
  var hist = [];
  var pendent = false;
  var MSG_CONN = "No s'ha pogut connectar amb l'assistent, contacta amb el delegat.";
  var fil = document.getElementById("daw-xat-fil");
  var inp = document.getElementById("daw-xat-input");
  var go = document.getElementById("daw-xat-go");

  function escaparHtml(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function aplicarSobreText(html, fn) {
    var s = String(html);
    var parts = [];
    var re = /<a\b[^>]*>[\s\S]*?<\/a>/gi;
    var last = 0;
    var m;
    function tros(chunk) {
      return chunk.replace(/(^|>)([^<]+)/g, function (_, sep, text) {
        return sep + fn(text);
      });
    }
    while ((m = re.exec(s))) {
      parts.push(tros(s.slice(last, m.index)));
      parts.push(m[0]);
      last = m.index + m[0].length;
    }
    parts.push(tros(s.slice(last)));
    return parts.join("");
  }

  function hrefSegur(raw) {
    var u = String(raw || "").trim()
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, "\"")
      .replace(/^`+|`+$/g, "")
      .replace(/^\(+/, "")
      .replace(/\)+$/, "")
      .replace(/[.,;:!?]+$/g, "");
    if (/^https:\/\//i.test(u) || /^http:\/\//i.test(u)) {
      return u;
    }
    if (/^\/[A-Za-z0-9\u00C0-\u024F]/.test(u)) {
      return u;
    }
    return "";
  }

  function htmlEnllac(href, etiqueta) {
    var m = String(href).match(/^https?:\/\/ilernadaw\.github\.io(\/.*)?$/i);
    if (m) {
      href = m[1] || "/";
    }
    var intern = href.charAt(0) === "/" || href.indexOf("./") === 0
      || (typeof location !== "undefined" && location.origin && href.indexOf(location.origin) === 0);
    var cls = intern ? "daw-xat-enllac daw-xat-apartat" : "daw-xat-enllac";
    var extra = intern
      ? ' target="_self"'
      : ' target="_blank" rel="noopener noreferrer"';
    return '<a class="' + cls + '" href="' + escaparHtml(href) + '"' + extra + ">" + etiqueta + "</a>";
  }

  var APARTATS = {
    "règim intern": "/règim-intern/",
    "visor de l'aula": "/disposició-aula/",
    "plànol de l'aula": "/disposició-aula/",
    "disposició de l'aula": "/disposició-aula/",
    "gestor d'incidències": "/gestor-incidències/",
    "tràmits de vagues": "/tràmits-vagues/",
    "consultor de tutories": "/consultor-de-tutories/",
    "dreceres importants": "/dreceres-importants/",
    "horari": "/horari/"
  };

  function hrefApartat(nom) {
    var k = String(nom || "").replace(/&amp;/g, "&").replace(/^\s+|\s+$/g, "").toLowerCase();
    return APARTATS[k] || "";
  }

  function formatMd(s) {
    var t = escaparHtml(s);
    t = aplicarSobreText(t, function (text) {
      return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, function (tot, etq, url) {
        var h = hrefSegur(url);
        var nom = String(etq || "").replace(/^\*\*|\*\*$/g, "");
        return h ? htmlEnllac(h, nom) : tot;
      });
    });
    t = t.replace(/\*\*([\s\S]+?)\*\*/g, function (tot, inner) {
      var h = hrefApartat(inner);
      return h ? htmlEnllac(h, inner) : "<strong>" + inner + "</strong>";
    });
    t = t.replace(/\*([^*\n]+?)\*/g, "<em>$1</em>");
    t = aplicarSobreText(t, function (text) {
      return text.replace(/`([^`]+)`/g, function (tot, inner) {
        var h = hrefSegur(inner);
        return h ? htmlEnllac(h, inner.replace(/^\(+/, "").replace(/\)+$/, "")) : tot;
      });
    });
    t = aplicarSobreText(t, function (text) {
      return text.replace(/(https?:\/\/[^\s<]+)/gi, function (url) {
        var h = hrefSegur(url);
        return h ? htmlEnllac(h, url.replace(/[.,;:!?]+$/g, "")) : url;
      });
    });
    t = aplicarSobreText(t, function (text) {
      return text.replace(/(^|[\s(])(\/[A-Za-z0-9\u00C0-\u024F][A-Za-z0-9\u00C0-\u024F._~\/-]*)/g, function (tot, pre, path) {
        var h = hrefSegur(path);
        return h ? pre + htmlEnllac(h, path) : tot;
      });
    });
    return t;
  }

  function posarText(el, text, md) {
    if (md) {
      el.innerHTML = formatMd(text);
    } else {
      el.textContent = text;
    }
  }

  function desarSessio() {
    try {
      var retall = hist.length > 40 ? hist.slice(hist.length - 40) : hist;
      sessionStorage.setItem(CLAU_SESSIO, JSON.stringify({
        hist: retall,
        obert: arrel.classList.contains("is-obert")
      }));
    } catch (err) {}
  }

  document.getElementById("daw-xat-boto").addEventListener("click", function () {
    var obert = arrel.classList.toggle("is-obert");
    this.setAttribute("aria-label", obert ? "Tanca l'assistent" : "Obre l'assistent");
    if (obert) {
      inp.focus();
    }
    desarSessio();
  });

  function afegir(qui, text) {
    var buit = fil.querySelector(".buit");
    if (buit) {
      buit.parentNode.removeChild(buit);
    }
    var b = document.createElement("div");
    b.className = "msg is-" + qui;
    posarText(b, text, qui === "bot" || qui === "user");
    fil.appendChild(b);
    fil.scrollTop = fil.scrollHeight;
    return b;
  }

  function afegirEspera() {
    var buit = fil.querySelector(".buit");
    if (buit) {
      buit.parentNode.removeChild(buit);
    }
    var b = document.createElement("div");
    b.className = "msg is-bot is-wait";
    b.setAttribute("aria-label", "L'assistent està escrivint");
    var i;
    for (i = 0; i < 3; i++) {
      var p = document.createElement("span");
      p.className = "punt";
      b.appendChild(p);
    }
    fil.appendChild(b);
    fil.scrollTop = fil.scrollHeight;
    return b;
  }

  function jsonp(url, done, fail) {
    var nom = "dawXatCb" + String(Date.now()) + String(Math.floor(Math.random() * 1000));
    var t = setTimeout(function () {
      neteja();
      fail(new Error(MSG_CONN));
    }, 45000);
    function neteja() {
      clearTimeout(t);
      try { delete window[nom]; } catch (err) { window[nom] = undefined; }
      if (s.parentNode) {
        s.parentNode.removeChild(s);
      }
    }
    window[nom] = function (data) {
      neteja();
      done(data);
    };
    var s = document.createElement("script");
    s.src = url + (url.indexOf("?") >= 0 ? "&" : "?") + "callback=" + nom;
    s.onerror = function () {
      neteja();
      fail(new Error(MSG_CONN));
    };
    document.body.appendChild(s);
  }

  function crida(url, done, fail) {
    if (!window.fetch) {
      jsonp(url, done, fail);
      return;
    }
    var ac = new AbortController();
    var t = setTimeout(function () {
      try { ac.abort(); } catch (err) {}
    }, 45000);
    fetch(url, { method: "GET", signal: ac.signal })
      .then(function (r) {
        return r.text();
      })
      .then(function (txt) {
        var data = JSON.parse(txt);
        clearTimeout(t);
        done(data);
      })
      .catch(function () {
        clearTimeout(t);
        jsonp(url, done, fail);
      });
  }

  function histCurt() {
    var out = [];
    var i = hist.length > 8 ? hist.length - 8 : 0;
    for (; i < hist.length; i++) {
      out.push({
        rol: hist[i].rol,
        text: String(hist[i].text || "").substring(0, 400)
      });
    }
    return out;
  }

  function enviar() {
    var text = String(inp.value || "").replace(/^\s+|\s+$/g, "");
    if (!text || pendent) {
      return;
    }
    inp.value = "";
    afegir("user", text);
    pendent = true;
    go.disabled = true;
    var espera = afegirEspera();
    var url = SRC
      + "?api=pregunta"
      + "&q=" + encodeURIComponent(text.substring(0, 2000))
      + "&hist=" + encodeURIComponent(JSON.stringify(histCurt()));
    crida(url, function (res) {
      pendent = false;
      go.disabled = false;
      if (res && res.ok && res.text) {
        espera.className = "msg is-bot";
        posarText(espera, res.text, true);
        hist.push({ rol: "user", text: text });
        hist.push({ rol: "model", text: res.text });
        if (hist.length > 40) {
          hist = hist.slice(hist.length - 40);
        }
        desarSessio();
      } else {
        espera.className = "msg is-err";
        posarText(espera, (res && res.error) ? res.error : MSG_CONN, false);
      }
      fil.scrollTop = fil.scrollHeight;
      inp.focus();
    }, function (err) {
      pendent = false;
      go.disabled = false;
      espera.className = "msg is-err";
      posarText(espera, err.message, false);
      inp.focus();
    });
  }

  document.getElementById("daw-xat-form").addEventListener("submit", function (ev) {
    ev.preventDefault();
    enviar();
  });
  inp.addEventListener("keydown", function (ev) {
    if (ev.key === "Enter" && !ev.shiftKey) {
      ev.preventDefault();
      enviar();
    }
  });

  (function carregarSessio() {
    try {
      var d = desada;
      if (!d) {
        return;
      }
      if (d.hist && d.hist.length) {
        hist = d.hist;
        var i;
        for (i = 0; i < hist.length; i++) {
          var it = hist[i] || {};
          afegir(it.rol === "model" ? "bot" : "user", it.text || "");
        }
      }
      if (d.obert) {
        document.getElementById("daw-xat-boto").setAttribute("aria-label", "Tanca l'assistent");
        fil.scrollTop = fil.scrollHeight;
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            arrel.classList.remove("is-quiet");
          });
        });
      }
    } catch (err) {
      hist = [];
      arrel.classList.remove("is-quiet");
    }
  })();
})();
