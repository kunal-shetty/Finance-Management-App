"use client"

import { OnboardingFlow } from "@/components/onboarding/onboarding-flow"
import { useUser } from "@/hooks/use-user"

export function OnboardingScreen() {
  const { createUser } = useUser()

  const handleComplete = (fullName: string) => {
    createUser(fullName)
    window.location.reload()
  }

  return <OnboardingFlow onComplete={handleComplete} />
}
