type SubmitButtonProps = {
  children: React.ReactNode,
  disabled: boolean,
  submit: () => void,
}

export function SubmitButton({ children, disabled, submit }: SubmitButtonProps) {
  return (
    <div className='mt-4'>
      <button
        type='submit'
        className={`btn w-100 ${!disabled ? 'btn-primary' : 'btn-secondary'}`} 
        disabled={disabled}
        onClick={submit}
      >
        {children}
      </button>
    </div>
  );
}