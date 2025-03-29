
// Weather (example data)
document.querySelector('.city').textContent = 'Los Angeles';
document.querySelector('.time').textContent = new Date().toLocaleTimeString();
document.querySelector('.temp').textContent = '68°F / 20°C';
document.querySelector('.desc').textContent = 'Sunny';

// Traffic (example logic)
function updateTrafficLight(status) {
    const lights = document.querySelectorAll('.scd-traffic-light .scd-light');
    lights.forEach(light => light.classList.remove('active'));

    switch (status) {
        case 'red':
            lights[0].classList.add('active');
            document.querySelector('.traffic-status').textContent = 'Heavy Congestion';
            break;
        case 'yellow':
            lights[1].classList.add('active');
            document.querySelector('.traffic-status').textContent = 'Moderate Traffic';
            break;
        case 'green':
            lights[2].classList.add('active');
            document.querySelector('.traffic-status').textContent = 'Light Traffic';
            break;
    }
}

// Example usage:
updateTrafficLight('green');

// Energy Usage (using Chart.js)
const ctx = document.getElementById('energyChart').getContext('2d');
const energyChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Energy Consumption (MWh)',
            data: [1000, 1100, 1200, 1150, 1250, 1300],
            borderColor: 'rgb(75, 192, 192)',
            fill: false
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
// Weather (example data)
document.querySelector('.city').textContent = 'Los Angeles';
document.querySelector('.time').textContent = new Date().toLocaleTimeString();
document.querySelector('.temp').textContent = '68°F / 20°C';
document.querySelector('.desc').textContent = 'Sunny';

// Traffic (example logic)
function updateTrafficLight(status) {
    const lights = document.querySelectorAll('.scd-traffic-light .scd-light');
    lights.forEach(light => light.classList.remove('active'));

    switch (status) {
        case 'red':
            lights[0].classList.add('active');
            document.querySelector('.traffic-status').textContent = 'Heavy Congestion';
            break;
        case 'yellow':
            lights[1].classList.add('active');
            document.querySelector('.traffic-status').textContent = 'Moderate Traffic';
            break;
        case 'green':
            lights[2].classList.add('active');
            document.querySelector('.traffic-status').textContent = 'Light Traffic';
            break;
    }
}

// Example usage:
updateTrafficLight('green');

// Energy Usage (using Chart.js)
const ctx = document.getElementById('energyChart').getContext('2d');
const energyChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Energy Consumption (MWh)',
            data: [1000, 1100, 1200, 1150, 1250, 1300],
            borderColor: 'rgb(75, 192, 192)',
            fill: false
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Fetch Real-Time Weather Data (Dummy API Call)
function fetchWeather() {
    document.getElementById('weather').innerText = "🌤️ 28°C | Sunny";
}

// Simulate Traffic Light Status
function updateTraffic() {
    const status = document.getElementById('traffic-status');
    const lights = document.querySelectorAll('.traffic-light .light');

    let trafficLevel = Math.random();
    
    if (trafficLevel < 0.3) {
        status.innerText = "🚦 Low Traffic";
        lights[0].style.opacity = "0.3";
        lights[1].style.opacity = "0.3";
        lights[2].style.opacity = "1";
    } else if (trafficLevel < 0.7) {
        status.innerText = "🚧 Moderate Traffic";
        lights[0].style.opacity = "0.3";
        lights[1].style.opacity = "1";
        lights[2].style.opacity = "0.3";
    } else {
        status.innerText = "🚗 Heavy Traffic";
        lights[0].style.opacity = "1";
        lights[1].style.opacity = "0.3";
        lights[2].style.opacity = "0.3";
    }
}

// Fetch City News (Dummy Data)
function fetchNews() {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = `
        <div class="news-item"><strong>🚀 Smart City AI System Launched!</strong> - The government has introduced a new AI-driven system.</div>
        <div class="news-item"><strong>🌳 Green Energy Expansion</strong> - More solar panels installed around the city.</div>
        <div class="news-item"><strong>🚉 Metro Expansion Approved</strong> - New metro lines to reduce traffic congestion.</div>
    `;
}

// Update Energy Usage Bar (Simulated)
function updateEnergyUsage() {
    const usage = Math.floor(Math.random() * 100);
    const energyBar = document.getElementById('energy-bar');
    const energyStatus = document.getElementById('energy-status');

    energyBar.style.background = `linear-gradient(to right, green ${100 - usage}%, yellow 20%, red ${usage}%)`;
    energyStatus.innerText = `⚡ ${usage}% Usage`;
}

// Run All Functions on Page Load
window.onload = function() {
    fetchWeather();
    updateTraffic();
    fetchNews();
    updateEnergyUsage();

    setInterval(updateTraffic, 5000); // Update Traffic Every 5 Secs
    setInterval(updateEnergyUsage, 10000); // Update Energy Every 10 Secs
};
