import { createContext } from 'react';

const UserContext = createContext({
    authorization: '',
})

export default UserContext;