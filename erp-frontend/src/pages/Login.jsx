import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
    const [username, setUserId] = useState("");  // userId 상태 변수와 초기값 빈 문자열, setUserId 비밀번호 입력값을 업데이트
    const [password, setPassword] = useState(""); // password 상태 변수와 초기값 빈 문자열, setPassword로 비밀번호 입력값을 업데이트

    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);
    const handleSubmit = async (e) => {
        e.preventDefault();

        const loginData = { username, password };

        try {
            const response = await fetch("/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result);
                const userInfo = {
                    username: result.username, // 서버에서 받은 username
                    name: result.name,         // 서버에서 받은 이름
                    role: result.role       // 서버에서 받은 권한 배열
                };
                // localStorage에 저장
                localStorage.setItem("token", result.token); // 토큰 저장
                localStorage.setItem("user", JSON.stringify(userInfo));
                setUser(userInfo); // 즉시 반영
                alert("로그인성공!");
                navigate("/dashboard"); // 메인 화면 이동
            } else {
                alert("아이디 또는 비밀번호가 틀렸습니다.");
            }
        } catch (err) {
            console.error(err);
            alert("서버와 연결할 수 없습니다.");
        }
    };

    const handleKakaoLogin = async () => {
        try {
            const res = await fetch("/auth/oauth/kakao/url");
            const data = await res.json();
            window.location.href = data.url; // 백엔드에서 받은 URL로 이동
        } catch (err) {
            console.error(err);
            alert("카카오 로그인 URL 요청 실패");
        }
    };

    return ( // 컴포넌트가 화면에 보여주는 값
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>ERP 시스템 로그인</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="text"
                        placeholder="아이디"
                        value={username}
                        onChange={(e) => setUserId(e.target.value)}
                        style={styles.input}
                        required
                    />
                    <input
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                        required
                    />
                    <button type="submit" style={styles.button}>
                        로그인
                    </button>
                </form>
                <p style={styles.signup}>
                    계정이 없으신가요? <a href="/signup">회원가입</a>
                </p>
                <button onClick={handleKakaoLogin} style={styles.oauthButton}>
                  카카오 계정으로 로그인
                </button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f6f9",
    },
    card: {
        width: "350px",
        padding: "30px",
        borderRadius: "12px",
        background: "#fff",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        textAlign: "center",
    },
    title: {
        marginBottom: "20px",
        fontSize: "20px",
        fontWeight: "bold",
        color: "#333",
    },
    form: {
        display: "flex",
        flexDirection: "column",
    },
    input: {
        margin: "10px 0",
        padding: "12px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        fontSize: "14px",
    },
    button: {
        marginTop: "15px",
        padding: "12px",
        background: "#1976d2",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        fontSize: "16px",
        cursor: "pointer",
    },
    signup: {
        marginTop: "15px",
        fontSize: "13px",
        color: "#666",
    },
    container: {
        height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#f4f6f9"
    },
    card: {
        width: "350px", padding: "30px", borderRadius: "12px", background: "#fff", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", textAlign: "center"
    },
    title: {
        marginBottom: "20px", fontSize: "20px", fontWeight: "bold", color: "#333"
    },
    oauthButton: {
        marginTop: "15px", padding: "12px", background: "#FEE500", color: "#3C1E1E", border: "none", borderRadius: "6px", fontSize: "16px", cursor: "pointer"
    },
};