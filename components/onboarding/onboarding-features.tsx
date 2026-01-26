"use client"

import { motion } from "framer-motion"
import { Receipt, BarChart3, Target, Lock } from "lucide-react"

const features = [
  {
    icon: Receipt,
    title: "Track Expenses",
    description: "Easily record and categorize all your income and expenses",
    color: "bg-primary",
    iconColor: "text-primary-foreground",
  },
  {
    icon: BarChart3,
    title: "Visual Analytics",
    description: "See your spending patterns with beautiful charts and insights",
    color: "bg-secondary/20",
    iconColor: "text-secondary",
  },
  {
    icon: Target,
    title: "Budget Goals",
    description: "Set financial goals and track your progress over time",
    color: "bg-primary/20",
    iconColor: "text-primary",
  },
  {
    icon: Lock,
    title: "Secure Data",
    description: "Your financial data stays private and secure on your device",
    color: "bg-accent/30",
    iconColor: "text-accent-foreground",
  },
]

export function OnboardingFeatures() {
  return (
    <div className="flex h-full flex-col justify-center px-4">
      <motion.h2
        className="mb-2 text-center text-2xl font-bold text-foreground"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Why Finance Manager?
      </motion.h2>

      <motion.p
        className="mb-8 text-center text-muted-foreground"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        Everything you need to manage your money wisely
      </motion.p>

      <div className="grid gap-4">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-sm border border-border"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${feature.color}`}>
              <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
