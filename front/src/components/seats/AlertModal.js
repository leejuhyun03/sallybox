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

export default AlertModal;