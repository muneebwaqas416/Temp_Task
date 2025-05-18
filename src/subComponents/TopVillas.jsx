import React from "react";
import { RxDot } from "react-icons/rx";
import { IoIosPeople } from "react-icons/io";
import { FaBed } from "react-icons/fa";
import { BiArea } from "react-icons/bi";
import { FaBath } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useAddToCartMutation } from "../store/cartApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const villas = [
  {
    id: 1,
    name: "Villa Luna",
    location: "Greece",
    category: "Mountains",
    guests: 11,
    bedrooms: 6,
    bathrooms: 10,
    squareMeter: "400",
    rating: 4.7,
    image: "/villa1.jpg",
    dailyRent: "240",
  },
  {
    id: 2,
    name: "Villa Tosco",
    location: "Italy",
    category: "Mountains",
    guests: 8,
    bedrooms: 8,
    bathrooms: 12,
    squareMeter: "450",
    rating: 4.4,
    image: "/villa2.jpg",
    dailyRent: "300",
  },
  {
    id: 3,
    name: "Aphrodite",
    location: "Greece",
    category: "Seaside",
    guests: 12,
    bedrooms: 6,
    bathrooms: 6,
    squareMeter: "500",
    rating: 4.9,
    image: "/villa3.jpg",
    dailyRent: "200",
  },
  {
    id: 4,
    name: "Villa Makarska",
    location: "Italy",
    category: "Mountains",
    guests: 12,
    bedrooms: 15,
    bathrooms: 20,
    squareMeter: "750",
    rating: 5.0,
    image: "/villa4.jpg",
    dailyRent: "260",
  },
  {
    id: 5,
    name: "Villa Boxane",
    location: "Greece",
    category: "Mountains",
    guests: 4,
    bedrooms: 5,
    bathrooms: 6,
    squareMeter: "275",
    rating: 4.0,
    image: "/villa5.jpg",
    dailyRent: "200",
  },
  {
    id: 6,
    name: "Aphrodite",
    location: "Greece",
    category: "Seaside",
    guests: 12,
    bedrooms: 6,
    bathrooms: 6,
    squareMeter: "500",
    rating: 4.9,
    image: "/villa6.jpg",
    dailyRent: "320",
  },
  {
    id: 7,
    name: "Villa Sunset",
    location: "Italy",
    category: "Mountains",
    guests: 15,
    bedrooms: 8,
    bathrooms: 10,
    squareMeter: "1000",
    rating: 4.8,
    image: "/villa7.jpg",
    dailyRent: "280",
  },
  {
    id: 8,
    name: "White Lady",
    location: "Italy",
    category: "Seaside",
    guests: 25,
    bedrooms: 25,
    bathrooms: 25,
    squareMeter: "1500",
    rating: 5.0,
    image: "/villa8.jpg",
    dailyRent: "400",
  },
  {
    id: 9,
    name: "Thebes",
    location: "Greece",
    category: "Seaside",
    guests: 5,
    bedrooms: 6,
    bathrooms: 6,
    squareMeter: "240",
    rating: 3.8,
    image: "/villa9.jpg",
    dailyRent: "180",
  },
];

const TopVillas = () => {
  const [addToCart] = useAddToCartMutation();

  const handleAddToCart = async (villa) => {
    try {
      const cartItem = {
        userId: "user123",
        propertyId: villa.id,
        propertyName: villa.name,
        price: parseFloat(villa.dailyRent),
        duration: 1,
        image: villa.image,
        location: villa.location
      };
      await addToCart(cartItem).unwrap();
      toast.success('Added to cart successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <section id="topVillas">
      <h1>TOP PICK VILLAS</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum esse
        consequuntur eius, sed quos, itaque earum eos dolor minima delectus
        sequi exercitationem dolorem illo dicta provident voluptatum nihil nam.
        Assumenda!
      </p>
      <div className="villasContainer">
        {villas.slice(0,3).map((element) => {
          return (
            <div className="card" key={element.id}>
              <Link to={`/villa/${element.id}`}>
                <img src={element.image} alt={element.name} />
                <div className="location_text">
                  <span>{element.location}</span>
                  <span>
                    <RxDot />
                  </span>
                  <span>{element.category}</span>
                </div>
                <div className="title_text">{element.name}</div>
                <div className="specifications">
                  <div className="spec">
                    <IoIosPeople />
                    <span>{element.guests}</span>
                    Guests
                  </div>
                  <div className="spec">
                    <FaBed />
                    <span>{element.bedrooms}</span>
                    Bedrooms
                  </div>
                  <div className="spec">
                    <BiArea />
                    <span>{element.squareMeter}</span>
                    Area
                  </div>
                  <div className="spec">
                    <FaBath />
                    <span>{element.bathrooms}</span>
                    Bathrooms
                  </div>
                </div>
                <div className="badge">
                  From <span>Rs.{element.dailyRent} / Day </span>
                </div>
              </Link>
              <button 
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(element)}
                style={{
                  width: '100%',
                  padding: '10px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginTop: '10px'
                }}
              >
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
      <ToastContainer />
    </section>
  );
};

export default TopVillas;