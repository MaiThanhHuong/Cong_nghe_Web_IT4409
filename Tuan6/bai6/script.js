const searchInput = document.getElementById("searchInput");
const addProductBtn = document.getElementById("addProductBtn");
const addProductForm = document.getElementById("addProductForm");
const cancelBtn = document.getElementById("cancelBtn");
const productList = document.getElementById("product-list");
const errorMsg = document.getElementById("errorMsg");

/* Popup phần tử */
const productPopup = document.getElementById("productPopup");
const closePopup = document.getElementById("closePopup");
const popupImage = document.getElementById("popupImage");
const popupName = document.getElementById("popupName");
const popupDesc = document.getElementById("popupDesc");
const popupPrice = document.getElementById("popupPrice");

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
    desc: "Cà phê trứng béo ngậy, thơm ngon — sự kết hợp độc đáo giữa trứng và cà phê.",
    image:
      "https://i.pinimg.com/736x/73/e2/5b/73e25b3461b23674decc807eb7fb5f6c.jpg",
  },
];

let products = [];

/* Hiển thị danh sách sản phẩm */
function renderProducts(list) {
  productList.innerHTML = "";
  list.forEach((p, index) => {
    const item = document.createElement("article");
    item.className = "product-item";
    item.innerHTML = `
      <img src="${p.image}" alt="${p.name}" />
      <h3 class="product-name">${p.name}</h3>
      <p>${p.desc}</p>
      <p class="price">Giá: ${Number(p.price).toLocaleString("vi-VN")}₫</p>
    `;
    // Sự kiện mở popup khi click
    item.addEventListener("click", () => openPopup(p));
    productList.appendChild(item);
  });
}

/* Load dữ liệu từ localStorage */
window.addEventListener("DOMContentLoaded", () => {
  const stored = localStorage.getItem("products");
  if (stored) {
    products = JSON.parse(stored);
  } else {
    products = defaultProducts;
    localStorage.setItem("products", JSON.stringify(products));
  }
  renderProducts(products);
});

/* tìm kiếm sản phẩm */
searchInput.addEventListener("keyup", () => {
  const keyword = searchInput.value.toLowerCase().trim();
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(keyword)
  );
  renderProducts(filtered);
});

/* mở/đóng form thêm sản phẩm */
addProductBtn.addEventListener("click", () => {
  if (addProductForm.classList.contains("active")) {
    addProductForm.classList.remove("active");
  } else {
    addProductForm.classList.add("active");
  }
  errorMsg.textContent = "";
});

cancelBtn.addEventListener("click", () => {
  addProductForm.classList.remove("active");
  addProductForm.reset();
});

/* thêm sản phẩm mới */
addProductForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("newName").value.trim();
  const price = document.getElementById("newPrice").value.trim();
  const desc = document.getElementById("newDesc").value.trim();
  const image = document.getElementById("newImage").value.trim();

  if (!name) {
    errorMsg.textContent = "Vui lòng nhập tên sản phẩm.";
    return;
  }

  if (!price || isNaN(price) || Number(price) <= 0) {
    errorMsg.textContent = "Giá phải là số hợp lệ và lớn hơn 0.";
    return;
  }

  if (desc.length < 5) {
    errorMsg.textContent = "Mô tả quá ngắn.";
    return;
  }

  if (!image.startsWith("http")) {
    errorMsg.textContent = "Link ảnh không hợp lệ.";
    return;
  }

  const newProduct = { name, price: Number(price), desc, image };
  products.unshift(newProduct);

  renderProducts(products);
  localStorage.setItem("products", JSON.stringify(products));

  addProductForm.reset();
  addProductForm.classList.remove("active");
});

/* popup chi tiết sản phẩm */
function openPopup(product) {
  popupImage.src = product.image;
  popupName.textContent = product.name;
  popupDesc.textContent = product.desc;
  popupPrice.textContent =
    "Giá: " + Number(product.price).toLocaleString("vi-VN") + "₫";
  productPopup.classList.remove("hidden");
}

closePopup.addEventListener("click", () => {
  productPopup.classList.add("hidden");
});

// Đóng popup khi click ra ngoài vùng nội dung
productPopup.addEventListener("click", (e) => {
  if (e.target === productPopup) {
    productPopup.classList.add("hidden");
  }
});
