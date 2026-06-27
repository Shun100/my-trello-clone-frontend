import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useAtom } from 'jotai';
import { Toast, ToastContainer } from 'react-bootstrap';
import { toastAtom } from '../../../modules/toast/toast.state';

export function ErrorToast() {
  const [showToast, setShowToast] = useAtom(toastAtom);

  return (
    <>
      <ToastContainer position='top-end' className='p-3'>
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
          bg=''
          className='border-0 shadow bg-danger-subtle rounded-4'
          style={{
            minWidth: '200px',
            borderLeft: '6px solid #dc3545'
          }}
        >
          <Toast.Body
            className='d-flex align-items-center gap-3' // danger-subtle: #f8d7da
            style={{ height: '4em' }}
          >
            <div className='fs-4 text-danger flex-shrink-0'>
              <i
                className='bi bi-x-circle-fill'
                onClick={() => setShowToast(false)}
                style={{ cursor: 'pointer' }}
              />
            </div>
            <div className='flex-grow-1'>
              <div className='fw-bold'>Error</div>
              <div className='text-secondary small'>保存に失敗しました</div>
            </div>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}