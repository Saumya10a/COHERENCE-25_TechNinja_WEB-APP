"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart } from "@/components/dashboard/area-chart"
import { StatCard } from "@/components/dashboard/stat-card"
import { Droplets, AlertTriangle } from "lucide-react"
import { fetchWaterLevelData } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function WaterLevels() {
  const { toast } = useToast()
  const [waterLevelData, setWaterLevelData] = useState(null)
  const [loading, setLoading] = useState(true)

  // Mock data for demonstration
  const timeLabels = ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"]
  const mockData = {
    labels: timeLabels,
    data: [20, 22, 25, 30, 28, 24],
  }

  const waterBodies = [
    {
      name: "Main River",
      currentLevel: 3.2,
      normalLevel: 2.5,
      floodLevel: 5.0,
      status: "Elevated",
      trend: 0.3,
    },
    {
      name: "East Lake",
      currentLevel: 12.5,
      normalLevel: 12.0,
      floodLevel: 15.0,
      status: "Normal",
      trend: 0.1,
    },
    {
      name: "West Reservoir",
      currentLevel: 45.2,
      normalLevel: 50.0,
      floodLevel: 60.0,
      status: "Low",
      trend: -0.5,
    },
    {
      name: "North Canal",
      currentLevel: 1.8,
      normalLevel: 1.5,
      floodLevel: 3.0,
      status: "Elevated",
      trend: 0.2,
    },
  ]

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "normal":
        return "bg-green-500"
      case "elevated":
        return "bg-yellow-500"
      case "high":
        return "bg-orange-500"
      case "flood":
        return "bg-red-500"
      case "low":
        return "bg-blue-300"
      default:
        return "bg-blue-500"
    }
  }

  const getProgressValue = (current, normal, flood) => {
    // Calculate percentage between normal and flood level
    if (current <= normal) {
      return (current / normal) * 50 // Below normal is 0-50%
    } else {
      // Above normal is 50-100%
      const aboveNormalRange = flood - normal
      const aboveNormalAmount = current - normal
      return 50 + (aboveNormalAmount / aboveNormalRange) * 50
    }
  }

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        // Fetch real data from API
        const waterData = await fetchWaterLevelData()
        setWaterLevelData(waterData)
      } catch (error) {
        console.error("Error fetching water level data:", error)
        toast({
          title: "Error fetching data",
          description: "Could not fetch real-time water level data. Using sample data instead.",
          variant: "destructive",
        })

        // Use mock data if API fails
        setWaterLevelData(mockData)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [toast])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Water Level Monitoring</h2>
        <Badge variant="outline" className="px-3 py-1">
          <div className="mr-1 h-2 w-2 rounded-full bg-yellow-500" />
          Overall: Elevated
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Average Water Level"
          value="15.7m"
          icon={Droplets}
          description="Across all monitoring stations"
          trend={2.1}
        />
        <StatCard
          title="Highest Risk Area"
          value="Main River"
          icon={AlertTriangle}
          description="64% of flood level"
          trend={6.0}
        />
        <StatCard title="Rainfall Last 24h" value="32mm" icon={Droplets} description="City-wide average" trend={15.3} />
        <StatCard
          title="Reservoir Capacity"
          value="78%"
          icon={Droplets}
          description="Combined water reserves"
          trend={-3.2}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <AreaChart
          title="24-Hour Water Level Trend"
          data={waterLevelData?.data || mockData.data}
          labels={waterLevelData?.labels || mockData.labels}
          borderColor="rgb(2, 132, 199)"
          backgroundColor="rgba(2, 132, 199, 0.1)"
        />
        <Card>
          <CardHeader>
            <CardTitle>Flood Risk Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border p-4">
                <h4 className="font-medium">Current Status</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  Water levels are elevated but below flood stage. Recent rainfall has increased levels in most
                  waterways.
                </p>
              </div>
              <div className="rounded-md border p-4">
                <h4 className="font-medium">24-Hour Forecast</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  Additional rainfall of 15-20mm expected. Main River and North Canal may approach warning levels.
                </p>
              </div>
              <div className="rounded-md border p-4">
                <h4 className="font-medium">Precautionary Measures</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  Flood barriers are being deployed in high-risk areas. Residents in low-lying areas should monitor
                  updates.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Water Bodies Monitoring</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {waterBodies.map((body) => (
              <div key={body.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded-full ${getStatusColor(body.status)}`} />
                    <h4 className="font-medium">{body.name}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{body.currentLevel}m</span>
                    <span className={`text-xs ${body.trend > 0 ? "text-red-500" : "text-green-500"}`}>
                      {body.trend > 0 ? "↑" : "↓"} {Math.abs(body.trend)}m
                    </span>
                    <Badge variant="outline">{body.status}</Badge>
                  </div>
                </div>
                <Progress
                  value={getProgressValue(body.currentLevel, body.normalLevel, body.floodLevel)}
                  className="h-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0m</span>
                  <span>Normal: {body.normalLevel}m</span>
                  <span>Flood: {body.floodLevel}m</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

