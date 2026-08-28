document.addEventListener("DOMContentLoaded", function () {
  const graella = document.getElementById("tutories-graella");
  const mail = document.getElementById("tutories-mail");

  function etiqueta(lloc, nota, groc) {
    if (!lloc && !nota) {
      return "";
    }
    const cls = groc
      ? "bg-yellow-100 text-yellow-800"
      : "bg-green-100 text-green-800";
    let html = '<div class="mt-3 flex flex-wrap items-center gap-2">';
    if (lloc) {
      html += '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ' + cls + '">' + lloc + "</span>";
    }
    if (nota && lloc) {
      html += '<span class="text-xs text-gray-500 italic">(' + nota + ")</span>";
    }
    html += "</div>";
    return html;
  }

  function horaHtml(f) {
    if (f.inici && f.fi) {
      return f.inici + ' <span class="text-gray-400 text-xl font-normal">a</span> ' + f.fi;
    }
    return f.nota || "";
  }

  fetch("../api/tutories.json")
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (data) {
      if (!data || !graella) {
        return;
      }
      if (mail && data.correu) {
        mail.setAttribute("href", "mailto:" + data.correu);
      }
      const grups = [];
      const fr = data.franges || [];
      for (let i = 0; i < fr.length; i++) {
        const f = fr[i];
        const darrer = grups[grups.length - 1];
        if (darrer && darrer.dia === f.dia) {
          darrer.items.push(f);
        } else {
          grups.push({ dia: f.dia, items: [f] });
        }
      }
      graella.innerHTML = "";
      grups.forEach(function (g) {
        const ample = g.items.length > 1 || g.dia === "Divendres" ? " md:col-span-2" : "";
        const card = document.createElement("div");
        card.className = "bg-white p-5 rounded-xl shadow-sm border border-gray-200 transition-transform hover:-translate-y-1 hover:shadow-md" + ample;
        let cos = '<h3 class="text-ilerna-blau font-bold text-xl mb-3 flex items-center gap-2 border-b pb-2">' + g.dia + "</h3>";
        if (g.items.length === 1) {
          const f = g.items[0];
          const groc = String(f.nota || "").toLowerCase().indexOf("parcial") !== -1;
          const lloc = f.lloc || "Sala de professors";
          cos += '<p class="text-3xl font-black text-gray-800 tracking-tight">' + horaHtml(f) + "</p>";
          cos += etiqueta(lloc, f.nota && f.inici ? f.nota : "", groc);
        } else {
          cos += '<div class="flex flex-col md:flex-row gap-6">';
          g.items.forEach(function (f, idx) {
            if (idx > 0) {
              cos += '<div class="hidden md:block w-px bg-gray-200"></div>';
            }
            const groc = String(f.nota || "").toLowerCase().indexOf("parcial") !== -1;
            const lloc = f.lloc || "Sala de professors";
            cos += '<div class="flex-1">';
            cos += '<p class="text-2xl font-black text-gray-800">' + horaHtml(f) + "</p>";
            cos += etiqueta(lloc, f.nota && f.inici ? f.nota : "", groc);
            cos += "</div>";
          });
          cos += "</div>";
        }
        card.innerHTML = cos;
        graella.appendChild(card);
      });
    })
    .catch(function () {});
});
