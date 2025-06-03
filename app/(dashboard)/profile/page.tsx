"use client";

import type React from "react";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store";
import { updateUser } from "@/store/slices/authSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ThemedSelect, ThemedSelectItem } from "@/components/ui/themed-select";
import {
  User,
  Github,
  Key,
  Upload,
  Camera,
  ExternalLink,
  Trash2,
  Plus,
  Settings,
  BarChart3,
} from "lucide-react";

export default function ProfilePage() {
  const { user } = useSelector((state: RootState) => state.auth);
  const { theme } = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch();

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: "",
    location: "",
    website: "",
    company: "",
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    weeklyDigest: false,
    codeTheme: "dark",
    fontSize: "14",
    tabSize: "2",
  });

  const [apiKeys, setApiKeys] = useState([
    {
      id: "1",
      name: "OpenAI API Key",
      key: "sk-...abc123",
      created: "2024-01-15",
      lastUsed: "2024-01-15",
    },
    {
      id: "2",
      name: "GitHub Token",
      key: "ghp_...xyz789",
      created: "2024-01-10",
      lastUsed: "2024-01-14",
    },
  ]);

  const mockStats = {
    totalAnalyses: 156,
    totalProjects: 12,
    totalChatSessions: 34,
    githubRepos: 8,
    joinDate: "2024-01-01",
    lastActive: "2024-01-15",
  };

  const handleProfileUpdate = () => {
    dispatch(
      updateUser({
        name: profileData.name,
        email: profileData.email,
      })
    );
    // In real app, would make API call to update profile
    console.log("Profile updated:", profileData);
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In real app, would upload to server and update user avatar
      console.log("Avatar upload:", file);
    }
  };

  const connectGitHub = () => {
    // In real app, would initiate GitHub OAuth flow
    console.log("Connect GitHub");
  };

  const disconnectGitHub = () => {
    dispatch(updateUser({ githubConnected: false }));
  };

  const addApiKey = () => {
    // In real app, would show modal to add new API key
    console.log("Add API key");
  };

  const deleteApiKey = (id: string) => {
    setApiKeys(apiKeys.filter((key) => key.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Profile Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your account settings and preferences
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                <User className="mr-2 h-5 w-5" />
                Profile Information
              </CardTitle>
              <CardDescription>
                Update your personal information and profile details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={user?.avatar || "/placeholder.svg?height=80&width=80"}
                    alt={user?.name || "User"}
                    className="w-20 h-20 rounded-full"
                  />
                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 bg-primary-500 rounded-full p-1 cursor-pointer hover:bg-primary-600 transition-colors"
                  >
                    <Camera className="h-4 w-4 text-white" />
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {user?.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {user?.email}
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    <Upload className="mr-2 h-4 w-4" />
                    Change Avatar
                  </Button>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) =>
                      setProfileData({ ...profileData, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={profileData.company}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        company: e.target.value,
                      })
                    }
                    placeholder="Your company name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        location: e.target.value,
                      })
                    }
                    placeholder="City, Country"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={profileData.website}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        website: e.target.value,
                      })
                    }
                    placeholder="https://yourwebsite.com"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) =>
                      setProfileData({ ...profileData, bio: e.target.value })
                    }
                    placeholder="Tell us about yourself..."
                    rows={3}
                  />
                </div>
              </div>

              <Button onClick={handleProfileUpdate} className="btn-primary">
                Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* GitHub Integration */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                <Github className="mr-2 h-5 w-5" />
                GitHub Integration
              </CardTitle>
              <CardDescription>
                Connect your GitHub account to import repositories
              </CardDescription>
            </CardHeader>
            <CardContent>
              {user?.githubConnected ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center">
                      <Github className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Connected to GitHub
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        @{user.name?.toLowerCase().replace(" ", "")}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Profile
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={disconnectGitHub}
                    >
                      Disconnect
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <Github className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Connect GitHub
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Import your repositories and sync your code for analysis
                  </p>
                  <Button onClick={connectGitHub} className="btn-primary">
                    <Github className="mr-2 h-4 w-4" />
                    Connect GitHub Account
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* API Keys */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                <Key className="mr-2 h-5 w-5" />
                API Keys
              </CardTitle>
              <CardDescription>
                Manage your API keys for external integrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {apiKeys.map((apiKey) => (
                <div
                  key={apiKey.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {apiKey.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                      {apiKey.key}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Created: {apiKey.created} • Last used: {apiKey.lastUsed}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => deleteApiKey(apiKey.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" onClick={addApiKey} className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add API Key
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Account Stats */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                <BarChart3 className="mr-2 h-5 w-5" />
                Account Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Total Analyses
                </span>
                <Badge variant="secondary">{mockStats.totalAnalyses}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Projects
                </span>
                <Badge variant="secondary">{mockStats.totalProjects}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Chat Sessions
                </span>
                <Badge variant="secondary">{mockStats.totalChatSessions}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  GitHub Repos
                </span>
                <Badge variant="secondary">{mockStats.githubRepos}</Badge>
              </div>
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Member since
                  </span>
                  <span className="text-sm text-gray-900 dark:text-white">
                    {new Date(mockStats.joinDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                <Settings className="mr-2 h-5 w-5" />
                Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notifications" className="text-sm">
                    Email Notifications
                  </Label>
                  <Switch
                    id="email-notifications"
                    checked={preferences.emailNotifications}
                    onCheckedChange={(checked) =>
                      setPreferences({
                        ...preferences,
                        emailNotifications: checked,
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="push-notifications" className="text-sm">
                    Push Notifications
                  </Label>
                  <Switch
                    id="push-notifications"
                    checked={preferences.pushNotifications}
                    onCheckedChange={(checked) =>
                      setPreferences({
                        ...preferences,
                        pushNotifications: checked,
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="weekly-digest" className="text-sm">
                    Weekly Digest
                  </Label>
                  <Switch
                    id="weekly-digest"
                    checked={preferences.weeklyDigest}
                    onCheckedChange={(checked) =>
                      setPreferences({ ...preferences, weeklyDigest: checked })
                    }
                  />
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="space-y-2">
                  <Label htmlFor="code-theme" className="text-sm">
                    Code Editor Theme
                  </Label>
                  <ThemedSelect
                    value={preferences.codeTheme}
                    onValueChange={(value) =>
                      setPreferences({ ...preferences, codeTheme: value })
                    }
                  >
                    <ThemedSelectItem value="dark">Dark</ThemedSelectItem>
                    <ThemedSelectItem value="light">Light</ThemedSelectItem>
                    <ThemedSelectItem value="monokai">Monokai</ThemedSelectItem>
                    <ThemedSelectItem value="github">GitHub</ThemedSelectItem>
                  </ThemedSelect>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="font-size" className="text-sm">
                    Font Size
                  </Label>
                  <ThemedSelect
                    value={preferences.fontSize}
                    onValueChange={(value) =>
                      setPreferences({ ...preferences, fontSize: value })
                    }
                  >
                    <ThemedSelectItem value="12">12px</ThemedSelectItem>
                    <ThemedSelectItem value="14">14px</ThemedSelectItem>
                    <ThemedSelectItem value="16">16px</ThemedSelectItem>
                    <ThemedSelectItem value="18">18px</ThemedSelectItem>
                  </ThemedSelect>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tab-size" className="text-sm">
                    Tab Size
                  </Label>
                  <ThemedSelect
                    value={preferences.tabSize}
                    onValueChange={(value) =>
                      setPreferences({ ...preferences, tabSize: value })
                    }
                  >
                    <ThemedSelectItem value="2">2 spaces</ThemedSelectItem>
                    <ThemedSelectItem value="4">4 spaces</ThemedSelectItem>
                    <ThemedSelectItem value="8">8 spaces</ThemedSelectItem>
                  </ThemedSelect>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
