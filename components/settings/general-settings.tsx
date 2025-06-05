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
import { Input } from "@/components/ui/input";
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

export default function GeneralSettings() {
  const [settings, setSettings] = useState({
    language: "en",
    timezone: "UTC",
    dateFormat: "MM/DD/YYYY",
    autoSave: true,
    autoBackup: true,
    sessionTimeout: "30",
  });

  const handleSave = () => {
    // Save settings logic
    console.log("Saving general settings:", settings);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>General Preferences</CardTitle>
          <CardDescription>
            Configure your basic application preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select
                value={settings.language}
                onValueChange={(value) =>
                  setSettings({ ...settings, language: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="ja">Japanese</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select
                value={settings.timezone}
                onValueChange={(value) =>
                  setSettings({ ...settings, timezone: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC">UTC</SelectItem>
                  <SelectItem value="EST">Eastern Time</SelectItem>
                  <SelectItem value="PST">Pacific Time</SelectItem>
                  <SelectItem value="GMT">Greenwich Mean Time</SelectItem>
                  <SelectItem value="JST">Japan Standard Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateFormat">Date Format</Label>
            <Select
              value={settings.dateFormat}
              onValueChange={(value) =>
                setSettings({ ...settings, dateFormat: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto Save</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Automatically save your work every few minutes
                </p>
              </div>
              <Switch
                checked={settings.autoSave}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, autoSave: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto Backup</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Create automatic backups of your projects
                </p>
              </div>
              <Switch
                checked={settings.autoBackup}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, autoBackup: checked })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
            <Input
              id="sessionTimeout"
              type="number"
              value={settings.sessionTimeout}
              onChange={(e) =>
                setSettings({ ...settings, sessionTimeout: e.target.value })
              }
              className="w-32"
            />
          </div>

          <Button onClick={handleSave} className="btn-primary">
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
