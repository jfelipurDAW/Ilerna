// Espera que tot el contingut del DOM estigui carregat abans d'executar el codi
document.addEventListener('DOMContentLoaded', () => {
    // --- LÒGICA DE L'HORARI ---

    const schedule = [
        // Pots modificar aquest horari amb les teves classes.
        // day: 1=Dilluns, 2=Dimarts, ..., 5=Divendres, 0=Diumenge
        { day: 1, start: "15:20", end: "16:15", name: "Programació", link: "https://campus.ilerna.com/ultra/courses/_12455_1/outline" },
        { day: 1, start: "16:15", end: "18:05", name: "Anglès", link: "https://campus.ilerna.com/ultra/courses/_12458_1/outline" },
        { day: 1, start: "18:05", end: "18:30", name: "Esbarjo" },
        { day: 1, start: "18:30", end: "20:25", name: "Sistemes Informàtics", link: "https://campus.ilerna.com/ultra/courses/_12453_1/outline"},
        { day: 1, start: "20:25", end: "21:20", name: "Entorns de desenvolupament", link: "https://campus.ilerna.com/ultra/courses/_12457_1/outline" },
        
        { day: 2, start: "15:20", end: "16:15", name: "Itinerari personal", link: "https://campus.ilerna.com/ultra/courses/_12461_1/outline" },
        { day: 2, start: "16:15", end: "18:05", name: "Base de dades", link: "https://campus.ilerna.com/ultra/courses/_12454_1/outline" },
        { day: 2, start: "18:05", end: "18:30", name: "Esbarjo" },
        { day: 2, start: "18:30", end: "19:25", name: "Sistemes Informàtics", link: "https://campus.ilerna.com/ultra/courses/_12453_1/outline" },

        { day: 3, start: "15:20", end: "16:15", name: "Programació", link: "https://campus.ilerna.com/ultra/courses/_12455_1/outline" },
        { day: 3, start: "16:15", end: "17:10", name: "Tutoria", link: "https://campus.ilerna.com/ultra/courses/_15252_1/outline" },
        { day: 3, start: "17:10", end: "18:05", name: "Itinerari personal", link: "https://campus.ilerna.com/ultra/courses/_12461_1/outline" },
        { day: 3, start: "18:05", end: "18:30", name: "Esbarjo" },
        { day: 3, start: "18:30", end: "19:30", name: "Itinerari personal", link: "https://campus.ilerna.com/ultra/courses/_12461_1/outline" },
        { day: 3, start: "19:30", end: "20:25", name: "Sostenibilitat", link: "https://campus.ilerna.com/ultra/courses/_12460_1/outline" },

        { day: 4, start: "15:00", end: "17:10", name: "Programació", link: "https://campus.ilerna.com/ultra/courses/_12455_1/outline" },
        { day: 4, start: "17:10", end: "18:05", name: "Llenguatge de marques", link: "https://campus.ilerna.com/ultra/courses/_12456_1/outline" },
        { day: 4, start: "18:05", end: "18:30", name: "Esbarjo" },
        { day: 4, start: "18:30", end: "19:30", name: "Llenguatge de marques", link: "https://campus.ilerna.com/ultra/courses/_12456_1/outline" },
        { day: 4, start: "19:30", end: "20:25", name: "Digitalització", link: "https://campus.ilerna.com/ultra/courses/_12459_1/outline" },

        { day: 5, start: "15:20", end: "17:10", name: "Programació", link: "https://campus.ilerna.com/ultra/courses/_12455_1/outline" },
        { day: 5, start: "17:10", end: "18:05", name: "Base de dades", link: "https://campus.ilerna.com/ultra/courses/_12454_1/outline" },
        { day: 5, start: "18:05", end: "18:30", name: "Esbarjo" },
        { day: 5, start: "18:30", end: "19:30", name: "Entorns de desenvolupament", link: "https://campus.ilerna.com/ultra/courses/_12457_1/outline" },
        { day: 5, start: "19:30", end: "20:25", name: "Base de dades", link: "https://campus.ilerna.com/ultra/courses/_12454_1/outline" }
    ];

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

    function updateView() {
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
                currentClassContainer.classList.remove('cursor-pointer', 'hover:bg-gray-100', 'rounded', 'transition-colors');
                currentClassContainer.removeAttribute('title');
            }
        } else {
            currentClassNameEl.textContent = "No hi ha classe ara";
            currentClassTimerEl.textContent = "Gaudeix del teu temps lliure!";
            
            currentLink = null;
            currentClassContainer.classList.remove('cursor-pointer', 'hover:bg-gray-100', 'rounded', 'transition-colors');
            currentClassContainer.removeAttribute('title');
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
                nextClassContainer.classList.remove('cursor-pointer', 'hover:bg-gray-100', 'rounded', 'transition-colors');
                nextClassContainer.removeAttribute('title');
            }
        } else {
            nextClassNameEl.textContent = "No hi ha més classes programades";
            nextClassTimesEl.textContent = "🎉";
            
            nextLink = null;
            nextClassContainer.classList.remove('cursor-pointer', 'hover:bg-gray-100', 'rounded', 'transition-colors');
            nextClassContainer.removeAttribute('title');
        }
    }

    updateView();
    setInterval(updateView, 1000);
});