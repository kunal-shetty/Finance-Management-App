"use client"

import type React from "react"

import { useState } from "react"
import { useMasters } from "@/hooks/use-masters"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AddPaymentModeModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddPaymentModeModal({ isOpen, onClose }: AddPaymentModeModalProps) {
  const { addPaymentMode } = useMasters()
  const [name, setName] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setError("Please enter a payment mode name")
      return
    }

    addPaymentMode({ name: name.trim(), icon: "Circle" })
    setName("")
    setError("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Payment Mode</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pm-name">Payment Mode Name</Label>
            <Input
              id="pm-name"
              placeholder="e.g., PayPal, Venmo"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                setError("")
              }}
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="flex gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Add Mode
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
