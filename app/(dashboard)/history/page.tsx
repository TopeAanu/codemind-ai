"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  Filter,
  Download,
  Eye,
  Copy,
  Trash2,
  MoreHorizontal,
  Calendar,
  Code2,
  MessageSquare,
  Bug,
  FileText,
  TestTube,
  HelpCircle,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react"

const mockHistory = [
  {
    id: "1",
    type: "analysis",
    title: "React Component Performance Analysis",
    project: "E-commerce Platform",
    analysisType: "debug",
    timestamp: "2024-01-15T10:30:00Z",
    status: "completed",
    language: "TypeScript",
    duration: "2.3s",
  },
  {
    id: "2",
    type: "chat",
    title: "Discussion about TypeScript best practices",
    project: "API Service",
    analysisType: "explain",
    timestamp: "2024-01-15T09:15:00Z",
    status: "completed",
    language: "TypeScript",
    duration: "5m 23s",
  },
  {
    id: "3",
    type: "analysis",
    title: "Python Data Processing Script",
    project: "Analytics Dashboard",
    analysisType: "test",
    timestamp: "2024-01-14T16:45:00Z",
    status: "completed",
    language: "Python",
    duration: "1.8s",
  },
  {
    id: "4",
    type: "analysis",
    title: "API Gateway Documentation Generation",
    project: "Microservices",
    analysisType: "docs",
    timestamp: "2024-01-14T14:20:00Z",
    status: "error",
    language: "Go",
    duration: "0.5s",
  },
  {
    id: "5",
    type: "chat",
    title: "Code review discussion for authentication module",
    project: "Mobile Banking App",
    analysisType: "explain",
    timestamp: "2024-01-13T11:30:00Z",
    status: "completed",
    language: "JavaScript",
    duration: "12m 45s",
  },
]

const analysisTypes = ["All", "explain", "debug", "test", "docs"]
const statusTypes = ["All", "completed", "error", "pending"]
const itemTypes = ["All", "analysis", "chat"]

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("All")
  const [filterStatus, setFilterStatus] = useState("All")
  const [filterAnalysis, setFilterAnalysis] = useState("All")

  const filteredHistory = mockHistory.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.project.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === "All" || item.type === filterType
    const matchesStatus = filterStatus === "All" || item.status === filterStatus
    const matchesAnalysis = filterAnalysis === "All" || item.analysisType === filterAnalysis

    return matchesSearch && matchesType && matchesStatus && matchesAnalysis
  })

  const getTypeIcon = (type: string, analysisType?: string) => {
    if (type === "chat") return <MessageSquare className="h-4 w-4" />

    switch (analysisType) {
      case "debug":
        return <Bug className="h-4 w-4" />
      case "test":
        return <TestTube className="h-4 w-4" />
      case "docs":
        return <FileText className="h-4 w-4" />
      case "explain":
        return <HelpCircle className="h-4 w-4" />
      default:
        return <Code2 className="h-4 w-4" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "error":
        return "bg-red-500"
      case "pending":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return "Yesterday"
    return date.toLocaleDateString()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analysis History</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">View and manage your past analyses and chat sessions</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export All
          </Button>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Advanced Filters
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="glass">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search history..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex space-x-2">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {itemTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterAnalysis} onValueChange={setFilterAnalysis}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Analysis" />
                </SelectTrigger>
                <SelectContent>
                  {analysisTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {statusTypes.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* History List */}
      <div className="space-y-4">
        {filteredHistory.length === 0 ? (
          <Card className="glass">
            <CardContent className="p-12 text-center">
              <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No history found</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {searchQuery || filterType !== "All" || filterStatus !== "All" || filterAnalysis !== "All"
                  ? "Try adjusting your search or filter criteria"
                  : "Your analysis history will appear here once you start using CodeMind AI"}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredHistory.map((item) => (
            <Card key={item.id} className="glass hover:shadow-lg transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="flex-shrink-0 mt-1">{getTypeIcon(item.type, item.analysisType)}</div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">{item.title}</h3>
                        <Badge variant="outline" className="capitalize">
                          {item.type}
                        </Badge>
                        {item.type === "analysis" && (
                          <Badge variant="secondary" className="capitalize">
                            {item.analysisType}
                          </Badge>
                        )}
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Project: {item.project}</p>

                      <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(item.timestamp)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{item.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(item.status)}`} />
                          <span className="capitalize">{item.status}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {item.language}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {getStatusIcon(item.status)}

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy Results
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        {item.status === "error" && (
                          <DropdownMenuItem>
                            <Code2 className="mr-2 h-4 w-4" />
                            Re-run Analysis
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Pagination would go here */}
      {filteredHistory.length > 0 && (
        <div className="flex justify-center">
          <Button variant="outline">Load More</Button>
        </div>
      )}
    </div>
  )
}
