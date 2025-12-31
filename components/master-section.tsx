"use client"

import { useState } from "react"
import { useMasters } from "@/hooks/use-masters"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AddCategoryModal } from "./add-category-modal"
import { AddPaymentModeModal } from "./add-payment-mode-modal"
import { AddTagModal } from "./add-tag-modal"

export function MasterSection() {
  const { categories, paymentModes, tags, deleteCategory, deletePaymentMode, deleteTag } = useMasters()

  const [showAddCategory, setShowAddCategory] = useState(false)
  const [showAddPaymentMode, setShowAddPaymentMode] = useState(false)
  const [showAddTag, setShowAddTag] = useState(false)

  const handleDeleteCategory = (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      deleteCategory(id)
    }
  }

  const handleDeletePaymentMode = (id: string) => {
    if (confirm("Are you sure you want to delete this payment mode?")) {
      deletePaymentMode(id)
    }
  }

  const handleDeleteTag = (id: string) => {
    if (confirm("Are you sure you want to delete this tag?")) {
      deleteTag(id)
    }
  }

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold text-foreground">Master Data</h2>

      <Tabs defaultValue="categories" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="payment-modes">Payment Modes</TabsTrigger>
          <TabsTrigger value="tags">Tags</TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-muted-foreground">Manage your transaction categories</p>
            <Button onClick={() => setShowAddCategory(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <Card key={cat.id} className="p-4 backdrop-blur-sm bg-card/80 border-border/50">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full" style={{ backgroundColor: cat.color }} />
                    <div>
                      <p className="font-medium text-foreground">{cat.name}</p>
                      {cat.type && cat.type !== "both" && (
                        <Badge variant="outline" className="text-xs mt-1">
                          {cat.type}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => handleDeleteCategory(cat.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="payment-modes" className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-muted-foreground">Manage your payment methods</p>
            <Button onClick={() => setShowAddPaymentMode(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Mode
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paymentModes.map((mode) => (
              <Card key={mode.id} className="p-4 backdrop-blur-sm bg-card/80 border-border/50">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-foreground">{mode.name}</p>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => handleDeletePaymentMode(mode.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tags" className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-muted-foreground">Manage your transaction tags</p>
            <Button onClick={() => setShowAddTag(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Tag
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.length === 0 ? (
              <Card className="p-8 w-full text-center backdrop-blur-sm bg-card/80 border-border/50">
                <p className="text-muted-foreground">No tags yet. Create one to get started.</p>
              </Card>
            ) : (
              tags.map((tag) => (
                <div key={tag.id} className="flex items-center gap-2 bg-card rounded-lg px-3 py-2 border border-border">
                  <Badge variant="secondary">{tag.name}</Badge>
                  <button
                    onClick={() => handleDeleteTag(tag.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>

      <AddCategoryModal isOpen={showAddCategory} onClose={() => setShowAddCategory(false)} />
      <AddPaymentModeModal isOpen={showAddPaymentMode} onClose={() => setShowAddPaymentMode(false)} />
      <AddTagModal isOpen={showAddTag} onClose={() => setShowAddTag(false)} />
    </div>
  )
}
