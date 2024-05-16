import Preloader from '../../common/Preloader/Preloader';
import css from './ProfileInfo.module.css'
import userPhoto from '../../../assets/images/user.png';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import { useState } from 'react';
import ProfileDataForm from './ProfileDataForm';

const ProfileInfo = (props) => {
    let [editMode, setEditMode] = useState(false)

    if (!props.profile) { //если профиль = null or undefined
        return <Preloader/>
    } 

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }
    const onSubmit = (formData) => {
        props.saveProfile(formData)
            .then(() => {
                setEditMode(false)
            })
            .catch(error => '') //в случае когда сработает Promise.reject, не выполнится then, значит мы не выйдем из editMode. Promise.reject нужно отлавливать с помощью catch
    }
    return (
        <div>
            <div className={css.description}>
                <div className={css.description__img}>
                    <img alt='Ава не загрузилась' src={props.profile.photos.large != null ? props.profile.photos.large : userPhoto} className={css.photo}/>
                    <div>{props.isOwner && <div>Загрузить фото:<br/><input type={'file'} onChange={onMainPhotoSelected} /></div>}</div>
                </div>
                {editMode ? <ProfileDataForm initialValues={props.profile} onSubmit={onSubmit} profile={props.profile}  />
                : <ProfileData profile={props.profile} isOwner={props.isOwner} 
                    goToEditMode={() => {setEditMode(true)}}/>}
            </div>
            <div className={css.status}>
                <h3>Статус:</h3>
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} isOwner={props.isOwner}/>
            </div>    
        </div>
    )
}

const Contact = ({contactTitle, contactValue}) => {
    return <div>{contactTitle}: <a href={contactValue}>{contactValue}</a></div>
}
const ProfileData = ({profile, isOwner, goToEditMode}) => { //нужно указывать либо props, либо в {}. Иначе не работает нормально
    return (
        <div className={css.description__info}>
            <div>Меня зовут <strong>{profile.fullName}</strong> | id: {profile.userId}</div>
            <div>Обо мне: {profile.aboutMe || 'Ничего'}</div>
            <div>{profile.lookingForAJob ? 'Ищу работу' : 'Не ищу работу'}</div>
            <div>{profile.lookingForAJobDescription ? profile.lookingForAJobDescription : ''}</div>
            <div className={css.description__info__contacts}>
                <div><b>Контакты</b></div>
                {Object.keys(profile.contacts).map(key => {
                    return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
                })}
            </div>
            {isOwner && <div><button onClick={goToEditMode}>Редактировать</button></div>}
        </div>
    )
}




export default ProfileInfo;