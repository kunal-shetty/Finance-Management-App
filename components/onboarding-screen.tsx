"use client"

import type React from "react"

import { useState } from "react"
import { useUser } from "@/hooks/use-user"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export function OnboardingScreen() {
  const [fullName, setFullName] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [error, setError] = useState("")
  const { createUser } = useUser()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName.trim()) {
      setError("Please enter your full name")
      return
    }
    createUser(fullName.trim(), displayName.trim() || undefined)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-muted/30 to-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 backdrop-blur-sm bg-card/80 border-border/50 shadow-lg">
          <div className="flex flex-col items-center gap-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center"
            >
              <Sparkles className="w-8 h-8 text-primary-foreground" />
            </motion.div>

            <div className="text-center space-y-2">
              <h1 className="text-3xl font-semibold text-foreground">Welcome</h1>
              <p className="text-muted-foreground text-balance">{"Let's get started with your financial journey"}</p>
            </div>

            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-foreground">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value)
                    setError("")
                  }}
                  className="bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="displayName" className="text-muted-foreground text-sm">
                  Display Name (Optional)
                </Label>
                <Input
                  id="displayName"
                  type="text"
                  placeholder="How should we call you?"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="bg-background/50"
                />
              </div>

              {error && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-destructive">
                  {error}
                </motion.p>
              )}

              <Button type="submit" className="w-full" size="lg">
                Get Started
              </Button>
            </form>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
