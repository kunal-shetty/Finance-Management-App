// Core data types
export interface User {
  id: string
  fullName: string
  displayName?: string
  createdAt: string
}

export interface Transaction {
  id: string
  amount: number
  type: "income" | "expense"
  categoryId: string
  paymentModeId: string
  date: string
  notes?: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  name: string
  icon: string
  color: string
  type?: "income" | "expense" | "both"
}

export interface PaymentMode {
  id: string
  name: string
  icon: string
}

export interface Tag {
  id: string
  name: string
}

export interface Rule {
  id: string
  name: string
  condition: string
  action: string
  enabled: boolean
}

export interface Settings {
  currency: string
  theme: "light" | "dark"
  locale: string
}

export interface MonthlyData {
  month: string
  income: number
  expenses: number
  balance: number
  savings: number
}
