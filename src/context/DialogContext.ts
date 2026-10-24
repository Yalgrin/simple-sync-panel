import {createContext} from "react";
import type {DialogContextValue} from "../models/dialogs.ts";

export const DialogContext = createContext<DialogContextValue | null>(null);