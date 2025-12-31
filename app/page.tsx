"use client"

import { useUser } from "@/hooks/use-user"
import { useSettings } from "@/hooks/use-settings"
import { OnboardingScreen } from "@/components/onboarding-screen"
import { AppShell } from "@/components/app-shell"
import { useEffect } from "react"

export default function Home() {
  const { user, isFirstTime, isClient } = useUser()
  const { settings } = useSettings()

  useEffect(() => {
    if (settings.theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [settings.theme])

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (isFirstTime) {
    return <OnboardingScreen />
  }

  return <AppShell user={user!} />
}
