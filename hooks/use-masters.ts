"use client"

import { useLocalStorage } from "./use-local-storage"
import type { Category, PaymentMode, Tag, Rule } from "@/lib/types"
import { STORAGE_KEYS } from "@/lib/storage-keys"
import { DEFAULT_CATEGORIES, DEFAULT_PAYMENT_MODES } from "@/lib/default-data"
import { useCallback } from "react"

export function useMasters() {
  const [categories, setCategories] = useLocalStorage<Category[]>(STORAGE_KEYS.CATEGORIES, DEFAULT_CATEGORIES)
  const [paymentModes, setPaymentModes] = useLocalStorage<PaymentMode[]>(
    STORAGE_KEYS.PAYMENT_MODES,
    DEFAULT_PAYMENT_MODES,
  )
  const [tags, setTags] = useLocalStorage<Tag[]>(STORAGE_KEYS.TAGS, [])
  const [rules, setRules] = useLocalStorage<Rule[]>(STORAGE_KEYS.RULES, [])

  // Category management
  const addCategory = useCallback(
    (category: Omit<Category, "id">) => {
      const newCategory = { ...category, id: `cat-${Date.now()}` }
      setCategories((prev) => [...prev, newCategory])
      return newCategory
    },
    [setCategories],
  )

  const updateCategory = useCallback(
    (id: string, updates: Partial<Category>) => {
      setCategories((prev) => prev.map((cat) => (cat.id === id ? { ...cat, ...updates } : cat)))
    },
    [setCategories],
  )

  const deleteCategory = useCallback(
    (id: string) => {
      setCategories((prev) => prev.filter((cat) => cat.id !== id))
    },
    [setCategories],
  )

  // Payment Mode management
  const addPaymentMode = useCallback(
    (mode: Omit<PaymentMode, "id">) => {
      const newMode = { ...mode, id: `pm-${Date.now()}` }
      setPaymentModes((prev) => [...prev, newMode])
      return newMode
    },
    [setPaymentModes],
  )

  const updatePaymentMode = useCallback(
    (id: string, updates: Partial<PaymentMode>) => {
      setPaymentModes((prev) => prev.map((mode) => (mode.id === id ? { ...mode, ...updates } : mode)))
    },
    [setPaymentModes],
  )

  const deletePaymentMode = useCallback(
    (id: string) => {
      setPaymentModes((prev) => prev.filter((mode) => mode.id !== id))
    },
    [setPaymentModes],
  )

  // Tag management
  const addTag = useCallback(
    (name: string) => {
      const newTag = { id: `tag-${Date.now()}`, name }
      setTags((prev) => [...prev, newTag])
      return newTag
    },
    [setTags],
  )

  const deleteTag = useCallback(
    (id: string) => {
      setTags((prev) => prev.filter((tag) => tag.id !== id))
    },
    [setTags],
  )

  // Rule management
  const addRule = useCallback(
    (rule: Omit<Rule, "id">) => {
      const newRule = { ...rule, id: `rule-${Date.now()}` }
      setRules((prev) => [...prev, newRule])
      return newRule
    },
    [setRules],
  )

  const updateRule = useCallback(
    (id: string, updates: Partial<Rule>) => {
      setRules((prev) => prev.map((rule) => (rule.id === id ? { ...rule, ...updates } : rule)))
    },
    [setRules],
  )

  const deleteRule = useCallback(
    (id: string) => {
      setRules((prev) => prev.filter((rule) => rule.id !== id))
    },
    [setRules],
  )

  return {
    categories,
    paymentModes,
    tags,
    rules,
    addCategory,
    updateCategory,
    deleteCategory,
    addPaymentMode,
    updatePaymentMode,
    deletePaymentMode,
    addTag,
    deleteTag,
    addRule,
    updateRule,
    deleteRule,
  }
}
