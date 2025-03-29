"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Bell, Filter, Check, X } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Alerts() {
  const [filter, setFilter] = useState({
    showCritical: true,
    showHigh: true,
    showMedium: true,
    showLow: true,
  })

  const alerts = [
    {
      id: 1,
      title: "Air Quality Warning",
      message:
        "PM2.5 levels exceeding threshold in downtown area. Air quality index has reached 152, which is considered unhealthy for sensitive groups.",
      category: "Air Quality",
      severity: "High",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      status: "Active",
      actions: [
        "Issue public health advisory",
        "Activate air quality monitoring stations",
        "Notify sensitive facilities (schools, hospitals)",
      ],
    },
    {
      id: 2,
      title: "Traffic Congestion",
      message:
        "Heavy traffic on Main Street due to construction. Delays of up to 25 minutes reported. Alternative routes recommended.",
      category: "Traffic",
      severity: "Medium",
      timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      status: "Active",
      actions: ["Update traffic signals", "Deploy traffic officers", "Issue public notifications"],
    },
    {
      id: 3,
      title: "Water Level Rising",
      message:
        "River water level rising due to recent rainfall. Currently at 3.2m, approaching the first warning level of 3.5m.",
      category: "Water",
      severity: "Low",
      timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
      status: "Monitoring",
      actions: ["Monitor water levels hourly", "Prepare flood barriers", "Alert emergency response teams"],
    },
    {
      id: 4,
      title: "Power Outage",
      message:
        "Power outage affecting the northern district. Approximately 1,200 households affected. Estimated restoration time: 2 hours.",
      category: "Energy",
      severity: "High",
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      status: "Active",
      actions: [
        "Deploy repair crews",
        "Activate emergency generators for critical facilities",
        "Notify affected residents",
      ],
    },
    {
      id: 5,
      title: "Severe Weather Alert",
      message:
        "Thunderstorm warning issued for the entire city. Heavy rainfall and strong winds expected in the next 3-6 hours.",
      category: "Weather",
      severity: "Critical",
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      status: "Active",
      actions: [
        "Activate emergency response plan",
        "Issue public safety advisory",
        "Prepare emergency shelters",
        "Monitor flood-prone areas",
      ],
    },
  ]

  const predictions = [
    {
      id: 1,
      title: "Potential Flooding",
      message:
        "AI models predict potential flooding in low-lying areas within 48 hours based on current rainfall patterns and river levels.",
      category: "Water",
      confidence: 85,
      timeframe: "24-48 hours",
      impactLevel: "High",
      recommendedActions: [
        "Pre-position flood barriers",
        "Alert residents in flood-prone areas",
        "Prepare emergency response teams",
      ],
    },
    {
      id: 2,
      title: "Traffic Congestion Forecast",
      message:
        "Heavy traffic expected on Highway 101 tomorrow between 7-9 AM due to scheduled construction and historical patterns.",
      category: "Traffic",
      confidence: 92,
      timeframe: "12-24 hours",
      impactLevel: "Medium",
      recommendedActions: [
        "Adjust traffic signal timing",
        "Issue early public notifications",
        "Suggest alternative routes",
      ],
    },
    {
      id: 3,
      title: "Air Quality Deterioration",
      message:
        "Air quality expected to worsen in the next 24 hours due to changing weather patterns and industrial activities.",
      category: "Air Quality",
      confidence: 78,
      timeframe: "12-24 hours",
      impactLevel: "Medium",
      recommendedActions: [
        "Increase monitoring frequency",
        "Prepare public health advisories",
        "Contact major industrial facilities",
      ],
    },
  ]

  const filteredAlerts = alerts.filter((alert) => {
    if (alert.severity === "Critical" && !filter.showCritical) return false
    if (alert.severity === "High" && !filter.showHigh) return false
    if (alert.severity === "Medium" && !filter.showMedium) return false
    if (alert.severity === "Low" && !filter.showLow) return false
    return true
  })

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case "critical":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-blue-500"
    }
  }

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return <Badge className="bg-red-500">Active</Badge>
      case "monitoring":
        return <Badge className="bg-blue-500">Monitoring</Badge>
      case "resolved":
        return <Badge className="bg-green-500">Resolved</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getConfidenceBadge = (confidence) => {
    if (confidence >= 90) {
      return <Badge className="bg-green-500">High Confidence ({confidence}%)</Badge>
    } else if (confidence >= 70) {
      return <Badge className="bg-yellow-500">Medium Confidence ({confidence}%)</Badge>
    } else {
      return <Badge className="bg-orange-500">Low Confidence ({confidence}%)</Badge>
    }
  }

  const getImpactBadge = (impact) => {
    switch (impact.toLowerCase()) {
      case "high":
        return <Badge className="bg-red-500">High Impact</Badge>
      case "medium":
        return <Badge className="bg-yellow-500">Medium Impact</Badge>
      case "low":
        return <Badge className="bg-green-500">Low Impact</Badge>
      default:
        return <Badge>{impact}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Alerts & Notifications</h2>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by Severity</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={filter.showCritical}
                onCheckedChange={(checked) => setFilter({ ...filter, showCritical: checked })}
              >
                Critical
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filter.showHigh}
                onCheckedChange={(checked) => setFilter({ ...filter, showHigh: checked })}
              >
                High
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filter.showMedium}
                onCheckedChange={(checked) => setFilter({ ...filter, showMedium: checked })}
              >
                Medium
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filter.showLow}
                onCheckedChange={(checked) => setFilter({ ...filter, showLow: checked })}
              >
                Low
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button>
            <Bell className="mr-2 h-4 w-4" />
            Subscribe
          </Button>
        </div>
      </div>

      <Tabs defaultValue="current" className="w-full">
        <TabsList>
          <TabsTrigger value="current">Current Alerts</TabsTrigger>
          <TabsTrigger value="predictions">AI Predictions</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredAlerts.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">No alerts match your current filters</p>
                ) : (
                  filteredAlerts.map((alert) => (
                    <div key={alert.id} className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`h-3 w-3 rounded-full ${getSeverityColor(alert.severity)}`} />
                          <h3 className="font-medium">{alert.title}</h3>
                          <Badge variant="outline">{alert.category}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{alert.severity}</Badge>
                          {getStatusBadge(alert.status)}
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{alert.message}</p>
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-1">Recommended Actions:</h4>
                        <ul className="space-y-1">
                          {alert.actions.map((action, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                              <Check className="h-4 w-4 text-green-500 mt-0.5" />
                              <span>{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          Reported: {new Date(alert.timestamp).toLocaleString()}
                        </span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Details
                          </Button>
                          <Button variant="outline" size="sm">
                            <Check className="mr-2 h-4 w-4" />
                            Acknowledge
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI-Driven Predictions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {predictions.map((prediction) => (
                  <div key={prediction.id} className="rounded-md border p-4 bg-muted/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-blue-500" />
                        <h3 className="font-medium">{prediction.title}</h3>
                        <Badge variant="outline">{prediction.category}</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        {getConfidenceBadge(prediction.confidence)}
                        {getImpactBadge(prediction.impactLevel)}
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{prediction.message}</p>
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-1">Recommended Preventive Actions:</h4>
                      <ul className="space-y-1">
                        {prediction.recommendedActions.map((action, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                            <Check className="h-4 w-4 text-blue-500 mt-0.5" />
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Timeframe: {prediction.timeframe}</span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Analysis
                        </Button>
                        <Button variant="outline" size="sm">
                          <X className="mr-2 h-4 w-4" />
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>About AI Predictions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <h4 className="font-medium">How It Works</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Our AI prediction system analyzes historical data, current conditions, and various data sources to
                    predict potential issues before they occur. This allows for proactive management of city resources.
                  </p>
                </div>
                <div className="rounded-md border p-4">
                  <h4 className="font-medium">Data Sources</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Predictions are based on data from IoT sensors, weather forecasts, traffic patterns, historical
                    incidents, and other city systems. The AI model is continuously trained on new data.
                  </p>
                </div>
                <div className="rounded-md border p-4">
                  <h4 className="font-medium">Confidence Levels</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Confidence percentages indicate the AI's certainty in its prediction. Higher percentages indicate
                    stronger evidence and more reliable predictions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

