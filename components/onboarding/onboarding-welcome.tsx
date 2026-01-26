"use client"

import { motion } from "framer-motion"
import { Wallet, TrendingUp, PieChart } from "lucide-react"

export function OnboardingWelcome() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center px-4">
      {/* Animated icons */}
      <div className="relative mb-8 h-40 w-40">
        {/* Center icon – wallet */}
        <motion.div
          className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-primary shadow-lg"
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", delay: 0.1 }}
        >
          <Wallet className="h-10 w-10 text-primary-foreground" />
        </motion.div>

        {/* Top-left – trending up */}
        <motion.div
          className="absolute left-0 top-0 flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/20 shadow-md"
          initial={{ scale: 0, x: 50, y: 50 }}
          animate={{ scale: 1, x: 0, y: 0 }}
          transition={{ type: "spring", delay: 0.3 }}
        >
          <TrendingUp className="h-7 w-7 text-secondary" />
        </motion.div>

        {/* Bottom-right – pie chart */}
        <motion.div
          className="absolute bottom-0 right-0 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/20 shadow-md"
          initial={{ scale: 0, x: -50, y: -50 }}
          animate={{ scale: 1, x: 0, y: 0 }}
          transition={{ type: "spring", delay: 0.5 }}
        >
          <PieChart className="h-7 w-7 text-primary" />
        </motion.div>
      </div>

      {/* Title */}
      <motion.h1
        className="mb-4 text-3xl font-bold tracking-tight text-foreground"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        Welcome to Finance Manager
      </motion.h1>

      {/* Description */}
      <motion.p
        className="max-w-xs text-lg text-muted-foreground"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Take control of your finances with smart tracking, insightful analytics, and easy budgeting.
      </motion.p>
    </div>
  )
}
