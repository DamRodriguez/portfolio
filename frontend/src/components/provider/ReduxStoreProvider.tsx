"use client";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

type ReduxStoreProviderProps = {
  children: React.ReactNode
}

const ReduxStoreProvider = ({ children }: ReduxStoreProviderProps) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export default ReduxStoreProvider;