"use client"

import type React from "react"

import { useState } from "react"
import type { User } from "@/lib/types"
import { useUser } from "@/hooks/use-user"
import { useSettings } from "@/hooks/use-settings"
import { useTransactions } from "@/hooks/use-transactions"
import { useMasters } from "@/hooks/use-masters"
import { STORAGE_KEYS } from "@/lib/storage-keys"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Upload, Trash2, UserIcon } from "lucide-react"
import { motion } from "framer-motion"

interface SettingsSectionProps {
  user: User
}

export function SettingsSection({ user }: SettingsSectionProps) {
  const { updateUser, clearUser } = useUser()
  const { settings, updateSettings, resetSettings } = useSettings()
  const { transactions } = useTransactions()
  const { categories, paymentModes, tags, rules } = useMasters()

  const [fullName, setFullName] = useState(user.fullName)
  const [displayName, setDisplayName] = useState(user.displayName || "")

  const handleUpdateProfile = () => {
    if (fullName.trim()) {
      updateUser({
        fullName: fullName.trim(),
        displayName: displayName.trim() || undefined,
      })
      alert("Profile updated successfully!")
    }
  }

  const handleExportData = () => {
    const data = {
      user,
      transactions,
      categories,
      paymentModes,
      tags,
      rules,
      settings,
      exportedAt: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `finance-tracker-backup-${new Date().toISOString().slice(0, 10)}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string)

        if (data.user) localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user))
        if (data.transactions) localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(data.transactions))
        if (data.categories) localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(data.categories))
        if (data.paymentModes) localStorage.setItem(STORAGE_KEYS.PAYMENT_MODES, JSON.stringify(data.paymentModes))
        if (data.tags) localStorage.setItem(STORAGE_KEYS.TAGS, JSON.stringify(data.tags))
        if (data.rules) localStorage.setItem(STORAGE_KEYS.RULES, JSON.stringify(data.rules))
        if (data.settings) localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(data.settings))

        alert("Data imported successfully! Refreshing...")
        window.location.reload()
      } catch (error) {
        alert("Failed to import data. Please check the file format.")
      }
    }
    reader.readAsText(file)
  }

  const handleResetAllData = () => {
    if (confirm("Are you sure you want to reset all data? This cannot be undone!")) {
      Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key))
      alert("All data has been reset. Refreshing...")
      window.location.reload()
    }
  }

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-semibold text-foreground">Settings</h2>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="p-6 backdrop-blur-sm bg-card/80 border-border/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <UserIcon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Profile</h3>
              <p className="text-sm text-muted-foreground">Update your personal information</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name (Optional)</Label>
              <Input id="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
            </div>

            <Button onClick={handleUpdateProfile} className="w-full">
              Save Changes
            </Button>
          </div>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="p-6 backdrop-blur-sm bg-card/80 border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-4">Preferences</h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select value={settings.currency} onValueChange={(value) => updateSettings({ currency: value })}>
                <SelectTrigger id="currency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="$">$ USD</SelectItem>
                  <SelectItem value="€">€ EUR</SelectItem>
                  <SelectItem value="£">£ GBP</SelectItem>
                  <SelectItem value="₹">₹ INR</SelectItem>
                  <SelectItem value="¥">¥ JPY</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="theme">Theme</Label>
              <Select
                value={settings.theme}
                onValueChange={(value: "light" | "dark") => updateSettings({ theme: value })}
              >
                <SelectTrigger id="theme">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="p-6 backdrop-blur-sm bg-card/80 border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-4">Data Management</h3>

          <div className="space-y-3">
            <Button onClick={handleExportData} variant="outline" className="w-full justify-start bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Export Data (JSON)
            </Button>

            <label className="block">
              <input type="file" accept=".json" onChange={handleImportData} className="hidden" id="import-file" />
              <Button asChild variant="outline" className="w-full justify-start cursor-pointer bg-transparent">
                <span>
                  <Upload className="w-4 h-4 mr-2" />
                  Import Data (JSON)
                </span>
              </Button>
            </label>

            <Button onClick={handleResetAllData} variant="destructive" className="w-full justify-start">
              <Trash2 className="w-4 h-4 mr-2" />
              Reset All Data
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
