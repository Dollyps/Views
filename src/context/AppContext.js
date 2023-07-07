import React from 'react';

const AppContext = React.createContext({
    UserBasicDetails:false,
    UpdateUserBasicDetails: () => {},
    RemoveUserBasicDetails: () => {},
    LoginHandler: () => {},
    LogoutHandler: () => {},
})



export default AppContext;