'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { motion } from "framer-motion"
import { EmailForm } from "@/components/email-form"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-32 lg:py-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-4xl space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0 }}
              className="text-5xl lg:text-6xl font-bold tracking-tight text-foreground"
            >
              See what your training is doing.
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="text-xl text-muted-foreground space-y-1"
            >
              <p>You put in the work.</p>
              <p>But are the right muscles working?</p>
              <p>Are you recovered enough to push today?</p>
              <p>Is your training balanced over time?</p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-base text-muted-foreground leading-relaxed"
            >
              YesCoach helps make the invisible visible. Through biomechanical modeling and visual feedback,
              it shows muscle activation, recovery, and training patterns — grounded in proven science and
              how the body actually works.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Twitter CTA */}
      <section className="py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0 }}
            viewport={{ once: false }}
            className="text-muted-foreground mb-6"
          >
            Building in the open. Thinking through problems, sharing what works, what doesn't.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            viewport={{ once: false }}
          >
            <Button asChild size="lg" className="bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white">
              <a href="https://twitter.com/YCoach58265" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
                Follow along on Twitter
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0 }}
            viewport={{ once: false }}
            className="text-3xl lg:text-4xl font-bold mb-16 text-foreground"
          >
            What you get
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-6">
            {[
              {
                title: "Muscle activation you can see",
                description: "Select an exercise and see which muscles are involved — and how much. Activation is based on joint mechanics and movement, not generic labels.",
                gradient: "from-primary/10 to-primary/5"
              },
              {
                title: "Recovery you can understand",
                description: "See which muscle groups are fresh and which are still recovering. Plan sessions based on readiness, not just a calendar.",
                gradient: "from-accent/10 to-accent/5"
              },
              {
                title: "Patterns over time",
                description: "Watch how your training accumulates. Notice imbalances early. Connect decisions to outcomes.",
                gradient: "from-secondary/10 to-secondary/5"
              },
              {
                title: "Intelligence that adapts",
                description: "Your training history matters. Strength in one movement informs others. Suggestions evolve as your patterns evolve.",
                gradient: "from-primary/10 to-accent/5"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: false }}
              >
                <Card className={`group relative p-8 h-full bg-gradient-to-br ${feature.gradient} border-2 border-border/50 hover:border-primary/70 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative">
                    <h3 className="text-xl font-bold text-primary mb-3 group-hover:scale-[1.02] transition-transform">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Promise */}
      <section className="py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0 }}
            viewport={{ once: false }}
            className="space-y-4 text-center"
          >
            <p className="text-2xl text-foreground">
              <span className="text-accent font-semibold">Clarity builds confidence.</span>
            </p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              viewport={{ once: false }}
              className="text-xl text-muted-foreground"
            >
              When you can see what's happening, you train with intention — and trust grows naturally.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              viewport={{ once: false }}
              className="text-lg text-muted-foreground pt-4"
            >
              You already do the work. YesCoach helps you understand it.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Email Signup */}
      <section className="py-32 border-t border-border">
        <div className="max-w-2xl mx-auto px-6 lg:px-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0 }}
            viewport={{ once: false }}
            className="text-3xl font-bold mb-4 text-primary"
          >
            Currently building
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            viewport={{ once: false }}
            className="text-muted-foreground mb-8"
          >
            If this resonates, you can follow along as it takes shape.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            viewport={{ once: false }}
          >
            <EmailForm />
          </motion.div>
        </div>
      </section>
    </div>
  )
}
