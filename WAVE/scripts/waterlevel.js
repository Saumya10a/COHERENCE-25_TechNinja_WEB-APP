document.addEventListener("DOMContentLoaded", function() {
    // Theme toggle functionality
    const themeToggleBtn = document.getElementById("theme-toggle");
    const body = document.body;

    // Check Local Storage for Theme
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
        themeToggleBtn.textContent = "☀️"; // Sun icon for Light mode
    }

    themeToggleBtn.addEventListener("click", function() {
        body.classList.toggle("dark-mode");

        // Save Theme Preference
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            themeToggleBtn.textContent = "☀️"; // Change to Sun
        } else {
            localStorage.setItem("theme", "light");
            themeToggleBtn.textContent = "🌙"; // Change to Moon
        }
        
        // Update chart colors if chart exists
        if (window.waterLevelChart) {
            updateChartTheme();
        }
    });

    // Elements
    const loadingIndicator = document.getElementById("loading-indicator");
    const errorMessage = document.getElementById("error-message");
    const waterLevelsTable = document.getElementById("water-levels-data");
    const locationInput = document.getElementById("location-input");
    const addLocationBtn = document.getElementById("add-location-btn");
    const refreshBtn = document.getElementById("refresh-btn");
    
    // Stats elements
    const monitoredLocations = document.getElementById("monitored-locations");
    const avgLevel = document.getElementById("avg-level");
    const criticalAlerts = document.getElementById("critical-alerts");
    const lastUpdated = document.getElementById("last-updated");
    
    // Chart element
    const chartElement = document.getElementById("water-level-chart");
    
    // Global variables to store data
    let waterLevelData = [];
    let userLocations = JSON.parse(localStorage.getItem("userLocations") || "[]");
    window.waterLevelChart = null;

    // Function to fetch water level data for a specific location
    async function fetchWaterLevelForLocation(location) {
        // In a real application, this would call the API with the location parameter
        // For demonstration, we'll generate random data
        return generateDataForLocation(location);
    }

    // Function to fetch all water levels for saved locations
    async function fetchAllWaterLevels() {
        try {
            loadingIndicator.style.display = "block";
            
            // If no locations are saved, show message
            if (userLocations.length === 0) {
                errorMessage.textContent = "Please add a location to monitor water levels.";
                errorMessage.style.display = "block";
                loadingIndicator.style.display = "none";
                return;
            }
            
            errorMessage.style.display = "none";
            
            // Fetch data for all saved locations
            const promises = userLocations.map(location => fetchWaterLevelForLocation(location));
            const results = await Promise.all(promises);
            
            processWaterLevelData(results);
            
        } catch (error) {
            console.error("Error fetching water level data:", error);
            errorMessage.textContent = "Unable to load water level data. Please try again later.";
            errorMessage.style.display = "block";
            loadingIndicator.style.display = "none";
        }
    }

    // Process and display water level data
    function processWaterLevelData(data) {
        // Store the data globally
        waterLevelData = data;
        
        // Update stats
        updateStats(data);
        
        // Render table with all data
        renderWaterLevelTable(data);
        
        // Create/update chart
        createWaterLevelChart(data);
        
        // Hide loading indicator
        loadingIndicator.style.display = "none";
    }

    // Update statistics based on data
    function updateStats(data) {
        // Number of monitored locations
        monitoredLocations.textContent = data.length;
        
        // Calculate average water level
        const totalLevel = data.reduce((sum, item) => sum + parseFloat(item.currentLevel || 0), 0);
        const average = totalLevel / data.length;
        avgLevel.textContent = average.toFixed(2) + " m";
        
        // Count critical alerts (water level below 30% of normal)
        const criticalCount = data.filter(item => {
            const currentLevel = parseFloat(item.currentLevel || 0);
            const normalLevel = parseFloat(item.normalLevel || 100);
            return currentLevel < (normalLevel * 0.3);
        }).length;
        criticalAlerts.textContent = criticalCount;
        
        // Set last updated time
        const now = new Date();
        lastUpdated.textContent = now.toLocaleString();
    }

    // Render water level table
    function renderWaterLevelTable(data) {
        // Clear existing table rows
        waterLevelsTable.innerHTML = "";
        
        // Create table rows
        data.forEach(item => {
            const currentLevel = parseFloat(item.currentLevel || 0);
            const normalLevel = parseFloat(item.normalLevel || 100);
            const percentage = (currentLevel / normalLevel) * 100;
            
            let statusClass, statusText;
            if (percentage < 30) {
                statusClass = "status-critical";
                statusText = "Critical";
            } else if (percentage < 70) {
                statusClass = "status-warning";
                statusText = "Warning";
            } else {
                statusClass = "status-normal";
                statusText = "Normal";
            }
            
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.location}</td>
                <td>${item.waterBody}</td>
                <td>${item.currentLevel}</td>
                <td>${item.normalLevel}</td>
                <td class="${statusClass}">${statusText}</td>
                <td>${item.lastUpdated}</td>
                <td>
                    <button class="btn-remove" data-location="${item.location}">Remove</button>
                </td>
            `;
            
            waterLevelsTable.appendChild(row);
        });
        
        // Add event listeners to remove buttons
        document.querySelectorAll(".btn-remove").forEach(button => {
            button.addEventListener("click", function() {
                const locationToRemove = this.getAttribute("data-location");
                removeLocation(locationToRemove);
            });
        });
        
        // Show message if no results
        if (data.length === 0) {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td colspan="7" style="text-align: center;">No water level data available. Please add locations to monitor.</td>
            `;
            waterLevelsTable.appendChild(row);
        }
    }

    // Create water level chart
    function createWaterLevelChart(data) {
        // Sort data by current level
        const chartData = [...data].sort((a, b) => 
            parseFloat(b.currentLevel || 0) - parseFloat(a.currentLevel || 0)
        );
        
        const locations = chartData.map(item => item.location);
        const currentLevels = chartData.map(item => parseFloat(item.currentLevel || 0));
        const normalLevels = chartData.map(item => parseFloat(item.normalLevel || 0));
        
        // Destroy previous chart if it exists
        if (window.waterLevelChart) {
            window.waterLevelChart.destroy();
        }
        
        // Get colors based on current theme
        const isDarkMode = body.classList.contains("dark-mode");
        const textColor = isDarkMode ? "#f1f1f1" : "#2C3E50";
        const gridColor = isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";
        
        // Create chart
        window.waterLevelChart = new Chart(chartElement, {
            type: 'bar',
            data: {
                labels: locations,
                datasets: [
                    {
                        label: 'Current Level (m)',
                        data: currentLevels,
                        backgroundColor: '#1ABC9C',
                        borderColor: '#16A085',
                        borderWidth: 1
                    },
                    {
                        label: 'Normal Level (m)',
                        data: normalLevels,
                        backgroundColor: isDarkMode ? '#ff8c00' : '#007bff',
                        borderColor: isDarkMode ? '#e67300' : '#0056b3',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Water Level (meters)',
                            color: textColor
                        },
                        ticks: {
                            color: textColor
                        },
                        grid: {
                            color: gridColor
                        }
                    },
                    x: {
                        ticks: {
                            color: textColor
                        },
                        grid: {
                            color: gridColor
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: textColor
                        }
                    },
                    title: {
                        display: true,
                        text: 'Water Level by Location',
                        color: textColor,
                        font: {
                            size: 16
                        }
                    }
                }
            }
        });
    }

    // Update chart theme when switching between light/dark mode
    function updateChartTheme() {
        const isDarkMode = body.classList.contains("dark-mode");
        const textColor = isDarkMode ? "#f1f1f1" : "#2C3E50";
        const gridColor = isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";
        
        // Update dataset colors
        window.waterLevelChart.data.datasets[1].backgroundColor = isDarkMode ? '#ff8c00' : '#007bff';
        window.waterLevelChart.data.datasets[1].borderColor = isDarkMode ? '#e67300' : '#0056b3';
        
        // Update scales and plugins
        window.waterLevelChart.options.scales.y.title.color = textColor;
        window.waterLevelChart.options.scales.y.ticks.color = textColor;
        window.waterLevelChart.options.scales.y.grid.color = gridColor;
        window.waterLevelChart.options.scales.x.ticks.color = textColor;
        window.waterLevelChart.options.scales.x.grid.color = gridColor;
        window.waterLevelChart.options.plugins.legend.labels.color = textColor;
        window.waterLevelChart.options.plugins.title.color = textColor;
        
        // Update the chart
        window.waterLevelChart.update();
    }

    // Generate data for a location (simulating API response)
    function generateDataForLocation(location) {
        const waterBodies = {
            "Mumbai": "Mithi River",
            "Delhi": "Yamuna River",
            "Bangalore": "Varthur Lake",
            "Chennai": "Adyar River",
            "Kolkata": "Hooghly River",
            "Hyderabad": "Hussain Sagar Lake",
            "Pune": "Mula-Mutha River",
            "Ahmedabad": "Sabarmati River",
            "Jaipur": "Jal Mahal Lake",
            "Lucknow": "Gomti River",
            "Goa": "Mandovi River",
            "Kochi": "Periyar River",
            "Shimla": "Sutlej River",
            "Srinagar": "Dal Lake"
        };
        
        // Default for unknown locations
        let waterBody = `${location} Water Body`;
        
        // Use predefined water body if available
        if (waterBodies[location]) {
            waterBody = waterBodies[location];
        }
        
        // Generate random but somewhat consistent data based on location name
        const locationSum = location.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
        const normalLevelBase = (locationSum % 30) + 50; // Between 50-80
        const normalLevel = normalLevelBase + Math.floor(Math.random() * 10);
        
        // Current level could be above or below normal
        const variance = Math.random() * 0.6 - 0.3; // -30% to +30%
        const currentLevel = Math.max(1, Math.floor(normalLevel * (1 + variance)));
        
        // Update time - within last 24 hours
        const date = new Date();
        date.setMinutes(date.getMinutes() - Math.floor(Math.random() * 60 * 24));
        
        return {
            location: location,
            waterBody: waterBody,
            currentLevel: currentLevel.toString(),
            normalLevel: normalLevel.toString(),
            lastUpdated: date.toLocaleString()
        };
    }

    // Add a new location to monitor
    function addLocation(location) {
        // Skip if empty
        if (!location.trim()) return;
        
        // Skip if already in the list
        if (userLocations.includes(location)) {
            alert(`${location} is already being monitored.`);
            return;
        }
        
        // Add to list
        userLocations.push(location);
        
        // Save to local storage
        localStorage.setItem("userLocations", JSON.stringify(userLocations));
        
        // Clear input
        locationInput.value = "";
        
        // Refresh data
        fetchAllWaterLevels();
    }

    // Remove a location from monitoring
    function removeLocation(location) {
        userLocations = userLocations.filter(loc => loc !== location);
        
        // Save to local storage
        localStorage.setItem("userLocations", JSON.stringify(userLocations));
        
        // Refresh data
        fetchAllWaterLevels();
    }

    // Start real-time updates
    function startRealTimeUpdates() {
        // Update data every 30 seconds
        setInterval(() => {
            if (userLocations.length > 0) {
                console.log("Updating water level data...");
                fetchAllWaterLevels();
            }
        }, 30000); // 30 seconds
    }

    // Event listeners
    addLocationBtn.addEventListener("click", () => {
        addLocation(locationInput.value);
    });
    
    // Also add location when pressing Enter in the input
    locationInput.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            addLocation(locationInput.value);
        }
    });
    
    refreshBtn.addEventListener("click", fetchAllWaterLevels);

    // Initial data fetch
    fetchAllWaterLevels();
    
    // Start real-time updates
    startRealTimeUpdates();
});