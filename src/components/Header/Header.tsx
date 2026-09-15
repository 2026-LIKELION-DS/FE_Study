import mascot from "../../img/투두리스트 사진.jpg";
import "./Header.css";

const Header = () => {
  return (
    <div className="todo-container__header-wrap">
      <div className="todo-container__mascot-frame">
        <img className="todo-container__mascot" src={mascot} alt="투두리스트 마스코트" />
      </div>
      <h1 className="todo-container__header">To Do List</h1>
    </div>
  );
};

export default Header;
