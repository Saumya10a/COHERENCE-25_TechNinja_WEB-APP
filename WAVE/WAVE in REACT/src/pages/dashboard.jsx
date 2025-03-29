"use client"

import { useEffect, useState } from "react"
import { StatCard } from "@/components/dashboard/stat-card"
import { AreaChart } from "@/components/dashboard/area-chart"
import { MapCard } from "@/components/dashboard/map-card"
import { AlertCard } from "@/components/dashboard/alert-card"
import { Wind, Droplets, Car, Zap } from "lucide-react"
import { fetchAirQualityData, fetchWaterLevelData } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"

export default function Dashboard() {
  const { toast } = useToast()
  const [airQualityData, setAirQualityData] = useState(null)
  const [waterLevelData, setWaterLevelData] = useState(null)
  const [loading, setLoading] = useState(true)

  // Mock data for demonstration
  const timeLabels = ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"]

  const energyData = {
    labels: timeLabels,
    data: [30, 40, 45, 50, 49, 60],
  }

  const trafficData = {
    labels: timeLabels,
    data: [1000, 1200, 1500, 1300, 1600, 1200],
  }

  const alerts = [
    {
      title: "Air Quality Warning",
      message: "PM2.5 levels exceeding threshold in downtown area",
      severity: "High",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
    {
      title: "Traffic Congestion",
      message: "Heavy traffic on Main Street due to construction",
      severity: "Medium",
      timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    },
    {
      title: "Water Level Rising",
      message: "River water level rising due to recent rainfall",
      severity: "Low",
      timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    },
  ]

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        // Fetch real data from APIs
        const airData = await fetchAirQualityData()
        const waterData = await fetchWaterLevelData()

        setAirQualityData(airData)
        setWaterLevelData(waterData)
      } catch (error) {
        console.error("Error fetching data:", error)
        toast({
          title: "Error fetching data",
          description: "Could not fetch real-time data. Using sample data instead.",
          variant: "destructive",
        })

        // Use mock data if API fails
        // setAirQualityData({
        //   labels: timeLabels,
        //   data: [35, 42, 50, 55, 48, 40],
        // })
        setWaterLevelData({
          labels: timeLabels,
          data: [20, 22, 25, 30, 28, 24],
        })
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [toast])

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">
        Smart City Dashboard
      </h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Air Quality Index"
          value={
            airQualityData
              ? `${Math.round(
                  airQualityData.data[airQualityData.data.length - 1]
                )}`
              : "--"
          }
          icon={Wind}
          description="PM2.5 concentration (μg/m³)"
          trend={5.2}
        />
        <StatCard
          title="Water Level"
          value={
            waterLevelData
              ? `${Math.round(
                  waterLevelData.data[waterLevelData.data.length - 1]
                )}m`
              : "--"
          }
          icon={Droplets}
          description="Current river level"
          trend={-2.1}
        />
        <StatCard
          title="Traffic Volume"
          value={`${trafficData.data[trafficData.data.length - 1]}`}
          icon={Car}
          description="Vehicles per hour"
          trend={8.5}
        />
        <StatCard
          title="Energy Consumption"
          value={`${energyData.data[energyData.data.length - 1]} MW`}
          icon={Zap}
          description="Current city-wide usage"
          trend={3.7}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <AreaChart
          title="Air Quality Trends"
          data={airQualityData?.data || [35, 42, 50, 55, 48, 40]}
          labels={airQualityData?.labels || timeLabels}
          borderColor="rgb(234, 88, 12)"
          backgroundColor="rgba(234, 88, 12, 0.1)"
        />
        <AreaChart
          title="Water Level Trends"
          data={waterLevelData?.data || [20, 22, 25, 30, 28, 24]}
          labels={waterLevelData?.labels || timeLabels}
          borderColor="rgb(2, 132, 199)"
          backgroundColor="rgba(2, 132, 199, 0.1)"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <MapCard
          title="City Traffic Map"
          apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
          className="md:col-span-2"
        />
        <AlertCard alerts={alerts} />
      </div>
    </div>
  );
}

