import { createContext } from "react";
// 앱 전체에서 로그인 사용자 정보를 공유
export const AuthContext = createContext({
    user: null,
    setUser: () => {},
});
