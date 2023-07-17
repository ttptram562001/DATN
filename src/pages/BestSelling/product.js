function Product() {
  return (
    <div className="card">
      <img
        className="product-image"
        src="http://localhost:8080/file/images/9f96d49b-d1ea-4a0d-9438-61c68774cff3.jpg"
        alt=""
        width={100}
      />
      <h2>Sport sneaker</h2>
      <p className="price">123000</p>
      <p>Some description about product</p>
      <p>
        <button>Add to Cart</button>
      </p>
    </div>
  );
}

export default Product;
