import React from 'react';
// import preloader from '../../../assets/images/preloader.gif';
import {Spin} from 'antd'

let Preloader: React.FC = (props) => {
    return <div>
        {/* <img src={preloader} /> */}
        <Spin size='large' />
    </div>
}

export default Preloader;