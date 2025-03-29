// This file contains API functions for fetching data from external services

// Helper function to handle API errors
const handleApiError = (error, fallbackData, serviceName) => {
  console.error(`Error fetching ${serviceName} data:`, error)
  console.warn(`Using fallback data for ${serviceName}`)
  return fallbackData
}

// Fetch air quality data from an external API
// export async function fetchAirQualityData() {
//   const timeLabels = ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"]
//   const fallbackData = {
//     labels: timeLabels,
//     data: [35, 42, 50, 55, 48, 40],
//   }

//   try {
//     // In a real application, you would use your API key and fetch from a real endpoint
//     // Replace this URL with your actual API endpoint
//     const apiKey = import.meta.env.VITE_AIR_QUALITY_API_KEY

//     if (!apiKey) {
//       console.warn("Air quality API key not found. Using fallback data.")
//       return fallbackData
//     }

//     // Example API call - replace with your actual API
//     // const response = await fetch(`https://api.airquality.com/data?apiKey=${apiKey}`)

//     // For demonstration, we'll simulate an API call with a delay
//     await new Promise((resolve) => setTimeout(resolve, 500))

//     // Simulate successful API response
//     // In a real app, you would parse the actual response
//     // const data = await response.json()

//     // For now, return mock data
//     return fallbackData
//   } catch (error) {
//     return handleApiError(error, fallbackData, "air quality")
//   }
// }
export async function fetchAirQualityData() {
  const timeLabels = ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"];
  const fallbackData = {
    labels: timeLabels,
    data: [35, 42, 50, 55, 48, 40], // Default AQI values if API fails
    pollutants: null,
  };

  try {
    const apiKey = import.meta.env.VITE_AIR_QUALITY_API_KEY;

    if (!apiKey) {
      console.warn("OpenWeather API key not found. Using fallback data.");
      return fallbackData;
    }

    // Get user's current location
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
      });
    });

    const { latitude, longitude } = position.coords;

    console.log(`Fetching AQI for: ${latitude}, ${longitude}`);

    // Fetch air quality data from OpenWeather API
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.list || data.list.length === 0) {
      throw new Error("Invalid API response: No air quality data found.");
    }

    const airQuality = data.list[0]; // Extract the first data point
    const aqi = airQuality.main.aqi; // AQI level (1-5)
    const pollutants = airQuality.components; // Detailed pollutants
    const timestamp = airQuality.dt; // Data timestamp

    // Convert AQI to a mock hourly timeline for UI
    const aqiLevels = [
      aqi * 10,
      aqi * 12,
      aqi * 15,
      aqi * 14,
      aqi * 11,
      aqi * 9,
    ];

    return {
      labels: timeLabels,
      data: aqiLevels,
      location: { latitude, longitude },
      aqi,
      pollutants: [
        { name: "PM2.5", value: `${components.pm2_5} μg/m³` },
        { name: "PM10", value: `${components.pm10} μg/m³` },
        { name: "O3", value: `${components.o3} ppb` },
        { name: "NO2", value: `${components.no2} ppb` },
        { name: "SO2", value: `${components.so2} ppb` },
        { name: "CO", value: `${components.co} ppm` },
      ],
      timestamp,
    };
  } catch (error) {
    console.error("Error fetching air quality data:", error);
    return fallbackData;
  }
}



// Fetch water level data from an external API
export async function fetchWaterLevelData() {
  const timeLabels = ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"]
  const fallbackData = {
    labels: timeLabels,
    data: [20, 22, 25, 30, 28, 24],
  }

  try {
    // In a real application, you would use your API key and fetch from a real endpoint
    const apiKey = import.meta.env.VITE_WATER_LEVEL_API_KEY

    if (!apiKey) {
      console.warn("Water level API key not found. Using fallback data.")
      return fallbackData
    }

    // Example API call - replace with your actual API
    // const response = await fetch(`https://api.waterlevels.com/data?apiKey=${apiKey}`)

    // For demonstration, we'll simulate an API call with a delay
    await new Promise((resolve) => setTimeout(resolve, 700))

    // Simulate successful API response
    // In a real app, you would parse the actual response
    // const data = await response.json()

    // For now, return mock data
    return fallbackData
  } catch (error) {
    return handleApiError(error, fallbackData, "water level")
  }
}

// Fetch traffic data from an external API
export async function fetchTrafficData() {
  const timeLabels = ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"]
  const fallbackData = {
    labels: timeLabels,
    data: [1000, 1200, 1500, 1300, 1600, 1200],
  }

  try {
    // In a real application, you would use your API key and fetch from a real endpoint
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

    if (!apiKey) {
      console.warn("Google Maps API key not found. Using fallback data.")
      return fallbackData
    }

    // Example API call - replace with your actual API
    // const response = await fetch(`https://maps.googleapis.com/maps/api/traffic/data?key=${apiKey}`)

    // For demonstration, we'll simulate an API call with a delay
    await new Promise((resolve) => setTimeout(resolve, 600))

    // Simulate successful API response
    // In a real app, you would parse the actual response
    // const data = await response.json()

    // For now, return mock data
    return fallbackData
  } catch (error) {
    return handleApiError(error, fallbackData, "traffic")
  }
}

// Fetch energy usage data from an external API
export async function fetchEnergyData() {
  const timeLabels = ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"]
  const fallbackData = {
    labels: timeLabels,
    data: [30, 40, 45, 50, 49, 60],
  }

  try {
    // In a real application, you would use your API key and fetch from a real endpoint
    const apiKey = import.meta.env.VITE_ENERGY_API_KEY

    if (!apiKey) {
      console.warn("Energy API key not found. Using fallback data.")
      return fallbackData
    }

    // Example API call - replace with your actual API
    // const response = await fetch(`https://api.energy.com/data?apiKey=${apiKey}`)

    // For demonstration, we'll simulate an API call with a delay
    await new Promise((resolve) => setTimeout(resolve, 550))

    // Simulate successful API response
    // In a real app, you would parse the actual response
    // const data = await response.json()

    // For now, return mock data
    return fallbackData
  } catch (error) {
    return handleApiError(error, fallbackData, "energy")
  }
}

// Fetch alerts from an external API
export async function fetchAlerts() {
  const fallbackAlerts = [
    {
      id: 1,
      title: "Air Quality Warning",
      message: "PM2.5 levels exceeding threshold in downtown area",
      category: "Air Quality",
      severity: "High",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      status: "Active",
    },
    {
      id: 2,
      title: "Traffic Congestion",
      message: "Heavy traffic on Main Street due to construction",
      category: "Traffic",
      severity: "Medium",
      timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      status: "Active",
    },
    {
      id: 3,
      title: "Water Level Rising",
      message: "River water level rising due to recent rainfall",
      category: "Water",
      severity: "Low",
      timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
      status: "Monitoring",
    },
  ]

  try {
    // In a real application, you would use your API key and fetch from a real endpoint
    const apiKey = import.meta.env.VITE_ALERTS_API_KEY

    if (!apiKey) {
      console.warn("Alerts API key not found. Using fallback data.")
      return fallbackAlerts
    }

    // Example API call - replace with your actual API
    // const response = await fetch(`https://api.alerts.com/data?apiKey=${apiKey}`)

    // For demonstration, we'll simulate an API call with a delay
    await new Promise((resolve) => setTimeout(resolve, 400))

    // Simulate successful API response
    // In a real app, you would parse the actual response
    // const data = await response.json()

    // For now, return mock data
    return fallbackAlerts
  } catch (error) {
    return handleApiError(error, fallbackAlerts, "alerts")
  }
}

