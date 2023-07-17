import { useContext, useEffect, useState } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faAdd, faXmark } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../contexts/AuthContext";
import cartApi from "../../api/cartApi";
import styles from "./Cart.module.scss";
import { Link, useNavigate } from "react-router-dom";
import routes from "../../config/routes";

const cx = classNames.bind(styles);

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  console.log(cartItems)
  const {
    authState: { user },
  } = useContext(AuthContext);
  useEffect(() => {
    cartApi.getCartByUsername(user).then((res) => {
      setCartItems(res.data.cartItems);
    });
  }, []);

  let sum = cartItems?.reduce((total, cartItem) => {
    return total + cartItem.amount * cartItem.book.price;
  }, 0);


  const handleRemoveCartItem = (idCartItem) => {
    cartApi.removeCartItem(idCartItem);
    window.location.reload()
  };
  
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("cart-item")}>
          <div className={cx("des")}>
            <span>Title</span>
          </div>
          <div className={cx("quanlity")}>
            <span>Quanlity</span>
          </div>
          <div className={cx("remove")}>
            <span>Remove</span>
          </div>
          <div className={cx("price")}>
            <span>Price</span>
          </div>
        </div>
        {cartItems && cartItems?.map((cartItem) => (
          <div className={cx("cart-item-info")} key={cartItem.id}>
            <div className={cx("des-detail")}>
              <img
                src={`http://localhost:8080/file/images/${cartItem.book.image}`}
                alt=""
              />
              <span>{cartItem.book.title}</span>
            </div>
            <div className={cx("quanlity-detail")}>
              <FontAwesomeIcon icon={faMinus} className={cx("minus-icon")} />
              <div>{cartItem.amount}</div>
              <FontAwesomeIcon icon={faAdd} className={cx("add-icon")} />
            </div>
            <div className={cx("remove-detail")}>
              <FontAwesomeIcon
                icon={faXmark}
                className={cx("remove-icon")}
                onClick={() => handleRemoveCartItem(cartItem.id)}
              />
            </div>
            <div className={cx("price-detail")}>
              <span>{cartItem.book.price}</span>
            </div>
          </div>
        ))}

        <div className={cx("info-bonus")}>
          <div className={cx("discount")}>
            <span className={cx("title-discount")}>Discount</span>
            <span>0.00</span>
          </div>
          <div className={cx("delivery")}>
            <span className={cx("title-delivery")}>Delivery</span>
            <span>0.00</span>
          </div>
          <div className={cx("subtotal")}>
            <span className={cx("title-subtotal")}>Subtotal</span>
            <span>0.00</span>
          </div>
          <div className={cx("total")}>
            <span className={cx("title-total")}>Total</span>
            <span>{sum}</span>
          </div>
        </div>
        <Link className={cx("btn-cart")} to={user==null ? "/sign-in" : routes.order} state={{data: cartItems}}>
          <button className={cx("btn-checkout")}>Checkout</button>
        </Link>
      </div>
    </div>
  );
}

export default Cart;

//<FontAwesomeIcon icon={faXmark} />
