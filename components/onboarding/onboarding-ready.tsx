"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export function OnboardingReady() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center px-4">
      {/* Floating icon */}
      <motion.div
        className="mb-8"
        initial={{ scale: 0, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        <motion.div
          className="flex aspect-square w-28 items-center justify-center rounded-3xl bg-primary shadow-xl"
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Sparkles className="h-14 w-14 text-primary-foreground" />
        </motion.div>
      </motion.div>

      {/* Title */}
      <motion.h2
        className="mb-4 text-3xl font-bold tracking-tight text-foreground"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        You're All Set!
      </motion.h2>

      {/* Description */}
      <motion.p
        className="mb-2 max-w-xs text-lg text-muted-foreground"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        Start tracking your finances and gain insights into your spending habits.
      </motion.p>

      <motion.p
        className="max-w-xs text-sm text-muted-foreground"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Tip: Add your first transaction using the + button to get started!
      </motion.p>
    </div>
  )
}
