let activities = [];


const storedActivities = localStorage.getItem('activities');
if (storedActivities) {
    activities = JSON.parse(storedActivities);
}

let currentTime = new Date();
let clockInterval;
let scheduleInterval;




const showPage = (pageId) => {
    const pages = [ 'homepage', 'loading-page'];
    pages.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.classList.add('hidden');
        }
    });
    
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.remove('hidden');
        targetPage.classList.add('fade-in');
    }
};const addActivity = () =>
{
    const activityInput = document.getElementById('activity-input');
    const startTime = document.getElementById('start-time');
    const endTime = document.getElementById('end-time');

    if (!activityInput.value || !startTime.value || !endTime.value)
    {
        alert ('veuillez remplir tous les champs');
        return ;
    }

    const activity = {
    name: activityInput.value,
    start: startTime.value,
    end: endTime.value,
    id: Date.now()
    };

    activities.push(activity);
    localStorage.setItem('activities', JSON.stringify(activities));
    updateActivitiesList();
    
    activityInput.value = '';
    startTime.value = '';
    endTime.value = '';
    
    // Enable validate button
    document.getElementById('validate-btn').disabled = activities.length === 0;
}

const updateActivitiesList = () => {
    const container = document.getElementById('activities-container');
   
    if (!container ) return;
    if (activities.length === 0) 
    {
        container.innerHTML = '<div class="activity-item p-5 rounded-lg flex justify-between items-center "><div class="flex items-center gap-4"><div "><i class="fas fa-plus text-gray-400"></i></div><div><div class="font-bold text-gray-400">Ajoutez une activité</div><div class="text-sm text-gray-400">Elles apparaîtront ici</div></div></div> </div>';
        return;
    }
    
    container.innerHTML = activities.map(activity => `
        <div class="flex justify-between w-full">
        <div class="flex items-center gap-4">
        <div class="bg-blue-500/20 p-3 rounded-full">
        <i class="fas fa-utensils text-blue-300"></i>
        </div>
        <div>
        <div class="font-bold">${activity.name}</div>
        <div class="text-sm text-gray-300">${activity.start} - ${activity.end}</div>
        </div>
        </div>
        <button
        onclick="removeActivity(${activity.id})"
        class="text-red-400 hover:text-red-300 p-2 rounded-full hover:bg-red-500/10 transition">
        <i class="fas fa-trash">sup</i>
        </button>
        </div>
    `).join('');
};

// const removeActivity = (id) => {
//     activities = activities.filter(activity => activity.id !== id);
//     updateActivitiesList();
//     document.getElementById('validate-btn').disabled = activities.length === 0;
// };

const removeActivity = (id) => {
  activities = activities.filter(activity => activity.id !== id);
  localStorage.setItem('activities', JSON.stringify(activities));
  updateActivitiesList();
  const validateBtn = document.getElementById('validate-btn');
  if (validateBtn) validateBtn.disabled = activities.length === 0;
};

updateActivitiesList();

const validatePlanning = () => {
    if (activities.length === 0) return;
    
    
    showPage('loading-page');
    const loadingMessages = [
        "Initialisation des algorithmes...",
        "Analyse de vos habitudes...",
        "Optimisation temporelle en cours...",
        "Synchronisation avec l'IA...",
        "Calibrage de l'horloge intelligente...",
        "Activation du mode surveillance...",
        "Lancement du système OptiPlan..."
    ];
    
    let messageIndex = 0;
    const loadingText = document.getElementById('loading-text');
    
    const loadingInterval = setInterval(() => {
        if (messageIndex < loadingMessages.length) {
            loadingText.textContent = loadingMessages[messageIndex];
            messageIndex++;
        } else {
            clearInterval(loadingInterval);
            setTimeout(() => {
                window.location.href = "time.html";
            }, 1000);
        }
    }, 1000);
};


const updateCurrentDate = () => {
    const now = new Date();
    const dateElement = document.getElementById('current-date');
    if (!dateElement) return; // <-- évite l'erreur si l'élément n'est pas sur cette page

    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    dateElement.textContent = now.toLocaleDateString('fr-FR', options);
};

const updateCurrentActivity = () => {
    const now = new Date();
    const currentTimeStr = now.toTimeString().slice(0, 5); // HH:MM
    
    let currentActivity = null;
    let nextActivity = null;
    
    // Trouver l'activité en cours et la suivante
    for (let i = 0; i < activities.length; i++) {
        const activity = activities[i];
        
        if (currentTimeStr >= activity.start && currentTimeStr <= activity.end) {
            currentActivity = activity;
        } else if (currentTimeStr < activity.start) {
            nextActivity = activity;
            break;
        }
    }
    
    updateCurrentActivityDisplay(currentActivity);
    updateNextActivityDisplay(nextActivity);
};

const updateCurrentActivityDisplay = (activity) => {
    const nameElement = document.getElementById('current-activity-name');
    const timeElement = document.getElementById('current-activity-time');
    const cardElement = document.getElementById('current-activity-card');
    
    if (!nameElement || !timeElement || !cardElement) return;
    if (activity) {
        nameElement.textContent = activity.name;
        timeElement.textContent = `${activity.start} - ${activity.end}`;
        // cardElement.className = 'text-center p-6 bg-green-50 rounded-xl border border-green-200';
    } else {
        nameElement.textContent = 'Aucune activité';
        timeElement.textContent = '--:-- - --:--';
        // cardElement.className = 'text-center p-6 bg-gray-50 rounded-xl border border-gray-200';
    }
};

const updateNextActivityDisplay = (activity) => {
    const nameElement = document.getElementById('next-activity-name');
    const timeElement = document.getElementById('next-activity-time');
    
    if (!nameElement || !timeElement) return;

    if (activity) {
        nameElement.textContent = activity.name;
        timeElement.textContent = `${activity.start} - ${activity.end}`;
    } else {
        nameElement.textContent = 'Fin du planning';
        timeElement.textContent = '--:-- - --:--';
    }
};

const checkForAlerts = () => {
    const now = new Date();
    const currentTimeStr = now.toTimeString().slice(0, 5);
    
    activities.forEach(activity => {
        // Alerte au début de l'activité
        if (currentTimeStr === activity.start) {
                // Mode normal
                speakMessage(`il est temps de : ${activity.name}`);
                showNotification(`⏰ ${activity.name}`);
        }
    });
};

const showNotification = (message) => {
    const notification = document.createElement('div');
    notification.className =  'notification';
    notification.textContent = message;
    
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #3b82f6;
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
    `;

    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 4000);
};

document.addEventListener('DOMContentLoaded', () => {
    updateCurrentDate();
    updateCurrentActivity();
    updateActivitiesList();

    clockInterval = setInterval(() => {
        updateCurrentActivity();
        checkForAlerts();
    }, 100);
});