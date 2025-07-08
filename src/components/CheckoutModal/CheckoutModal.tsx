import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './CheckoutModal.module.scss';
import { bodyText } from '../../styles/typography.module.scss';
import { useAppDispatch } from '../../app/hooks';
import { clearCart } from '../../features/actionButtonsSlice';

type Props = {
  closeModal: () => void;
};

export const CheckoutModal: React.FC<Props> = ({ closeModal }) => {
  const dispatch = useAppDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
    closeModal();
  };

  useEffect(() => {
    const onEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };
    document.addEventListener('keydown', onEsc);

    return () => {
      document.removeEventListener('keydown', onEsc);
    };
  }, []);

  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3 className={bodyText}>
          Checkout is not implemented yet. Would you like to clear your shopping
          cart and start imaginary shopping again?
        </h3>

        <button className={styles.confirm} onClick={handleClearCart}>
          Yes
        </button>
        <button className={styles.cancel} onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>,
    document.getElementById('portal-root')!,
  );
};
