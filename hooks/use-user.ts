"use client"

import { useLocalStorage } from "./use-local-storage"
import type { User } from "@/lib/types"
import { STORAGE_KEYS } from "@/lib/storage-keys"
import { useCallback } from "react"

export function useUser() {
  const [user, setUser, isClient] = useLocalStorage<User | null>(STORAGE_KEYS.USER, null)

  const createUser = useCallback(
    (fullName: string, displayName?: string) => {
      const newUser: User = {
        id: `user-${Date.now()}`,
        fullName,
        createdAt: new Date().toISOString(),
      }
      setUser(newUser)
      return newUser
    },
    [setUser],
  )

  const updateUser = useCallback(
    (updates: Partial<User>) => {
      if (user) {
        setUser({ ...user, ...updates })
      }
    },
    [user, setUser],
  )

  const clearUser = useCallback(() => {
    setUser(null)
  }, [setUser])

  return {
    user,
    createUser,
    updateUser,
    clearUser,
    isFirstTime: isClient ? !user : true,
    isClient,
  }
}
