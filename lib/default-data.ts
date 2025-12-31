import type { Category, PaymentMode, Settings } from "./types"

export const DEFAULT_CATEGORIES: Category[] = [
  { id: "cat-1", name: "Groceries", icon: "ShoppingBasket", color: "#a8d5ba", type: "expense" },
  { id: "cat-2", name: "Transport", icon: "Car", color: "#b8c5e0", type: "expense" },
  { id: "cat-3", name: "Food & Dining", icon: "UtensilsCrossed", color: "#f4c2c2", type: "expense" },
  { id: "cat-4", name: "Entertainment", icon: "Film", color: "#e5c9e0", type: "expense" },
  { id: "cat-5", name: "Shopping", icon: "ShoppingBag", color: "#ffd4a3", type: "expense" },
  { id: "cat-6", name: "Bills & Utilities", icon: "Receipt", color: "#c9d1d9", type: "expense" },
  { id: "cat-7", name: "Healthcare", icon: "Heart", color: "#ffc4d0", type: "expense" },
  { id: "cat-8", name: "Education", icon: "BookOpen", color: "#d4e4f7", type: "expense" },
  { id: "cat-9", name: "Salary", icon: "Wallet", color: "#b5e7a0", type: "income" },
  { id: "cat-10", name: "Freelance", icon: "Briefcase", color: "#afd8f8", type: "income" },
  { id: "cat-11", name: "Investment", icon: "TrendingUp", color: "#d4a5d4", type: "income" },
  { id: "cat-12", name: "Other Income", icon: "Plus", color: "#e5e5e5", type: "income" },
]

export const DEFAULT_PAYMENT_MODES: PaymentMode[] = [
  { id: "pm-1", name: "Cash", icon: "Banknote" },
  { id: "pm-2", name: "UPI", icon: "Smartphone" },
  { id: "pm-3", name: "Credit Card", icon: "CreditCard" },
  { id: "pm-4", name: "Debit Card", icon: "CreditCard" },
  { id: "pm-5", name: "Bank Transfer", icon: "Building" },
  { id: "pm-6", name: "Wallet", icon: "Wallet" },
]

export const DEFAULT_SETTINGS: Settings = {
  currency: "$",
  theme: "light",
  locale: "en-US",
}
