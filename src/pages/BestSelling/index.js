import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "./BestSelling.scss";
import Product from "./product";
import bookApi from "../../api/bookApi";
import { useEffect, useState } from "react";
import BookItem from "../../components/BookItem";

function BestSelling() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const [books, setBooks] = useState([]);

  useEffect(() => {
    bookApi.getTopBook().then((res) => setBooks(res.data));
  }, []);
  return (
    <div className="best-selling">
      <Carousel responsive={responsive} className="slide">
        {books.map((book) => (
          <BookItem book={book} key={book.id} className="book-item"/>
        ))}
      </Carousel>
    </div>
  );
}

export default BestSelling;
