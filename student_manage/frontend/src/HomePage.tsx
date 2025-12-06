import { useEffect, useState } from "react";
import axios from "axios";
import AddStudentForm from "./AddStudentForm";
import { Link } from "react-router-dom";
import type { Student } from "./type";

function HomePage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    axios
      .get<Student[]>("http://localhost:5000/api/students")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error("Lỗi tải danh sách:", err));
  }, []);

  const handleStudentAdded = (student: Student) => {
    setStudents((prev) => [...prev, student]);
  };

  // ---------- DELETE ----------
  const handleDelete = (id?: string) => {
    if (!id) return;

    if (!window.confirm("Bạn có chắc muốn xóa học sinh này?")) return;

    axios
      .delete(`http://localhost:5000/api/students/${id}`)
      .then((res) => {
        console.log(res.data.message);
        setStudents((prev) => prev.filter((s) => s._id !== id));
      })
      .catch((err) => console.error("Lỗi khi xóa:", err));
  };

  // ---------- SEARCH ----------
  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ---------- SORT ----------
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    if (nameA < nameB) return sortAsc ? -1 : 1;
    if (nameA > nameB) return sortAsc ? 1 : -1;
    return 0;
  });

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px",
        background: "#E8F5F2",
        borderRadius: "14px",
        boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2
        style={{ textAlign: "center", color: "#2F7F72", marginBottom: "20px" }}
      >
        Danh sách học sinh
      </h2>

      {/* SEARCH + SORT ROW */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          gap: "10px",
        }}
      >
        {/* Ô tìm kiếm – thu ngắn lại */}
        <input
          type="text"
          placeholder="Tìm kiếm theo tên..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1, // cho phép co giãn
            maxWidth: "80%", // thu ngắn
            padding: "10px 14px",
            borderRadius: "8px",
            border: "1px solid #bcd4d2",
            fontSize: "16px",
          }}
        />

        {/* Nút sắp xếp đặt bên phải */}
        <button
          onClick={() => setSortAsc((prev) => !prev)}
          style={{
            marginLeft: "auto",
            padding: "10px 14px",
            borderRadius: "8px",
            background: "#457b9d",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            border: "none",
            whiteSpace: "nowrap",
          }}
        >
          {sortAsc ? "Sắp xếp A → Z" : "Sắp xếp Z → A"}
        </button>
      </div>

      {/* FORM THÊM */}
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          marginBottom: "25px",
        }}
      >
        <AddStudentForm onStudentAdded={handleStudentAdded} />
      </div>

      {sortedStudents.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            padding: "20px",
            color: "#555",
            fontStyle: "italic",
          }}
        >
          Không tìm thấy học sinh phù hợp
        </p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "white",
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  background: "#A8DADC",
                  padding: "12px",
                  color: "#1d3557",
                  textAlign: "left",
                }}
              >
                Họ tên
              </th>
              <th
                style={{
                  background: "#A8DADC",
                  padding: "12px",
                  color: "#1d3557",
                  textAlign: "left",
                }}
              >
                Tuổi
              </th>
              <th
                style={{
                  background: "#A8DADC",
                  padding: "12px",
                  color: "#1d3557",
                  textAlign: "left",
                }}
              >
                Lớp
              </th>
              <th
                style={{
                  background: "#A8DADC",
                  padding: "12px",
                  color: "#1d3557",
                  textAlign: "left",
                }}
              ></th>
            </tr>
          </thead>

          <tbody>
            {sortedStudents.map((st, index) => (
              <tr
                key={st._id}
                style={{
                  background: index % 2 === 0 ? "#F7FAFC" : "white",
                  transition: "0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#E0F7F4")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background =
                    index % 2 === 0 ? "#F7FAFC" : "white")
                }
              >
                <td
                  style={{ padding: "12px", borderBottom: "1px solid #e5e5e5" }}
                >
                  {st.name}
                </td>
                <td
                  style={{ padding: "12px", borderBottom: "1px solid #e5e5e5" }}
                >
                  {st.age}
                </td>
                <td
                  style={{ padding: "12px", borderBottom: "1px solid #e5e5e5" }}
                >
                  {st.class}
                </td>

                <td style={{ padding: "12px", textAlign: "center" }}>
                  <Link
                    to={`/edit/${st._id}`}
                    style={{
                      background: "#79cbb8",
                      color: "white",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      textDecoration: "none",
                      fontWeight: "bold",
                      marginRight: "8px",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
                    }}
                  >
                    Sửa
                  </Link>

                  <button
                    onClick={() => handleDelete(st._id)}
                    style={{
                      background: "#e63946",
                      color: "white",
                      padding: "6px 12px",
                      border: "none",
                      borderRadius: "6px",
                      fontWeight: "bold",
                      cursor: "pointer",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
                    }}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default HomePage;
