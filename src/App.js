import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
// константная переменная App = html коду, что возвращает стрелочная функция


const App = (props) => {

  return (
    <BrowserRouter> {/* обрамление для роутинга */}
      <div className="app-wrapper">

        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content"> {/* класс определяет основную грид арею */}
          <Routes>
            <Route path='/profile' element={<ProfileContainer />}>
              <Route path=':userId' element={<ProfileContainer />}/>
            </Route>
            <Route path='/dialogs' element={<DialogsContainer />} />
            <Route path='/users'   element={<UsersContainer/>} />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  );
}





export default App;
