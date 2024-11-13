import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useUser } from '../../../context/UserContext';

function OAuth() {
    const { token } = useParams();
    const navigate = useNavigate();

    // const {setUserId, setUserName, setUserNickName, setUserPoint} = useUser();

    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode(decodeURIComponent(token));
                console.log('token:'+decodeURIComponent(token));
                console.log('userId:'+decodedToken.user_id);
                console.log('email:'+decodedToken.email);
                console.log('name:'+decodedToken.user_name);
                console.log('nickname:'+decodedToken.user_nickname);
                console.log('accepointsssToken:'+decodedToken.user_point);
                
                // setUserId(decodedToken.userId);
                // console.log("setUserId: ", decodedToken.userId)
                // setUserName(decodedToken.name);
                // setUserNickName(decodedToken.nickname);
                // setUserPoint(decodedToken.points);
                // localStorage에 토큰 정보 저장
                localStorage.setItem('token', decodeURIComponent(token));

                
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
    }, [token]);

    return <div>Processing OAuth response...</div>;
}

export default OAuth;