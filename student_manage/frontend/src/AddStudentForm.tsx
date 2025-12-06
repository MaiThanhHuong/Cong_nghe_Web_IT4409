import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number | "">("");
  const [stuClass, setStuClass] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/students/${id}`)
      .then((res) => {
        setName(res.data.name);
        setAge(res.data.age);
        setStuClass(res.data.class);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/api/students/${id}`, {
        name,
        age: Number(age),
        class: stuClass,
      })
      .then(() => {
        setMessage("Cập nhật học sinh thành công!");

        // Ẩn thông báo sau 3 giây
        setTimeout(() => {
          setMessage("");
          navigate("/");
        }, 3000);
      })
      .catch((err) => {
        console.error("Lỗi khi cập nhật:", err);
        setMessage("Lỗi khi cập nhật học sinh!");
        setTimeout(() => setMessage(""), 3000);
      });
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "20px",
        background: "#E8F5F2",
        borderRadius: "14px",
        boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#2F7F72",
          marginBottom: "20px",
        }}
      >
        Chỉnh sửa học sinh
      </h2>

      {message && (
        <p
          style={{
            padding: "10px",
            borderRadius: "8px",
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: "15px",
            background: message.includes("thành công") ? "#D9F8F2" : "#FFE1E1",
            color: message.includes("thành công") ? "#2F7F72" : "red",
          }}
        >
          {message}
        </p>
      )}

      <form
        onSubmit={handleUpdate}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "14px",
        }}
      >
        <input
          type="text"
          placeholder="Họ tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            padding: "10px 14px",
            borderRadius: "10px",
            border: "1px solid #bfe4de",
            background: "#f2fffd",
            outline: "none",
            fontSize: "15px",
            width: "260px",
          }}
        />

        <input
          type="number"
          placeholder="Tuổi"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          required
          style={{
            padding: "10px 14px",
            borderRadius: "10px",
            border: "1px solid #bfe4de",
            background: "#f2fffd",
            outline: "none",
            fontSize: "15px",
            width: "260px",
          }}
        />

        <input
          type="text"
          placeholder="Lớp"
          value={stuClass}
          onChange={(e) => setStuClass(e.target.value)}
          required
          style={{
            padding: "10px 14px",
            borderRadius: "10px",
            border: "1px solid #bfe4de",
            background: "#f2fffd",
            outline: "none",
            fontSize: "15px",
            width: "260px",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "10px 18px",
            background: "#79cbb8",
            border: "none",
            borderRadius: "10px",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            width: "260px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            transition: "0.25s",
          }}
        >
          Lưu thay đổi
        </button>
      </form>
    </div>
  );
}

export default EditStudent;
