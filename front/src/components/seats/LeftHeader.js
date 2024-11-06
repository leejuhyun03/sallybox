import React from 'react';
import '../../css/seats/LeftHeader.css'
import { useLocation } from 'react-router-dom';

const LeftHeader = () => {

    const location = useLocation();

    const getLinkStyle = (path) => {
        return location.pathname === path ? { backgroundColor : '#FF1212', color: '#fff'} : {};
    };

    return (
        <div  className='reserv_header'>
                <ul>                    
                    <li>    
                        <a href='http://localhost:3000/sallybox/reserv/ticketing' style={getLinkStyle('/sallybox/reserv/ticketing')}>                        
                            <strong style={getLinkStyle('/sallybox/reserv/ticketing')}>
                                <span>01</span><br/>
                                상영 시간
                            </strong>   
                        </a>                         
                    </li>                 
                    <li>        
                        <a href='http://localhost:3000/sallybox/reserv/seats' style={getLinkStyle('/sallybox/reserv/seats')}>                    
                            <strong style={getLinkStyle('/sallybox/reserv/seats')}>
                                <span>02</span><br/>
                                인원/좌석
                            </strong>  
                        </a>                          
                    </li> 
                    <li>   
                        <a href='/sallybox/payment' style={getLinkStyle('/sallybox/payment')}>                         
                            <strong style={getLinkStyle('/sallybox/payment')}>
                                <span>03</span><br/>
                                결제
                            </strong>   
                        </a>                         
                    </li>
                    <li> 
                        <a href='/sallybox/reserv/complete' style={getLinkStyle('/sallybox/reserv/complete')}>                           
                            <strong style={getLinkStyle('/sallybox/reserv/complete')}>
                                <span>04</span><br/>
                                결제 완료
                            </strong>  
                        </a>                          
                    </li>
                    
                </ul>
        </div>
    );
};

export default LeftHeader;