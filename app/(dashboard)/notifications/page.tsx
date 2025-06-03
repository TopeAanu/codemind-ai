"use client"

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/store"
import { removeNotification } from "@/store/slices/uiSlice"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Bell,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
  Trash2,
  Settings,
  Mail,
  Smartphone,
  X,
  Archive,
} from "lucide-react"

const mockNotifications = [
  {
    id: "1",
    type: "success" as const,
    title: "Analysis Complete",
    message: "Your React component analysis has been completed successfully.",
    timestamp: "2024-01-15T10:30:00Z",
    read: false,
    project: "E-commerce Platform",
  },
  {
    id: "2",
    type: "warning" as const,
    title: "API Rate Limit Warning",
    message: "You're approaching your monthly API usage limit. Consider upgrading your plan.",
    timestamp: "2024-01-15T09:15:00Z",
    read: false,
    project: null,
  },
  {
    id: "3",
    type: "error" as const,
    title: "Analysis Failed",
    message: "Failed to analyze the uploaded file. Please check the file format and try again.",
    timestamp: "2024-01-14T16:45:00Z",
    read: true,
    project: "Mobile Banking App",
  },
  {
    id: "4",
    type: "info" as const,
    title: "New Feature Available",
    message: "Code documentation generation is now available in beta. Try it out!",
    timestamp: "2024-01-14T14:20:00Z",
    read: true,
    project: null,
  },
  {
    id: "5",
    type: "success" as const,
    title: "GitHub Integration Connected",
    message: "Successfully connected your GitHub account. You can now import repositories.",
    timestamp: "2024-01-13T11:30:00Z",
    read: true,
    project: null,
  },
]

export default function NotificationsPage() {
  const notifications = useSelector((state: RootState) => state.ui.notifications)
  const dispatch = useDispatch()
  const [filter, setFilter] = useState<"all" | "unread" | "success" | "warning" | "error" | "info">("all")
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [analysisNotifications, setAnalysisNotifications] = useState(true)
  const [systemNotifications, setSystemNotifications] = useState(true)

  // Use mock data for demo, in real app would use Redux notifications
  const allNotifications = [...notifications, ...mockNotifications]

  const filteredNotifications = allNotifications.filter((notification) => {
    if (filter === "all") return true
    if (filter === "unread") return !notification.read
    return notification.type === filter
  })

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  const getNotificationBg = (type: string, read: boolean) => {
    const opacity = read ? "10" : "20"
    switch (type) {
      case "success":
        return `bg-green-500/${opacity}`
      case "warning":
        return `bg-yellow-500/${opacity}`
      case "error":
        return `bg-red-500/${opacity}`
      case "info":
        return `bg-blue-500/${opacity}`
      default:
        return `bg-gray-500/${opacity}`
    }
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return "Yesterday"
    return date.toLocaleDateString()
  }

  const markAllAsRead = () => {
    // In real app, would dispatch action to mark all as read
    console.log("Mark all as read")
  }

  const clearAllNotifications = () => {
    // In real app, would dispatch action to clear all
    console.log("Clear all notifications")
  }

  const unreadCount = allNotifications.filter((n) => !n.read).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Notifications</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Stay updated with your analysis results and system updates
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={markAllAsRead}>
            <CheckCircle className="mr-2 h-4 w-4" />
            Mark All Read
          </Button>
          <Button variant="outline" onClick={clearAllNotifications}>
            <Trash2 className="mr-2 h-4 w-4" />
            Clear All
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Notifications List */}
        <div className="lg:col-span-3 space-y-4">
          {/* Filter Tabs */}
          <Card className="glass">
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-2">
                {[
                  { key: "all", label: "All", count: allNotifications.length },
                  { key: "unread", label: "Unread", count: unreadCount },
                  {
                    key: "success",
                    label: "Success",
                    count: allNotifications.filter((n) => n.type === "success").length,
                  },
                  {
                    key: "warning",
                    label: "Warnings",
                    count: allNotifications.filter((n) => n.type === "warning").length,
                  },
                  { key: "error", label: "Errors", count: allNotifications.filter((n) => n.type === "error").length },
                  { key: "info", label: "Info", count: allNotifications.filter((n) => n.type === "info").length },
                ].map((tab) => (
                  <Button
                    key={tab.key}
                    variant={filter === tab.key ? "default" : "outline"}
                    onClick={() => setFilter(tab.key as any)}
                    className="h-auto py-2"
                  >
                    {tab.label}
                    {tab.count > 0 && (
                      <Badge variant="secondary" className="ml-2">
                        {tab.count}
                      </Badge>
                    )}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          {filteredNotifications.length === 0 ? (
            <Card className="glass">
              <CardContent className="p-12 text-center">
                <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No notifications</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {filter === "all"
                    ? "You're all caught up! New notifications will appear here."
                    : `No ${filter} notifications found.`}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredNotifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`glass hover:shadow-md transition-all duration-200 ${getNotificationBg(notification.type, notification.read)}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4
                              className={`text-sm font-medium ${!notification.read ? "text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300"}`}
                            >
                              {notification.title}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{notification.message}</p>
                            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                              <span>{formatDate(notification.timestamp)}</span>
                              {notification.project && <span>Project: {notification.project}</span>}
                              {!notification.read && (
                                <Badge variant="secondary" className="text-xs">
                                  New
                                </Badge>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center space-x-1 ml-4">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Archive className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => dispatch(removeNotification(notification.id))}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Settings Sidebar */}
        <div className="space-y-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                <Settings className="mr-2 h-5 w-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>Customize how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <Label htmlFor="email-notifications" className="text-sm">
                      Email Notifications
                    </Label>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Smartphone className="h-4 w-4 text-gray-500" />
                    <Label htmlFor="push-notifications" className="text-sm">
                      Push Notifications
                    </Label>
                  </div>
                  <Switch id="push-notifications" checked={pushNotifications} onCheckedChange={setPushNotifications} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-gray-500" />
                    <Label htmlFor="analysis-notifications" className="text-sm">
                      Analysis Complete
                    </Label>
                  </div>
                  <Switch
                    id="analysis-notifications"
                    checked={analysisNotifications}
                    onCheckedChange={setAnalysisNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Info className="h-4 w-4 text-gray-500" />
                    <Label htmlFor="system-notifications" className="text-sm">
                      System Updates
                    </Label>
                  </div>
                  <Switch
                    id="system-notifications"
                    checked={systemNotifications}
                    onCheckedChange={setSystemNotifications}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Total</span>
                <Badge variant="secondary">{allNotifications.length}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Unread</span>
                <Badge variant="secondary">{unreadCount}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">This Week</span>
                <Badge variant="secondary">
                  {
                    allNotifications.filter((n) => {
                      const weekAgo = new Date()
                      weekAgo.setDate(weekAgo.getDate() - 7)
                      return new Date(n.timestamp) > weekAgo
                    }).length
                  }
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
