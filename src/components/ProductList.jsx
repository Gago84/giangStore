import ProductCard from './ProductCard.jsx';
import penImg from '../assets/pen.jpg';
import notebookImg from '../assets/notebook.jpg';

const mockProducts = [
  { id: 1, name: 'Bút bi Thiên Long', price: 3000, image: penImg },
  { id: 2, name: 'Vở Hồng Hà 96 trang', price: 8000, image: notebookImg },
];

function ProductList() {
  return (
    <div className="product-list">
      {mockProducts.map((p) => (
        <ProductCard key={p.id} name={p.name} price={p.price} image={p.image} />
      ))}
    </div>
  );
}

export default ProductList;
