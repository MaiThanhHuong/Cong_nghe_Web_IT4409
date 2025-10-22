/* Lấy các phần tử giao diện */
const searchInput = document.getElementById("searchInput");
const addProductBtn = document.getElementById("addProductBtn");
const addProductForm = document.getElementById("addProductForm");
const cancelBtn = document.getElementById("cancelBtn");
const productList = document.getElementById("product-list");
const errorMsg = document.getElementById("errorMsg");

/* Khởi tạo sản phẩm mẫu */
const defaultProducts = [
  {
    name: "Cà phê phin đen đá / nóng",
    price: 35000,
    desc: "Đậm, thơm, vị đặc trưng của cà phê rang xay Việt Nam.",
    image:
      "https://taynguyensoul.vn/wp-content/uploads/2022/06/cach-pha-cafe-phin-cho-quan-taynguyensoul.vn_.jpeg",
  },
  {
    name: "Cà phê sữa đá",
    price: 35000,
    desc: "Thức uống truyền thống Việt Nam — hòa quyện vị đắng và sữa đặc béo ngọt.",
    image:
      "https://i.pinimg.com/736x/8f/a5/f6/8fa5f635efc22c2732b0740d06bd9bbd.jpg",
  },
  {
    name: "Cà phê trứng",
    price: 45000,
    desc: "Cà phê trứng béo ngậy, thơm ngon — sự kết hợp độc đáo của trứng và cà phê.",
    image:
      "https://i.pinimg.com/736x/73/e2/5b/73e25b3461b23674decc807eb7fb5f6c.jpg",
  },
];

/* Hàm hiển thị danh sách sản phẩm */
function renderProducts(products) {
  productList.innerHTML = ""; // xóa danh sách cũ

  products.forEach((p) => {
    const item = document.createElement("article");
    item.className = "product-item";
    item.innerHTML = `
      <img src="${p.image}" alt="${p.name}" />
      <h3 class="product-name">${p.name}</h3>
      <p>${p.desc}</p>
      <p class="price">Giá: ${Number(p.price).toLocaleString("vi-VN")}₫</p>
    `;
    productList.appendChild(item);
  });
}

/* Load dữ liệu từ localStorage khi trang mở */
let products = [];

window.addEventListener("DOMContentLoaded", () => {
  const stored = localStorage.getItem("products");

  if (stored) {
    // Nếu có dữ liệu lưu thì load ra
    products = JSON.parse(stored);
  } else {
    // Nếu chưa có thì khởi tạo dữ liệu mẫu
    products = defaultProducts;
    localStorage.setItem("products", JSON.stringify(products));
  }

  renderProducts(products);
});

/* Tìm kiếm / lọc sản phẩm */
searchInput.addEventListener("keyup", () => {
  const keyword = searchInput.value.toLowerCase().trim();
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(keyword)
  );
  renderProducts(filtered);
});

/* Ẩn / hiện form thêm sản phẩm */
addProductBtn.addEventListener("click", () => {
  addProductForm.classList.toggle("hidden");
  errorMsg.textContent = "";
});

cancelBtn.addEventListener("click", () => {
  addProductForm.reset();
  addProductForm.classList.add("hidden");
});

/* Thêm sản phẩm mới + lưu localStorage */
addProductForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("newName").value.trim();
  const price = document.getElementById("newPrice").value.trim();
  const desc = document.getElementById("newDesc").value.trim();
  const image = document.getElementById("newImage").value.trim();

  // Validate dữ liệu
  if (!name) {
    errorMsg.textContent = "Vui lòng nhập tên sản phẩm.";
    return;
  }

  if (!price || isNaN(price) || Number(price) <= 0) {
    errorMsg.textContent = "Giá phải là số hợp lệ và lớn hơn 0.";
    return;
  }

  if (desc.length < 5) {
    errorMsg.textContent = "Mô tả quá ngắn, vui lòng nhập chi tiết hơn.";
    return;
  }

  if (!image.startsWith("http")) {
    errorMsg.textContent = "Link ảnh không hợp lệ.";
    return;
  }

  errorMsg.textContent = "";

  // Tạo sản phẩm mới
  const newProduct = {
    name,
    price: Number(price),
    desc,
    image,
  };

  // Thêm vào mảng sản phẩm
  products.unshift(newProduct); // thêm lên đầu

  // Cập nhật giao diện
  renderProducts(products);

  // Lưu lại vào localStorage
  localStorage.setItem("products", JSON.stringify(products));

  // Reset form
  addProductForm.reset();
  addProductForm.classList.add("hidden");
});
