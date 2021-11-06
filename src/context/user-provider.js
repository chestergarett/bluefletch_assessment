//dependencies
import { useContext, useState } from 'react';
import axios from 'axios';
//context
import UserContext from './user-context';


const UserProvider = (props) => { 

    const [isAuthenthenticated, setIsAuthenticated] = useState(false);
    const [authorization, setAuthorization] = useState({authorization: ''});

    return (
        <UserContext.Provider
            value={{
                isAuthenthenticated,
                setIsAuthenticated,
                authorization,
                setAuthorization,
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
};

export default UserProvider;