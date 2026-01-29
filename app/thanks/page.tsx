'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

export default function ThanksPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-16 px-6">
      <div className="max-w-2xl w-full">
        <Card className="text-center">
          <CardContent className="pt-12 pb-8">
            {/* Animated checkmark */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                duration: 0.5
              }}
              className="mx-auto mb-8 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center"
            >
              <CheckCircle className="w-8 h-8 text-white" strokeWidth={3} />
            </motion.div>

            {/* Text content with fade-up animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-4xl font-semibold tracking-tight mb-6 text-foreground">
                Thank you!
              </h1>

              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                Really appreciate your interest — it means a lot.
              </p>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We're excited about what we're building and can't wait to share it with you. Hoping to have a working version in your hands very soon.
              </p>

              <p className="text-base text-muted-foreground/80 pt-8 border-t border-border">
                We'll be in touch.
              </p>
            </motion.div>

            {/* Back to home button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8"
            >
              <Button asChild variant="ghost">
                <Link href="/">
                  ← Back to YesCoach
                </Link>
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
