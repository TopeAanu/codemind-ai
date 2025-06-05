"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Settings,
  Palette,
  Code2,
  Bell,
  Shield,
  Brain,
  User,
  ChevronRight,
} from "lucide-react";
import GeneralSettings from "@/components/settings/general-settings";
import AppearanceSettings from "@/components/settings/appearance-settings";
import CodeEditorSettings from "@/components/settings/code-editor-settings";
import NotificationsSettings from "@/components/settings/notifications-settings";
import PrivacySettings from "@/components/settings/privacy-settings";
import AISettings from "@/components/settings/ai-settings";
import AccountSettings from "@/components/settings/account-settings";

const settingsCategories = [
  {
    id: "general",
    label: "General",
    icon: Settings,
    component: GeneralSettings,
  },
  {
    id: "appearance",
    label: "Appearance",
    icon: Palette,
    component: AppearanceSettings,
  },
  {
    id: "code-editor",
    label: "Code Editor",
    icon: Code2,
    component: CodeEditorSettings,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
    component: NotificationsSettings,
  },
  {
    id: "privacy",
    label: "Privacy",
    icon: Shield,
    component: PrivacySettings,
  },
  {
    id: "ai-settings",
    label: "AI Settings",
    icon: Brain,
    component: AISettings,
  },
  {
    id: "account",
    label: "Account",
    icon: User,
    component: AccountSettings,
  },
];

export default function SettingsPage() {
  const [activeCategory, setActiveCategory] = useState("general");

  const ActiveComponent =
    settingsCategories.find((cat) => cat.id === activeCategory)?.component ||
    GeneralSettings;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your account settings and preferences
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <Card className="glass p-4">
            <nav className="space-y-2">
              {settingsCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={
                      activeCategory === category.id ? "default" : "ghost"
                    }
                    className="w-full justify-start"
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <Icon className="h-4 w-4 mr-3" />
                    {category.label}
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </Button>
                );
              })}
            </nav>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <ActiveComponent />
        </div>
      </div>
    </div>
  );
}
