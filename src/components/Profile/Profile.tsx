import { ProfileType } from '../../types/types.ts';
import ProfileInfo from './ProfileInfo/ProfileInfo.tsx';
import React from 'react';


type PropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

const Profile: React.FC<PropsType> = (props) => {

    return (
        <div>
            <ProfileInfo profile={props.profile} status={props.status} 
                updateStatus={props.updateStatus}
                isOwner={props.isOwner}
                savePhoto={props.savePhoto}
                saveProfile={props.saveProfile}/>
        </div> 
    )
}

export default Profile;