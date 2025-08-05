function ProductCard({ name, price, image }) {
  return (
    <div className="product-card">
      <img src={image} alt={name} width="100" />
      <h3>{name}</h3>
      <p>{price} đ</p>
      <button>Thêm vào giỏ</button>
    </div>
  );
}

export default ProductCard;
