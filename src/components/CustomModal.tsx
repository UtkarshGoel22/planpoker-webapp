import React from 'react';
import { Modal } from '@material-ui/core';
import { modalStyles } from '../styles/style';

type ModalPropType = {
  open: boolean;
  message: string;
  handleOnClick?: () => void;
  buttonText?: string;
  isButton?: boolean;
  isCenter?: boolean;
};

const CustomModal = ({
  open,
  message,
  handleOnClick,
  buttonText,
  isButton = true,
  isCenter = true,
}: ModalPropType) => {
  const modalClasses = modalStyles();

  return (
    <Modal
      open={open}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div
        className={`${modalClasses.container} ${
          isCenter ? modalClasses.centerAll : modalClasses.centerHorizontal
        }`}
      >
        <div className={modalClasses.paper}>
          <h2 className={modalClasses.gap}>{message}</h2>
          {isButton && (
            <button
              className="btn"
              type="button"
              onClick={() => {
                if (handleOnClick) handleOnClick();
              }}
            >
              {buttonText}
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default CustomModal;
