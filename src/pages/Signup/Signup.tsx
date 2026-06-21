import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authRepository } from '../../modules/auth/auth.repository';
import { useSetAtom } from 'jotai';
import { currentUserAtom } from '../../modules/auth/current-user.state';
import { utils } from '../../modules/utils/utils';
import { Name } from '../Common/Form/FormItem/Name';
import { Email } from '../Common/Form/FormItem/Email';
import { Password } from '../Common/Form/FormItem/Password';
import { SubmitButton } from '../Common/Form/FormItem/SubmitButton';
import { ErrorMessage } from '../Common/Error/ErrorMessage';
import { Form } from '../Common/Form/Form';
import { UserAlreadyExistsError, InvalidFormError } from '../../errors/errors';

function Signup() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>('');
  const setCurrentUser = useSetAtom(currentUserAtom);
  const navigate = useNavigate();

  const isFormFilled = name !== '' && email !== '' && password !== '';

  /**
   * サインアップ
   */
  const signup = async () => {
    try {
      const { user, token } = await authRepository.signup(name, email, password);
      setCurrentUser(user);
      utils.saveToken(token);
      navigate('/home');
    
    } catch (err) {
      console.error(err);
      if (err instanceof UserAlreadyExistsError) {
        setErrMsg('そのメールアドレスは既に使われています');
      } else if (err instanceof InvalidFormError) {
        setErrMsg(err.message);
      } else {
        setErrMsg('ユーザ登録に失敗しました');
      }
    }
  };

  useEffect(() => {
    authRepository
      .getCurrentUser()
      .then(user => {
        setCurrentUser(user);
        navigate('/home');
      });
  }, []);

  return (
    <>
      <div className='d-flex justify-content-center pt-4'>
        <div
          className='bg-body-secondary border p-4 rounded'
          style={{ width: '100%', maxWidth: '450px' }}
        >

          <div className='text-center'>
            <h3>Signup to continue</h3>
            <small className='text-muted'>Use your email to signup for free !</small>
          </div>

          <ErrorMessage errMsg={errMsg} />

          <Form allowSubmit={isFormFilled} onSubmit={signup}>
            <Name name={name} setName={setName} setErrMsg={setErrMsg} />
            <Email email={email} setEmail={setEmail} setErrMsg={setErrMsg} />
            <Password password={password} setPassword={setPassword} setErrMsg={setErrMsg} />
            <SubmitButton enabled={isFormFilled} onSubmit={signup}>Continue</SubmitButton>
          </Form>

          <div className='mt-2 text-center'>
            ログインは <Link to='/signin'>こちら</Link>
          </div>

        </div>
      </div>
    </>
  );
}

export default Signup;