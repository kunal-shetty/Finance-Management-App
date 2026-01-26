"use client"

import { useMemo } from "react"
import { useTransactions } from "@/hooks/use-transactions"
import { useMasters } from "@/hooks/use-masters"
import { useSettings } from "@/hooks/use-settings"
import { Card } from "@/components/ui/card"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { TrendingUp, TrendingDown } from "lucide-react"

export function Analytics() {
  const { transactions } = useTransactions()
  const { categories } = useMasters()
  const { settings } = useSettings()

  const last6Months = useMemo(() => {
    const months = []
    for (let i = 5; i >= 0; i--) {
      const date = new Date()
      date.setMonth(date.getMonth() - i)
      months.push(date.toISOString().slice(0, 7))
    }
    return months
  }, [])

  const monthlyData = useMemo(() => {
    return last6Months.map((month) => {
      const monthTransactions = transactions.filter((txn) => txn.date.startsWith(month))
      const income = monthTransactions.filter((txn) => txn.type === "income").reduce((sum, txn) => sum + txn.amount, 0)
      const expenses = monthTransactions
        .filter((txn) => txn.type === "expense")
        .reduce((sum, txn) => sum + txn.amount, 0)

      return {
        month: new Date(month).toLocaleDateString("en-US", { month: "short" }),
        income,
        expenses,
        savings: income - expenses,
      }
    })
  }, [transactions, last6Months])

  const categoryBreakdown = useMemo(() => {
    const currentMonth = new Date().toISOString().slice(0, 7)
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
          amount: total,
          color: category?.color || "#e5e5e5",
        }
      })
      .sort((a, b) => b.amount - a.amount)
  }, [transactions, categories])

  const insights = useMemo(() => {
    const currentMonth = monthlyData[monthlyData.length - 1]
    const previousMonth = monthlyData[monthlyData.length - 2]

    const expenseChange =
      previousMonth.expenses > 0 ? ((currentMonth.expenses - previousMonth.expenses) / previousMonth.expenses) * 100 : 0

    const savingsRate = currentMonth.income > 0 ? (currentMonth.savings / currentMonth.income) * 100 : 0

    return {
      expenseChange,
      savingsRate,
      topCategory: categoryBreakdown[0]?.name || "N/A",
    }
  }, [monthlyData, categoryBreakdown])

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold text-foreground">Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <Card className="p-4 sm:p-6 backdrop-blur-sm bg-card/80 border-border/50">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Expense Trend</p>
              <p className="text-2xl font-semibold text-foreground">{Math.abs(insights.expenseChange).toFixed(1)}%</p>
              <p className="text-xs text-muted-foreground">vs Last Month</p>
            </div>
            {insights.expenseChange > 0 ? (
              <TrendingUp className="w-8 h-8 text-destructive" />
            ) : (
              <TrendingDown className="w-8 h-8 text-secondary" />
            )}
          </div>
        </Card>

        <Card className="p-4 sm:p-6 backdrop-blur-sm bg-card/80 border-border/50">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Savings Rate</p>
            <p className="text-2xl font-semibold text-foreground">{insights.savingsRate.toFixed(1)}%</p>
            <p className="text-xs text-muted-foreground">of Your Income</p>
          </div>
        </Card>

        <Card className="p-4 sm:p-6 backdrop-blur-sm bg-card/80 border-border/50">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Top Spending Category</p>
            <p className="text-2xl font-semibold text-foreground">{insights.topCategory}</p>
            <p className="text-xs text-muted-foreground">This Month</p>
          </div>
        </Card>
      </div>

      <Card className="p-4 sm:p-6 backdrop-blur-sm bg-card/80 border-border/50">
        <h3 className="text-base sm:text-lg font-semibold text-foreground mb-4">Income vs Expenses (Last 6 Months)</h3>
        <ResponsiveContainer width="100%" height={200} className="sm:h-[300px]">
          <BarChart data={monthlyData}>
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={10} className="sm:text-xs" />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} className="sm:text-xs" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem",
                color: "hsl(var(--foreground))",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "12px", color: "hsl(var(--foreground))" }} />
            <Bar dataKey="income" fill="hsl(var(--secondary))" name="Income" radius={[8, 8, 0, 0]} />
            <Bar dataKey="expenses" fill="hsl(var(--destructive))" name="Expenses" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-4 sm:p-6 backdrop-blur-sm bg-card/80 border-border/50">
        <h3 className="text-base sm:text-lg font-semibold text-foreground mb-4">Savings Trend</h3>
        <ResponsiveContainer width="100%" height={180} className="sm:h-[250px]">
          <LineChart data={monthlyData}>
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={10} className="sm:text-xs" />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} className="sm:text-xs" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem",
                color: "hsl(var(--foreground))",
              }}
            />
            <Line type="monotone" dataKey="savings" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {categoryBreakdown.length > 0 && (
        <Card className="p-4 sm:p-6 backdrop-blur-sm bg-card/80 border-border/50">
          <h3 className="text-base sm:text-lg font-semibold text-foreground mb-4">Category Breakdown (This Month)</h3>
          <div className="space-y-3">
            {categoryBreakdown.map((cat) => {
              const total = categoryBreakdown.reduce((sum, c) => sum + c.amount, 0)
              const percentage = (cat.amount / total) * 100

              return (
                <div key={cat.name} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                      <span className="text-foreground font-medium">{cat.name}</span>
                    </div>
                    <span className="text-muted-foreground">
                      {settings.currency}
                      {cat.amount.toFixed(2)} ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${percentage}%`, backgroundColor: cat.color }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      )}
    </div>
  )
}
