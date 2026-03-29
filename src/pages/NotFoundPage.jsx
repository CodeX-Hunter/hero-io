import { EmptyState } from '../components/EmptyState.jsx'

export function NotFoundPage({ variant = 'route' }) {
  const isRouteMissing = variant === 'route'

  return (
    <EmptyState
      image={
        isRouteMissing
          ? '/assignment-assets/error-404.png'
          : '/assignment-assets/App-Error.png'
      }
      title={isRouteMissing ? 'Oops, page not found!' : 'OPPS!! APP NOT FOUND'}
      description={
        isRouteMissing
          ? 'The page you are looking for is not available.'
          : 'The app you are requesting is not found on our system. Please try another app.'
      }
      buttonLabel="Go Back"
      buttonTo="/"
    />
  )
}
