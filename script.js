// Espera que tot el contingut del DOM estigui carregat abans d'executar el codi
document.addEventListener('DOMContentLoaded', () => {
    // --- LÒGICA DE L'HORARI ---
    // Només api/horari.json. Sense recanvi incrustat.

    let schedule = [];
    let horariDisponible = false;

    const dayNames = ["Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte"];

    // Elements de l'UI
    const currentClassNameEl = document.getElementById('current-class-name');
    const currentClassTimerEl = document.getElementById('current-class-timer');
    const nextClassNameEl = document.getElementById('next-class-name');
    const nextClassTimesEl = document.getElementById('next-class-times');
    const currentClassContainer = document.getElementById('current-class-container');
    const nextClassContainer = document.getElementById('next-class-container');

    let currentLink = null;
    let nextLink = null;

    currentClassContainer.addEventListener('click', () => {
        if (currentLink) window.open(currentLink, '_blank');
    });

    nextClassContainer.addEventListener('click', () => {
        if (nextLink) window.open(nextLink, '_blank');
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

    function netejaEnllac(el) {
        el.classList.remove('cursor-pointer', 'hover:bg-gray-100', 'rounded', 'transition-colors');
        el.removeAttribute('title');
    }

    function updateView() {
        if (!horariDisponible) {
            currentClassNameEl.textContent = "Horari no disponible";
            currentClassTimerEl.textContent = "Encara no està actualitzat";
            nextClassNameEl.textContent = "--";
            nextClassTimesEl.textContent = "--";
            currentLink = null;
            nextLink = null;
            netejaEnllac(currentClassContainer);
            netejaEnllac(nextClassContainer);
            return;
        }

        const now = new Date();
        const upcoming = generateUpcomingSchedule();

        const currentClass = upcoming.find(cls => now >= cls.startTime && now < cls.endTime);
        const nextClass = upcoming.find(cls => cls.startTime > now);

        // Actualitza la UI de la classe actual
        if (currentClass) {
            currentClassNameEl.textContent = currentClass.name;
            const remainingMs = currentClass.endTime - now;

            const hours = Math.floor(remainingMs / 3600000);
            const minutes = Math.floor((remainingMs % 3600000) / 60000);
            const seconds = Math.floor((remainingMs % 60000) / 1000);
            currentClassTimerEl.textContent = `Acaba en: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            currentLink = currentClass.link;
            if (currentLink) {
                currentClassContainer.classList.add('cursor-pointer', 'hover:bg-gray-100', 'rounded', 'transition-colors');
                currentClassContainer.title = "Obrir enllaç al Campus";
            } else {
                netejaEnllac(currentClassContainer);
            }
        } else {
            currentClassNameEl.textContent = "No hi ha classe ara";
            currentClassTimerEl.textContent = "Gaudeix del teu temps lliure!";

            currentLink = null;
            netejaEnllac(currentClassContainer);
        }

        // Actualitza la UI de la pròxima classe
        if (nextClass) {
            nextClassNameEl.textContent = nextClass.name;
            const isToday = nextClass.startTime.getDate() === now.getDate();

            const startTimeFormatted = nextClass.startTime.toLocaleTimeString('ca-ES', { hour: '2-digit', minute: '2-digit' });
            const endTimeFormatted = nextClass.endTime.toLocaleTimeString('ca-ES', { hour: '2-digit', minute: '2-digit' });

            if (isToday) {
                nextClassTimesEl.textContent = `De ${startTimeFormatted} a ${endTimeFormatted}`;
            } else {
                const dayName = dayNames[nextClass.startTime.getDay()];
                nextClassTimesEl.textContent = `${dayName} a les ${startTimeFormatted}`;
            }

            nextLink = nextClass.link;
            if (nextLink) {
                nextClassContainer.classList.add('cursor-pointer', 'hover:bg-gray-100', 'rounded', 'transition-colors');
                nextClassContainer.title = "Obrir enllaç al Campus";
            } else {
                netejaEnllac(nextClassContainer);
            }
        } else {
            nextClassNameEl.textContent = "No hi ha més classes programades";
            nextClassTimesEl.textContent = "🎉";

            nextLink = null;
            netejaEnllac(nextClassContainer);
        }
    }

    fetch("./api/horari.json")
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (data) {
            if (data && data.classes && data.classes.length) {
                schedule = data.classes;
                horariDisponible = true;
            }
        })
        .catch(function () {})
        .then(function () {
            updateView();
            if (horariDisponible) {
                setInterval(updateView, 1000);
            }
        });
});
