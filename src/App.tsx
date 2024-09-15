import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar.tsx';
import { UsersPage } from './components/Users/UsersContainer.tsx';
import ProfileContainer from './components/Profile/ProfileContainer.tsx';
import HeaderContainer from './components/Header/HeaderContainer.tsx';
import { LoginPage } from './components/Login/LoginPage.tsx';
import React from 'react';
import { connect } from 'react-redux';
import { initializeApp } from './redux/app-reducer.ts';
import Preloader from './components/common/Preloader/Preloader.tsx';

const DialogsContainer = React.lazy(() => import ('./components/Dialogs/DialogsContainer.tsx'))

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}

class App extends React.Component<MapPropsType & DispatchPropsType> {
  // catchAllUnhandledErrors = (promiseRejectionEvent: PromiseRejectionEvent) => {
  //   alert('Какая-то ошибка. Смотри консоль')
  //   console.error(promiseRejectionEvent)
  // }
  componentDidMount() {
    this.props.initializeApp();
    //обработчик ошибок сервера
    // window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
  }
  // componentWillUnmount() {
  //   window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
  // }
  render() {
    if (!this.props.initialized) return <Preloader />
    return ( //возвращаем jsx разметку с другими компонентами
      <BrowserRouter> {/* обрамление для роутинга */}
        <div className="app-wrapper">

          <HeaderContainer />
          <Navbar />
          <div className="app-wrapper-content"> {/* класс определяет основную грид арею */}
            {/* <Routes> вместо устаревшего <Switch> */}
            <Routes> 
              <Route path='/profile' element={<ProfileContainer />}>
                <Route path=':userId' element={<ProfileContainer />} />
              </Route>
              <Route path='/dialogs' element={
                <React.Suspense fallback={<Preloader />}><DialogsContainer /></React.Suspense>} />
                {/* Можно написать hoc, который будет помещать компоненту в саспенс с этим фоллбэк для сокращения кода и это будет выглядеть как withSuspense(DialogsContainer) (урок 94/111), необязательно */}
              <Route path='/users' element={<UsersPage pageTitle={'Самураи'} />} />
              <Route path='/login' element={<LoginPage />} />
              {/* * - это любой другой адрес, который не прописан здесь */}
              <Route path='*' element={<div><h1>404 NOT FOUND</h1></div>} />
              <Route path="/" element={<Navigate to="/profile" />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

export default connect(mapStateToProps, { initializeApp })(App)
