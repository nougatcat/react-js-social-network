import Preloader from '../../common/Preloader/Preloader.tsx';
import css from './ProfileInfo.module.css'
import userPhoto from '../../../assets/images/user.png';
import ProfileStatusWithHooks from './ProfileStatusWithHooks.tsx';
import React, { ChangeEvent, useState } from 'react';
import ProfileDataForm from './ProfileDataForm.tsx';
import { ContanctsType, ProfileType } from '../../../types/types.ts';
import { Button } from 'antd';

type PropsType = {
    profile: ProfileType | null 
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

const ProfileInfo: React.FC<PropsType> = (props) => {
    let [editMode, setEditMode] = useState(false)

    if (!props.profile) { //если профиль = null or undefined
        return <Preloader />
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) { //?Если есть e.target.files, то взять из него длину. Аналог e.target.files && e.target.files.length
            props.savePhoto(e.target.files[0])
        }
    }
    const onSubmit = (formData: ProfileType) => {
        props.saveProfile(formData)
            .then(() => {
                setEditMode(false)
            })
            .catch(error => '') //в случае когда сработает Promise.reject, не выполнится then
        //, значит мы не выйдем из editMode. Promise.reject нужно отлавливать с помощью catch
    }
    return (
        <div>
            <div className={css.description}>
                <div className={css.description_img}>
                    <img alt='Ава не загрузилась' src={props.profile.photos.large != null ? props.profile.photos.large : userPhoto} className={css.photo} />
                    <div>{props.isOwner && <div>Загрузить фото:<br /><input type={'file'} onChange={onMainPhotoSelected} /></div>}</div>
                    <strong><br />Статус:</strong>
                </div>
                {editMode ? <ProfileDataForm initialValues={props.profile} onSubmit={onSubmit} profile={props.profile} />
                    : <ProfileData profile={props.profile} isOwner={props.isOwner}
                        goToEditMode={() => { setEditMode(true) }} />}
            </div>
            <div className={css.status}>
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} isOwner={props.isOwner} />
            </div>
        </div>
    )
}


type ContactsPropsType = {
    contactTitle: string
    contactValue: string
}
const Contact: React.FC<ContactsPropsType> = ({ contactTitle, contactValue }) => {
    return <div>{contactTitle}: <a target='_blank' rel="noopener noreferrer" href={contactValue}>{contactValue}</a></div>
}
type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}
const ProfileData: React.FC<ProfileDataPropsType> = ({ profile, isOwner, goToEditMode }) => { //нужно указывать либо props, либо в {}. Иначе не работает нормально
    return (
        <div className={css.description__info}>
            <div>Меня зовут <strong>{profile.fullName}</strong> | id: {profile.userId}</div>
            <div>Обо мне: {profile.aboutMe || 'Ничего'}</div>
            <div>{profile.lookingForAJob ? 'Ищу работу' : 'Не ищу работу'}</div>
            <div>{profile.lookingForAJobDescription ? profile.lookingForAJobDescription : ''}</div>
            <div className={css.description__info__contacts}>
                {Object.keys(profile.contacts).map(key => {
                    if (profile.contacts[key as keyof ContanctsType]) //будут показаны только те контакты, которые есть
                        return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContanctsType]} />
                })}
            </div>
            {isOwner && <div><Button onClick={goToEditMode}>Редактировать</Button></div>}
        </div>
    )
}




export default ProfileInfo;