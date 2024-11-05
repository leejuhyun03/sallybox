import React, { useState } from 'react';
import Header from './header/Header';
import Body from './body/Body';

const MainSallybox = () => {
    const [userid, setUserid] = useState(null);
    const [userNickName, setUserNickName] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <div>
            <Header setUserid={setUserid} setUserName={setUserNickName} 
                    isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
            <Body userid={userid} userNickName={userNickName}
                  isAuthenticated={isAuthenticated}/>
        </div>
    );
};

export default MainSallybox;