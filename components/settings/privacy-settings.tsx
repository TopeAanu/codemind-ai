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
import { AlertTriangle, Shield, Eye, Download } from "lucide-react";

export default function PrivacySettings() {
  const [settings, setSettings] = useState({
    dataCollection: "essential",
    analytics: false,
    crashReporting: true,
    profileVisibility: "private",
    shareUsageData: false,
    personalizedAds: false,
    thirdPartyIntegrations: true,
    dataRetention: "1year",
    cookiePreferences: "necessary",
  });

  const handleSave = () => {
    console.log("Saving privacy settings:", settings);
  };

  const handleExportData = () => {
    console.log("Exporting user data...");
  };

  const handleDeleteAccount = () => {
    console.log("Delete account requested...");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Data Collection
          </CardTitle>
          <CardDescription>
            Control what data we collect and how it's used
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="dataCollection">Data Collection Level</Label>
            <Select
              value={settings.dataCollection}
              onValueChange={(value) =>
                setSettings({ ...settings, dataCollection: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="minimal">
                  Minimal - Only essential data
                </SelectItem>
                <SelectItem value="essential">
                  Essential - Required for functionality
                </SelectItem>
                <SelectItem value="enhanced">
                  Enhanced - Includes usage analytics
                </SelectItem>
                <SelectItem value="full">
                  Full - All available data for personalization
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Usage Analytics</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Help us improve the product by sharing anonymous usage data
              </p>
            </div>
            <Switch
              checked={settings.analytics}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, analytics: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Crash Reporting</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Automatically send crash reports to help us fix bugs
              </p>
            </div>
            <Switch
              checked={settings.crashReporting}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, crashReporting: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Share Usage Data</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Share aggregated usage statistics with third parties
              </p>
            </div>
            <Switch
              checked={settings.shareUsageData}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, shareUsageData: checked })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Profile & Visibility
          </CardTitle>
          <CardDescription>
            Control who can see your profile and activity
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="profileVisibility">Profile Visibility</Label>
            <Select
              value={settings.profileVisibility}
              onValueChange={(value) =>
                setSettings({ ...settings, profileVisibility: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public - Anyone can view</SelectItem>
                <SelectItem value="team">
                  Team Only - Only team members
                </SelectItem>
                <SelectItem value="private">Private - Only you</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Third-party Integrations</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Allow connections to external services like GitHub
              </p>
            </div>
            <Switch
              checked={settings.thirdPartyIntegrations}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, thirdPartyIntegrations: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Personalized Ads</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Show ads based on your interests and activity
              </p>
            </div>
            <Switch
              checked={settings.personalizedAds}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, personalizedAds: checked })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>
            Manage your data retention and cookie preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="dataRetention">Data Retention Period</Label>
            <Select
              value={settings.dataRetention}
              onValueChange={(value) =>
                setSettings({ ...settings, dataRetention: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3months">3 Months</SelectItem>
                <SelectItem value="6months">6 Months</SelectItem>
                <SelectItem value="1year">1 Year</SelectItem>
                <SelectItem value="2years">2 Years</SelectItem>
                <SelectItem value="indefinite">Indefinite</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cookiePreferences">Cookie Preferences</Label>
            <Select
              value={settings.cookiePreferences}
              onValueChange={(value) =>
                setSettings({ ...settings, cookiePreferences: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="necessary">Necessary Only</SelectItem>
                <SelectItem value="functional">
                  Necessary + Functional
                </SelectItem>
                <SelectItem value="analytics">
                  Necessary + Functional + Analytics
                </SelectItem>
                <SelectItem value="all">All Cookies</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Export Your Data</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Download a copy of all your data
                </p>
              </div>
              <Button variant="outline" onClick={handleExportData}>
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>

          <Button onClick={handleSave} className="btn-primary">
            Save Changes
          </Button>
        </CardContent>
      </Card>

      <Card className="border-red-200 dark:border-red-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <AlertTriangle className="h-5 w-5" />
            Danger Zone
          </CardTitle>
          <CardDescription>
            Irreversible actions that will permanently affect your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
            <div className="space-y-0.5">
              <Label className="text-red-700 dark:text-red-300">
                Delete Account
              </Label>
              <p className="text-sm text-red-600 dark:text-red-400">
                Permanently delete your account and all associated data
              </p>
            </div>
            <Button variant="destructive" onClick={handleDeleteAccount}>
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
