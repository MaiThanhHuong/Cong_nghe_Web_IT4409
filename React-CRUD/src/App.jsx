import React from "react";
import SearchForm from "./components/SearchForm.jsx";
import AddUser from "./components/AddUser.jsx";
import ResultTable from "./components/ResultTable.jsx";

export default function App() {
  const [kw, setKeyword] = React.useState("");
  const [newUser, setNewUser] = React.useState(null);

  return (
    <div className="container">
      <div className="card">
        <h1>Quản lý người dùng</h1>
        <div className="toolbar">
          <SearchForm onChangeValue={setKeyword} />
          <AddUser onAdd={setNewUser} />
        </div>
        <ResultTable
          keyword={kw}
          user={newUser}
          onAdded={() => setNewUser(null)}
        />
      </div>
    </div>
  );
}
