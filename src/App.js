import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/Login/Login';
import React from 'react';
import { connect } from 'react-redux';
// import { useParams } from "react-router"; //делаем обертку для хука, чтобы использовать аналог withRouter
// import { compose } from 'redux';
import { initializeApp } from './redux/app-reducer';
import Preloader from './components/common/Preloader/Preloader';
// export const withRouter = (Component) => {
//     return (props) => {
//         const match = { params: useParams() };
//         return <Component match={match} {...props} />;
//     };
// };

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
  }
  render() {
    if (!this.props.initialized) return <Preloader />
    return ( //возвращаем jsx разметку с другими компонентами
      <BrowserRouter> {/* обрамление для роутинга */}
        <div className="app-wrapper">

          <HeaderContainer />
          <Navbar />
          <div className="app-wrapper-content"> {/* класс определяет основную грид арею */}
            <Routes>
              <Route path='/profile' element={<ProfileContainer />}>
                <Route path=':userId' element={<ProfileContainer />} />
              </Route>
              <Route path='/dialogs' element={<DialogsContainer />} />
              <Route path='/users' element={<UsersContainer />} />
              <Route path='/login' element={<LoginPage />} />
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
