import Preloader from '../../common/Preloader/Preloader';
import css from './ProfileInfo.module.css'
import userPhoto from '../../../assets/images/user.png';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = (props) => {
    if (!props.profile) { //если профиль = null or undefined
        return <Preloader/>
    } 

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }
    return (
        <div>
            <div className={css.description}>
                <div className={css.description__img}>
                    <img alt='Ава не загрузилась' src={props.profile.photos.large != null ? props.profile.photos.large : userPhoto} className={css.photo}/>
                    <div>{props.isOwner && <input type={'file'} onChange={onMainPhotoSelected} />}</div>
                </div>
                <div className={css.description__info}>
                    <div>Меня зовут <strong>{props.profile.fullName}</strong> | id: {props.profile.userId}</div>
                    <div>Обо мне: {props.profile.aboutMe || 'Ничего'}</div>
                    <div>ВК: {props.profile.contacts.vk != null ? props.profile.contacts.vk : 'Нет вк'}</div>
                    <div>{props.profile.lookingForAJob ? 'Ищу работу' : 'Не ищу работу'}</div>
                </div>
            </div>
            <div className={css.status}>
                <h3>Статус:</h3>
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
            </div>    
        </div>
    )
}

export default ProfileInfo;