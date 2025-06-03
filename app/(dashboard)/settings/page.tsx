"use client"

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/store"
import { toggleTheme } from "@/store/slices/uiSlice"
import { logout } from "@/store/slices/authSlice"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { ThemedSelect, ThemedSelectItem } from "@/components/ui/themed-select"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Settings,
  User,
  Shield,
  Bell,
  Palette,
  Code2,
  Database,
  Trash2,
  Download,
  AlertTriangle,
  Moon,
  Sun,
  Monitor,
  LogOut,
  Save,
} from "lucide-react"

export default function SettingsPage() {
  const { theme } = useSelector((state: RootState) => state.ui)
  const { user } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const router = useRouter()

  const [settings, setSettings] = useState({
    // General Settings
    language: "en",
    timezone: "UTC",
    dateFormat: "MM/DD/YYYY",

    // Privacy Settings
    profileVisibility: "public",
    dataCollection: true,
    analyticsOptIn: true,

    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    desktopNotifications: false,
    weeklyDigest: true,

    // Editor Settings
    codeTheme: "dark",
    fontSize: "14",
    tabSize: "2",
    wordWrap: true,
    lineNumbers: true,
    minimap: true,

    // AI Settings
    aiModel: "gpt-4",
    maxTokens: "2048",
    temperature: "0.7",
    autoSave: true,
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSaveSettings = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    console.log("Settings saved:", settings)
  }

  const handleExportData = () => {
    // In real app, would export user data
    console.log("Export data")
  }

  const handleDeleteAccount = () => {
    // In real app, would show confirmation modal
    console.log("Delete account")
  }

  const handleLogout = () => {
    dispatch(logout())
    router.push("/login")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your application preferences and account settings
          </p>
        </div>
        <Button onClick={handleSaveSettings} disabled={isLoading} className="btn-primary">
          <Save className="mr-2 h-4 w-4" />
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <Card className="glass">
            <CardContent className="p-4">
              <nav className="space-y-2">
                {[
                  { id: "general", label: "General", icon: Settings },
                  { id: "appearance", label: "Appearance", icon: Palette },
                  { id: "editor", label: "Code Editor", icon: Code2 },
                  { id: "notifications", label: "Notifications", icon: Bell },
                  { id: "privacy", label: "Privacy", icon: Shield },
                  { id: "ai", label: "AI Settings", icon: Database },
                  { id: "account", label: "Account", icon: User },
                ].map((item) => (
                  <button
                    key={item.id}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <item.icon className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{item.label}</span>
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* General Settings */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                <Settings className="mr-2 h-5 w-5" />
                General Settings
              </CardTitle>
              <CardDescription>Configure basic application preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <ThemedSelect
                    value={settings.language}
                    onValueChange={(value) => handleSettingChange("language", value)}
                  >
                    <ThemedSelectItem value="en">English</ThemedSelectItem>
                    <ThemedSelectItem value="es">Spanish</ThemedSelectItem>
                    <ThemedSelectItem value="fr">French</ThemedSelectItem>
                    <ThemedSelectItem value="de">German</ThemedSelectItem>
                  </ThemedSelect>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <ThemedSelect
                    value={settings.timezone}
                    onValueChange={(value) => handleSettingChange("timezone", value)}
                  >
                    <ThemedSelectItem value="UTC">UTC</ThemedSelectItem>
                    <ThemedSelectItem value="EST">Eastern Time</ThemedSelectItem>
                    <ThemedSelectItem value="PST">Pacific Time</ThemedSelectItem>
                    <ThemedSelectItem value="GMT">Greenwich Mean Time</ThemedSelectItem>
                  </ThemedSelect>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <ThemedSelect
                    value={settings.dateFormat}
                    onValueChange={(value) => handleSettingChange("dateFormat", value)}
                  >
                    <ThemedSelectItem value="MM/DD/YYYY">MM/DD/YYYY</ThemedSelectItem>
                    <ThemedSelectItem value="DD/MM/YYYY">DD/MM/YYYY</ThemedSelectItem>
                    <ThemedSelectItem value="YYYY-MM-DD">YYYY-MM-DD</ThemedSelectItem>
                  </ThemedSelect>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Appearance Settings */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                <Palette className="mr-2 h-5 w-5" />
                Appearance
              </CardTitle>
              <CardDescription>Customize the look and feel of the application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label>Theme</Label>
                <div className="flex space-x-3">
                  {[
                    { value: "light", label: "Light", icon: Sun },
                    { value: "dark", label: "Dark", icon: Moon },
                    { value: "system", label: "System", icon: Monitor },
                  ].map((themeOption) => (
                    <Button
                      key={themeOption.value}
                      variant={theme === themeOption.value ? "default" : "outline"}
                      onClick={() => dispatch(toggleTheme())}
                      className="flex items-center space-x-2"
                    >
                      <themeOption.icon className="h-4 w-4" />
                      <span>{themeOption.label}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Code Editor Settings */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                <Code2 className="mr-2 h-5 w-5" />
                Code Editor
              </CardTitle>
              <CardDescription>Configure code editor preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="codeTheme">Editor Theme</Label>
                  <ThemedSelect
                    value={settings.codeTheme}
                    onValueChange={(value) => handleSettingChange("codeTheme", value)}
                  >
                    <ThemedSelectItem value="dark">Dark</ThemedSelectItem>
                    <ThemedSelectItem value="light">Light</ThemedSelectItem>
                    <ThemedSelectItem value="monokai">Monokai</ThemedSelectItem>
                    <ThemedSelectItem value="github">GitHub</ThemedSelectItem>
                    <ThemedSelectItem value="dracula">Dracula</ThemedSelectItem>
                  </ThemedSelect>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fontSize">Font Size</Label>
                  <ThemedSelect
                    value={settings.fontSize}
                    onValueChange={(value) => handleSettingChange("fontSize", value)}
                  >
                    <ThemedSelectItem value="12">12px</ThemedSelectItem>
                    <ThemedSelectItem value="14">14px</ThemedSelectItem>
                    <ThemedSelectItem value="16">16px</ThemedSelectItem>
                    <ThemedSelectItem value="18">18px</ThemedSelectItem>
                    <ThemedSelectItem value="20">20px</ThemedSelectItem>
                  </ThemedSelect>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tabSize">Tab Size</Label>
                  <ThemedSelect
                    value={settings.tabSize}
                    onValueChange={(value) => handleSettingChange("tabSize", value)}
                  >
                    <ThemedSelectItem value="2">2 spaces</ThemedSelectItem>
                    <ThemedSelectItem value="4">4 spaces</ThemedSelectItem>
                    <ThemedSelectItem value="8">8 spaces</ThemedSelectItem>
                  </ThemedSelect>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="wordWrap">Word Wrap</Label>
                  <Switch
                    id="wordWrap"
                    checked={settings.wordWrap}
                    onCheckedChange={(checked) => handleSettingChange("wordWrap", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="lineNumbers">Line Numbers</Label>
                  <Switch
                    id="lineNumbers"
                    checked={settings.lineNumbers}
                    onCheckedChange={(checked) => handleSettingChange("lineNumbers", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="minimap">Minimap</Label>
                  <Switch
                    id="minimap"
                    checked={settings.minimap}
                    onCheckedChange={(checked) => handleSettingChange("minimap", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                <Bell className="mr-2 h-5 w-5" />
                Notifications
              </CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Receive notifications via email</p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="pushNotifications">Push Notifications</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Receive push notifications in browser</p>
                  </div>
                  <Switch
                    id="pushNotifications"
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => handleSettingChange("pushNotifications", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="weeklyDigest">Weekly Digest</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Receive weekly summary emails</p>
                  </div>
                  <Switch
                    id="weeklyDigest"
                    checked={settings.weeklyDigest}
                    onCheckedChange={(checked) => handleSettingChange("weeklyDigest", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Settings */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                <Database className="mr-2 h-5 w-5" />
                AI Settings
              </CardTitle>
              <CardDescription>Configure AI model preferences and behavior</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="aiModel">AI Model</Label>
                  <ThemedSelect
                    value={settings.aiModel}
                    onValueChange={(value) => handleSettingChange("aiModel", value)}
                  >
                    <ThemedSelectItem value="gpt-4">GPT-4</ThemedSelectItem>
                    <ThemedSelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</ThemedSelectItem>
                    <ThemedSelectItem value="claude-3">Claude 3</ThemedSelectItem>
                  </ThemedSelect>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxTokens">Max Tokens</Label>
                  <ThemedSelect
                    value={settings.maxTokens}
                    onValueChange={(value) => handleSettingChange("maxTokens", value)}
                  >
                    <ThemedSelectItem value="1024">1,024</ThemedSelectItem>
                    <ThemedSelectItem value="2048">2,048</ThemedSelectItem>
                    <ThemedSelectItem value="4096">4,096</ThemedSelectItem>
                  </ThemedSelect>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="temperature">Temperature</Label>
                  <ThemedSelect
                    value={settings.temperature}
                    onValueChange={(value) => handleSettingChange("temperature", value)}
                  >
                    <ThemedSelectItem value="0.1">0.1 (Focused)</ThemedSelectItem>
                    <ThemedSelectItem value="0.7">0.7 (Balanced)</ThemedSelectItem>
                    <ThemedSelectItem value="1.0">1.0 (Creative)</ThemedSelectItem>
                  </ThemedSelect>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="autoSave">Auto-save Analysis</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Automatically save analysis results</p>
                </div>
                <Switch
                  id="autoSave"
                  checked={settings.autoSave}
                  onCheckedChange={(checked) => handleSettingChange("autoSave", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Account Management */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                <User className="mr-2 h-5 w-5" />
                Account Management
              </CardTitle>
              <CardDescription>Manage your account data and security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Export Data</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Download all your data in JSON format</p>
                </div>
                <Button variant="outline" onClick={handleExportData}>
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Sign Out</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Sign out of your account on this device</p>
                </div>
                <Button variant="outline" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>

              <Separator />

              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-red-600 dark:text-red-400">Delete Account</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Permanently delete your account and all data
                      </p>
                    </div>
                    <Button variant="destructive" onClick={handleDeleteAccount}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
