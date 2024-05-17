import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
//import DialogsContainer from './components/Dialogs/DialogsContainer'; //? перенес ниже - в lazy
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/Login/Login';
import React from 'react';
import { connect } from 'react-redux';
import { initializeApp } from './redux/app-reducer';
import Preloader from './components/common/Preloader/Preloader';
// import { useParams } from "react-router"; //делаем обертку для хука, чтобы использовать аналог withRouter
// import { compose } from 'redux';
// export const withRouter = (Component) => {
//     return (props) => {
//         const match = { params: useParams() };
//         return <Component match={match} {...props} />;
//     };
// };
const DialogsContainer = React.lazy(() => import ('./components/Dialogs/DialogsContainer'))

class App extends React.Component {
  catchAllUnhandledErrors = (promiseRejectionEvent) => {
    alert('Какая-то ошибка. Смотри консоль')
    console.error(promiseRejectionEvent)
  }
  componentDidMount() {
    this.props.initializeApp();
    //обработчик ошибок сервера
    window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
  }
  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
  }
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
                {/* Можно написать hoc, который будет помещать компоненту в саспенс с этим фоллбэк для сокращения кода и это будет выглядеть как withSuspense(DialogsContainer) (урок 94), необязательно */}
              <Route path='/users' element={<UsersContainer />} />
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

// export default compose(
//   withRouter,
//   connect(mapStateToProps, { initializeApp })
// )(App)

export default connect(mapStateToProps, { initializeApp })(App)



// константная переменная App = html коду, что возвращает стрелочная функция
// const App = (props) => {

//   return ( //возвращаем jsx разметку с другими компонентами
//     <BrowserRouter> {/* обрамление для роутинга */}
//       <div className="app-wrapper">

//         <HeaderContainer />
//         <Navbar />
//         <div className="app-wrapper-content"> {/* класс определяет основную грид арею */}
//           <Routes>
//             <Route path='/profile' element={<ProfileContainer />}>
//               <Route path=':userId' element={<ProfileContainer />} />
//             </Route>
//             <Route path='/dialogs' element={<DialogsContainer />} />
//             <Route path='/users' element={<UsersContainer />} />
//             <Route path='/login' element={<LoginPage />} />
//           </Routes>
//         </div>

//       </div>
//     </BrowserRouter>
//   );
// }
// export default App;
