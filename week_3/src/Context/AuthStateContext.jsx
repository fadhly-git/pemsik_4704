import { createContext } from "react";

const AuthStateContext = createContext({
  user: null,
  setUser: () => {},
});

export default AuthStateContext;