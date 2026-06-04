import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authRepository } from '../../modules/auth/auth.repository';
import { useSetAtom } from 'jotai';
import { currentUserAtom } from '../../modules/auth/current-user.state';
import { utils } from '../../modules/utils/utils';

function Signup() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const setCurrentUser = useSetAtom(currentUserAtom);
  const navigate = useNavigate();

  const isFormFilled = name !== '' && email !== '' && password !== '';

  /**
   * 新規ユーザ登録
   */
  const signup = async () => {

    try {
      // 新規ユーザ登録
      const { user, token } = await authRepository.signup(name, email, password);
      setCurrentUser(user);
      utils.saveToken(token);

      // Home画面に遷移
      navigate('/home');

    } catch (err) {
      console.error(err);
      // TODO: エラーメッセージ表示
    }
  };

  useEffect(() => {
    // ログイン済みか確認
    authRepository
    .getCurrentUser()
    .then(user => {
      setCurrentUser(user);
      navigate('/home');
    })
    .catch(() => {
      // 未ログインなら何もしない
    });
  }, []);

  return (
    <>
      <div className='d-flex justify-content-center pt-4'>
        <div className='bg-body-secondary border p-4 rounded'
              style={{ width: '100%', maxWidth: '450px' }}>

          <div className='text-center'>
            <h3>Signup to continue</h3>
            <small className='text-muted'>Use your email to signup for free !</small>
          </div>

          <div className='mt-3'>
            <input
              className='form-control bg-white' type='text' placeholder='Full'
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div className='mt-3'>
            <input
              className='form-control bg-white' type='email' placeholder='Email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className='mt-3'>
            <input
              className='form-control bg-white' type='password' placeholder='Password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div className='mt-4'>
            <button
              className={`btn w-100 ${isFormFilled ? 'btn-primary' : 'btn-secondary'}`} 
              disabled={!isFormFilled}
              onClick={signup}
            >
              Continue
            </button>
          </div>

          <div className='mt-2 text-center'>
            ログインは <Link to='/signin'>こちら</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;