//dependencies
import { useContext, useState, useEffect} from 'react';
import axios from 'axios';
//context
import UserContext from './user-context';

const UserProvider = (props) => { 
    const [isAuthenthenticated, setIsAuthenticated] = useState(localStorage.getItem('authorization')!==null ? true : false);
    const [authorization, setAuthorization] = useState(localStorage.getItem('authorization')!==null ? JSON.parse(localStorage.getItem('authorization')) : {});
    const [feed, setFeed] = useState([])
    const [authors, setAuthors] = useState([])

    return (
        <UserContext.Provider
            value={{
                isAuthenthenticated,
                setIsAuthenticated,
                authorization,
                setAuthorization,
                feed,
                setFeed,
                authors,
                setAuthors
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
};

export default UserProvider;