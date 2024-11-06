<<<<<<< HEAD
import React from 'react';
import '../../css/seats/AlertModal.css'
import { AiOutlineClose } from 'react-icons/ai';

const AlertModal = ({onClose,message}) => {

    return (
        <div className='alert_modal_wrap'>
            <div className='alert_modal_message'>
                <span onClick={onClose}><i><AiOutlineClose/></i></span>
                <p>{message}</p>                
            </div>            
        </div>
    );
};

=======
import React from 'react';
import '../../css/seats/AlertModal.css'
import { AiOutlineClose } from 'react-icons/ai';

const AlertModal = ({onClose,message}) => {

    return (
        <div className='alert_modal_wrap'>
            <div className='alert_modal_message'>
                <span onClick={onClose}><i><AiOutlineClose/></i></span>
                <p>{message}</p>                
            </div>            
        </div>
    );
};

>>>>>>> 963c018b77b364d1a5310fbcfa99d105fdfe1969
export default AlertModal;