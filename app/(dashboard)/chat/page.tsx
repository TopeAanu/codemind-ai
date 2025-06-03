"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/store"
import { setInput, addMessage, startChatRequest, completeChatRequest, clearChat } from "@/store/slices/chatSlice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, User, Copy, Download, Trash2, Upload, Code2, MessageSquare, Loader2, Paperclip } from "lucide-react"

const quickSuggestions = [
  "Explain this React component",
  "How to optimize this function?",
  "Generate unit tests for this code",
  "Find bugs in my JavaScript",
  "Convert this to TypeScript",
  "Improve code performance",
]

export default function ChatPage() {
  const { messages, loading, input } = useSelector((state: RootState) => state.chat)
  const { user } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim() && !selectedFile) return

    const messageContent = selectedFile ? `${input}\n\n[File: ${selectedFile.name}]` : input

    dispatch(
      addMessage({
        role: "user",
        content: messageContent,
      }),
    )

    dispatch(setInput(""))
    setSelectedFile(null)
    dispatch(startChatRequest())

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateMockAIResponse(messageContent)
      dispatch(
        addMessage({
          role: "assistant",
          content: aiResponse,
          codeBlocks: extractCodeBlocks(aiResponse),
        }),
      )
      dispatch(completeChatRequest())
    }, 1500)
  }

  const generateMockAIResponse = (userMessage: string) => {
    const responses = [
      `I'd be happy to help you with that! Based on your question about "${userMessage.slice(0, 50)}...", here's what I can suggest:

## Analysis

Your code looks good overall, but there are a few areas for improvement:

1. **Performance Optimization**: Consider using useMemo for expensive calculations
2. **Error Handling**: Add try-catch blocks for better error management
3. **Type Safety**: Adding TypeScript interfaces would improve code reliability

## Example Implementation

\`\`\`javascript
// Optimized version
const optimizedFunction = useMemo(() => {
  return expensiveCalculation(data);
}, [data]);

// Error handling
try {
  const result = await apiCall();
  setData(result);
} catch (error) {
  console.error('API call failed:', error);
}
\`\`\`

Would you like me to elaborate on any of these points?`,

      `Great question! Let me break this down for you:

## Solution Approach

For the issue you're describing, I recommend the following approach:

### Step 1: Identify the Problem
The main issue seems to be related to state management and component re-rendering.

### Step 2: Implement the Fix
\`\`\`typescript
// Before (problematic)
const [data, setData] = useState(null);

// After (improved)
const [data, setData] = useState<DataType | null>(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
\`\`\`

### Step 3: Add Error Boundaries
Consider wrapping your components in error boundaries for better user experience.

Is there a specific part you'd like me to explain further?`,
    ]

    return responses[Math.floor(Math.random() * responses.length)]
  }

  const extractCodeBlocks = (content: string) => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g
    const blocks = []
    let match

    while ((match = codeBlockRegex.exec(content)) !== null) {
      blocks.push({
        language: match[1] || "text",
        code: match[2].trim(),
      })
    }

    return blocks
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const handleSuggestionClick = (suggestion: string) => {
    dispatch(setInput(suggestion))
  }

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Chat Assistant</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Get instant help with your code questions</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={() => dispatch(clearChat())}>
            <Trash2 className="mr-2 h-4 w-4" />
            Clear Chat
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Chat
          </Button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-3 flex flex-col">
          <Card className="glass flex-1 flex flex-col">
            <CardHeader className="border-b border-gray-200 dark:border-gray-700">
              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                <MessageSquare className="mr-2 h-5 w-5" />
                Chat with AI Assistant
              </CardTitle>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 p-0">
              <ScrollArea className="h-[500px] p-4">
                {messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Bot className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Start a conversation</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Ask me anything about your code, debugging, or development best practices
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-4 ${
                            message.role === "user"
                              ? "bg-primary-500 text-white"
                              : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                          }`}
                        >
                          <div className="flex items-start space-x-2">
                            {message.role === "assistant" ? (
                              <Bot className="h-5 w-5 mt-0.5 text-primary-500" />
                            ) : (
                              <User className="h-5 w-5 mt-0.5" />
                            )}
                            <div className="flex-1">
                              <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                              {message.codeBlocks && message.codeBlocks.length > 0 && (
                                <div className="mt-3 space-y-2">
                                  {message.codeBlocks.map((block, index) => (
                                    <div key={index} className="relative">
                                      <div className="flex items-center justify-between bg-gray-800 text-white px-3 py-1 rounded-t-lg text-xs">
                                        <span>{block.language}</span>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-6 w-6"
                                          onClick={() => copyToClipboard(block.code)}
                                        >
                                          <Copy className="h-3 w-3" />
                                        </Button>
                                      </div>
                                      <pre className="bg-gray-900 text-gray-100 p-3 rounded-b-lg text-sm overflow-x-auto">
                                        <code>{block.code}</code>
                                      </pre>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {loading && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 max-w-[80%]">
                          <div className="flex items-center space-x-2">
                            <Bot className="h-5 w-5 text-primary-500" />
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">AI is thinking...</span>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </ScrollArea>
            </CardContent>

            {/* Input Area */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-4">
              {selectedFile && (
                <div className="mb-3 flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <Paperclip className="h-4 w-4" />
                  <span>{selectedFile.name}</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setSelectedFile(null)}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              )}
              <div className="flex space-x-2">
                <div className="flex-1 relative">
                  <Input
                    placeholder="Ask me anything about your code..."
                    value={input}
                    onChange={(e) => dispatch(setInput(e.target.value))}
                    onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                    className="pr-10"
                  />
                  <label
                    htmlFor="file-upload"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  >
                    <Upload className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    <input
                      id="file-upload"
                      type="file"
                      accept=".js,.ts,.py,.java,.go,.rs,.cpp,.cs,.php,.rb,.json,.md"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <Button onClick={handleSendMessage} disabled={loading || (!input.trim() && !selectedFile)}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Suggestions */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Quick Suggestions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickSuggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full text-left justify-start h-auto p-3"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <Code2 className="mr-2 h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">{suggestion}</span>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Chat Stats */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Session Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Messages</span>
                <Badge variant="secondary">{messages.length}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Code Blocks</span>
                <Badge variant="secondary">
                  {messages.reduce((acc, msg) => acc + (msg.codeBlocks?.length || 0), 0)}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Files Shared</span>
                <Badge variant="secondary">0</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
