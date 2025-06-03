"use client";

import type React from "react";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store";
import {
  setCode,
  setLanguage,
  setAnalysisType,
  startAnalysis,
  completeAnalysis,
} from "@/store/slices/analysisSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ThemedSelect, ThemedSelectItem } from "@/components/ui/themed-select";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Upload,
  Download,
  Copy,
  Save,
  Maximize2,
  Bug,
  FileText,
  TestTube,
  HelpCircle,
  Loader2,
  Search,
} from "lucide-react";

const languages = [
  "javascript",
  "typescript",
  "python",
  "java",
  "go",
  "rust",
  "cpp",
  "csharp",
  "php",
  "ruby",
];

const analysisTypes = [
  {
    value: "explain",
    label: "Explain Code",
    icon: HelpCircle,
    description: "Get detailed explanations of how your code works",
  },
  {
    value: "debug",
    label: "Debug Issues",
    icon: Bug,
    description: "Find and fix bugs in your code",
  },
  {
    value: "test",
    label: "Generate Tests",
    icon: TestTube,
    description: "Create comprehensive test cases",
  },
  {
    value: "docs",
    label: "Generate Docs",
    icon: FileText,
    description: "Generate documentation for your code",
  },
];

export default function AnalyzePage() {
  const { code, selectedLanguage, analysisType, current, loading } =
    useSelector((state: RootState) => state.analysis);
  const dispatch = useDispatch();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleAnalyze = async () => {
    if (!code.trim()) return;

    dispatch(
      startAnalysis({
        code,
        language: selectedLanguage,
        type: analysisType,
      })
    );

    // Simulate API call
    setTimeout(() => {
      const mockResult = generateMockAnalysisResult(
        analysisType,
        selectedLanguage
      );
      dispatch(
        completeAnalysis({
          id: current?.id || "",
          result: mockResult,
        })
      );
    }, 2000);
  };

  const generateMockAnalysisResult = (type: string, language: string) => {
    const results = {
      explain: `## Code Explanation

This ${language} code demonstrates several key concepts:

### Function Structure
- The function uses modern ES6+ syntax
- Implements proper error handling
- Returns a Promise for asynchronous operations

### Key Features
1. **Input Validation**: Checks for required parameters
2. **Error Handling**: Uses try-catch blocks
3. **Async/Await**: Modern asynchronous programming pattern

### Recommendations
- Consider adding TypeScript for better type safety
- Implement unit tests for better code coverage
- Add JSDoc comments for better documentation`,

      debug: `## Debug Analysis

### Issues Found:

#### 🔴 Critical Issues
1. **Potential Memory Leak** (Line 15)
   - Event listeners not properly removed
   - **Fix**: Add cleanup in useEffect return function

2. **Undefined Variable** (Line 23)
   - Variable 'userData' used before declaration
   - **Fix**: Initialize variable or add null check

#### 🟡 Warnings
1. **Missing Error Handling** (Line 8)
   - API call without try-catch
   - **Recommendation**: Wrap in try-catch block

2. **Performance Issue** (Line 31)
   - Unnecessary re-renders detected
   - **Fix**: Use useMemo or useCallback

### Suggested Fixes:
\`\`\`${language}
// Fixed version with proper error handling
try {
  const result = await fetchData();
  setData(result);
} catch (error) {
  console.error('Error fetching data:', error);
}
\`\`\``,

      test: `## Generated Test Cases

### Unit Tests for your ${language} code:

\`\`\`${language}
describe('YourFunction', () => {
  test('should handle valid input correctly', () => {
    const input = { name: 'test', value: 123 };
    const result = yourFunction(input);
    expect(result).toBeDefined();
    expect(result.success).toBe(true);
  });

  test('should throw error for invalid input', () => {
    expect(() => yourFunction(null)).toThrow();
    expect(() => yourFunction({})).toThrow();
  });

  test('should handle edge cases', () => {
    const edgeCase = { name: '', value: 0 };
    const result = yourFunction(edgeCase);
    expect(result.success).toBe(false);
  });

  test('should be performant with large datasets', () => {
    const largeInput = generateLargeDataset(1000);
    const startTime = performance.now();
    yourFunction(largeInput);
    const endTime = performance.now();
    expect(endTime - startTime).toBeLessThan(100);
  });
});
\`\`\`

### Integration Tests:
\`\`\`${language}
describe('Integration Tests', () => {
  test('should work with external API', async () => {
    const mockResponse = { data: 'test' };
    jest.spyOn(api, 'fetch').mockResolvedValue(mockResponse);
    
    const result = await yourFunction();
    expect(result).toEqual(mockResponse);
  });
});
\`\`\``,

      docs: `## Documentation

### Function Overview
\`\`\`${language}
/**
 * Processes user data and returns formatted result
 * @param {Object} userData - The user data object
 * @param {string} userData.name - User's name
 * @param {number} userData.age - User's age
 * @returns {Promise<Object>} Formatted user data
 * @throws {Error} When userData is invalid
 */
\`\`\`

### Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| userData | Object | Yes | User data object |
| userData.name | string | Yes | User's full name |
| userData.age | number | Yes | User's age in years |

### Return Value
Returns a Promise that resolves to an object containing:
- \`success\`: Boolean indicating operation success
- \`data\`: Processed user data
- \`timestamp\`: Processing timestamp

### Examples
\`\`\`${language}
// Basic usage
const result = await processUserData({
  name: 'John Doe',
  age: 30
});

// Error handling
try {
  const result = await processUserData(userData);
  console.log('Success:', result.data);
} catch (error) {
  console.error('Processing failed:', error.message);
}
\`\`\`

### Error Handling
The function throws errors in the following cases:
- Invalid or missing userData parameter
- Network connectivity issues
- Server-side processing errors`,
    };

    return (
      results[type as keyof typeof results] ||
      "Analysis completed successfully."
    );
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        dispatch(setCode(content));
      };
      reader.readAsText(file);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Code Analysis
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Analyze your code with AI-powered insights
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            <label htmlFor="file-upload" className="cursor-pointer">
              Upload File
            </label>
            <input
              id="file-upload"
              type="file"
              accept=".js,.ts,.py,.java,.go,.rs,.cpp,.cs,.php,.rb"
              onChange={handleFileUpload}
              className="hidden"
            />
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            <Maximize2 className="mr-2 h-4 w-4" />
            {isFullscreen ? "Exit" : "Fullscreen"}
          </Button>
        </div>
      </div>

      <div
        className={`grid gap-6 ${
          isFullscreen
            ? "fixed inset-0 z-50 bg-gray-50 dark:bg-gray-900 p-6"
            : "grid-cols-1 lg:grid-cols-2"
        }`}
      >
        {/* Code Input Panel */}
        <Card className="glass">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-900 dark:text-white">
                Code Input
              </CardTitle>
              <div className="flex items-center space-x-2">
                <ThemedSelect
                  value={selectedLanguage}
                  onValueChange={(value) => dispatch(setLanguage(value))}
                  className="w-32"
                >
                  {languages.map((lang) => (
                    <ThemedSelectItem key={lang} value={lang}>
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </ThemedSelectItem>
                  ))}
                </ThemedSelect>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Paste your code here or upload a file..."
              value={code}
              onChange={(e) => dispatch(setCode(e.target.value))}
              className="min-h-[400px] font-mono text-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
            />

            {/* Analysis Type Selection */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Analysis Type
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {analysisTypes.map((type) => (
                  <Button
                    key={type.value}
                    variant={
                      analysisType === type.value ? "default" : "outline"
                    }
                    onClick={() => dispatch(setAnalysisType(type.value as any))}
                    className="h-auto p-3 flex flex-col items-start space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <type.icon className="h-4 w-4" />
                      <span className="font-medium">{type.label}</span>
                    </div>
                    <span className="text-xs text-left opacity-70">
                      {type.description}
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            <Button
              onClick={handleAnalyze}
              disabled={!code.trim() || loading}
              className="w-full btn-primary"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Analyze Code
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results Panel */}
        <Card className="glass">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-900 dark:text-white">
                Analysis Results
              </CardTitle>
              {current && (
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="capitalize">
                    {current.type}
                  </Badge>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(current.result)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Save className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center h-[400px]">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary-500" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Analyzing your code...
                  </p>
                </div>
              </div>
            ) : current?.result ? (
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 whitespace-pre-wrap font-mono text-sm text-gray-900 dark:text-gray-100">
                  {current.result}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[400px]">
                <div className="text-center">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Ready to analyze
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Enter your code and select an analysis type to get started
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
