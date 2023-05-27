import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Welcome from './pages/Welcome'
import Login from './pages/Login'
import Register from './pages/Register'
import FinalRegister from './pages/FinalRegister'
import ForgetPassword from './pages/ForgetPassword'
import ForgetPasswordWithEmail from './pages/ResetPasswordWithEmail'
import ResetPassword from './pages/ResetPassword'
import StudentMain from './pages/StudentMain'
import { store } from './components/store/store'
import TeacherMain from './pages/TeacherMain'
import { TerminalContextProvider } from 'react-terminal'
import ConfirmPhone from './pages/ConfirmPhone'

const Router: React.FC = () => {
  const token = localStorage.getItem('token')
  const user = localStorage.getItem('user')

  useEffect(() => { console.log(user, token) }, [token, user])

  return (
    <Provider store={store}>
      <TerminalContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path={'/'}
              element={token && user === 'Teacher'
                ? <TeacherMain />
                : token && user === 'Student'
                  ? <StudentMain />
                  : <Welcome />
              }
            />
            <Route path={'/login'} element={<Login />} />
            <Route path={'/register'} element={<Register />} />
            <Route path={'/final-register'} element={<FinalRegister />} />
            <Route path={'/forget-password'} element={<ForgetPassword />} />
            <Route path={'/forget-password-with-email'} element={<ForgetPasswordWithEmail />} />
            <Route path={'/reset-password'} element={<ResetPassword />} />
            <Route path={'/confirm-phone'} element={<ConfirmPhone />} />
            <Route path={'/subjects'} element={ user === 'Teacher' ? <TeacherMain /> : <StudentMain />} />
          </Routes>
        </BrowserRouter>
      </TerminalContextProvider>
    </Provider>
  )
}

export default Router
