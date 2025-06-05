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

export default function CodeEditorSettings() {
  const [settings, setSettings] = useState({
    theme: "vs-dark",
    fontSize: [14],
    tabSize: "2",
    wordWrap: true,
    minimap: true,
    autoComplete: true,
    bracketMatching: true,
    lineHighlight: true,
    folding: true,
    autoIndent: true,
    formatOnSave: true,
    formatOnPaste: false,
    trimWhitespace: true,
    insertFinalNewline: true,
  });

  const handleSave = () => {
    console.log("Saving code editor settings:", settings);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Editor Appearance</CardTitle>
          <CardDescription>
            Customize how your code editor looks and feels
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="editorTheme">Editor Theme</Label>
              <Select
                value={settings.theme}
                onValueChange={(value) =>
                  setSettings({ ...settings, theme: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vs-dark">Dark</SelectItem>
                  <SelectItem value="vs-light">Light</SelectItem>
                  <SelectItem value="hc-black">High Contrast Dark</SelectItem>
                  <SelectItem value="hc-light">High Contrast Light</SelectItem>
                  <SelectItem value="monokai">Monokai</SelectItem>
                  <SelectItem value="github">GitHub</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tabSize">Tab Size</Label>
              <Select
                value={settings.tabSize}
                onValueChange={(value) =>
                  setSettings({ ...settings, tabSize: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 spaces</SelectItem>
                  <SelectItem value="4">4 spaces</SelectItem>
                  <SelectItem value="8">8 spaces</SelectItem>
                  <SelectItem value="tab">Tab character</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Editor Features</CardTitle>
          <CardDescription>
            Configure editor functionality and behavior
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Word Wrap</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Wrap long lines to fit the editor width
                  </p>
                </div>
                <Switch
                  checked={settings.wordWrap}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, wordWrap: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Minimap</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Show code overview on the right side
                  </p>
                </div>
                <Switch
                  checked={settings.minimap}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, minimap: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto Complete</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Show code completion suggestions
                  </p>
                </div>
                <Switch
                  checked={settings.autoComplete}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, autoComplete: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Bracket Matching</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Highlight matching brackets
                  </p>
                </div>
                <Switch
                  checked={settings.bracketMatching}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, bracketMatching: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Line Highlight</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Highlight the current line
                  </p>
                </div>
                <Switch
                  checked={settings.lineHighlight}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, lineHighlight: checked })
                  }
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Code Folding</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Allow collapsing code blocks
                  </p>
                </div>
                <Switch
                  checked={settings.folding}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, folding: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto Indent</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Automatically indent new lines
                  </p>
                </div>
                <Switch
                  checked={settings.autoIndent}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, autoIndent: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Format on Save</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Auto-format code when saving
                  </p>
                </div>
                <Switch
                  checked={settings.formatOnSave}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, formatOnSave: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Format on Paste</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Auto-format pasted code
                  </p>
                </div>
                <Switch
                  checked={settings.formatOnPaste}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, formatOnPaste: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Trim Whitespace</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Remove trailing whitespace on save
                  </p>
                </div>
                <Switch
                  checked={settings.trimWhitespace}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, trimWhitespace: checked })
                  }
                />
              </div>
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
