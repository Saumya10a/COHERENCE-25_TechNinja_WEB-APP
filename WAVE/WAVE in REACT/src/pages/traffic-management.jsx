"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "@/components/dashboard/stat-card"
import { Car, AlertTriangle, Clock, MapPin } from "lucide-react"
import { MapCard } from "@/components/dashboard/map-card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GoogleMap, LoadScript, TrafficLayer } from "@react-google-maps/api";
import LiveTrafficMap from "../lib/livetraffic"
export default function TrafficManagement() {
  const [mapApiKey] = useState("YOUR_GOOGLE_MAPS_API_KEY")

  const congestionHotspots = [
    {
      id: 1,
      location: "Main St & 5th Ave",
      congestionLevel: 85,
      status: "Heavy",
      avgDelay: "12 min",
      trend: 5.2,
    },
    {
      id: 2,
      location: "Highway 101 North",
      congestionLevel: 70,
      status: "Moderate",
      avgDelay: "8 min",
      trend: -3.1,
    },
    {
      id: 3,
      location: "Downtown Bridge",
      congestionLevel: 95,
      status: "Severe",
      avgDelay: "25 min",
      trend: 12.5,
    },
    {
      id: 4,
      location: "West Side Tunnel",
      congestionLevel: 60,
      status: "Moderate",
      avgDelay: "5 min",
      trend: 2.0,
    },
    {
      id: 5,
      location: "Central Business District",
      congestionLevel: 75,
      status: "Heavy",
      avgDelay: "15 min",
      trend: -1.5,
    },
  ]

  const incidents = [
    {
      type: "Accident",
      location: "Highway 101 South, Mile 24",
      status: "Active",
      reportedAt: "08:45 AM",
      estimatedClearance: "10:30 AM",
      severity: "Major",
      affectedLanes: "2 of 3 lanes",
    },
    {
      type: "Construction",
      location: "Main Street between 3rd and 5th Ave",
      status: "Scheduled",
      reportedAt: "06:00 AM",
      estimatedClearance: "06:00 PM",
      severity: "Moderate",
      affectedLanes: "1 of 2 lanes",
    },
    {
      type: "Disabled Vehicle",
      location: "Eastbound Bridge, near exit 12",
      status: "Clearing",
      reportedAt: "09:15 AM",
      estimatedClearance: "09:45 AM",
      severity: "Minor",
      affectedLanes: "Shoulder",
    },
  ]

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "light":
        return "bg-green-500"
      case "moderate":
        return "bg-yellow-500"
      case "heavy":
        return "bg-orange-500"
      case "severe":
        return "bg-red-500"
      default:
        return "bg-blue-500"
    }
  }

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case "minor":
        return "bg-green-500 text-white"
      case "moderate":
        return "bg-yellow-500 text-white"
      case "major":
        return "bg-red-500 text-white"
      default:
        return "bg-blue-500 text-white"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Traffic Management
        </h2>
        <Badge variant="outline" className="px-3 py-1">
          <div className="mr-1 h-2 w-2 rounded-full bg-orange-500" />
          Overall: Heavy Traffic
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Average Speed"
          value="28 mph"
          icon={Car}
          description="City-wide average"
          trend={-15.3}
        />
        <StatCard
          title="Active Incidents"
          value="3"
          icon={AlertTriangle}
          description="Accidents, construction, etc."
          trend={0}
        />
        <StatCard
          title="Average Commute"
          value="32 min"
          icon={Clock}
          description="Compared to 25 min normal"
          trend={28.0}
        />
        <StatCard
          title="Congestion Hotspots"
          value="5"
          icon={MapPin}
          description="Areas with heavy traffic"
          trend={2}
        />
      </div>

      <Tabs defaultValue="map" className="w-full">
        <TabsList>
          <TabsTrigger value="map">Traffic Map</TabsTrigger>
          <TabsTrigger value="hotspots">Congestion Hotspots</TabsTrigger>
          <TabsTrigger value="incidents">Incidents</TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Live Traffic Map</CardTitle>
              <div className="flex items-center gap-2">
                <Select defaultValue="traffic">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select view" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="traffic">Traffic Flow</SelectItem>
                    <SelectItem value="incidents">Incidents</SelectItem>
                    <SelectItem value="construction">Construction</SelectItem>
                    <SelectItem value="public-transit">
                      Public Transit
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* <MapCard
                title="City Traffic Map"
                apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                className="md:col-span-2"
              /> */}
              <LiveTrafficMap />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <h4 className="font-medium">Morning Rush Hour (7-9 AM)</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Heavy inbound traffic on all major highways. Downtown
                      areas experiencing significant congestion.
                    </p>
                  </div>
                  <div className="rounded-md border p-4">
                    <h4 className="font-medium">Midday (11 AM-2 PM)</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Moderate traffic in commercial and shopping districts.
                      Construction on Main Street causing delays.
                    </p>
                  </div>
                  <div className="rounded-md border p-4">
                    <h4 className="font-medium">Evening Rush Hour (4-7 PM)</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Heavy outbound traffic on all major highways. Accident on
                      Highway 101 causing significant delays.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alternative Routes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <h4 className="font-medium">Downtown to Airport</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Avoid Highway 101. Take Riverside Drive to Airport
                      Boulevard. Estimated time: 25 minutes.
                    </p>
                  </div>
                  <div className="rounded-md border p-4">
                    <h4 className="font-medium">
                      North Side to Business District
                    </h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Use 5th Avenue instead of Main Street. Construction delays
                      on Main expected until 6 PM.
                    </p>
                  </div>
                  <div className="rounded-md border p-4">
                    <h4 className="font-medium">
                      East Side to Shopping Center
                    </h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Park Avenue is flowing well. Avoid Central Avenue due to
                      water main repairs.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="hotspots" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Congestion Hotspots</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {congestionHotspots.map((hotspot) => (
                  <div key={hotspot.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-3 w-3 rounded-full ${getStatusColor(
                            hotspot.status
                          )}`}
                        />
                        <h4 className="font-medium">{hotspot.location}</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          Delay: {hotspot.avgDelay}
                        </span>
                        <span
                          className={`text-xs ${
                            hotspot.trend > 0
                              ? "text-red-500"
                              : "text-green-500"
                          }`}
                        >
                          {hotspot.trend > 0 ? "↑" : "↓"}{" "}
                          {Math.abs(hotspot.trend)}%
                        </span>
                        <Badge variant="outline">{hotspot.status}</Badge>
                      </div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-secondary">
                      <div
                        className={`h-full rounded-full ${
                          hotspot.congestionLevel > 80
                            ? "bg-red-500"
                            : hotspot.congestionLevel > 60
                            ? "bg-orange-500"
                            : hotspot.congestionLevel > 40
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                        style={{ width: `${hotspot.congestionLevel}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Free Flow</span>
                      <span>Congestion Level: {hotspot.congestionLevel}%</span>
                      <span>Gridlock</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="incidents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Traffic Incidents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {incidents.map((incident, index) => (
                  <div key={index} className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge className={getSeverityColor(incident.severity)}>
                          {incident.severity}
                        </Badge>
                        <h4 className="font-medium">{incident.type}</h4>
                      </div>
                      <Badge variant="outline">{incident.status}</Badge>
                    </div>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm">
                        <span className="font-medium">Location:</span>{" "}
                        {incident.location}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Reported:</span>{" "}
                        {incident.reportedAt}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Est. Clearance:</span>{" "}
                        {incident.estimatedClearance}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Affected:</span>{" "}
                        {incident.affectedLanes}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

