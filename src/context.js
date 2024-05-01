import { createContext, useState } from "react";

export const AppContext = createContext(null);

const AppProvider = (props) =>{

    const [search_movie, setSearch_movie] = useState("");

    return(
        <AppContext.Provider value={{search_movie, setSearch_movie}}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppProvider;