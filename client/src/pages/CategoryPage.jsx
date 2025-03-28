import { useEffect, useState } from "react"
import "../styles/List.scss"
import Loader from "../components/Loader"
import Navbar from "../components/Navbar"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setListings } from "../redux/state"
import ListingCard from "../components/ListingCard"
import Footer from "../components/Footer"

const CategoryPage = () => {
    const [loading, setLoading] = useState(true)
    const { category } = useParams()

    const listings = useSelector((state) => state.listings)

    const dispatch = useDispatch()

    const getFeedListings = async () => {
        try {
            const response = await fetch(
                `http://localhost:3001/properties?category=${category}`,

                {
                    method: "GET",
                }
            )

            const data = response.json()
            dispatch(setListings({ listings: data }))
        } catch (error) {
            console.log("Fetch Listings failed", error.message);
        }
    }

    useEffect(() => {
        getFeedListings()
    }, [category])

    return loading ? <Loader /> : (
        <>
            <Navbar />
            <h1 className='title-list'>{category} listings</h1>
            <div className="list">
                {listings?.map(({ _id, creator, listingPhotoPaths, city, province, country, category, type, price, booking = false }) =>
                (<ListingCard
                    listingId={_id}
                    creator={creator}
                    listingPhotoPaths={listingPhotoPaths}
                    city={city}
                    province={province}
                    country={country}
                    category={category}
                    type={type}
                    price={price}
                    booking={booking}
                />
                )
                )}
            </div>
            <Footer />
        </>
    )
}

export default CategoryPage