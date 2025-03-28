import "../styles/List.scss"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setListings } from "../redux/state"
import { useEffect, useState } from "react"
import Loader from "../components/Loader"
import Navbar from "../components/Navbar"
import Listingcard from "../components/ListingCard"
import Footer from "../components/Footer"


const SearchPage = () => {
    const [loading, setLoading] = useState(true)
    const { search } = useParams()
    const listings = useSelector((state) => state.listings)

    const dispatch = useDispatch()

    const getSearchListings = async () => {
        try {
            const response = await fetch(`http://localhost:3001/properties/search/${search}`, {
                method: "GET"
            })

            const data = await response.json()
            dispatch(setListings({listings: data}))
            setLoading(false)
        } catch (error) {
            console.log("Fetch Search List Failed!", error.message);
        }
    }

    useEffect(() => {
        getSearchListings()
    }, [search])

    return loading ? <Loader /> : (
        <>
           <Navbar /> 
           <h1 className='title-list'>Your Wish List</h1>
           <div className="list">
            {listings?.map(({ _id, creator, listingPhotoPaths, city, province, country, category, type, price, booking = false }) => 
                (<Listingcard
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

export default SearchPage