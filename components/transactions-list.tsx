"use client"

import { useState, useMemo } from "react"
import { useTransactions } from "@/hooks/use-transactions"
import { useMasters } from "@/hooks/use-masters"
import { useSettings } from "@/hooks/use-settings"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowDown, ArrowUp, Search, Edit2, Trash2 } from "lucide-react"
import { motion } from "framer-motion"
import { EditTransactionModal } from "./edit-transaction-modal"
import { DeleteConfirmationDialog } from "./delete-confirmation-dialog"
import type { Transaction } from "@/lib/types"

export function TransactionsList() {
  const { transactions, deleteTransaction } = useTransactions()
  const { categories, paymentModes, tags } = useMasters()
  const { settings } = useSettings()

  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState<"all" | "income" | "expense">("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [paymentModeFilter, setPaymentModeFilter] = useState<string>("all")
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [transactionToDelete, setTransactionToDelete] = useState<string | null>(null)

  const filteredTransactions = useMemo(() => {
    return transactions.filter((txn) => {
      if (typeFilter !== "all" && txn.type !== typeFilter) return false
      if (categoryFilter !== "all" && txn.categoryId !== categoryFilter) return false
      if (paymentModeFilter !== "all" && txn.paymentModeId !== paymentModeFilter) return false
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const category = categories.find((c) => c.id === txn.categoryId)
        if (!category?.name.toLowerCase().includes(query) && !txn.notes?.toLowerCase().includes(query)) {
          return false
        }
      }
      return true
    })
  }, [transactions, typeFilter, categoryFilter, paymentModeFilter, searchQuery, categories])

  const groupedTransactions = useMemo(() => {
    const groups: Record<string, Transaction[]> = {}
    filteredTransactions.forEach((txn) => {
      const dateKey = new Date(txn.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      if (!groups[dateKey]) groups[dateKey] = []
      groups[dateKey].push(txn)
    })
    return groups
  }, [filteredTransactions])

  const handleDelete = (id: string) => {
    setTransactionToDelete(id)
    setDeleteConfirmOpen(true)
  }

  const confirmDelete = () => {
    if (transactionToDelete) {
      deleteTransaction(transactionToDelete)
      setTransactionToDelete(null)
    }
  }

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="space-y-4">
        <h2 className="text-3xl font-semibold text-foreground">Transactions</h2>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={typeFilter} onValueChange={(value: any) => setTypeFilter(value)}>
            <SelectTrigger className="w-full sm:w-[140px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-[160px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-6">
        {Object.keys(groupedTransactions).length === 0 ? (
          <Card className="p-12 text-center backdrop-blur-sm bg-card/80 border-border/50">
            <p className="text-muted-foreground">No transactions found</p>
            <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters or add a new transaction</p>
          </Card>
        ) : (
          Object.entries(groupedTransactions).map(([date, txns]) => (
            <div key={date} className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">{date}</h3>
              <div className="space-y-2">
                {txns.map((txn) => {
                  const category = categories.find((c) => c.id === txn.categoryId)
                  const paymentMode = paymentModes.find((p) => p.id === txn.paymentModeId)
                  const transactionTags = tags.filter((t) => txn.tags.includes(t.id))

                  return (
                    <motion.div
                      key={txn.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <Card className="p-4 backdrop-blur-sm bg-card/80 border-border/50 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3 flex-1">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center ${txn.type === "income" ? "bg-secondary/10" : "bg-destructive/10"
                                }`}
                            >
                              {txn.type === "income" ? (
                                <ArrowDown className="w-5 h-5 text-secondary" />
                              ) : (
                                <ArrowUp className="w-5 h-5 text-destructive" />
                              )}
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: category?.color }} />
                                <p className="font-medium text-foreground">{category?.name || "Unknown"}</p>
                              </div>
                              {txn.notes && <p className="text-sm text-muted-foreground">{txn.notes}</p>}
                              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                                <span>{paymentMode?.name}</span>
                                {transactionTags.map((tag) => (
                                  <Badge key={tag.id} variant="outline" className="text-xs">
                                    {tag.name}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="text-right">
                              <p
                                className={`font-semibold ${txn.type === "income" ? "text-secondary" : "text-destructive"}`}
                              >
                                {txn.type === "income" ? "+" : "-"}
                                {settings.currency}
                                {txn.amount.toFixed(2)}
                              </p>
                            </div>
                            <div className="flex gap-1">
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8"
                                onClick={() => setEditingTransaction(txn)}
                              >
                                <Edit2 className="w-4 h-4" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 text-destructive hover:text-destructive"
                                onClick={() => handleDelete(txn.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {editingTransaction && (
        <EditTransactionModal
          transaction={editingTransaction}
          isOpen={!!editingTransaction}
          onClose={() => setEditingTransaction(null)}
        />
      )}

      <DeleteConfirmationDialog
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Transaction"
        description="Are you sure you want to delete this transaction? This action cannot be undone."
      />
    </div>
  )
}
