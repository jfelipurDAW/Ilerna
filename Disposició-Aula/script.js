// Espera que tot el contingut del DOM estigui carregat abans d'executar el codi
document.addEventListener('DOMContentLoaded', () => {
    // --- GESTIÓ D'ENLLAÇOS ---
    // Afegeix un event listener per gestionar els clics de ratolí a tot el document.
    document.body.addEventListener('mousedown', (event) => {
        // Busca si l'element clicat (o un dels seus pares) és un enllaç <a> amb un href
        const link = event.target.closest('a[href]');

        // Si no s'ha clicat un enllaç o l'enllaç no té una URL vàlida, no fem res.
        if (!link || !link.href || link.href.endsWith('#')) {
            return;
        }

        // Prevenim l'acció per defecte per controlar-la nosaltres.
        event.preventDefault();
        const url = link.href;

        // event.button === 0: Clic esquerre -> Pestanya actual
        // event.button === 1: Clic amb la rodeta (mig) -> Pestanya nova
        if (event.button === 0) { // Clic esquerre
            // Actualitza la pestanya activa actual.
            chrome.tabs.update({ url: url });
            window.close(); // Tanquem el popup per veure el canvi
        } else if (event.button === 1) { // Clic amb la rodeta
            // Obre l'enllaç en una nova pestanya.
            chrome.tabs.create({ url: url });
        }
    });

    // --- LÒGICA DE L'HORARI ---

    const schedule = [
        // Pots modificar aquest horari amb les teves classes.
        // day: 1=Dilluns, 2=Dimarts, ..., 5=Divendres, 0=Diumenge
        { day: 1, start: "15:20", end: "16:15", name: "Programació", teacher: "Flor Martínez" },
        { day: 1, start: "16:15", end: "18:05", name: "Anglès", teacher: "Anna Ruiz" },
        { day: 1, start: "18:05", end: "18:30", name: "Esbarjo", teacher: "" },
        { day: 1, start: "18:30", end: "20:25", name: "Sistemes Informàtics", teacher: "Manuel Martínez" },
        { day: 1, start: "20:25", end: "21:20", name: "Entorns de desenvolupament", teacher: "Guillem Mauri" },
        
        { day: 2, start: "15:20", end: "16:15", name: "Itinerari personal", teacher: "Teresa Desmay" },
        { day: 2, start: "16:15", end: "18:05", name: "Base de dades", teacher: "Rosa Suris" },
        { day: 2, start: "18:05", end: "18:30", name: "Esbarjo", teacher: ""},
        { day: 2, start: "18:30", end: "19:25", name: "Sistemes Informàtics", teacher: "Manuel Martínez" },

        { day: 3, start: "15:20", end: "16:15", name: "Programació", teacher: "Flor Martínez" },
        { day: 3, start: "16:15", end: "17:10", name: "Tutoria", teacher: "Sandra Serrano" },
        { day: 3, start: "17:10", end: "18:05", name: "Itinerari personal", teacher: "Teresa Desmay" },
        { day: 3, start: "18:05", end: "18:30", name: "Esbarjo", teacher: ""},
        { day: 3, start: "18:30", end: "19:30", name: "Itinerari personal", teacher: "Teresa Desmay" },
        { day: 3, start: "19:30", end: "20:25", name: "Sostenibilitat", teacher: "Sandra Serrano" },

        { day: 4, start: "15:00", end: "17:10", name: "Programació", teacher: "Flor Martínez" },
        { day: 4, start: "17:10", end: "18:05", name: "Llenguatge de marques", teacher: "Guillem Mauri" },
        { day: 4, start: "18:05", end: "18:30", name: "Esbarjo", teacher: ""},
        { day: 4, start: "18:30", end: "19:30", name: "Llenguatge de marques", teacher: "Guillem Mauri" },
        { day: 4, start: "19:30", end: "20:25", name: "Digitalització", teacher: "Irene Calderon" },

        { day: 5, start: "15:20", end: "17:10", name: "Programació", teacher: "Flor Martínez" },
        { day: 5, start: "17:10", end: "18:05", name: "Base de dades", teacher: "Sandra Serrano" },
        { day: 5, start: "18:05", end: "18:30", name: "Esbarjo", teacher: ""},
        { day: 5, start: "18:30", end: "19:30", name: "Entorns de desenvolupament", teacher: "Guillem Mauri" },
        { day: 5, start: "19:30", end: "20:25", name: "Base de dades", teacher: "Sandra Serrano" }
    ];

    const dayNames = ["Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte"];

    // Elements de l'UI
    const currentClassNameEl = document.getElementById('current-class-name');
    const horariActualEl = document.getElementById('horari-actual');

    // --- LÒGICA DELS DESPLEGABLES ---
    const detailsElements = document.querySelectorAll('details');

    detailsElements.forEach(details => {
        const summary = details.querySelector('summary');

        summary.addEventListener('click', (event) => {
            // Si estem a punt d'obrir el desplegable (perquè ara mateix està tancat)
            if (!details.open) {
                // Prevenim l'acció per defecte per poder afegir un retard.
                event.preventDefault();
                
                // Amaguem el requadre de l'horari immediatament.
                horariActualEl.style.display = 'none';
                
                // Després d'un breu retard, obrim el desplegable manualment.
                // Això dona temps al navegador a processar la desaparició de l'horari
                // i evita el "glitch" visual.
                setTimeout(() => {
                    details.open = true;
                }, 5); // Retard de 5ms
            }
        });

        details.addEventListener('toggle', () => {
            // Aquesta funció s'executa DESPRÉS que un desplegable s'obri o es tanqui.
            // Comprovem si, després del canvi, n'hi ha algun d'obert.
            const anyOpen = Array.from(detailsElements).some(d => d.open);
            
            // Si no n'hi ha cap d'obert, tornem a mostrar l'horari.
            // Si n'hi ha algun, ens assegurem que l'horari estigui amagat.
            horariActualEl.style.display = anyOpen ? 'none' : 'block';
        });
    });


    function generateUpcomingSchedule() {
        const now = new Date();
        const upcomingClasses = [];

        // Genera instàncies de classes per als pròxims 7 dies
        for (let i = 0; i < 7; i++) {
            const date = new Date(now);
            date.setDate(now.getDate() + i);
            const dayOfWeek = date.getDay();

            const classesForDay = schedule.filter(cls => cls.day === dayOfWeek);

            for (const cls of classesForDay) {
                const [startHour, startMinute] = cls.start.split(':').map(Number);
                const [endHour, endMinute] = cls.end.split(':').map(Number);

                const startTime = new Date(date);
                startTime.setHours(startHour, startMinute, 0, 0);

                const endTime = new Date(date);
                endTime.setHours(endHour, endMinute, 0, 0);

                // Només afegeix classes que encara no han acabat
                if (endTime > now) {
                    upcomingClasses.push({ ...cls, startTime, endTime });
                }
            }
        }
        // Ordena totes les classes per data d'inici
        return upcomingClasses.sort((a, b) => a.startTime - b.startTime);
    }

    function updateView() {
        const now = new Date();
        const upcoming = generateUpcomingSchedule();

        const currentClass = upcoming.find(cls => now >= cls.startTime && now < cls.endTime);

        // Actualitza la UI: MOSTRAR NOM DEL PROFESSOR (no l'assignatura)
        if (currentClass) {
            currentClassNameEl.textContent = currentClass.teacher || '';
        } else {
            currentClassNameEl.textContent = "No hi ha classe ara";
        }

        // Not showing next class by request — only the current class is displayed.
    }

    updateView();
    // Netegem labels buits per evitar fons/restes visuals
    function cleanEmptyLabels() {
        const cards = document.querySelectorAll('.cards > div');
        cards.forEach(card => {
            const nameDiv = card.querySelector('div:nth-child(1)');
            const idDiv = card.querySelector('div:nth-child(2)');

            if (nameDiv) {
                if (nameDiv.textContent.trim() === '') {
                    nameDiv.style.background = 'transparent';
                    nameDiv.style.color = 'transparent';
                    nameDiv.style.border = 'none';
                    nameDiv.style.padding = '0';
                } else {
                    // restore defaults if needed
                    nameDiv.style.background = '';
                    nameDiv.style.color = '';
                    nameDiv.style.border = '';
                    nameDiv.style.padding = '';
                }
            }

            if (idDiv) {
                if (idDiv.textContent.trim() === '') {
                    idDiv.style.background = 'transparent';
                    idDiv.style.color = 'transparent';
                    idDiv.style.border = 'none';
                    idDiv.style.padding = '0';
                } else {
                    idDiv.style.background = '';
                    idDiv.style.color = '';
                    idDiv.style.border = '';
                    idDiv.style.padding = '';
                }
            }
        });
    }
    cleanEmptyLabels();
    setInterval(updateView, 1000);
    // also re-run cleanup after each update in case content changes dynamically
    const originalUpdate = updateView;
    updateView = function() { originalUpdate(); cleanEmptyLabels(); };
});