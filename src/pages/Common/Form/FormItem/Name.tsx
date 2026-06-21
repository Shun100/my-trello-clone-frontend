import 'bootstrap/dist/css/bootstrap.min.css';

type NameProps = {
  name: string,
  setName: (name: string) => void,
  setErrMsg: (errMsg: string) => void
}

export function Name({ name, setName, setErrMsg }: NameProps) {
  return (
    <div className='mt-3'>
      <input
        className='form-control bg-white' type='text' placeholder='Full'
        value={name}
        onChange={e => {
          setName(e.target.value);
          setErrMsg('');
        }}       
      />
    </div>
  )
}