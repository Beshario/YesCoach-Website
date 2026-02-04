'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function EmailForm() {
  return (
    <form
      name="early-access"
      method="POST"
      action="/thanks"
      data-netlify="true"
      netlify-honeypot="bot-field"
      className="w-full max-w-[400px] mx-auto"
      suppressHydrationWarning
    >
      <input type="hidden" name="form-name" value="early-access" />

      {/* Honeypot field */}
      <p className="hidden" suppressHydrationWarning>
        <label suppressHydrationWarning>
          Don't fill this out if you're human: <input name="bot-field" suppressHydrationWarning />
        </label>
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          name="email"
          placeholder="Enter your email"
          required
          suppressHydrationWarning
          className="flex-1"
        />
        <Button
          type="submit"
          className="bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          Join Waitlist
        </Button>
      </div>

      <p className="text-sm text-muted-foreground mt-3 text-center">
        Occasional updates. No noise.
      </p>
    </form>
  )
}
