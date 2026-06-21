import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authRepository } from '../../modules/auth/auth.repository';
import { useSetAtom } from 'jotai';
import { currentUserAtom } from '../../modules/auth/current-user.state';
import { utils } from '../../modules/utils/utils';
import { Email } from '../Common/Form/FormItem/Email';
import { Password } from '../Common/Form/FormItem/Password';
import { SubmitButton } from '../Common/Form/FormItem/SubmitButton';
import { Form } from '../Common/Form/Form';
import { ErrorMessage } from '../Common/Error/ErrorMessage';
import { InvalidFormError } from '../../errors/errors';

function Signin() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>('');
  const setCurrentUser = useSetAtom(currentUserAtom);
  const navigate = useNavigate();

  const isFormFilled = email !== '' && password !== '';

  /**
   * サインイン
   */
  const signin = () => {
    authRepository
      .signin(email, password)
      .then(res => {
        setCurrentUser(res.user);
        utils.saveToken(res.token);
        navigate('/home');
      })
      .catch(err => {
        console.error(err);
        setErrMsg(err instanceof InvalidFormError ? err.message : 'サインインに失敗しました');
      });
  }

  // ページ初回読み込み時に既にログイン済みかをチェックし、YesならHome画面に遷移する
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
          style={{ width: '100%', maxWidth: '450px' }}>

          <div className='text-center'>
            <h3>Signin</h3>
            <small className='text-muted'>with your email</small>
          </div>

          <ErrorMessage errMsg={errMsg} />

          <Form allowSubmit={isFormFilled} onSubmit={signin}>
            <Email email={email} setEmail={setEmail} setErrMsg={setErrMsg} />
            <Password password={password} setPassword={setPassword} setErrMsg={setErrMsg} />
            <SubmitButton enabled={isFormFilled} onSubmit={signin}>continue</SubmitButton>
          </Form>

          <div className='mt-2 text-center'>
            ユーザ登録は <Link to='/signup'>こちら</Link>
          </div>

        </div>
      </div>
    </>
  );
}

export default Signin;