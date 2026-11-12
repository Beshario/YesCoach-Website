import type { Metadata } from 'next'
import ImageReview from './image-review'

// The owner's picture review page. Not linked from the site; access is the API's admin check.
export const metadata: Metadata = {
  title: 'Images · YesCoach',
  robots: { index: false, follow: false },
}

export default function AdminPage() {
  return <ImageReview />
}
