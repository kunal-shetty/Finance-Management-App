"use client"

import { useLocalStorage } from "./use-local-storage"
import type { Transaction } from "@/lib/types"
import { STORAGE_KEYS } from "@/lib/storage-keys"
import { useCallback } from "react"

export function useTransactions() {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>(STORAGE_KEYS.TRANSACTIONS, [])

  const addTransaction = useCallback(
    (transaction: Omit<Transaction, "id" | "createdAt" | "updatedAt">) => {
      const newTransaction: Transaction = {
        ...transaction,
        id: `txn-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      setTransactions((prev) => [newTransaction, ...prev])
      return newTransaction
    },
    [setTransactions],
  )

  const updateTransaction = useCallback(
    (id: string, updates: Partial<Transaction>) => {
      setTransactions((prev) =>
        prev.map((txn) => (txn.id === id ? { ...txn, ...updates, updatedAt: new Date().toISOString() } : txn)),
      )
    },
    [setTransactions],
  )

  const deleteTransaction = useCallback(
    (id: string) => {
      setTransactions((prev) => prev.filter((txn) => txn.id !== id))
    },
    [setTransactions],
  )

  return {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  }
}
