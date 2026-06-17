import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authRepository } from '../../modules/auth/auth.repository';
import { useSetAtom } from 'jotai';
import { currentUserAtom } from '../../modules/auth/current-user.state';
import { utils } from '../../modules/utils/utils';
import { Email } from '../Common/FormItem/Email';
import { Password } from '../Common/FormItem/Password';
import { SubmitButton } from '../Common/FormItem/SubmitBtton';

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

        // Home画面に遷移
        navigate('/home');
      })
      .catch(err => {
        console.error(err);
        setErrMsg('メールアドレスまたはパスワードが正しくありません');
      });
  }

  /**
   * Enterキー押下時処理
   * @param e 
   */
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault(); // ページリロード防止
    if (!isFormFilled) return;
    signin();
  }

  // ページ初回読み込み時に既にログイン済みかをチェックし、YesならHome画面に遷移する
  useEffect(() => {
    authRepository
    .getCurrentUser()
    .then(user => {
      setCurrentUser(user);
      navigate('/home');
    })
    .catch(err => {
      console.error(err);
    });
  }, []);

  return (
    <>
      <div className='d-flex justify-content-center pt-4'>
        <div
          className='bg-body-secondary border p-4 rounded'
          style={{ width: '100%', maxWidth: '450px' }}>

          {/* 画面タイトル */}
          <div className='text-center'>
            <h3>Signin</h3>
            <small className='text-muted'>with your email</small>
          </div>

          {/* エラーメッセージ */}
          {errMsg && (
            <div className='alert alert-danger mt-3' role='alert'>
              {errMsg}
            </div>
          )}

          {/* フォーム */}
          <form onSubmit={handleSubmit} noValidate>
            <Email email={email} setEmail={setEmail} setErrMsg={setErrMsg} />
            <Password password={password} setPassword={setPassword} setErrMsg={setErrMsg} />
            <SubmitButton disabled={!isFormFilled} submit={signin}>continue</SubmitButton>
          </form>

          {/* サインアップ画面へのリンク */}
          <div className='mt-2 text-center'>
            ユーザ登録は <Link to='/signup'>こちら</Link>
          </div>

        </div>
      </div>
    </>
  );
}

export default Signin;