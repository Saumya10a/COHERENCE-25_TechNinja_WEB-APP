"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Settings() {
  const [apiKeys, setApiKeys] = useState({
    googleMaps: "YOUR_GOOGLE_MAPS_API_KEY",
    openWeather: "YOUR_OPENWEATHER_API_KEY",
    airQuality: "YOUR_AIR_QUALITY_API_KEY",
  })

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    criticalAlerts: true,
    highAlerts: true,
    mediumAlerts: true,
    lowAlerts: false,
  })

  const [displaySettings, setDisplaySettings] = useState({
    theme: "system",
    refreshRate: "30",
    showGridlines: true,
    compactView: false,
    dataDecimalPlaces: "2",
  })

  const handleApiKeyChange = (key, value) => {
    setApiKeys({
      ...apiKeys,
      [key]: value,
    })
  }

  const handleNotificationChange = (key, value) => {
    setNotifications({
      ...notifications,
      [key]: value,
    })
  }

  const handleDisplaySettingChange = (key, value) => {
    setDisplaySettings({
      ...displaySettings,
      [key]: value,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="display">Display</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your account settings and preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="Admin User" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="admin@smartcity.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select defaultValue="admin">
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="operator">Operator</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="utc-8">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                    <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                    <SelectItem value="utc-6">Central Time (UTC-6)</SelectItem>
                    <SelectItem value="utc-7">Mountain Time (UTC-7)</SelectItem>
                    <SelectItem value="utc+0">UTC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="analytics">Usage Analytics</Label>
                  <p className="text-sm text-muted-foreground">
                    Share anonymous usage data to help improve the dashboard.
                  </p>
                </div>
                <Switch id="analytics" checked={true} onCheckedChange={(checked) => {}} />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Manage your security settings and two-factor authentication.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
                </div>
                <Button variant="outline">Enable</Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Update Password</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage API keys for external services integration.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="google-maps-api">Google Maps API Key</Label>
                  <Badge variant="outline">Maps & Traffic</Badge>
                </div>
                <div className="flex gap-2">
                  <Input
                    id="google-maps-api"
                    value={apiKeys.googleMaps}
                    onChange={(e) => handleApiKeyChange("googleMaps", e.target.value)}
                    type="password"
                  />
                  <Button variant="outline" size="icon">
                    👁️
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="openweather-api">OpenWeather API Key</Label>
                  <Badge variant="outline">Weather Data</Badge>
                </div>
                <div className="flex gap-2">
                  <Input
                    id="openweather-api"
                    value={apiKeys.openWeather}
                    onChange={(e) => handleApiKeyChange("openWeather", e.target.value)}
                    type="password"
                  />
                  <Button variant="outline" size="icon">
                    👁️
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="air-quality-api">Air Quality API Key</Label>
                  <Badge variant="outline">Air Quality Data</Badge>
                </div>
                <div className="flex gap-2">
                  <Input
                    id="air-quality-api"
                    value={apiKeys.airQuality}
                    onChange={(e) => handleApiKeyChange("airQuality", e.target.value)}
                    type="password"
                  />
                  <Button variant="outline" size="icon">
                    👁️
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save API Keys</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Documentation</CardTitle>
              <CardDescription>Access documentation for the Smart City Dashboard API.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border p-4">
                <h4 className="font-medium">Dashboard API</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  Access real-time data from the Smart City Dashboard through our REST API. Includes endpoints for air
                  quality, water levels, traffic, and energy usage.
                </p>
                <Button variant="outline" className="mt-2">
                  View Documentation
                </Button>
              </div>
              <div className="rounded-md border p-4">
                <h4 className="font-medium">Webhooks</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  Set up webhooks to receive real-time notifications when alerts are triggered or when data exceeds
                  specified thresholds.
                </p>
                <Button variant="outline" className="mt-2">
                  Configure Webhooks
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how and when you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Channels</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email.</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={notifications.email}
                    onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications in your browser.</p>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={notifications.push}
                    onCheckedChange={(checked) => handleNotificationChange("push", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sms-notifications">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via SMS.</p>
                  </div>
                  <Switch
                    id="sms-notifications"
                    checked={notifications.sms}
                    onCheckedChange={(checked) => handleNotificationChange("sms", checked)}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Alert Severity Levels</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="critical-alerts">Critical Alerts</Label>
                    <p className="text-sm text-muted-foreground">Immediate attention required.</p>
                  </div>
                  <Switch
                    id="critical-alerts"
                    checked={notifications.criticalAlerts}
                    onCheckedChange={(checked) => handleNotificationChange("criticalAlerts", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="high-alerts">High Alerts</Label>
                    <p className="text-sm text-muted-foreground">Urgent attention needed.</p>
                  </div>
                  <Switch
                    id="high-alerts"
                    checked={notifications.highAlerts}
                    onCheckedChange={(checked) => handleNotificationChange("highAlerts", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="medium-alerts">Medium Alerts</Label>
                    <p className="text-sm text-muted-foreground">Attention needed soon.</p>
                  </div>
                  <Switch
                    id="medium-alerts"
                    checked={notifications.mediumAlerts}
                    onCheckedChange={(checked) => handleNotificationChange("mediumAlerts", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="low-alerts">Low Alerts</Label>
                    <p className="text-sm text-muted-foreground">For information only.</p>
                  </div>
                  <Switch
                    id="low-alerts"
                    checked={notifications.lowAlerts}
                    onCheckedChange={(checked) => handleNotificationChange("lowAlerts", checked)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Notification Settings</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Schedule</CardTitle>
              <CardDescription>Configure when you receive non-critical notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="quiet-hours">Quiet Hours</Label>
                <div className="flex items-center gap-2">
                  <Select defaultValue="22">
                    <SelectTrigger className="w-24">
                      <SelectValue placeholder="From" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }).map((_, i) => (
                        <SelectItem key={i} value={i.toString()}>
                          {i.toString().padStart(2, "0")}:00
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <span>to</span>
                  <Select defaultValue="7">
                    <SelectTrigger className="w-24">
                      <SelectValue placeholder="To" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }).map((_, i) => (
                        <SelectItem key={i} value={i.toString()}>
                          {i.toString().padStart(2, "0")}:00
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-sm text-muted-foreground">Only critical alerts will be sent during quiet hours.</p>
              </div>

              <div className="space-y-2">
                <Label>Active Days</Label>
                <div className="flex flex-wrap gap-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                    <Button key={day} variant={day === "Sat" || day === "Sun" ? "outline" : "default"} className="w-12">
                      {day}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Schedule</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="display" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Display Settings</CardTitle>
              <CardDescription>Customize how data is displayed in the dashboard.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select
                  value={displaySettings.theme}
                  onValueChange={(value) => handleDisplaySettingChange("theme", value)}
                >
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="refresh-rate">Data Refresh Rate (seconds)</Label>
                <Input
                  id="refresh-rate"
                  type="number"
                  min="5"
                  max="300"
                  value={displaySettings.refreshRate}
                  onChange={(e) => handleDisplaySettingChange("refreshRate", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="decimal-places">Decimal Places</Label>
                <Select
                  value={displaySettings.dataDecimalPlaces}
                  onValueChange={(value) => handleDisplaySettingChange("dataDecimalPlaces", value)}
                >
                  <SelectTrigger id="decimal-places">
                    <SelectValue placeholder="Select decimal places" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="show-gridlines">Show Gridlines</Label>
                  <p className="text-sm text-muted-foreground">Display gridlines in charts and graphs.</p>
                </div>
                <Switch
                  id="show-gridlines"
                  checked={displaySettings.showGridlines}
                  onCheckedChange={(checked) => handleDisplaySettingChange("showGridlines", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="compact-view">Compact View</Label>
                  <p className="text-sm text-muted-foreground">Display more data in less space.</p>
                </div>
                <Switch
                  id="compact-view"
                  checked={displaySettings.compactView}
                  onCheckedChange={(checked) => handleDisplaySettingChange("compactView", checked)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Display Settings</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Chart Preferences</CardTitle>
              <CardDescription>Customize chart appearance and behavior.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="default-chart-type">Default Chart Type</Label>
                <Select defaultValue="line">
                  <SelectTrigger id="default-chart-type">
                    <SelectValue placeholder="Select chart type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="line">Line Chart</SelectItem>
                    <SelectItem value="bar">Bar Chart</SelectItem>
                    <SelectItem value="area">Area Chart</SelectItem>
                    <SelectItem value="pie">Pie Chart</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="color-palette">Color Palette</Label>
                <Select defaultValue="default">
                  <SelectTrigger id="color-palette">
                    <SelectValue placeholder="Select color palette" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="monochrome">Monochrome</SelectItem>
                    <SelectItem value="colorblind">Colorblind Friendly</SelectItem>
                    <SelectItem value="pastel">Pastel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="animations">Chart Animations</Label>
                  <p className="text-sm text-muted-foreground">Enable animations in charts.</p>
                </div>
                <Switch id="animations" defaultChecked={true} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="tooltips">Show Tooltips</Label>
                  <p className="text-sm text-muted-foreground">Display tooltips when hovering over data points.</p>
                </div>
                <Switch id="tooltips" defaultChecked={true} />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Chart Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

