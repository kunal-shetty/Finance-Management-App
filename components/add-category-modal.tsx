"use client"

import type React from "react"

import { useState } from "react"
import { useMasters } from "@/hooks/use-masters"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const PRESET_COLORS = [
  "#a8d5ba",
  "#b8c5e0",
  "#f4c2c2",
  "#e5c9e0",
  "#ffd4a3",
  "#c9d1d9",
  "#ffc4d0",
  "#d4e4f7",
  "#b5e7a0",
  "#afd8f8",
]

interface AddCategoryModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddCategoryModal({ isOpen, onClose }: AddCategoryModalProps) {
  const { addCategory } = useMasters()
  const [name, setName] = useState("")
  const [color, setColor] = useState(PRESET_COLORS[0])
  const [type, setType] = useState<"income" | "expense" | "both">("expense")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setError("Please enter a category name")
      return
    }

    addCategory({ name: name.trim(), icon: "Circle", color, type })
    setName("")
    setColor(PRESET_COLORS[0])
    setType("expense")
    setError("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cat-name">Category Name</Label>
            <Input
              id="cat-name"
              placeholder="e.g., Coffee, Books"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                setError("")
              }}
            />
          </div>

          <div className="space-y-2">
            <Label>Type</Label>
            <RadioGroup value={type} onValueChange={(value: any) => setType(value)} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="expense" id="expense" />
                <Label htmlFor="expense" className="font-normal">
                  Expense
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="income" id="income" />
                <Label htmlFor="income" className="font-normal">
                  Income
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="both" id="both" />
                <Label htmlFor="both" className="font-normal">
                  Both
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Color</Label>
            <div className="flex flex-wrap gap-2">
              {PRESET_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`w-8 h-8 rounded-full transition-transform ${
                    color === c ? "scale-110 ring-2 ring-primary ring-offset-2" : ""
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="flex gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Add Category
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
