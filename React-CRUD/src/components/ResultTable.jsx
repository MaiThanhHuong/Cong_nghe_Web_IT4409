
import React from 'react'

export default function ResultTable({ keyword, user, onAdded }) {
  const [users, setUsers] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [editing, setEditing] = React.useState(null)

  React.useEffect(() => {
    let alive = true
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(r => r.json())
      .then(data => { if (alive) { setUsers(data); setLoading(false) } })
      .catch(() => setLoading(false))
    return () => { alive = false }
  }, [])

  // Handle new user from parent
  React.useEffect(() => {
    if (user) {
      setUsers(prev => [...prev, { ...user, id: prev.length ? Math.max(...prev.map(u => u.id)) + 1 : 1 }])
      onAdded()
    }
  }, [user, onAdded])

  const filteredUsers = users.filter(u =>
    (u.name || '').toLowerCase().includes((keyword || '').toLowerCase()) ||
    (u.username || '').toLowerCase().includes((keyword || '').toLowerCase())
  )

  const editUser = (u) => setEditing({ ...u, address: { ...u.address } })
  const handleEditChange = (field, value) => {
    if (!editing) return
    if (['street','suite','city'].includes(field)) {
      setEditing(prev => ({ ...prev, address: { ...prev.address, [field]: value }}))
    } else {
      setEditing(prev => ({ ...prev, [field]: value }))
    }
  }
  const saveUser = () => {
    setUsers(prev => prev.map(u => u.id === editing.id ? editing : u))
    setEditing(null)
  }
  const removeUser = (id) => {
    setUsers(prev => prev.filter(u => u.id !== id))
  }

  if (loading) return <div className="subtle">Đang tải dữ liệu...</div>

  return (
    <div className="card" style={{marginTop: 12}}>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>City</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u?.address?.city}</td>
              <td>
                <div className="row">
                  <button className="btn" onClick={() => editUser(u)}>Sửa</button>
                  <button className="btn btn-danger" onClick={() => removeUser(u.id)}>Xóa</button>
                </div>
              </td>
            </tr>
          ))}
          {!filteredUsers.length && (
            <tr><td colSpan="6" className="subtle">Không có kết quả phù hợp.</td></tr>
          )}
        </tbody>
      </table>

      {editing && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-content">
            <h3>Chỉnh sửa</h3>
            <div className="grid-2">
              <div>
                <label className="badge">Name</label>
                <input type="text" value={editing.name} onChange={(e)=>handleEditChange('name', e.target.value)} />
              </div>
              <div>
                <label className="badge">Username</label>
                <input type="text" value={editing.username} onChange={(e)=>handleEditChange('username', e.target.value)} />
              </div>
              <div>
                <label className="badge">Email</label>
                <input type="email" value={editing.email || ''} onChange={(e)=>handleEditChange('email', e.target.value)} />
              </div>
              <div>
                <label className="badge">Phone</label>
                <input type="tel" value={editing.phone || ''} onChange={(e)=>handleEditChange('phone', e.target.value)} />
              </div>
              <div>
                <label className="badge">Website</label>
                <input type="url" value={editing.website || ''} onChange={(e)=>handleEditChange('website', e.target.value)} />
              </div>
              <div>
                <label className="badge">Địa chỉ</label>
                <input type="text" placeholder="Street" value={editing.address?.street || ''} onChange={(e)=>handleEditChange('street', e.target.value)} />
                <input type="text" placeholder="Suite" value={editing.address?.suite || ''} onChange={(e)=>handleEditChange('suite', e.target.value)} style={{marginTop:8}} />
                <input type="text" placeholder="City" value={editing.address?.city || ''} onChange={(e)=>handleEditChange('city', e.target.value)} style={{marginTop:8}} />
              </div>
            </div>
            <div className="row">
              <button className="btn" onClick={()=>setEditing(null)}>Hủy</button>
              <button className="btn btn-primary" onClick={saveUser}>Lưu</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
