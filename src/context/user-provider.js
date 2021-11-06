//dependencies
import { useContext, useState } from 'react';
//context
import UserContext from './user-context';

const [isAuthenthenticated, setIsAuthenticated] = useState(false);
const UserProvider = () => { 

    return (
        <UserContext.Provider
            value={{
                isAuthenthenticated
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
};

export default UserProvider;