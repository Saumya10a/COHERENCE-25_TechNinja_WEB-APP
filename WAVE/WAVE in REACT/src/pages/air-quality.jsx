"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart } from "@/components/dashboard/area-chart"
import { StatCard } from "@/components/dashboard/stat-card"
import { Wind, AlertTriangle, MapPin } from "lucide-react"
import { fetchAirQualityData } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AirQuality() {
  const { toast } = useToast()
  const [airQualityData, setAirQualityData] = useState(null)
  const [loading, setLoading] = useState(true)

  // Mock data for demonstration
  const timeLabels = ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"]
  const mockData = {
    labels: timeLabels,
    data: [35, 42, 50, 55, 48, 40],
  }

  const pollutants = [
    { name: "PM2.5", value: "42 μg/m³", status: "Moderate", trend: 5.2 },
    { name: "PM10", value: "65 μg/m³", status: "Moderate", trend: 3.1 },
    { name: "O3", value: "48 ppb", status: "Good", trend: -2.5 },
    { name: "NO2", value: "15 ppb", status: "Good", trend: 1.8 },
    { name: "SO2", value: "3 ppb", status: "Good", trend: -0.5 },
    { name: "CO", value: "0.8 ppm", status: "Good", trend: 0.2 },
  ]

  const locations = [
    { name: "Downtown", aqi: 75, status: "Moderate", pollutant: "PM2.5" },
    { name: "Riverside", aqi: 45, status: "Good", pollutant: "O3" },
    { name: "Industrial Zone", aqi: 110, status: "Unhealthy", pollutant: "PM10" },
    { name: "Residential Area", aqi: 55, status: "Moderate", pollutant: "PM2.5" },
    { name: "City Park", aqi: 35, status: "Good", pollutant: "O3" },
  ]

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "good":
        return "bg-green-500"
      case "moderate":
        return "bg-yellow-500"
      case "unhealthy":
        return "bg-orange-500"
      case "very unhealthy":
        return "bg-red-500"
      case "hazardous":
        return "bg-purple-500"
      default:
        return "bg-blue-500"
    }
  }

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        // Fetch real data from API
        const airData = await fetchAirQualityData()
        setAirQualityData(airData)
      } catch (error) {
        console.error("Error fetching air quality data:", error)
        toast({
          title: "Error fetching data",
          description: "Could not fetch real-time air quality data. Using sample data instead.",
          variant: "destructive",
        })

        // Use mock data if API fails
        setAirQualityData(mockData)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [toast])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Air Quality Monitoring
        </h2>
        <Badge variant="outline" className="px-3 py-1">
          <div className="mr-1 h-2 w-2 rounded-full bg-yellow-500" />
          Overall: Moderate
        </Badge>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pollutants">Pollutants</TabsTrigger>
          <TabsTrigger value="locations">Locations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
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
              description="Current AQI (Moderate)"
              trend={5.2}
            />
            <StatCard
              title="Primary Pollutant"
              value="PM2.5"
              icon={AlertTriangle}
              description="Particulate Matter"
              trend={3.7}
            />
            <StatCard
              title="Worst Location"
              value="Industrial Zone"
              icon={MapPin}
              description="AQI: 110 (Unhealthy)"
              trend={8.5}
            />
            <StatCard
              title="Best Location"
              value="City Park"
              icon={MapPin}
              description="AQI: 35 (Good)"
              trend={-2.1}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <AreaChart
              title="24-Hour AQI Trend"
              data={airQualityData?.data || mockData.data}
              labels={airQualityData?.labels || mockData.labels}
              borderColor="rgb(234, 88, 12)"
              backgroundColor="rgba(234, 88, 12, 0.1)"
            />
            <Card>
              <CardHeader>
                <CardTitle>Air Quality Health Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <h4 className="font-medium">Sensitive Groups</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      People with respiratory or heart conditions, the elderly
                      and children should reduce prolonged or heavy exertion.
                    </p>
                  </div>
                  <div className="rounded-md border p-4">
                    <h4 className="font-medium">General Population</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      It's OK to be active outside. Watch for symptoms such as
                      coughing or shortness of breath.
                    </p>
                  </div>
                  <div className="rounded-md border p-4">
                    <h4 className="font-medium">Outdoor Activities</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Consider reducing prolonged or heavy exertion outdoors if
                      you experience symptoms.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pollutants" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pollutants.map((pollutant) => (
              <Card key={pollutant.name}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{pollutant.name}</CardTitle>
                    <Badge variant="outline">
                      <div
                        className={`mr-1 h-2 w-2 rounded-full ${
                          pollutant.status === "Good"
                            ? "bg-green-500"
                            : pollutant.status === "Moderate"
                            ? "bg-yellow-500"
                            : "bg-orange-500"
                        }`}
                      />
                      {pollutant.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{pollutant.value}</div>
                  <div
                    className={`mt-2 flex items-center text-xs font-medium ${
                      pollutant.trend > 0 ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {pollutant.trend > 0 ? "↑" : "↓"}{" "}
                    {Math.abs(pollutant.trend)}% from yesterday
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>About Air Pollutants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <h4 className="font-medium">PM2.5 & PM10</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Particulate matter includes tiny particles of solids or
                    liquids that are in the air. These particles may include
                    dust, dirt, soot, smoke, or drops of liquid.
                  </p>
                </div>
                <div className="rounded-md border p-4">
                  <h4 className="font-medium">Ozone (O3)</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Ground-level ozone is created by chemical reactions between
                    oxides of nitrogen and volatile organic compounds in the
                    presence of sunlight.
                  </p>
                </div>
                <div className="rounded-md border p-4">
                  <h4 className="font-medium">Nitrogen Dioxide (NO2)</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    NO2 primarily gets in the air from burning fuel. It forms
                    from emissions from cars, trucks, buses, power plants, and
                    off-road equipment.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="locations" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Air Quality by Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {locations.map((location) => (
                    <div
                      key={location.name}
                      className="flex items-center justify-between rounded-md border p-4"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`h-10 w-10 rounded-full flex items-center justify-center ${getStatusColor(
                            location.status
                          )}`}
                        >
                          <span className="text-white font-bold">
                            {location.aqi}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium">{location.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Primary: {location.pollutant}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline">{location.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

