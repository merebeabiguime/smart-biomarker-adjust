import { TAuthState } from "../modules/Authentication/slice/types/TAuthState";

const AUTH_STORAGE_KEY = "auth";

export const saveAuth = (cartState: TAuthState) => {
  try {
    const serializedState = JSON.stringify(cartState);
    localStorage.setItem(AUTH_STORAGE_KEY, serializedState);
  } catch (err) {
    console.error("Error saving cart state to localStorage", err);
  }
};

export const loadAuth = (): TAuthState | undefined => {
  try {
    const serializedState = localStorage.getItem(AUTH_STORAGE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState) as TAuthState;
  } catch (err) {
    console.error("Error loading cart state from localStorage", err);
    return undefined;
  }
};

export const clearAuth = () => {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (err) {
    console.error("Error clearing cart state from localStorage", err);
  }
};
