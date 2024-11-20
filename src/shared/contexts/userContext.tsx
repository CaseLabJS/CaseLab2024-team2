import { createContext } from "react";

const user = {
    name: '',
    email: ''
  }

export const userContext = createContext(user)