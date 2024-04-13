import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/Login/Login';
// константная переменная App = html коду, что возвращает стрелочная функция


const App = (props) => {

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
  );
}





export default App;
