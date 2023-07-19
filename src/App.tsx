import { ThemeProvider } from "styled-components"
import { defaultTheme } from "./styles/themes/default"
import { GlobalStyle } from "./styles/global"
import { Transactions } from "./pages/Transactions"
import { TransactionProvider } from "./contexts/TransactionsContext"
import { AuthProvider } from "./contexts/AuthProvider"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { ProtectedLayout } from "./components/ProtectedLayout"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { Profile } from "./pages/Profile"

export function App() {

  return ( 
    <AuthProvider> 
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
          <Route 
              path='/' 
              element={
                <Navigate to={'/sessions'} />
            }>
            </Route>
            <Route
              path='/transactions/history'
              element={
                <ProtectedLayout>
                  <TransactionProvider>
                    <Transactions />
                  </TransactionProvider>
                </ProtectedLayout>
              }>
            </Route>

            <Route 
              path='/sessions' 
              element={
                <Login />
            }>
            </Route>

            <Route 
              path='/users' 
              element={
                <Register />
            }>
            </Route>

            <Route 
              path='/profile' 
              element={
                <ProtectedLayout>
                  <Profile />
                </ProtectedLayout>
            }>
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  )
}

