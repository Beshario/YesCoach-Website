import type { Metadata } from 'next'
import ContentReview from './content-review'

// The owner's content review and publish page. Not linked from the site; access is the API's admin check.
export const metadata: Metadata = {
  title: 'Content · YesCoach',
  robots: { index: false, follow: false },
}

export default function AdminPage() {
  return <ContentReview />
}
