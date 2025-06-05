"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function NotificationsSettings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    desktopNotifications: false,
    analysisComplete: true,
    errorAlerts: true,
    weeklyDigest: true,
    productUpdates: false,
    marketingEmails: false,
    frequency: "immediate",
    quietHours: false,
    quietStart: "22:00",
    quietEnd: "08:00",
  });

  const handleSave = () => {
    console.log("Saving notification settings:", settings);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Channels</CardTitle>
          <CardDescription>
            Choose how you want to receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Receive notifications via email
              </p>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, emailNotifications: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Push Notifications</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Receive push notifications in your browser
              </p>
            </div>
            <Switch
              checked={settings.pushNotifications}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, pushNotifications: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Desktop Notifications</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Show system notifications on your desktop
              </p>
            </div>
            <Switch
              checked={settings.desktopNotifications}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, desktopNotifications: checked })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Types</CardTitle>
          <CardDescription>
            Select which types of notifications you want to receive
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Label>Analysis Complete</Label>
                <Badge variant="secondary">Important</Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                When code analysis is finished
              </p>
            </div>
            <Switch
              checked={settings.analysisComplete}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, analysisComplete: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Label>Error Alerts</Label>
                <Badge variant="destructive">Critical</Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                When errors are detected in your code
              </p>
            </div>
            <Switch
              checked={settings.errorAlerts}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, errorAlerts: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Weekly Digest</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Weekly summary of your coding activity
              </p>
            </div>
            <Switch
              checked={settings.weeklyDigest}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, weeklyDigest: checked })
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Product Updates</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                New features and product announcements
              </p>
            </div>
            <Switch
              checked={settings.productUpdates}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, productUpdates: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Marketing Emails</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Tips, tutorials, and promotional content
              </p>
            </div>
            <Switch
              checked={settings.marketingEmails}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, marketingEmails: checked })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>
            Customize when and how often you receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="frequency">Notification Frequency</Label>
            <Select
              value={settings.frequency}
              onValueChange={(value) =>
                setSettings({ ...settings, frequency: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">Immediate</SelectItem>
                <SelectItem value="hourly">Hourly Digest</SelectItem>
                <SelectItem value="daily">Daily Digest</SelectItem>
                <SelectItem value="weekly">Weekly Digest</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Quiet Hours</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Disable notifications during specific hours
                </p>
              </div>
              <Switch
                checked={settings.quietHours}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, quietHours: checked })
                }
              />
            </div>

            {settings.quietHours && (
              <div className="grid grid-cols-2 gap-4 ml-4">
                <div className="space-y-2">
                  <Label htmlFor="quietStart">Start Time</Label>
                  <Select
                    value={settings.quietStart}
                    onValueChange={(value) =>
                      setSettings({ ...settings, quietStart: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }, (_, i) => {
                        const hour = i.toString().padStart(2, "0");
                        return (
                          <SelectItem key={hour} value={`${hour}:00`}>
                            {hour}:00
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quietEnd">End Time</Label>
                  <Select
                    value={settings.quietEnd}
                    onValueChange={(value) =>
                      setSettings({ ...settings, quietEnd: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }, (_, i) => {
                        const hour = i.toString().padStart(2, "0");
                        return (
                          <SelectItem key={hour} value={`${hour}:00`}>
                            {hour}:00
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>

          <Button onClick={handleSave} className="btn-primary">
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
