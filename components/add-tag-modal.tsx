"use client"

import type React from "react"

import { useState } from "react"
import { useMasters } from "@/hooks/use-masters"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AddTagModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddTagModal({ isOpen, onClose }: AddTagModalProps) {
  const { addTag } = useMasters()
  const [name, setName] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setError("Please enter a tag name")
      return
    }

    addTag(name.trim())
    setName("")
    setError("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Tag</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tag-name">Tag Name</Label>
            <Input
              id="tag-name"
              placeholder="e.g., Work, Personal"
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
              Add Tag
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
