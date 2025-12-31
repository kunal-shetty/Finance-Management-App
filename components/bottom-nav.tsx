"use client"

import { Home, List, BarChart3, Settings, FolderKanban } from "lucide-react"
import type { NavSection } from "./app-shell"
import { motion } from "framer-motion"

interface BottomNavProps {
  activeSection: NavSection
  onSectionChange: (section: NavSection) => void
}

export function BottomNav({ activeSection, onSectionChange }: BottomNavProps) {
  const navItems = [
    { id: "dashboard" as NavSection, icon: Home, label: "Home" },
    { id: "transactions" as NavSection, icon: List, label: "Transactions" },
    { id: "analytics" as NavSection, icon: BarChart3, label: "Analytics" },
    { id: "master" as NavSection, icon: FolderKanban, label: "Master" },
    { id: "settings" as NavSection, icon: Settings, label: "Settings" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-lg border-t border-border z-50">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id

          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className="flex flex-col items-center justify-center gap-1 flex-1 h-full relative"
            >
              <div className={`transition-colors ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span
                className={`text-xs transition-colors ${isActive ? "text-primary font-medium" : "text-muted-foreground"}`}
              >
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
