import { SnackbarProvider } from "notistack"
import { routes } from "./app/router"

export const App: React.FC = () => {
  return <SnackbarProvider>{routes}</SnackbarProvider>
}