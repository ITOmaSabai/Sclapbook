import { createContext, useContext } from "react";

const IsAuthContext = createContext();

const useIsAuth = () => {
    return useContext(IsAuthContext);
}