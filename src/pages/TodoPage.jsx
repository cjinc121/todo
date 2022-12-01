import containerStyles from './TodoPage.module.css';
import Todo from '../assets/todo.png';
import { RiAddLine } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import { ModalCard } from '../components/modal-card/ModalCard';
import { TodoCard } from '../components/todo-card/TodoCard';

export const TodoPage = () => {
  const [showAddTodoModal, setShowAddTodoModal] = useState(false);
  const [showEditTodoModal, setshowEditTodoModal] = useState(false);
  const [editId, setEditId] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [selectedtabStatus, setSelectedtabStatus] = useState('ALL');
  const [text, setText] = useState('');

  const addTodo = (value) => {
    const newTodolist = [...todoList, { id: uuid(), title: value, status: 'pending' }];
    setTodoList(newTodolist);
    localStorage.setItem('TODO_LIST', JSON.stringify(newTodolist));
  };
  const editTodo = (id, value) => {
    const newTodoList = [...todoList];
    for (let i = 0; i < newTodoList.length; i++) {
      if (newTodoList[i].id === id) {
        newTodoList[i].title = value;
      }
    }
    setTodoList(newTodoList);
    localStorage.setItem('TODO_LIST', JSON.stringify(newTodoList));
  };
  const editStatus = (id) => {
    const newTodoList = [...todoList];
    for (let i = 0; i < newTodoList.length; i++) {
      if (newTodoList[i].id === id && newTodoList[i].status === 'complete') {
        newTodoList[i].status = 'pending';
      } else if (newTodoList[i].id === id && newTodoList[i].status === 'pending') {
        newTodoList[i].status = 'complete';
      }
    }
    setTodoList(newTodoList);
    localStorage.setItem('TODO_LIST', JSON.stringify(newTodoList));
  };
  const deleteTodo = (id) => {
    const newTodoList = [...todoList];
    setTodoList(newTodoList.filter((item) => item.id !== id));
    localStorage.setItem('TODO_LIST', JSON.stringify(newTodoList.filter((item) => item.id !== id)));
  };
  useEffect(() => {
    if (localStorage.getItem('TODO_LIST')) {
      setTodoList(JSON.parse(localStorage.getItem('TODO_LIST')));
    }
  }, []);

  return (
    <div className={containerStyles.main}>
      <div className={containerStyles.card}>
        <div className={containerStyles.topCard}>
          <div className={containerStyles.imageContainer}>
            <img src={Todo} alt="todo" className={containerStyles.image} />
          </div>
          <div className={containerStyles.tabContainer}>
            <div
              className={
                selectedtabStatus === 'ALL'
                  ? `${containerStyles.tab} ${containerStyles.tabActive} `
                  : `${containerStyles.tab}`
              }
              onClick={() => setSelectedtabStatus('ALL')}
            >
              {' '}
              All
            </div>
            <div
              className={
                selectedtabStatus === 'DONE'
                  ? `${containerStyles.tab} ${containerStyles.tabActive} `
                  : `${containerStyles.tab}`
              }
              onClick={() => setSelectedtabStatus('DONE')}
            >
              Done
            </div>
          </div>
        </div>
        <div className={containerStyles.todoWrapper}>
          <div className={containerStyles.todoContainer}>
            {todoList &&
              selectedtabStatus === 'ALL' &&
              todoList.map((item) => {
                return (
                  <TodoCard
                    item={item}
                    editStatus={editStatus}
                    setshowEditTodoModal={setshowEditTodoModal}
                    setEditId={setEditId}
                    setText={setText}
                    deleteTodo={deleteTodo}
                  />
                );
              })}

            {todoList &&
              selectedtabStatus === 'DONE' &&
              todoList.map((item) => {
                if (item.status === 'complete')
                  return (
                    <TodoCard
                      item={item}
                      editStatus={editStatus}
                      setshowEditTodoModal={setshowEditTodoModal}
                      setEditId={setEditId}
                      setText={setText}
                      deleteTodo={deleteTodo}
                    />
                  );
              })}
            <div className={containerStyles.add} onClick={() => setShowAddTodoModal(true)}>
              <RiAddLine size={40} />
            </div>

            {showAddTodoModal && (
              <ModalCard
                setActionTodo={setShowAddTodoModal}
                text={text}
                setText={setText}
                action={addTodo}
              />
            )}
            {showEditTodoModal && (
              <ModalCard
                setActionTodo={setshowEditTodoModal}
                text={text}
                setText={setText}
                action={editTodo}
                editId={editId}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
