import type { NextPage } from 'next';
import { useAuth } from '@/hooks/useAuth';

const Login: NextPage = () => {
  const { login } = useAuth();

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>Login to Crypto Portfolio Tracker</h2>
      <button onClick={login}>Login with Google</button>
    </div>
  );
};

export default Login;