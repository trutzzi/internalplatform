import { Alert, Snackbar } from "@mui/material"
import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from "react"

type AlertObject = { type: "error" | "warning" | "info" | "success", text: string }

export const SnackBarContext = createContext<{ addAlert: (content: AlertObject) => void }>({ addAlert: (content) => null })

const AUTO_DISMISS = 2000

export function SnackBarProvider({ children }: { children: ReactNode }) {
  const [alerts, setAlerts] = useState<AlertObject[]>([])
  const addAlert = useCallback((content) => setAlerts((alerts) => [content, ...alerts]), [])


  const activeAlertIds = alerts.join(',')
  useEffect(() => {
    if (activeAlertIds.length > 0) {
      const timer = setTimeout(() => setAlerts((alerts) => alerts.slice(0, alerts.length - 1)), AUTO_DISMISS)
      return () => clearTimeout(timer)
    }
  }, [activeAlertIds])

  const value = useMemo(() => ({ addAlert, }), [addAlert])


  return (
    <SnackBarContext.Provider value={value}>
      {children}
      {alerts.map((alert, index) =>
      (<Snackbar anchorOrigin={{ horizontal: "right", vertical: "bottom" }} open={true} key={index} >
        <Alert severity={alert.type} sx={{ width: '100%' }}>
          {alert.text}
        </Alert>
      </Snackbar>))}
    </SnackBarContext.Provider>
  )
}