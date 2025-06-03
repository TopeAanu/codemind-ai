// "use client"

// import { useSelector, useDispatch } from "react-redux"
// import type { RootState } from "@/store"
// import { toggleSidebar } from "@/store/slices/uiSlice"
// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import { cn } from "@/lib/utils"
// import {
//   Code2,
//   LayoutDashboard,
//   FolderOpen,
//   Search,
//   MessageSquare,
//   User,
//   History,
//   Bell,
//   Settings,
//   ChevronLeft,
//   Github,
// } from "lucide-react"

// const navigation = [
//   { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
//   { name: "Projects", href: "/projects", icon: FolderOpen },
//   { name: "Code Analysis", href: "/analyze", icon: Search },
//   { name: "AI Chat", href: "/chat", icon: MessageSquare },
//   { name: "History", href: "/history", icon: History },
//   { name: "Notifications", href: "/notifications", icon: Bell },
//   { name: "Profile", href: "/profile", icon: User },
//   { name: "Settings", href: "/settings", icon: Settings },
// ]

// export function Sidebar() {
//   const { sidebarOpen } = useSelector((state: RootState) => state.ui)
//   const { user } = useSelector((state: RootState) => state.auth)
//   const dispatch = useDispatch()
//   const pathname = usePathname()

//   return (
//     <div
//       className={cn(
//         "fixed inset-y-0 left-0 z-50 flex flex-col bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-r border-gray-200/50 dark:border-gray-700/50 transition-all duration-300",
//         sidebarOpen ? "w-64" : "w-16",
//       )}
//     >
//       {/* Header */}
//       <div className="flex items-center justify-between p-4 border-b border-gray-200/50 dark:border-gray-700/50">
//         <div className={cn("flex items-center space-x-3", !sidebarOpen && "justify-center")}>
//           <Code2 className="h-8 w-8 text-primary-400" />
//           {sidebarOpen && <span className="text-xl font-bold text-gray-900 dark:text-white">CodeMind AI</span>}
//         </div>
//         <button
//           onClick={() => dispatch(toggleSidebar())}
//           className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
//         >
//           <ChevronLeft className={cn("h-5 w-5 transition-transform", !sidebarOpen && "rotate-180")} />
//         </button>
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 px-3 py-4 space-y-1">
//         {navigation.map((item) => {
//           const isActive = pathname === item.href
//           return (
//             <Link
//               key={item.name}
//               href={item.href}
//               className={cn(
//                 "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
//                 isActive
//                   ? "bg-primary-600 text-white"
//                   : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white",
//                 !sidebarOpen && "justify-center",
//               )}
//             >
//               <item.icon className={cn("h-5 w-5", sidebarOpen && "mr-3")} />
//               {sidebarOpen && item.name}
//             </Link>
//           )
//         })}
//       </nav>

//       {/* User Profile */}
//       {user && (
//         <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50">
//           <div className={cn("flex items-center", !sidebarOpen && "justify-center")}>
//             <img
//               src={user.avatar || "/placeholder.svg?height=32&width=32"}
//               alt={user.name}
//               className="h-8 w-8 rounded-full"
//             />
//             {sidebarOpen && (
//               <div className="ml-3 flex-1 min-w-0">
//                 <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.name}</p>
//                 <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
//               </div>
//             )}
//           </div>
//           {sidebarOpen && user.githubConnected && (
//             <div className="mt-2 flex items-center text-xs text-green-400">
//               <Github className="h-3 w-3 mr-1" />
//               GitHub Connected
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   )
// }

"use client";

import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store";
import { toggleSidebar } from "@/store/slices/uiSlice";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Code2,
  LayoutDashboard,
  FolderOpen,
  Search,
  MessageSquare,
  User,
  History,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  Github,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/projects", icon: FolderOpen },
  { name: "Code Analysis", href: "/analyze", icon: Search },
  { name: "AI Chat", href: "/chat", icon: MessageSquare },
  { name: "History", href: "/history", icon: History },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const { sidebarOpen } = useSelector((state: RootState) => state.ui);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-r border-gray-200/50 dark:border-gray-700/50 transition-all duration-300",
        sidebarOpen ? "w-64" : "w-16"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200/50 dark:border-gray-700/50">
        {sidebarOpen ? (
          <>
            <div className="flex items-center space-x-3">
              <Code2 className="h-8 w-8 text-primary-400" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                CodeMind AI
              </span>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center w-full">
            <Code2 className="h-8 w-8 text-primary-400" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary-600 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white",
                !sidebarOpen && "justify-center"
              )}
            >
              <item.icon className={cn("h-5 w-5", sidebarOpen && "mr-3")} />
              {sidebarOpen && item.name}
            </Link>
          );
        })}

        {/* Toggle Sidebar Button */}
        <button
          onClick={() => dispatch(toggleSidebar())}
          className={cn(
            "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white",
            !sidebarOpen && "justify-center"
          )}
        >
          {sidebarOpen ? (
            <>
              <ChevronLeft className="h-5 w-5 mr-3" />
              Collapse
            </>
          ) : (
            <ChevronRight className="h-5 w-5" />
          )}
        </button>
      </nav>

      {/* User Profile */}
      {user && (
        <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50">
          <div
            className={cn(
              "flex items-center",
              !sidebarOpen && "justify-center"
            )}
          >
            <img
              src={user.avatar || "/placeholder.svg?height=32&width=32"}
              alt={user.name}
              className="h-8 w-8 rounded-full"
            />
            {sidebarOpen && (
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user.email}
                </p>
              </div>
            )}
          </div>
          {sidebarOpen && user.githubConnected && (
            <div className="mt-2 flex items-center text-xs text-green-400">
              <Github className="h-3 w-3 mr-1" />
              GitHub Connected
            </div>
          )}
        </div>
      )}
    </div>
  );
}
