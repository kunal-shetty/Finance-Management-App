"use client"

import { useState } from "react"
import type { User } from "@/lib/types"
import { BottomNav } from "@/components/bottom-nav"
import { SideNav } from "@/components/side-nav"
import { Dashboard } from "@/components/dashboard"
import { TransactionsList } from "@/components/transactions-list"
import { Analytics } from "@/components/analytics"
import { MasterSection } from "@/components/master-section"
import { SettingsSection } from "@/components/settings-section"
import { AddTransactionModal } from "@/components/add-transaction-modal"
import { Plus } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export type NavSection = "dashboard" | "transactions" | "analytics" | "master" | "settings"

interface AppShellProps {
  user: User
}

export function AppShell({ user }: AppShellProps) {
  const [activeSection, setActiveSection] = useState<NavSection>("dashboard")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <SideNav activeSection={activeSection} onSectionChange={setActiveSection} user={user} />
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen pb-20 lg:pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeSection === "dashboard" && <Dashboard user={user} />}
            {activeSection === "transactions" && <TransactionsList />}
            {activeSection === "analytics" && <Analytics />}
            {activeSection === "master" && <MasterSection />}
            {activeSection === "settings" && <SettingsSection user={user} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden">
        <BottomNav activeSection={activeSection} onSectionChange={setActiveSection} />
      </div>

      {/* Floating Add Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsAddModalOpen(true)}
        className="fixed bottom-24 right-6 lg:bottom-8 lg:right-8 w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-full shadow-lg flex items-center justify-center z-40 hover:shadow-xl transition-shadow"
      >
        <Plus className="w-6 h-6 text-primary-foreground" />
      </motion.button>

      <AddTransactionModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  )
}
