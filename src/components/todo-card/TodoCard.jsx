import { AiTwotoneDelete } from 'react-icons/ai';
import { FiEdit2 } from 'react-icons/fi';
import containerStyles from '../../pages/TodoPage.module.css';

export const TodoCard = ({ item, editStatus, setEditTodo, setEditId, setText, deleteTodo }) => {
  return (
    <div className={containerStyles.todoCard}>
      <div className={containerStyles.checkbox}>
        <input
          type="checkbox"
          checked={item.status === 'complete'}
          onChange={() => editStatus(item.id)}
        />
      </div>

      <div className={containerStyles.titleContainer}>
        {item.status === 'pending' ? item.title : <s>{item.title}</s>}
      </div>
      <div className={containerStyles.editDelete}>
        <div>
          <FiEdit2
            size={20}
            onClick={() => {
              setEditTodo(true);
              setEditId(item.id);
              setText(item.title);
            }}
          />
        </div>
        <div onClick={() => deleteTodo(item.id)} className={containerStyles.redColor}>
          <AiTwotoneDelete size={20} />
        </div>
      </div>
    </div>
  );
};
