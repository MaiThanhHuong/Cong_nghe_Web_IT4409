import React from "react";

export default function ResultTable({ users, onEdit, onDelete }) {
  if (!users.length) {
    return <div>Không có người dùng nào.</div>;
  }

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th style={{ width: "5rem" }}>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th style={{ width: "10rem" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
              <td>
                <button className="btn btn-small" onClick={() => onEdit(u)}>
                  Sửa
                </button>
                <button
                  className="btn btn-small btn-danger"
                  onClick={() => onDelete(u.id)}
                  style={{ marginLeft: 8 }}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
