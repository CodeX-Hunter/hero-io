import { useInstallations } from '../state/InstallationsContext.jsx'

export function ToastViewport() {
  const { toasts } = useInstallations()

  return (
    <div className="toast-stack" aria-live="polite" aria-atomic="true">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast">
          {toast.message}
        </div>
      ))}
    </div>
  )
}
