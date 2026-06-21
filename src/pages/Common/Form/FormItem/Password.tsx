import 'bootstrap/dist/css/bootstrap.min.css';

type PasswordProps = {
  password: string,
  setPassword: (password: string) => void,
  setErrMsg: (errMsg: string) => void
}

export function Password({ password, setPassword, setErrMsg }: PasswordProps) {
  return (
    <>
      <div className='mt-3'>
        <input
          className='form-control bg-white'
          type='password'
          placeholder='Password'
          value={password}
          onChange={e => {
            setPassword(e.target.value);
            setErrMsg(''); // 入力開始時にエラーメッセージを消す
          }}
        />
      </div>
    </>
  );
}