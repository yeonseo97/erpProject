import { useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function KakaoCallback() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchKakaoLogin = async () => {
      try {
        const res = await fetch(`/auth/oauth/kakao/callback?code=${code}`);
        if (!res.ok) throw new Error("카카오 로그인 실패");

        const result = await res.json();

        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify({
          username: result.username,
          name: result.name,
          role: result.role
        }));
        setUser({
          username: result.username,
          name: result.name,
          role: result.role
        });

        navigate("/dashboard");
      } catch (err) {
        console.error(err);
        alert("카카오 로그인 처리 중 오류가 발생했습니다.");
      }
    };

    if (code) fetchKakaoLogin();
  }, [code, navigate, setUser]);

  return <p>카카오 로그인 처리 중...</p>;
}