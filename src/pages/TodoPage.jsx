import './TodoPage.css';
import Todo from '../assets/todo.png';
import { AiTwotoneDelete } from 'react-icons/ai';
import { FiEdit2 } from 'react-icons/fi';
import { RiAddLine } from 'react-icons/ri';
import { FiCornerDownRight } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import uuid from 'react-uuid';

export const TodoPage = () => {
  const [addTodo, setAddTodo] = useState(false);
  const [editTodo, setEditTodo] = useState({ edit: false });
  const [todoList, setTodoList] = useState([]);
  const [tabStatus, setTabStatus] = useState('ALL');
  const [text, setText] = useState('');
  const add = (value) => {
    const newTodolist = [...todoList, { id: uuid(), title: value, status: 'pending' }];
    setTodoList(newTodolist);
    localStorage.setItem('TODO_LIST', JSON.stringify(newTodolist));
  };
  const edit = (id, value) => {
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
    console.log(todoList);
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
    <div className="main">
      <div className="card">
        <div className="image-container">
          <img src={Todo} alt="todo" className="image" />
        </div>
        <div className="tab-container">
          <div
            className={tabStatus === 'ALL' ? 'tab tab-active' : 'tab'}
            onClick={() => setTabStatus('ALL')}
          >
            {' '}
            All
          </div>
          <div
            className={tabStatus === 'DONE' ? 'tab tab-active' : 'tab'}
            onClick={() => setTabStatus('DONE')}
          >
            Done
          </div>
        </div>
        <div className="todo-container">
          {todoList &&
            tabStatus === 'ALL' &&
            todoList.map((item) => {
              return (
                <div className="todo-card">
                  <div className="checkbox">
                    <input
                      type="checkbox"
                      checked={item.status === 'complete'}
                      onChange={() => editStatus(item.id)}
                    />
                  </div>

                  <div>{item.status === 'pending' ? item.title : <s>{item.title}</s>}</div>
                  <div className="edit-delete">
                    <div>
                      <FiEdit2
                        size={20}
                        onClick={() => {
                          setEditTodo({ edit: true, id: item.id });
                          setText(item.title);
                        }}
                      />
                    </div>
                    <div onClick={() => deleteTodo(item.id)}>
                      <AiTwotoneDelete size={20} />
                    </div>
                  </div>
                </div>
              );
            })}
          {todoList &&
            tabStatus === 'DONE' &&
            todoList.map((item) => {
              if (item.status === 'complete')
                return (
                  <div className="todo-card">
                    <div className="checkbox">
                      <input
                        type="checkbox"
                        checked={item.status === 'complete'}
                        onChange={() => editStatus(item.id)}
                      />
                    </div>

                    <div>{item.status === 'pending' ? item.title : <s>{item.title}</s>}</div>
                    <div className="edit-delete">
                      <div>
                        <FiEdit2
                          size={20}
                          onClick={() => {
                            setEditTodo({ edit: true, id: item.id });
                            setText(item.title);
                          }}
                        />
                      </div>
                      <div onClick={() => deleteTodo(item.id)}>
                        <AiTwotoneDelete size={20} />
                      </div>
                    </div>
                  </div>
                );
            })}
          <div className="add" onClick={() => setAddTodo(true)}>
            <RiAddLine size={40} />
          </div>

          {addTodo && (
            <div
              className="modal-page"
              onClick={() => {
                setAddTodo(false);
              }}
            >
              <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                <div className="add-card">
                  <h3>Add new Todo</h3>
                  <label>Title :</label>
                  <br />
                  <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
                  <div
                    className="okay"
                    onClick={() => {
                      add(text);
                      setText('');
                      setAddTodo(false);
                    }}
                  >
                    <FiCornerDownRight size={20} />
                  </div>
                </div>
              </div>
            </div>
          )}
          {editTodo.edit && (
            <div
              className="modal-page"
              onClick={() => {
                setEditTodo({ edit: false });
              }}
            >
              <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                <div className="add-card">
                  <h3>Edit Todo</h3>
                  <label>Title :</label>
                  <br />
                  <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
                  <div
                    className="okay"
                    onClick={() => {
                      console.log('hi');
                      edit(editTodo.id, text);
                      setText('');
                      setEditTodo({ edit: false });
                    }}
                  >
                    <FiCornerDownRight size={20} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
