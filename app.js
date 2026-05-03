// Datos de hábitos organizados por bloques
const habitsData = {
    Mañana: [
        { id: 'despertar', title: '🛏️ Despertar', support: 'Regla de los 2 minutos' },
        { id: 'hidratacion-mañana', title: '💧 Hidratación', support: 'Vaso de agua al despertar' },
        { id: 'cafe', title: '☕ Café', support: 'Momento para ti' },
        { id: 'oracion', title: '🙏 Oración', support: '2-5 minutos de paz' },
        { id: 'lectura-biblica', title: '📖 Lectura Bíblica', support: 'Conexión espiritual' },
        { id: 'lectura', title: '📚 Lectura', support: '10-15 páginas' }
    ],
    Actividad: [
        { id: 'traslado-gym', title: '🏋️ Traslado Gym', support: 'Viaje al gimnasio' },
        { id: 'podcast', title: '🎧 Podcast', support: 'Aprendizaje durante el trayecto' },
        { id: 'entrenamiento', title: '💪 Entrenamiento', support: 'Alternativa: 2-10 min en casa' },
        { id: 'recompensa', title: '🚿 Recompensa (Ducha + Batido)', support: 'Celebra tu esfuerzo' }
    ],
    Rutina: [
        { id: 'hidratacion-tarde', title: '💧 Hidratación', support: '2 botellas durante el día' },
        { id: 'desconexion', title: '📵 Desconexión', support: '30 min sin pantallas' },
        { id: 'repaso', title: '📝 Repaso del día', support: 'Reflexiona sobre tus logros' },
        { id: 'lectura-final', title: '📖 Lectura Final', support: '15-20 minutos antes de dormir' },
        { id: 'gratitud', title: '🙏 Oración Gratitud', support: 'Agradece el día vivido' },
        { id: 'dormir', title: '😴 Dormir', support: '7-8 horas de descanso' }
    ]
};

// Estado global
let currentDay = 0; // 0 = hoy, 1 = ayer, etc.
const maxDaysHistory = 7;

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
    renderHabits();
    updateProgress();
});

// Inicializar la aplicación
function initializeApp() {
    ensureStorageInitialized();
    setupDayButtons();
}

// Asegurar que localStorage esté inicializado
function ensureStorageInitialized() {
    const storageKey = 'habitosAtomicos_data';

    if (!localStorage.getItem(storageKey)) {
        const initialData = {};

        for (let i = 0; i < maxDaysHistory; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = formatDate(date);

            initialData[dateStr] = {
                date: dateStr,
                completed: {}
            };
        }

        localStorage.setItem(storageKey, JSON.stringify(initialData));
    }
}

// Obtener datos de localStorage
function getStorageData() {
    const data = localStorage.getItem('habitosAtomicos_data');
    return data ? JSON.parse(data) : {};
}

// Guardar datos en localStorage
function saveStorageData(data) {
    localStorage.setItem('habitosAtomicos_data', JSON.stringify(data));
}

// Formatear fecha
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Obtener fecha del día actual menos offset
function getDateForDay(dayOffset) {
    const date = new Date();
    date.setDate(date.getDate() - dayOffset);
    return formatDate(date);
}

// Obtener día de la semana
function getDayName(dayOffset) {
    const date = new Date();
    date.setDate(date.getDate() - dayOffset);
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return days[date.getDay()];
}

// Configurar botones de días
function setupDayButtons() {
    const dayButtonsContainer = document.querySelector('.flex.gap-2.overflow-x-auto');
    const baseHTML = dayButtonsContainer.innerHTML;

    // Limpiar y reconstruir solo los botones iniciales, el script ya los genera
    // Se mantiene la estructura existente del HTML
}

// Configurar event listeners
function setupEventListeners() {
    // Day buttons
    document.querySelectorAll('.day-button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const day = parseInt(e.target.dataset.day);
            selectDay(day);
        });
    });

    // Reset button
    document.getElementById('resetBtn').addEventListener('click', resetDay);

    // Clear storage button
    document.getElementById('clearStorageBtn').addEventListener('click', clearAllData);
}

