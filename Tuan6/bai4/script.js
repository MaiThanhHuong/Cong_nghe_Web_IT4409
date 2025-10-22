/* Tìm kiếm sản phẩm */
const searchInput = document.getElementById("searchInput");

// Khi người dùng nhập từ khóa tìm kiếm
searchInput.addEventListener("keyup", () => {
  const keyword = searchInput.value.toLowerCase().trim();
  const products = document.querySelectorAll(".product-item");

  products.forEach((item) => {
    const name = item.querySelector(".product-name").textContent.toLowerCase();
    item.style.display = name.includes(keyword) ? "" : "none";
  });
});

/* Hiện/ ẩn form thêm sản phẩm */
const addProductBtn = document.getElementById("addProductBtn");
const addProductForm = document.getElementById("addProductForm");
const cancelBtn = document.getElementById("cancelBtn");

addProductBtn.addEventListener("click", () => {
  addProductForm.classList.toggle("hidden"); // bật/tắt form
  document.getElementById("errorMsg").textContent = ""; // reset lỗi nếu có
});

cancelBtn.addEventListener("click", () => {
  addProductForm.reset(); // xóa nội dung
  addProductForm.classList.add("hidden"); // ẩn form
});

/* Xử lý submit form */
addProductForm.addEventListener("submit", (event) => {
  event.preventDefault(); // chặn reload trang

  // Lấy giá trị từ form
  const name = document.getElementById("newName").value.trim();
  const price = document.getElementById("newPrice").value.trim();
  const desc = document.getElementById("newDesc").value.trim();
  const image = document.getElementById("newImage").value.trim();
  const errorMsg = document.getElementById("errorMsg");

  // validation
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
    errorMsg.textContent = "Vui lòng nhập link ảnh hợp lệ (bắt đầu bằng http).";
    return;
  }

  // Nếu hợp lệ thì xóa thông báo lỗi
  errorMsg.textContent = "";

  // Tạo phần tử sản phẩm mới
  const newItem = document.createElement("article");
  newItem.className = "product-item";
  newItem.innerHTML = `
    <img src="${image}" alt="${name}" />
    <h3 class="product-name">${name}</h3>
    <p>${desc}</p>
    <p class="price">Giá: ${Number(price).toLocaleString("vi-VN")}₫</p>
  `;

  // Thêm sản phẩm mới vào danh sách
  const productList = document.getElementById("product-list");
  productList.prepend(newItem); // thêm lên đầu danh sách

  // Reset form và ẩn
  addProductForm.reset();
  addProductForm.classList.add("hidden");
});
