import React from "react";

export default function AddUser({ onAdd }) {
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState({
    name: "",
    username: "",
    email: "",
    address: { street: "", suite: "", city: "" },
    phone: "",
    website: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (["street", "suite", "city"].includes(id)) {
      setUser((prev) => ({
        ...prev,
        address: { ...prev.address, [id]: value },
      }));
    } else {
      setUser((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleAdd = () => {
    if (!user.name.trim() || !user.username.trim()) {
      alert("Vui lòng nhập Name và Username!");
      return;
    }
    onAdd(user);
    setUser({
      name: "",
      username: "",
      email: "",
      address: { street: "", suite: "", city: "" },
      phone: "",
      website: "",
    });
    setOpen(false);
  };

  return (
    <>
      <button className="btn btn-primary" onClick={() => setOpen(true)}>
        Thêm
      </button>
      {open && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-content">
            <h3>Thêm người dùng</h3>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginTop: "10px",
              }}
            >
              <div>
                <label htmlFor="name" className="badge">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={user.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="username" className="badge">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={user.username}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="email" className="badge">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={user.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="phone" className="badge">
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={user.phone}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="website" className="badge">
                  Website
                </label>
                <input
                  id="website"
                  type="url"
                  value={user.website}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="badge">Địa chỉ</label>
                <input
                  id="street"
                  type="text"
                  placeholder="Street"
                  value={user.address.street}
                  onChange={handleChange}
                />
                <input
                  id="suite"
                  type="text"
                  placeholder="Suite"
                  value={user.address.suite}
                  onChange={handleChange}
                  style={{ marginTop: 8 }}
                />
                <input
                  id="city"
                  type="text"
                  placeholder="City"
                  value={user.address.city}
                  onChange={handleChange}
                  style={{ marginTop: 8 }}
                />
              </div>
            </div>

            <div className="row">
              <button className="btn" onClick={() => setOpen(false)}>
                Hủy
              </button>
              <button className="btn btn-primary" onClick={handleAdd}>
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
