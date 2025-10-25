import type {PublicClientApplication} from "@azure/msal-browser";
import {MsalProvider} from "@azure/msal-react";
import {SnackbarProvider} from "./hooks/contexts/snackbar-provider.tsx";
import {UserProvider} from "./hooks/contexts/user-provider.tsx";
import Router from './routes/routes';

function App({instance}: {
  instance: PublicClientApplication
}) {
  return (
    <MsalProvider instance={instance}>
      <SnackbarProvider>
        <UserProvider>
          <Router/>
        </UserProvider>
      </SnackbarProvider>
    </MsalProvider>
  )
}

export default App
