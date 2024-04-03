import Preloader from '../../common/Preloader/Preloader';
import css from './ProfileInfo.module.css'
import userPhoto from '../../../assets/images/user.png';


const ProfileInfo = (props) => {
    if (!props.profile) { //если профиль = null or undefined
        return <Preloader/>
    } 
    return (
        <div>
            {/* <div>
                <img className={css.Profile__image} src="https://sueveriya.com/wp-content/uploads/2020/12/20151209-holidays-art.jpg" alt="" />
            </div> */}
            <div className={css.description}>
                <div><img src={props.profile.photos.large != null ? props.profile.photos.large : userPhoto}/></div>
                <div>Меня зовут {props.profile.fullName}</div>
                <div>Обо мне: {props.profile.aboutMe}</div>
                <div>ВК: {props.profile.contacts.vk != null ? props.profile.contacts.vk : 'Нет вк'}</div>
                <div>{props.profile.lookingForAJob ? 'Ищу работу' : 'Не ищу работу'}</div>
            </div>        
        </div>
    )
}

export default ProfileInfo;