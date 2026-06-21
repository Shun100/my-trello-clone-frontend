import 'bootstrap/dist/css/bootstrap.min.css';

type ErrorMessageProps = {
  errMsg: string
}

export function ErrorMessage({ errMsg }: ErrorMessageProps) {
  return (
    <>
      {errMsg && (
        <div className='alert alert-danger mt-3' role='alert'>
          {errMsg}
        </div>
      )}
    </>
  );
}