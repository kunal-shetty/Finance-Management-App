"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useTransactions } from "@/hooks/use-transactions"
import { useMasters } from "@/hooks/use-masters"
import type { Transaction } from "@/lib/types"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface EditTransactionModalProps {
  transaction: Transaction
  isOpen: boolean
  onClose: () => void
}

export function EditTransactionModal({ transaction, isOpen, onClose }: EditTransactionModalProps) {
  const { updateTransaction } = useTransactions()
  const { categories, paymentModes, tags } = useMasters()

  const [type, setType] = useState(transaction.type)
  const [amount, setAmount] = useState(transaction.amount.toString())
  const [categoryId, setCategoryId] = useState(transaction.categoryId)
  const [paymentModeId, setPaymentModeId] = useState(transaction.paymentModeId)
  const [date, setDate] = useState(transaction.date)
  const [notes, setNotes] = useState(transaction.notes || "")
  const [selectedTags, setSelectedTags] = useState(transaction.tags)
  const [error, setError] = useState("")

  useEffect(() => {
    setType(transaction.type)
    setAmount(transaction.amount.toString())
    setCategoryId(transaction.categoryId)
    setPaymentModeId(transaction.paymentModeId)
    setDate(transaction.date)
    setNotes(transaction.notes || "")
    setSelectedTags(transaction.tags)
  }, [transaction])

  const filteredCategories = categories.filter((cat) => cat.type === type || cat.type === "both")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!amount || Number.parseFloat(amount) <= 0) {
      setError("Please enter a valid amount")
      return
    }
    if (!categoryId) {
      setError("Please select a category")
      return
    }
    if (!paymentModeId) {
      setError("Please select a payment mode")
      return
    }

    updateTransaction(transaction.id, {
      amount: Number.parseFloat(amount),
      type,
      categoryId,
      paymentModeId,
      date,
      notes: notes.trim() || undefined,
      tags: selectedTags,
    })

    onClose()
  }

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) => (prev.includes(tagId) ? prev.filter((t) => t !== tagId) : [...prev, tagId]))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setType("expense")
                setCategoryId("")
              }}
              className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                type === "expense"
                  ? "bg-destructive/10 text-destructive border-2 border-destructive"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              Expense
            </button>
            <button
              type="button"
              onClick={() => {
                setType("income")
                setCategoryId("")
              }}
              className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                type === "income"
                  ? "bg-secondary/10 text-secondary border-2 border-secondary"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              Income
            </button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-amount">Amount</Label>
            <Input
              id="edit-amount"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-category">Category</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger id="edit-category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {filteredCategories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                      {cat.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-paymentMode">Payment Mode</Label>
            <Select value={paymentModeId} onValueChange={setPaymentModeId}>
              <SelectTrigger id="edit-paymentMode">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {paymentModes.map((mode) => (
                  <SelectItem key={mode.id} value={mode.id}>
                    {mode.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-date">Date</Label>
            <Input id="edit-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-notes">Notes</Label>
            <Textarea id="edit-notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
          </div>

          {tags.length > 0 && (
            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag.id}
                    variant={selectedTags.includes(tag.id) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleTag(tag.id)}
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="flex gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
