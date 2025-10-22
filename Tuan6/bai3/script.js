/* Tìm kiếm và lọc sản phẩm */

// Lấy phần tử thanh tìm kiếm
const searchInput = document.getElementById("searchInput");

// Gắn sự kiện khi người dùng nhập từ khóa
searchInput.addEventListener("keyup", () => {
  // Lấy từ khóa, bỏ khoảng trắng và chuyển về chữ thường
  const keyword = searchInput.value.toLowerCase().trim();

  // Lấy danh sách tất cả sản phẩm
  const products = document.querySelectorAll(".product-item");

  // Duyệt qua từng sản phẩm để kiểm tra
  products.forEach((item) => {
    const name = item.querySelector(".product-name").textContent.toLowerCase();

    // Nếu tên chứa từ khóa thì hiển thị, ngược lại thì ẩn
    if (name.includes(keyword)) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
});

/* Hiện/ ẩn form thêm sản phẩm */

// Lấy nút và form
const addProductBtn = document.getElementById("addProductBtn");
const addProductForm = document.getElementById("addProductForm");

// Khi bấm nút "Thêm sản phẩm"
addProductBtn.addEventListener("click", () => {
  // Toggle hiển thị form
  addProductForm.classList.toggle("hidden");
});

/* Xử lý thêm sản phẩm mới */

// Bắt sự kiện khi form được submit
addProductForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Ngăn load lại trang

  // Lấy dữ liệu từ các ô input
  const name = document.getElementById("productName").value.trim();
  const price = document.getElementById("productPrice").value.trim();
  const image = document.getElementById("productImage").value.trim();
  const desc = document.getElementById("productDesc").value.trim();

  // Kiểm tra dữ liệu
  if (!name || !price || !image) {
    alert("Vui lòng nhập đầy đủ thông tin sản phẩm!");
    return;
  }

  // Tạo phần tử HTML mới cho sản phẩm
  const newProduct = document.createElement("article");
  newProduct.classList.add("product-item");

  newProduct.innerHTML = `
    <img src="${image}" alt="${name}" />
    <h3 class="product-name">${name}</h3>
    <p>${desc || "Không có mô tả."}</p>
    <p class="price">Giá: ${price}</p>
  `;

  // Thêm sản phẩm mới vào danh sách
  document.getElementById("product-list").appendChild(newProduct);

  // Reset form và ẩn lại
  addProductForm.reset();
  addProductForm.classList.add("hidden");
});
