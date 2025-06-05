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
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Monitor, Moon, Sun } from "lucide-react";

export default function AppearanceSettings() {
  const [settings, setSettings] = useState({
    theme: "system",
    fontSize: [14],
    compactMode: false,
    showLineNumbers: true,
    colorScheme: "default",
    sidebarPosition: "left",
    animationsEnabled: true,
  });

  const handleSave = () => {
    console.log("Saving appearance settings:", settings);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
          <CardDescription>Choose your preferred color theme</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <Button
              variant={settings.theme === "light" ? "default" : "outline"}
              className="h-20 flex-col"
              onClick={() => setSettings({ ...settings, theme: "light" })}
            >
              <Sun className="h-6 w-6 mb-2" />
              Light
            </Button>
            <Button
              variant={settings.theme === "dark" ? "default" : "outline"}
              className="h-20 flex-col"
              onClick={() => setSettings({ ...settings, theme: "dark" })}
            >
              <Moon className="h-6 w-6 mb-2" />
              Dark
            </Button>
            <Button
              variant={settings.theme === "system" ? "default" : "outline"}
              className="h-20 flex-col"
              onClick={() => setSettings({ ...settings, theme: "system" })}
            >
              <Monitor className="h-6 w-6 mb-2" />
              System
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Display</CardTitle>
          <CardDescription>
            Customize the appearance of the interface
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Font Size</Label>
            <div className="px-3">
              <Slider
                value={settings.fontSize}
                onValueChange={(value) =>
                  setSettings({ ...settings, fontSize: value })
                }
                max={24}
                min={10}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>10px</span>
                <span>{settings.fontSize[0]}px</span>
                <span>24px</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="colorScheme">Color Scheme</Label>
            <Select
              value={settings.colorScheme}
              onValueChange={(value) =>
                setSettings({ ...settings, colorScheme: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="blue">Blue</SelectItem>
                <SelectItem value="green">Green</SelectItem>
                <SelectItem value="purple">Purple</SelectItem>
                <SelectItem value="orange">Orange</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sidebarPosition">Sidebar Position</Label>
            <Select
              value={settings.sidebarPosition}
              onValueChange={(value) =>
                setSettings({ ...settings, sidebarPosition: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="right">Right</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Compact Mode</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Reduce spacing for a more compact interface
                </p>
              </div>
              <Switch
                checked={settings.compactMode}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, compactMode: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Show Line Numbers</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Display line numbers in code views
                </p>
              </div>
              <Switch
                checked={settings.showLineNumbers}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, showLineNumbers: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Animations</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Enable smooth animations and transitions
                </p>
              </div>
              <Switch
                checked={settings.animationsEnabled}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, animationsEnabled: checked })
                }
              />
            </div>
          </div>

          <Button onClick={handleSave} className="btn-primary">
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
