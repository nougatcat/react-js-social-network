import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar.tsx';
import ProfileContainer from './components/Profile/ProfileContainer.tsx';
import Header from './components/Header/Header.tsx';
import { LoginPage } from './components/Login/LoginPage.tsx';
import React from 'react';
import { connect } from 'react-redux';
import { initializeApp } from './redux/app-reducer.ts';
import Preloader from './components/common/Preloader/Preloader.tsx';
import { Users } from './components/Users/Users.tsx';

const ChatPage = React.lazy(() => import ('./components/Chat/ChatPage.tsx'))

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
      <HashRouter basename ="/"> {/* обрамление для роутинга. Обычно использутся BrowserRouter, но он вызывает проблемы с github pages */}
        <div className="app-wrapper">

          <Header />
          <Navbar />
          <div className="app-wrapper-content"> {/* класс определяет основную грид арею */}
            {/* <Routes> вместо устаревшего <Switch> */}
            <Routes> 
              <Route path='/profile' element={<ProfileContainer />}>
                <Route path=':userId' element={<ProfileContainer />} />
              </Route>
              <Route path='/chat' element={
                <React.Suspense fallback={<Preloader />}><ChatPage /></React.Suspense>} />
              {/* <Route path='/users' element={<Users pageTitle={'Самураи'} />} /> */}
              <Route path='/users' element={<Users/>} />
              <Route path='/login' element={<LoginPage />} />
              {/* * - это любой другой адрес, который не прописан здесь */}
              <Route path='*' element={<div><h1>404 NOT FOUND</h1></div>} />
              <Route path="/" element={<Navigate to="/profile" />} />
            </Routes>
          </div>
        </div>
      </HashRouter>
    )
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

export default connect(mapStateToProps, { initializeApp })(App)
