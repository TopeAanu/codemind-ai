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
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Brain, Zap, Target, MessageSquare } from "lucide-react";

export default function AISettings() {
  const [settings, setSettings] = useState({
    aiModel: "gpt-4",
    creativity: [0.7],
    maxTokens: "2048",
    temperature: [0.8],
    autoSuggestions: true,
    contextAware: true,
    codeCompletion: true,
    explanationDetail: "detailed",
    customPrompts: true,
    learningMode: true,
    apiKey: "",
    customInstructions: "",
  });

  const handleSave = () => {
    console.log("Saving AI settings:", settings);
  };

  const handleTestConnection = () => {
    console.log("Testing AI connection...");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Model Configuration
          </CardTitle>
          <CardDescription>
            Configure which AI model to use and its behavior
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="aiModel">AI Model</Label>
            <Select
              value={settings.aiModel}
              onValueChange={(value) =>
                setSettings({ ...settings, aiModel: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-4">
                  <div className="flex items-center justify-between w-full">
                    <span>GPT-4</span>
                    <Badge variant="secondary">Recommended</Badge>
                  </div>
                </SelectItem>
                <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                <SelectItem value="claude-3">Claude 3</SelectItem>
                <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxTokens">Max Tokens</Label>
            <Select
              value={settings.maxTokens}
              onValueChange={(value) =>
                setSettings({ ...settings, maxTokens: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1024">1,024 tokens</SelectItem>
                <SelectItem value="2048">2,048 tokens</SelectItem>
                <SelectItem value="4096">4,096 tokens</SelectItem>
                <SelectItem value="8192">8,192 tokens</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Creativity Level</Label>
            <div className="px-3">
              <Slider
                value={settings.creativity}
                onValueChange={(value) =>
                  setSettings({ ...settings, creativity: value })
                }
                max={1}
                min={0}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>Conservative</span>
                <span>{settings.creativity[0].toFixed(1)}</span>
                <span>Creative</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Response Temperature</Label>
            <div className="px-3">
              <Slider
                value={settings.temperature}
                onValueChange={(value) =>
                  setSettings({ ...settings, temperature: value })
                }
                max={2}
                min={0}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>Focused</span>
                <span>{settings.temperature[0].toFixed(1)}</span>
                <span>Random</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            AI Features
          </CardTitle>
          <CardDescription>
            Enable or disable specific AI-powered features
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto Suggestions</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Automatically suggest code improvements while typing
              </p>
            </div>
            <Switch
              checked={settings.autoSuggestions}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, autoSuggestions: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Context Awareness</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Use surrounding code context for better suggestions
              </p>
            </div>
            <Switch
              checked={settings.contextAware}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, contextAware: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Code Completion</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                AI-powered intelligent code completion
              </p>
            </div>
            <Switch
              checked={settings.codeCompletion}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, codeCompletion: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Custom Prompts</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Allow custom AI prompts and instructions
              </p>
            </div>
            <Switch
              checked={settings.customPrompts}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, customPrompts: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Learning Mode</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                AI learns from your coding patterns and preferences
              </p>
            </div>
            <Switch
              checked={settings.learningMode}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, learningMode: checked })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Response Preferences
          </CardTitle>
          <CardDescription>
            Customize how AI responses are formatted and detailed
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="explanationDetail">Explanation Detail Level</Label>
            <Select
              value={settings.explanationDetail}
              onValueChange={(value) =>
                setSettings({ ...settings, explanationDetail: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="brief">Brief - Quick answers</SelectItem>
                <SelectItem value="standard">
                  Standard - Balanced detail
                </SelectItem>
                <SelectItem value="detailed">
                  Detailed - Comprehensive explanations
                </SelectItem>
                <SelectItem value="expert">
                  Expert - Technical deep-dives
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {settings.customPrompts && (
            <div className="space-y-2">
              <Label htmlFor="customInstructions">Custom Instructions</Label>
              <Textarea
                id="customInstructions"
                placeholder="Enter custom instructions for the AI (e.g., 'Always include error handling', 'Prefer functional programming style', etc.)"
                value={settings.customInstructions}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    customInstructions: e.target.value,
                  })
                }
                rows={4}
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            API Configuration
          </CardTitle>
          <CardDescription>
            Configure your AI API settings (optional for advanced users)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="apiKey">Custom API Key</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Enter your custom API key (optional)"
              value={settings.apiKey}
              onChange={(e) =>
                setSettings({ ...settings, apiKey: e.target.value })
              }
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Leave empty to use the default service. Custom keys may provide
              higher rate limits.
            </p>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleTestConnection} variant="outline">
              Test Connection
            </Button>
            <Button onClick={handleSave} className="btn-primary">
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
