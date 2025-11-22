import React from "react";
import SearchForm from "./components/SearchForm.jsx";
import AddUser from "./components/AddUser.jsx";
import ResultTable from "./components/ResultTable.jsx";

const API_URL = "https://jsonplaceholder.typicode.com/users";

// chỉnh sửa user
function EditUserModal({ user, onSave, onClose, submitting }) {
  const [form, setForm] = React.useState(user);

  React.useEffect(() => {
    setForm(user);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  if (!user) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Sửa người dùng</h2>
        <form onSubmit={handleSubmit} className="form">
          <label>
            Name
            <input
              name="name"
              value={form.name ?? ""}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email
            <input
              name="email"
              type="email"
              value={form.email ?? ""}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Phone
            <input
              name="phone"
              value={form.phone ?? ""}
              onChange={handleChange}
              required
            />
          </label>
          <div className="row">
            <button
              type="button"
              className="btn"
              onClick={onClose}
              disabled={submitting}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? "Đang lưu..." : "Lưu"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function App() {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const [keyword, setKeyword] = React.useState("");
  const [page, setPage] = React.useState(1);
  const PAGE_SIZE = 5;

  const [editingUser, setEditingUser] = React.useState(null);
  const [submitting, setSubmitting] = React.useState(false);

  // READ: lấy danh sách user
  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(API_URL);
        if (!res.ok) {
          throw new Error("Không tải được danh sách người dùng");
        }
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err.message || "Có lỗi xảy ra khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Search theo name va username
  const filteredUsers = React.useMemo(() => {
    const kw = keyword.toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(kw) ||
        (u.username && u.username.toLowerCase().includes(kw))
    );
  }, [users, keyword]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));

  React.useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [totalPages, page]);

  const currentUsers = React.useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredUsers.slice(start, start + PAGE_SIZE);
  }, [filteredUsers, page]);

  // CREATE: thêm user mới
  const handleCreateUser = async (newUserData) => {
    try {
      setSubmitting(true);
      setError(null);

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserData),
      });

      if (!res.ok) {
        throw new Error("Không tạo được người dùng");
      }

      const data = await res.json();
      const userWithId = {
        ...newUserData,
        id: data.id ?? Date.now(),
      };

      setUsers((prev) => {
        const updated = [...prev, userWithId];
        const newTotalPages = Math.max(
          1,
          Math.ceil(updated.length / PAGE_SIZE)
        );
        setPage(newTotalPages);
        return updated;
      });
    } catch (err) {
      setError(err.message || "Có lỗi xảy ra khi tạo người dùng");
    } finally {
      setSubmitting(false);
    }
  };

  // UPDATE: sửa user
  const handleUpdateUser = async (updatedUser) => {
    try {
      setSubmitting(true);
      setError(null);

      const res = await fetch(`${API_URL}/${updatedUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (!res.ok) {
        throw new Error("Không cập nhật được người dùng");
      }

      await res.json();

      setUsers((prev) =>
        prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
      );
      setEditingUser(null);
    } catch (err) {
      setError(err.message || "Có lỗi xảy ra khi cập nhật người dùng");
    } finally {
      setSubmitting(false);
    }
  };

  // DELETE: xóa user
  const handleDeleteUser = async (id) => {
    const ok = window.confirm("Bạn có chắc chắn muốn xóa người dùng này?");
    if (!ok) return;

    try {
      setSubmitting(true);
      setError(null);

      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Không xóa được người dùng");
      }

      setUsers((prev) => {
        const updated = prev.filter((u) => u.id !== id);
        const newTotalPages = Math.max(
          1,
          Math.ceil(updated.length / PAGE_SIZE)
        );
        if (page > newTotalPages) {
          setPage(newTotalPages);
        }
        return updated;
      });
    } catch (err) {
      setError(err.message || "Có lỗi xảy ra khi xóa người dùng");
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenEdit = (user) => {
    setEditingUser(user);
  };

  const handleCloseEdit = () => {
    if (!submitting) setEditingUser(null);
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Quản lý người dùng</h1>

        <div className="toolbar">
          <SearchForm onChangeValue={setKeyword} />
          <AddUser onAdd={handleCreateUser} submitting={submitting} />
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        {loading ? (
          <div>Đang tải dữ liệu...</div>
        ) : (
          <>
            <ResultTable
              users={currentUsers}
              onEdit={handleOpenEdit}
              onDelete={handleDeleteUser}
            />

            {/* Pagination */}
            <div className="pagination">
              <button
                className="btn"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                {" "}
                &lt;
              </button>
              <span>
                Trang {page} / {totalPages}
              </span>
              <button
                className="btn"
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                {" "}
                &gt;
              </button>
            </div>
          </>
        )}

        {/* Modal edit */}
        {editingUser && (
          <EditUserModal
            user={editingUser}
            onSave={handleUpdateUser}
            onClose={handleCloseEdit}
            submitting={submitting}
          />
        )}
      </div>
    </div>
  );
}
