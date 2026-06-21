import 'bootstrap/dist/css/bootstrap.min.css';

type FormProps = {
  children: React.ReactNode,
  allowSubmit: boolean,
  onSubmit: () => void
}

export function Form({ children, allowSubmit, onSubmit }: FormProps) {
  /**
   * Enterキー押下時処理
   * @param e 
   */
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault(); // ページリロード防止
    if (!allowSubmit) return;
    onSubmit();
  }
  
  return (
    // <form onSubmit={handleSubmit} noValidate>{children}</form>
    <form onSubmit={handleSubmit}>{children}</form>
  );
}