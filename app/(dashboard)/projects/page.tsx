"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store";
import {
  setViewMode,
  setSearchQuery,
  setFilterLanguage,
} from "@/store/slices/projectsSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Search,
  Grid3X3,
  List,
  Github,
  MoreHorizontal,
  Calendar,
  Code2,
  ExternalLink,
  Settings,
  Trash2,
  FolderOpen,
} from "lucide-react";

const mockProjects = [
  {
    id: "1",
    name: "E-commerce Platform",
    description: "Full-stack e-commerce application with React and Node.js",
    language: "TypeScript",
    lastModified: "2 hours ago",
    status: "active" as const,
    githubUrl: "https://github.com/user/ecommerce",
    analysisCount: 23,
  },
  {
    id: "2",
    name: "Mobile Banking App",
    description: "React Native banking application with secure authentication",
    language: "JavaScript",
    lastModified: "1 day ago",
    status: "active" as const,
    githubUrl: "https://github.com/user/banking-app",
    analysisCount: 15,
  },
  {
    id: "3",
    name: "Data Analytics Dashboard",
    description: "Python-based dashboard for data visualization and analytics",
    language: "Python",
    lastModified: "3 days ago",
    status: "archived" as const,
    analysisCount: 8,
  },
  {
    id: "4",
    name: "API Gateway Service",
    description: "Microservices API gateway built with Go",
    language: "Go",
    lastModified: "1 week ago",
    status: "error" as const,
    githubUrl: "https://github.com/user/api-gateway",
    analysisCount: 12,
  },
];

const languages = [
  "All",
  "TypeScript",
  "JavaScript",
  "Python",
  "Go",
  "Java",
  "C++",
];

export default function ProjectsPage() {
  const { viewMode, searchQuery, filterLanguage } = useSelector(
    (state: RootState) => state.projects
  );
  const dispatch = useDispatch();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredProjects = mockProjects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLanguage =
      filterLanguage === "" ||
      filterLanguage === "All" ||
      project.language === filterLanguage;
    return matchesSearch && matchesLanguage;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "archived":
        return "bg-gray-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      TypeScript: "bg-blue-500",
      JavaScript: "bg-yellow-500",
      Python: "bg-green-500",
      Go: "bg-cyan-500",
      Java: "bg-orange-500",
      "C++": "bg-purple-500",
    };
    return colors[language] || "bg-gray-500";
  };

  const ProjectCard = ({ project }: { project: (typeof mockProjects)[0] }) => (
    <Card className="glass hover:shadow-lg transition-all duration-200 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
              {project.name}
            </CardTitle>
            <CardDescription className="mt-1 text-gray-600 dark:text-gray-400">
              {project.description}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Search className="mr-2 h-4 w-4" />
                Analyze
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              {project.githubUrl && (
                <DropdownMenuItem>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View on GitHub
                </DropdownMenuItem>
              )}
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div
              className={`w-3 h-3 rounded-full ${getLanguageColor(
                project.language
              )}`}
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {project.language}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full ${getStatusColor(
                project.status
              )}`}
            />
            <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
              {project.status}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {project.lastModified}
            </div>
            <div className="flex items-center">
              <Code2 className="h-4 w-4 mr-1" />
              {project.analysisCount} analyses
            </div>
          </div>
          {project.githubUrl && <Github className="h-4 w-4" />}
        </div>
      </CardContent>
    </Card>
  );

  const ProjectListItem = ({
    project,
  }: {
    project: (typeof mockProjects)[0];
  }) => (
    <Card className="glass hover:shadow-md transition-all duration-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div
              className={`w-4 h-4 rounded-full ${getLanguageColor(
                project.language
              )}`}
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                {project.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                {project.description}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <div
                className={`w-2 h-2 rounded-full ${getStatusColor(
                  project.status
                )}`}
              />
              <span className="capitalize">{project.status}</span>
            </div>
            <span>{project.lastModified}</span>
            <span>{project.analysisCount} analyses</span>
            {project.githubUrl && <Github className="h-4 w-4" />}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Search className="mr-2 h-4 w-4" />
                  Analyze
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                {project.githubUrl && (
                  <DropdownMenuItem>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View on GitHub
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
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Projects
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your code projects and repositories
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Github className="mr-2 h-4 w-4" />
            Import from GitHub
          </Button>
          <Button
            className="btn-primary"
            onClick={() => setShowCreateModal(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <Card className="glass">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-1 items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                  className="pl-10"
                />
              </div>
              <Select
                value={filterLanguage}
                onValueChange={(value) => dispatch(setFilterLanguage(value))}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem
                      key={lang}
                      value={lang === "All" ? "all" : lang}
                    >
                      {lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => dispatch(setViewMode("grid"))}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => dispatch(setViewMode("list"))}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid/List */}
      {filteredProjects.length === 0 ? (
        <Card className="glass">
          <CardContent className="p-12 text-center">
            <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No projects found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {searchQuery || filterLanguage
                ? "Try adjusting your search or filter criteria"
                : "Get started by creating your first project or importing from GitHub"}
            </p>
            <div className="flex justify-center space-x-3">
              <Button
                className="btn-primary"
                onClick={() => setShowCreateModal(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Project
              </Button>
              <Button variant="outline">
                <Github className="mr-2 h-4 w-4" />
                Import from GitHub
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }
        >
          {filteredProjects.map((project) =>
            viewMode === "grid" ? (
              <ProjectCard key={project.id} project={project} />
            ) : (
              <ProjectListItem key={project.id} project={project} />
            )
          )}
        </div>
      )}
    </div>
  );
}
