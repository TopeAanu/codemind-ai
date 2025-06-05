"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Code2,
  FolderOpen,
  Search,
  MessageSquare,
  Github,
  Plus,
  TrendingUp,
} from "lucide-react";

const mockData = {
  stats: {
    totalProjects: 12,
    totalAnalyses: 156,
    githubRepos: 8,
    chatSessions: 34,
  },
  recentActivity: [
    {
      id: "1",
      type: "analysis",
      title: "Analyzed React component for performance issues",
      project: "E-commerce App",
      timestamp: "2 hours ago",
      status: "completed",
    },
    {
      id: "2",
      type: "chat",
      title: "Discussed TypeScript best practices",
      project: "API Service",
      timestamp: "4 hours ago",
      status: "completed",
    },
    {
      id: "3",
      type: "project",
      title: "Created new project: Mobile App",
      project: "Mobile App",
      timestamp: "1 day ago",
      status: "active",
    },
  ],
  chartData: [
    { name: "Mon", analyses: 12, chats: 8 },
    { name: "Tue", analyses: 19, chats: 12 },
    { name: "Wed", analyses: 15, chats: 10 },
    { name: "Thu", analyses: 22, chats: 15 },
    { name: "Fri", analyses: 18, chats: 11 },
    { name: "Sat", analyses: 8, chats: 5 },
    { name: "Sun", analyses: 6, chats: 3 },
  ],
};

export default function DashboardPage() {
  const { user } = useSelector((state: RootState) => state.auth);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "analysis":
        return <Search className="h-4 w-4" />;
      case "chat":
        return <MessageSquare className="h-4 w-4" />;
      case "project":
        return <FolderOpen className="h-4 w-4" />;
      default:
        return <Code2 className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "active":
        return "bg-blue-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-0">
      {/* Welcome Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white truncate">
            Welcome back, {user?.name?.split(" ")[0]}!
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
            Here's what's happening with your projects today.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
          <Button className="btn-primary w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            <span className="hidden xs:inline">New Analysis</span>
            <span className="xs:hidden">New</span>
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            <Github className="mr-2 h-4 w-4" />
            <span className="hidden xs:inline">Connect GitHub</span>
            <span className="xs:hidden">GitHub</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Projects
            </CardTitle>
            <FolderOpen className="h-4 w-4 text-primary-500 flex-shrink-0" />
          </CardHeader>
          <CardContent className="pb-3">
            <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              {mockData.stats.totalProjects}
            </div>
            <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1 flex-shrink-0" />
              <span className="truncate">+2 from last month</span>
            </p>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
              Code Analyses
            </CardTitle>
            <Search className="h-4 w-4 text-accent-blue flex-shrink-0" />
          </CardHeader>
          <CardContent className="pb-3">
            <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              {mockData.stats.totalAnalyses}
            </div>
            <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1 flex-shrink-0" />
              <span className="truncate">+23 this week</span>
            </p>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
              GitHub Repos
            </CardTitle>
            <Github className="h-4 w-4 text-gray-600 flex-shrink-0" />
          </CardHeader>
          <CardContent className="pb-3">
            <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              {mockData.stats.githubRepos}
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 truncate">
              Connected repositories
            </p>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
              AI Chat Sessions
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-accent-purple flex-shrink-0" />
          </CardHeader>
          <CardContent className="pb-3">
            <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              {mockData.stats.chatSessions}
            </div>
            <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1 flex-shrink-0" />
              <span className="truncate">+8 this week</span>
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        {/* Activity Chart */}
        <Card className="glass">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg sm:text-xl text-gray-900 dark:text-white">
              Weekly Activity
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
              Your code analyses and AI chat sessions this week
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="h-[250px] sm:h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={mockData.chartData}
                  margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis
                    dataKey="name"
                    className="text-xs"
                    tick={{ fontSize: 12 }}
                    interval={0}
                  />
                  <YAxis
                    className="text-xs"
                    tick={{ fontSize: 12 }}
                    width={30}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(17, 24, 39, 0.95)",
                      border: "none",
                      borderRadius: "8px",
                      color: "white",
                      fontSize: "12px",
                    }}
                  />
                  <Bar
                    dataKey="analyses"
                    fill="#6366f1"
                    radius={[2, 2, 0, 0]}
                  />
                  <Bar dataKey="chats" fill="#8b5cf6" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="glass">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg sm:text-xl text-gray-900 dark:text-white">
              Recent Activity
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
              Your latest actions and project updates
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="space-y-3 sm:space-y-4">
              {mockData.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full">
                      {getActivityIcon(activity.type)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
                      {activity.title}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                        {activity.project}
                      </p>
                      <div
                        className={`w-2 h-2 rounded-full flex-shrink-0 ${getStatusColor(
                          activity.status
                        )}`}
                      />
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <p className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {activity.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Activity
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="glass">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg sm:text-xl text-gray-900 dark:text-white">
            Quick Actions
          </CardTitle>
          <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
            Get started with common tasks
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <Button
              variant="outline"
              className="h-16 sm:h-20 flex flex-col space-y-1 sm:space-y-2"
            >
              <Search className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-sm sm:text-base">Analyze Code</span>
            </Button>
            <Button
              variant="outline"
              className="h-16 sm:h-20 flex flex-col space-y-1 sm:space-y-2"
            >
              <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-sm sm:text-base">Start AI Chat</span>
            </Button>
            <Button
              variant="outline"
              className="h-16 sm:h-20 flex flex-col space-y-1 sm:space-y-2"
            >
              <Plus className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-sm sm:text-base">New Project</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
