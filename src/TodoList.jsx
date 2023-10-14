import { useEffect, useState } from "react";
import imageListTask from "../src/assets/Task-List-PNG-Picture.png";
import "./TodoList.css";
function TodoList() {
  const listStorage = localStorage.getItem("List");
  const [list, setList] = useState(listStorage ? JSON.parse(listStorage) : []);
  const [newItem, setNewItem] = useState("");
  useEffect(() => {
    localStorage.setItem("List", JSON.stringify(list));
  }, [list]);
  function addItem(e) {
    e.preventDefault();
    if (!newItem) {
      return;
    }
    setList([...list, { text: newItem, isCompleted: false }]);
    setNewItem("");
    document.getElementById("task").focus();
  }
  function clicou(index) {
    const listAut = [...list];
    listAut[index].isCompleted = !listAut[index].isCompleted;
    setList(listAut);
  }
  function deleteItem(index) {
    const listAut = [...list];
    listAut.splice(index, 1);
    setList(listAut);
  }
  function deleteAll() {
    setList([]);
  }
  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <form onSubmit={addItem}>
        <input
          type="text"
          id="task"
          value={newItem}
          onChange={(e) => {
            setNewItem(e.target.value);
          }}
          placeholder="Adicione sua tarefa aqui"
        />
        <button className="add" type="submit">
          Add
        </button>
      </form>
      <div className="list-tasks">
        {list.length < 1 ? (
          <div>
            <img
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "450px",
              }}
              src={imageListTask}
              alt="image de lista de tarefas"
            />
          </div>
        ) : (
          list.map((item, index) => (
            <div
              key={index}
              className={item.isCompleted ? "item-task completed" : "item-task"}
            >
              <span
                onClick={() => {
                  clicou(index);
                }}
              >
                {item.text}
              </span>
              <button
                onClick={() => {
                  deleteItem(index);
                }}
              >
                Deletar
              </button>
            </div>
          ))
        )}
        {list.length > 1 && (
          <button
            onClick={() => {
              deleteAll();
            }}
            className="delete-all"
          >
            Deletar Todas
          </button>
        )}
      </div>
    </div>
  );
}
export default TodoList;