// Seleccionar un día
function selectDay(dayOffset) {
    currentDay = dayOffset;

    // Actualizar botones activos
    document.querySelectorAll('.day-button').forEach(btn => {
        const btnDay = parseInt(btn.dataset.day);
        if (btnDay === dayOffset) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    renderHabits();
    updateProgress();

    const dayName = getDayName(dayOffset);
    const dateStr = getDateForDay(dayOffset);
    showToast(`Mostrando hábitos de ${dayName} (${dateStr})`, 'info');
}

// Renderizar hábitos
function renderHabits() {
    const dateStr = getDateForDay(currentDay);
    const data = getStorageData();
    const dayData = data[dateStr] || { completed: {} };

    Object.keys(habitsData).forEach(block => {
        const container = document.getElementById(`bloc${block}`);
        container.innerHTML = '';

        habitsData[block].forEach(habit => {
            const isCompleted = dayData.completed[habit.id] || false;

            const card = document.createElement('div');
            card.className = `habit-card bg-white bg-opacity-20 backdrop-blur-md rounded-xl p-4 border border-white border-opacity-20 flex items-start gap-3 ${isCompleted ? 'completed' : ''}`;

            card.innerHTML = `
                <input
                    type="checkbox"
                    class="checkbox text-white flex-shrink-0 mt-1"
                    ${isCompleted ? 'checked' : ''}
                    data-habit-id="${habit.id}"
                >
                <div class="flex-1 min-w-0">
                    <p class="habit-title text-white font-semibold text-sm">${habit.title}</p>
                    <p class="habit-support text-white text-opacity-70 text-xs mt-1">${habit.support}</p>
                </div>
            `;

            card.addEventListener('click', (e) => {
                const checkbox = card.querySelector('.checkbox');
                checkbox.checked = !checkbox.checked;
                toggleHabit(habit.id);
            });

            const checkbox = card.querySelector('.checkbox');
            checkbox.addEventListener('change', (e) => {
                e.stopPropagation();
                toggleHabit(habit.id);
            });

            container.appendChild(card);
        });
    });
}

// Toggle hábito completado
function toggleHabit(habitId) {
    const dateStr = getDateForDay(currentDay);
    const data = getStorageData();

    if (!data[dateStr]) {
        data[dateStr] = { date: dateStr, completed: {} };
    }

    data[dateStr].completed[habitId] = !data[dateStr].completed[habitId];
    saveStorageData(data);

    // Feedback háptico si está disponible
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }

    renderHabits();
    updateProgress();

    const isCompleted = data[dateStr].completed[habitId];
    if (isCompleted) {
        showToast('¡Hábito completado! 🎉', 'success');
    }
}

// Actualizar progreso
function updateProgress() {
    const dateStr = getDateForDay(currentDay);
    const data = getStorageData();
    const dayData = data[dateStr] || { completed: {} };

    let totalHabits = 0;
    let completedHabits = 0;

    Object.keys(habitsData).forEach(block => {
        habitsData[block].forEach(habit => {
            totalHabits++;
            if (dayData.completed[habit.id]) {
                completedHabits++;
            }
        });
    });

    const percentage = totalHabits > 0 ? Math.round((completedHabits / totalHabits) * 100) : 0;

    // Actualizar UI
    document.getElementById('progressText').textContent = `${completedHabits}/${totalHabits}`;
    document.getElementById('progressFill').style.width = `${percentage}%`;

    // Mensajes motivacionales
    let message = '';
    if (percentage === 0) {
        message = 'Comienza tu día con el primer hábito 🚀';
    } else if (percentage < 25) {
        message = 'Buen inicio, sigue adelante 💪';
    } else if (percentage < 50) {
        message = 'Vamos bien, a mitad del camino 🔥';
    } else if (percentage < 75) {
        message = 'Excelente progreso, casi allá 🌟';
    } else if (percentage < 100) {
        message = '¡Casi perfecto! Solo falta un poco 🎯';
    } else {
        message = '¡Día completado! ¡Excelente trabajo! 🏆';
    }

    document.getElementById('progressMessage').textContent = message;
}

// Reiniciar día
function resetDay() {
    if (!confirm('¿Estás seguro de que quieres reiniciar los hábitos de hoy?')) {
        return;
    }

    const dateStr = getDateForDay(currentDay);
    const data = getStorageData();

    if (data[dateStr]) {
        data[dateStr].completed = {};
        saveStorageData(data);
        renderHabits();
        updateProgress();
        showToast('Hábitos de hoy reiniciados ✨', 'success');
    }
}

// Borrar todo
function clearAllData() {
    if (!confirm('¿Estás seguro? Esto eliminará TODOS los datos. Esta acción no se puede deshacer.')) {
        return;
    }

    localStorage.removeItem('habitosAtomicos_data');
    ensureStorageInitialized();
    currentDay = 0;
    renderHabits();
    updateProgress();
    showToast('Todos los datos han sido eliminados 🗑️', 'info');
}

// Toast notifications
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');

    const toast = document.createElement('div');
    toast.className = `toast bg-black bg-opacity-80 text-white px-4 py-3 rounded-lg font-semibold text-sm backdrop-blur-md`;

    let icon = '✓';
    if (type === 'success') icon = '✨';
    if (type === 'error') icon = '❌';
    if (type === 'info') icon = 'ℹ️';

    toast.textContent = `${icon} ${message}`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// Sincronizar datos cuando vuelve online
window.addEventListener('online', () => {
    showToast('Conexión restaurada 🌐', 'info');
});

window.addEventListener('offline', () => {
    showToast('Sin conexión - modo offline activo', 'info');
});
