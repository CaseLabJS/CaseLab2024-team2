import { createContext } from "react";

import type { ToastContextType } from "../types/toastTypes";

export const ToastContext = createContext<ToastContextType | undefined>(undefined);
