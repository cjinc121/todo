import { FiCornerDownRight } from 'react-icons/fi';
import containerStyles from '../../pages/TodoPage.module.css';

export const ModalCard = ({ setActionTodo, text, setText, action, editId }) => {
  return (
    <div
      className={containerStyles.modalPage}
      onClick={() => {
        setActionTodo(false);
      }}
    >
      <div className={containerStyles.modalBox} onClick={(e) => e.stopPropagation()}>
        <div className={containerStyles.addCard}>
          <h3>{editId ? 'Edit Todo' : 'Add new Todo'}</h3>
          <label>Title :</label>
          <br />
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} />

          <button
            className={containerStyles.okay}
            disabled={text.length === 0}
            onClick={() => {
              if (editId) action(editId, text);
              else action(text);
              setText('');
              setActionTodo(false);
            }}
          >
            <FiCornerDownRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
