"use client"

import { Home, List, BarChart3, Settings, FolderKanban } from "lucide-react"
import type { NavSection } from "./app-shell"
import type { User } from "@/lib/types"
import { motion } from "framer-motion"

interface SideNavProps {
  activeSection: NavSection
  onSectionChange: (section: NavSection) => void
  user: User
}

export function SideNav({ activeSection, onSectionChange, user }: SideNavProps) {
  const navItems = [
    { id: "dashboard" as NavSection, icon: Home, label: "Dashboard" },
    { id: "transactions" as NavSection, icon: List, label: "Transactions" },
    { id: "analytics" as NavSection, icon: BarChart3, label: "Analytics" },
    { id: "master" as NavSection, icon: FolderKanban, label: "Master" },
    { id: "settings" as NavSection, icon: Settings, label: "Settings" },
  ]

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-card/80 backdrop-blur-lg border-r border-border p-6 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Finance</h1>
        <p className="text-sm text-muted-foreground mt-1">Hello, {user.displayName || user.fullName}</p>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id

          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors relative ${
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeSideIndicator"
                  className="absolute inset-0 bg-primary/10 rounded-lg"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Icon className="w-5 h-5 relative z-10" />
              <span className="font-medium relative z-10">{item.label}</span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
