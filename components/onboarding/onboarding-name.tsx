"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface OnboardingNameProps {
    onNameChange: (name: string) => void
    initialName?: string
}

export function OnboardingName({ onNameChange, initialName = "" }: OnboardingNameProps) {
    const [name, setName] = useState(initialName)

    const handleChange = (value: string) => {
        setName(value)
        onNameChange(value)
    }

    return (
        <div className="flex h-full flex-col items-center justify-center text-center px-4">
            <motion.div
                className="mb-8"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.1 }}
            >
                <div className="flex aspect-square w-20 items-center justify-center rounded-3xl bg-primary shadow-xl">
                    <User className="h-10 w-10 text-primary-foreground" />
                </div>
            </motion.div>

            <motion.h2
                className="mb-2 text-center text-2xl font-bold text-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                What's Your Name?
            </motion.h2>

            <motion.p
                className="mb-8 text-center text-muted-foreground max-w-xs"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                Let's personalize your experience
            </motion.p>

            <motion.div
                className="w-full max-w-sm space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <Label htmlFor="fullName" className="text-left block text-foreground">Full Name</Label>
                <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => handleChange(e.target.value)}
                    className="h-12 text-base bg-card border-border"
                    autoFocus
                />
            </motion.div>
        </div>
    )
}
