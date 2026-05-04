import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Signin() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const isFormFilled = email !== '' && password !== '';

  // WIP
  const signin = () => {};

  return (
    <>
      <div className='d-flex justify-content-center pt-4'>
        <div className='bg-body-secondary border p-4 rounded'
              style={{ width: '100%', maxWidth: '450px' }}>

          <div className='text-center'>
            <h3>Signin</h3>
            <small className='text-muted'>with your email</small>
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
              onClick={signin}
            >
              Continue
            </button>
          </div>

          <div className='mt-2 text-center'>
            ユーザ登録は <Link to='/signup'>こちら</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin;