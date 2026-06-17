type EmailProps = {
  email: string,
  setEmail: (email: string) => void,
  setErrMsg: (errMsg: string) => void
}

export function Email({ email, setEmail, setErrMsg }: EmailProps) {
  return (
    <>
      <div className='mt-3'>
        <input
          className='form-control bg-white'
          type='email'
          placeholder='Example@gmail.com'
          value={email}
          onChange={e => {
            setEmail(e.target.value);
            setErrMsg(''); // 入力開始時にエラーメッセージを消す
          }}
        />
      </div>
    </>
  );
}