"use client"

import type React from "react"

import type { User } from "@/lib/types"
import { useTransactions } from "@/hooks/use-transactions"
import { useMasters } from "@/hooks/use-masters"
import { useSettings } from "@/hooks/use-settings"
import { Card } from "@/components/ui/card"
import { ArrowUp, ArrowDown, Wallet, TrendingUp } from "lucide-react"
import { useMemo } from "react"
import { LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { motion } from "framer-motion"

interface DashboardProps {
  user: User
}

export function Dashboard({ user }: DashboardProps) {
  const { transactions } = useTransactions()
  const { categories } = useMasters()
  const { settings } = useSettings()

  const currentMonth = new Date().toISOString().slice(0, 7)

  const stats = useMemo(() => {
    const currentMonthTransactions = transactions.filter((txn) => txn.date.startsWith(currentMonth))

    const income = currentMonthTransactions
      .filter((txn) => txn.type === "income")
      .reduce((sum, txn) => sum + txn.amount, 0)

    const expenses = currentMonthTransactions
      .filter((txn) => txn.type === "expense")
      .reduce((sum, txn) => sum + txn.amount, 0)

    return {
      income,
      expenses,
      balance: income - expenses,
      savings: income > 0 ? ((income - expenses) / income) * 100 : 0,
    }
  }, [transactions, currentMonth])

  const cashFlowData = useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (6 - i))
      return date.toISOString().slice(0, 10)
    })

    return last7Days.map((date) => {
      const dayTransactions = transactions.filter((txn) => txn.date === date)
      const income = dayTransactions.filter((txn) => txn.type === "income").reduce((sum, txn) => sum + txn.amount, 0)
      const expense = dayTransactions.filter((txn) => txn.type === "expense").reduce((sum, txn) => sum + txn.amount, 0)

      return {
        date: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
        balance: income - expense,
      }
    })
  }, [transactions])

  const categoryData = useMemo(() => {
    const currentMonthExpenses = transactions.filter(
      (txn) => txn.type === "expense" && txn.date.startsWith(currentMonth),
    )

    const categoryTotals = currentMonthExpenses.reduce(
      (acc, txn) => {
        acc[txn.categoryId] = (acc[txn.categoryId] || 0) + txn.amount
        return acc
      },
      {} as Record<string, number>,
    )

    return Object.entries(categoryTotals)
      .map(([catId, total]) => {
        const category = categories.find((c) => c.id === catId)
        return {
          name: category?.name || "Unknown",
          value: total,
          color: category?.color || "#e5e5e5",
        }
      })
      .sort((a, b) => b.value - a.value)
      .slice(0, 5)
  }, [transactions, categories, currentMonth])

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
        <h2 className="text-3xl font-semibold text-foreground">Welcome back, {user.displayName || user.fullName}</h2>
        <p className="text-muted-foreground">{"Here's your financial overview for this month"}</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          icon={ArrowDown}
          label="Total Income"
          value={`${settings.currency}${stats.income.toFixed(2)}`}
          color="text-secondary"
          bgColor="bg-secondary/10"
        />
        <StatsCard
          icon={ArrowUp}
          label="Total Expenses"
          value={`${settings.currency}${stats.expenses.toFixed(2)}`}
          color="text-destructive"
          bgColor="bg-destructive/10"
        />
        <StatsCard
          icon={Wallet}
          label="Balance"
          value={`${settings.currency}${stats.balance.toFixed(2)}`}
          color="text-primary"
          bgColor="bg-primary/10"
        />
        <StatsCard
          icon={TrendingUp}
          label="Savings Rate"
          value={`${stats.savings.toFixed(1)}%`}
          color="text-accent"
          bgColor="bg-accent/10"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 backdrop-blur-sm bg-card/80 border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-4">Cash Flow (Last 7 Days)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={cashFlowData}>
              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                }}
              />
              <Line type="monotone" dataKey="balance" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 backdrop-blur-sm bg-card/80 border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-4">Top Spending Categories</h3>
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[200px] flex items-center justify-center text-muted-foreground">No expense data yet</div>
          )}
        </Card>
      </div>
    </div>
  )
}

interface StatsCardProps {
  icon: React.ElementType
  label: string
  value: string
  color: string
  bgColor: string
}

function StatsCard({ icon: Icon, label, value, color, bgColor }: StatsCardProps) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} whileHover={{ y: -2 }}>
      <Card className="p-4 backdrop-blur-sm bg-card/80 border-border/50 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-2xl font-semibold text-foreground">{value}</p>
          </div>
          <div className={`w-10 h-10 rounded-full ${bgColor} flex items-center justify-center`}>
            <Icon className={`w-5 h-5 ${color}`} />
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
