import React, { useState } from 'react';
import Header from './header/Header';
import Body from './body/Body';

const MainSallybox = () => {
    const [userId, setUserId] = useState(null);
    const [userNickName, setUserNickName] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <div>
            <Header userId = {userId} setUserId={setUserId} setUserName={setUserNickName} 
                    isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
            <Body userId={userId} userNickName={userNickName}
                  isAuthenticated={isAuthenticated}/>
        </div>
    );
};

export default MainSallybox;