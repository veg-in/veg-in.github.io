import { useNavigate } from 'react-router-dom';

export function useLogin() {
  const navigate = useNavigate();

  const loginWith = (type: string) => {
    window.alert(`Login with ${type}`);
    navigate('/home'); // SPA 방식으로 라우팅
  };

  return { loginWith };
}
