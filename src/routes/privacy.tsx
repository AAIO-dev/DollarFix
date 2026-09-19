import { createFileRoute } from '@tanstack/react-router'
import LegalPage from '../components/LegalPage'

export const Route = createFileRoute('/privacy')({
  component: () => <LegalPage language="en" type="privacy" />
})