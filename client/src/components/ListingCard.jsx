
import { useState } from "react";
import "../styles/ListingCard.scss"
import {
  ArrowForwardIos,
  ArrowBackIosNew,
  Favorite,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setWishList } from "../redux/state"

const ListingCard = ({
  listingId,
  creator,
  listingPhotoPaths,
  city,
  province,
  country,
  category,
  type,
  price,
  startDate,
  endDate,
  totalPrice,
  booking,
}) => {

  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length
    )
  }


  const gotToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length)
  }

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)
  const wishList = user?.wishList || [] //accede al campo wishList del user(es seteado en el state durante el login)

  const isLiked = wishList?.find((item) => item?._id === listingId)

  //se añaden o eliminan de la lista de deseos
  const patchWishList = async () => {
    if (user?._id !== creator._id) {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${user?._id}/${listingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      })//agrega o elimina de favoritos
      const data = await response.json()
      dispatch(setWishList(data.wishList));
    }
    else {
      return
    }
  }

  return (
    <div className="listing-card"
      onClick={() => {
        navigate(`/properties/${listingId}`);
      }}>
      <div className="slider-container">
        <div className="slider" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {
            listingPhotoPaths?.map((photo, index) => (
              <div key={index} className="slide">
                <img src={`${process.env.REACT_APP_API_URL}/${photo?.replace("public", "")}`}
                  alt={`photo ${index + 1}`}
                />
                <div className="prev-button" onClick={(e) => {
                  e.stopPropagation()
                  goToPrevSlide(e)
                }}>
                  <ArrowBackIosNew sx={{ fontSize: "15px" }} />
                </div>
                <div className="next-button" onClick={(e) => {
                  e.stopPropagation()
                  gotToNextSlide(e)
                }}>
                  <ArrowForwardIos sx={{ fontSize: "15px" }} />
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <h3>{city}, {province}, {country}</h3>
      <p>{category}</p>

      {booking ? (<>
        <p>{type}</p>
        <p><span>${price}</span>per night</p>
      </>) : (<>
        <p>{startDate} - {endDate}</p>
        <p><span>${totalPrice}</span>total</p>
      </>)}

      <button className="favorite" onClick={(e) => {
        e.stopPropagation()
        patchWishList()
      }} 
        disabled={!user}>
        {isLiked ? (
          <Favorite sx={{ color: "red" }} />
        ) : (
          <Favorite sx={{ color: "white" }} />
        )}
      </button>
    </div>
  )
}

export default ListingCard