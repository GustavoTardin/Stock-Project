import ReactModal from 'react-modal';

interface ModalProps {
  showModal: boolean;
  toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
  tryDelete: () => Promise<void>;
}

function DelConfirmation({ tryDelete, toggleModal, showModal }: ModalProps) {
  const handleButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget;
    if (id === 'yes') {
      tryDelete();
    }
    toggleModal(false);
  };

  return (
    <ReactModal isOpen={ showModal }>
      <h2>Você tem certeza que deseja excluir esse usuário?</h2>
      <button id="yes" onClick={ handleButton }>Sim</button>
      <button id="no" onClick={ handleButton }>Não</button>

    </ReactModal>
  );
}

export default DelConfirmation;
