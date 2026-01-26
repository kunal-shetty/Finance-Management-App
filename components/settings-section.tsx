"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { User } from "@/lib/types"
import { useUser } from "@/hooks/use-user"
import { useSettings } from "@/hooks/use-settings"
import { STORAGE_KEYS } from "@/lib/storage-keys"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DeleteConfirmationDialog } from "./delete-confirmation-dialog"
import { Trash2, UserIcon } from "lucide-react"
import { motion } from "framer-motion"

interface SettingsSectionProps {
  user: User
}

export function SettingsSection({ user }: SettingsSectionProps) {
  const { updateUser, clearUser } = useUser()
  const { settings, updateSettings, resetSettings } = useSettings()

  const [fullName, setFullName] = useState(user.fullName)
  const [displayName, setDisplayName] = useState(user.displayName || "")
  const [showUpdateConfirm, setShowUpdateConfirm] = useState(false)
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  const handleUpdateProfile = () => {
    setShowUpdateConfirm(true)
  }

  const confirmUpdateProfile = () => {
    if (fullName.trim()) {
      updateUser({
        fullName: fullName.trim(),
        displayName: displayName.trim() || undefined,
      })
    }
  }

  const handleResetAllData = () => {
    setShowResetConfirm(true)
  }

  const confirmResetAllData = () => {
    Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key))
    window.location.reload()
  }

  // Apply theme changes immediately
  useEffect(() => {
    if (settings.theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [settings.theme])

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

            <Button onClick={handleUpdateProfile} className="w-full h-12">
              Save Changes
            </Button>
          </div>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="p-4 sm:p-6 backdrop-blur-sm bg-card/80 border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-4">Preferences</h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select value={settings.currency} onValueChange={(value) => updateSettings({ currency: value })}>
                <SelectTrigger id="currency" className="h-12">
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

          </div>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="p-4 sm:p-6 backdrop-blur-sm bg-card/80 border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-4">Danger Zone</h3>

          <div className="space-y-3">
            <Button onClick={handleResetAllData} variant="destructive" className="w-full h-12 justify-start">
              <Trash2 className="w-4 h-4 mr-2" />
              Reset All Data
            </Button>
          </div>
        </Card>
      </motion.div>

      <DeleteConfirmationDialog
        isOpen={showUpdateConfirm}
        onClose={() => setShowUpdateConfirm(false)}
        onConfirm={confirmUpdateProfile}
        title="Update Profile"
        description="Are you sure you want to update your profile information?"
        confirmText="Confirm"
        confirmVariant="default"
      />

      <DeleteConfirmationDialog
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        onConfirm={confirmResetAllData}
        title="Reset All Data"
        description="Are you sure you want to reset all data? This action cannot be undone and will delete all your transactions, categories, payment modes, tags, and settings."
      />
    </div>
  )
}
