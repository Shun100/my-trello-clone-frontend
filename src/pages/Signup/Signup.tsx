import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const isFormFilled = name !== '' && email !== '' && password !== '';

  // WIP
  const signup = () => {};

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