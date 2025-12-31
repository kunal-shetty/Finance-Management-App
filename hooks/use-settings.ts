"use client"

import { useLocalStorage } from "./use-local-storage"
import type { Settings } from "@/lib/types"
import { STORAGE_KEYS } from "@/lib/storage-keys"
import { DEFAULT_SETTINGS } from "@/lib/default-data"
import { useCallback } from "react"

export function useSettings() {
  const [settings, setSettings] = useLocalStorage<Settings>(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS)

  const updateSettings = useCallback(
    (updates: Partial<Settings>) => {
      setSettings((prev) => ({ ...prev, ...updates }))
    },
    [setSettings],
  )

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS)
  }, [setSettings])

  return {
    settings,
    updateSettings,
    resetSettings,
  }
}
