import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "@/components/dashboard/stat-card"
import { AreaChart } from "@/components/dashboard/area-chart"
import { Zap, Home, Building2, Factory, Lightbulb } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

export default function EnergyUsage() {
  // Mock data for demonstration
  const timeLabels = ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"]

  const energyData = {
    labels: timeLabels,
    data: [30, 40, 45, 50, 49, 60],
  }

  const renewableData = {
    labels: timeLabels,
    data: [10, 15, 25, 30, 28, 20],
  }

  const sectors = [
    {
      name: "Residential",
      usage: 35,
      change: 3.2,
      icon: Home,
    },
    {
      name: "Commercial",
      usage: 42,
      change: 5.7,
      icon: Building2,
    },
    {
      name: "Industrial",
      usage: 18,
      change: -2.1,
      icon: Factory,
    },
    {
      name: "Public Services",
      usage: 5,
      change: 1.5,
      icon: Lightbulb,
    },
  ]

  const districts = [
    {
      name: "Downtown",
      currentUsage: 28.5,
      capacity: 35.0,
      peakTime: "14:00",
      status: "Normal",
    },
    {
      name: "North District",
      currentUsage: 15.2,
      capacity: 20.0,
      peakTime: "19:00",
      status: "Normal",
    },
    {
      name: "Industrial Zone",
      currentUsage: 42.8,
      capacity: 50.0,
      peakTime: "11:00",
      status: "High",
    },
    {
      name: "Residential Area",
      currentUsage: 22.5,
      capacity: 25.0,
      peakTime: "20:00",
      status: "Warning",
    },
    {
      name: "West Suburbs",
      currentUsage: 12.3,
      capacity: 18.0,
      peakTime: "18:00",
      status: "Normal",
    },
  ]

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "normal":
        return "bg-green-500"
      case "high":
        return "bg-yellow-500"
      case "warning":
        return "bg-orange-500"
      case "critical":
        return "bg-red-500"
      default:
        return "bg-blue-500"
    }
  }

  const getUsagePercentage = (current, capacity) => {
    return (current / capacity) * 100
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Energy Usage Monitoring</h2>
        <Badge variant="outline" className="px-3 py-1">
          <div className="mr-1 h-2 w-2 rounded-full bg-yellow-500" />
          Overall: Moderate Usage
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Current Consumption" value="60 MW" icon={Zap} description="City-wide usage" trend={5.2} />
        <StatCard title="Renewable Energy" value="33%" icon={Zap} description="Of total consumption" trend={8.5} />
        <StatCard title="Peak Forecast" value="75 MW" icon={Zap} description="Expected at 18:00" trend={12.3} />
        <StatCard title="Grid Capacity" value="85%" icon={Zap} description="Current load vs capacity" trend={3.7} />
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sectors">By Sector</TabsTrigger>
          <TabsTrigger value="districts">By District</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <AreaChart
              title="24-Hour Energy Consumption"
              data={energyData.data}
              labels={energyData.labels}
              borderColor="rgb(234, 88, 12)"
              backgroundColor="rgba(234, 88, 12, 0.1)"
            />
            <AreaChart
              title="Renewable Energy Generation"
              data={renewableData.data}
              labels={renewableData.labels}
              borderColor="rgb(22, 163, 74)"
              backgroundColor="rgba(22, 163, 74, 0.1)"
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Energy Conservation Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <h4 className="font-medium">Peak Hours (5-8 PM)</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Reduce usage of high-consumption appliances. Consider pre-cooling buildings before peak hours.
                  </p>
                </div>
                <div className="rounded-md border p-4">
                  <h4 className="font-medium">Industrial Zone</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Currently approaching capacity limits. Large industrial consumers should consider load shifting.
                  </p>
                </div>
                <div className="rounded-md border p-4">
                  <h4 className="font-medium">Residential Areas</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Residents are encouraged to reduce consumption during peak hours. Smart thermostats can help
                    optimize usage.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sectors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Energy Usage by Sector</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {sectors.map((sector) => (
                  <div key={sector.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <sector.icon className="h-5 w-5 text-muted-foreground" />
                        <h4 className="font-medium">{sector.name}</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{sector.usage}%</span>
                        <span className={`text-xs ${sector.change > 0 ? "text-red-500" : "text-green-500"}`}>
                          {sector.change > 0 ? "↑" : "↓"} {Math.abs(sector.change)}%
                        </span>
                      </div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-secondary">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${sector.usage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Sector Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <h4 className="font-medium">Commercial Sector</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Highest energy consumer at 42%. Usage has increased by 5.7% compared to last week, primarily due
                      to increased cooling demands.
                    </p>
                  </div>
                  <div className="rounded-md border p-4">
                    <h4 className="font-medium">Industrial Sector</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Energy usage has decreased by 2.1% due to scheduled maintenance at several facilities. Expected to
                      return to normal levels by next week.
                    </p>
                  </div>
                  <div className="rounded-md border p-4">
                    <h4 className="font-medium">Residential Sector</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Usage has increased by 3.2% due to higher temperatures. Smart grid initiatives have helped limit
                      the increase.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Efficiency Programs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <h4 className="font-medium">Commercial Building Retrofits</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Program to upgrade lighting and HVAC systems in commercial buildings. 35% of eligible buildings
                      enrolled.
                    </p>
                  </div>
                  <div className="rounded-md border p-4">
                    <h4 className="font-medium">Industrial Energy Audits</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Free energy audits for industrial facilities. Has resulted in 12% average reduction in energy
                      usage.
                    </p>
                  </div>
                  <div className="rounded-md border p-4">
                    <h4 className="font-medium">Residential Smart Meters</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Smart meter installation program. 68% of homes now equipped, enabling better usage monitoring and
                      optimization.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="districts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Energy Usage by District</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {districts.map((district) => (
                  <div key={district.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`h-3 w-3 rounded-full ${getStatusColor(district.status)}`} />
                        <h4 className="font-medium">{district.name}</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {district.currentUsage} MW / {district.capacity} MW
                        </span>
                        <Badge variant="outline">{district.status}</Badge>
                      </div>
                    </div>
                    <Progress value={getUsagePercentage(district.currentUsage, district.capacity)} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Peak time: {district.peakTime}</span>
                      <span>Usage: {Math.round(getUsagePercentage(district.currentUsage, district.capacity))}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>District Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border p-4 border-orange-200 bg-orange-50 dark:bg-orange-950/20 dark:border-orange-900">
                    <h4 className="font-medium text-orange-700 dark:text-orange-400">Residential Area Warning</h4>
                    <p className="mt-1 text-sm text-orange-700/80 dark:text-orange-400/80">
                      Approaching 90% of capacity. Voluntary reduction measures recommended during peak hours (6-9 PM).
                    </p>
                  </div>
                  <div className="rounded-md border p-4 border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20 dark:border-yellow-900">
                    <h4 className="font-medium text-yellow-700 dark:text-yellow-400">Industrial Zone Alert</h4>
                    <p className="mt-1 text-sm text-yellow-700/80 dark:text-yellow-400/80">
                      High usage detected. Currently at 85% of capacity. Large consumers have been notified to reduce
                      non-essential operations.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Load Balancing Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <h4 className="font-medium">Residential Area</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Smart grid adjustments activated. Demand response program triggered to reduce load during peak
                      hours. Estimated 3MW reduction.
                    </p>
                  </div>
                  <div className="rounded-md border p-4">
                    <h4 className="font-medium">Industrial Zone</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Coordinating with major industrial consumers to shift high-energy processes to off-peak hours.
                      Backup generators on standby.
                    </p>
                  </div>
                  <div className="rounded-md border p-4">
                    <h4 className="font-medium">Downtown</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Commercial building HVAC systems adjusted to pre-cool before peak hours. Public lighting dimmed to
                      80% capacity.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

