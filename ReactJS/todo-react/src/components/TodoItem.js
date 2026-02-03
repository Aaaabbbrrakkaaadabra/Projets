function TodoItem({ todo, index, toggleTodo, deleteTodo }) {
    return (
      <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
        <span onClick={() => toggleTodo(index)}>
          {todo.text}
        </span>
        <button onClick={() => deleteTodo(index)}>❌</button>
      </li>
    );
  }
  
  export default TodoItem;
  