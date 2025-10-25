import {EventType, PublicClientApplication} from '@azure/msal-browser';
import {createRoot} from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom';
import App from './App.tsx'
import {msalConfig} from "./constants/auth-config.ts";

const msalInstance = new PublicClientApplication(msalConfig);

// Default to using the first account if no account is active on page load
if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
  // Account selection logic is app dependent. Adjust as needed for different use cases.
  msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
}

// Listen for sign-in event and set active account
msalInstance.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload?.account) {
    const account = event.payload?.account;
    msalInstance.setActiveAccount(account);
  }
});

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App instance={msalInstance}/>
  </BrowserRouter>,
)
