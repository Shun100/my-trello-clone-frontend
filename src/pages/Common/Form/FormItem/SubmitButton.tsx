import 'bootstrap/dist/css/bootstrap.min.css';

type SubmitButtonProps = {
  children: React.ReactNode,
  enabled: boolean,
  onSubmit: () => void,
}

export function SubmitButton({ children, enabled, onSubmit }: SubmitButtonProps) {
  return (
    <div className='mt-4'>
      <button
        type='submit'
        className={`btn w-100 ${enabled ? 'btn-primary' : 'btn-secondary'}`} 
        disabled={!enabled}
        onClick={onSubmit}
      >
        {children}
      </button>
    </div>
  );
}