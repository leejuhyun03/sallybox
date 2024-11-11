import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useUser } from '../../../context/UserContext';

function OAuth() {
    const { token } = useParams();
    const navigate = useNavigate();

    const {setUserId, setUserName, setUserNickName, setUserPoint, setIsAuthenticated} = useUser();

    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode(decodeURIComponent(token));
                console.log('accessToken:'+decodeURIComponent(token));
                console.log('userId:'+decodedToken.userId);
                console.log('email:'+decodedToken.email);
                console.log('name:'+decodedToken.name);
                console.log('nickname:'+decodedToken.nickname);
                console.log('accepointsssToken:'+decodedToken.points);
                
                
                // localStorage에 토큰 정보 저장
                localStorage.setItem('accessToken', decodeURIComponent(token));
                localStorage.setItem('userId', decodedToken.userId);
                localStorage.setItem('email', decodedToken.email);
                localStorage.setItem('name', decodedToken.name);
                localStorage.setItem('nickname', decodedToken.nickname);
                localStorage.setItem('points', decodedToken.points);

                setUserId(decodedToken.userId);
                setUserName(decodedToken.name);
                setUserNickName(decodedToken.nickname);
                setUserPoint(decodedToken.points);
                setIsAuthenticated(true);
                console.log("Token decoded and information stored in localStorage");

                // 홈 페이지나 대시보드로 리다이렉트
                navigate('/');
            } catch (error) {
                console.error("Error decoding token:", error);
                navigate('/login');
            }
        } else {
            console.error("No token received");
            navigate('/login');
        }
    }, [token, navigate]);

    return <div>Processing OAuth response...</div>;
}

export default OAuth;