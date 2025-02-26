import '../styles/CreateListing.scss'
import Navbar from '../components/Navbar'
import { categories, types, facilities } from '../data'
import { RemoveCircleOutline, AddCircleOutline } from '@mui/icons-material'
import variables from '../styles/variables.scss'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { IoIosImages } from 'react-icons/io'
import { useState } from 'react'
import { BiTrash } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CreateListing = () => {
    const [category, setCategory] = useState('')
    const [photos, setPhotos] = useState([])
    const [type, setType] = useState('')


    const [formLocation, setFormLocation] = useState({
        streetAddress: '',
        appSuite: '',
        city: '',
        province: '',
        country: ''
    })

    const handleChangeLocation = (e) => {
        const { name, value } = e.target
        setFormLocation({
            ...formLocation,
            [name]: value
        })
    }

    const [guestCount, setGuestCount] = useState(1)
    const [bedroomCount, setBedroomCount] = useState(1)
    const [bedCount, setBedCount] = useState(1)
    const [bathroomCount, setBathroomCount] = useState(1)

    const [amenities, setAmenities] = useState([])

    const handleSelectAmenities = (facility) => {
        if (amenities.includes(facility)) {
            setAmenities((prevAmenities) => prevAmenities.filter((option) => option !== facility))
        }
        else {
            setAmenities((prev) => [...prev, facility])
        }
    }

    const handleUploadPhotos = (e) => {
        const newPhotos = e.target.files
        setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos])
    }

    const handleDragPhoto = (result) => {
        if (!result.destination) return
        const items = Array.from(photos)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)
        setPhotos(items)
    }

    const handleRemovePhoto = (indexToRemove) => {
        setPhotos((prevPhotos) => prevPhotos.filter((_, index) => index !== indexToRemove))
    }


    const [formDescription, setFormDescription] = useState({
        title: "",
        description: "",
        highlight: "",
        highlightDesc: "",
        price: 0
    })


    const handleChangeDescription = (e) => {
        const { name, value } = e.target
        setFormDescription({
            ...formDescription,
            [name]: value
        })
    }

    const creatorId = useSelector((state) => state.user._id)

    const navigate = useNavigate()

    const handlePost = async (e) => {
        e.preventDefault()

        try {
            const listingForm = new FormData()
            listingForm.append("creator", creatorId)
            listingForm.append("category", category);
            listingForm.append("type", type);
            listingForm.append("streetAddress", formLocation.streetAddress);
            listingForm.append("aptSuite", formLocation.aptSuite);
            listingForm.append("city", formLocation.city);
            listingForm.append("province", formLocation.province);
            listingForm.append("country", formLocation.country);
            listingForm.append("guestCount", guestCount);
            listingForm.append("bedroomCount", bedroomCount);
            listingForm.append("bedCount", bedCount);
            listingForm.append("bathroomCount", bathroomCount);
            listingForm.append("amenities", amenities);
            listingForm.append("title", formDescription.title);
            listingForm.append("description", formDescription.description);
            listingForm.append("highlight", formDescription.highlight);
            listingForm.append("highlightDesc", formDescription.highlightDesc);
            listingForm.append("price", formDescription.price);

            photos.forEach((photo) => {
                listingForm.append("listingPhotos", photo)
            })

            const response = await fetch("http://localhost:3001/properties/create",{
                method: "POST",
                body: listingForm
            })

            if (response.ok) {
                navigate("/")
            }
        } catch (error) {
            console.log("Publish listing failed", error.message);
        }
    }

    return (
        <>
            <Navbar />
            <div className="create-listing">
                <h1>Publish Your Place</h1>
                <form onSubmit={handlePost}>
                    <div className='create-listing_step1'>
                        <h2>Step 1: Tell us about your place</h2>
                        <hr />
                        <h3>Which of these categories best describes your place?</h3>
                        <div className="category-list">
                            {
                                categories?.map((item, index) => (
                                    <div key={index} className={`category ${category === item.label ? 'selected' : ''}`}
                                        onClick={() => setCategory(item.label)}>
                                        <div className="category-icon">
                                            {item.icon}
                                        </div>
                                        <p>{item.label}</p>
                                    </div>
                                ))
                            }
                        </div>
                        <h3>What type of place will guests have?</h3>
                        <div className="type-list">
                            {
                                types?.map((item, index) => (
                                    <div className={`type ${type === item.name ? "selected" : ""}`} key={index}
                                        onClick={() => setType(item.name)}>
                                        <div className="type_text">
                                            <h4>{item.name}</h4>
                                            <p>{item.description}</p>
                                        </div>
                                        <div className="type_icon">
                                            {item.icon}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <h3>Where's your place located?</h3>
                        <div className="full">
                            <div className="location">
                                <p>Street Address</p>
                                <input type="text"
                                    name="streetAddress"
                                    placeholder='street address'
                                    value={formLocation.streetAddress}
                                    onChange={handleChangeLocation}
                                    required
                                />
                            </div>
                        </div>

                        <div className="half">
                            <div className="location">
                                <p>Apartment, Suite, etc.(if applicable)</p>
                                <input type="text" placeholder='Apt, Suite, etc.(if applicable)'
                                    name='aptSuite'
                                    value={formLocation.appSuite}
                                    onChange={handleChangeLocation} />
                            </div>
                            <div className="location">
                                <p>City</p>
                                <input type="text" placeholder='City' name='city'
                                    value={formLocation.city}
                                    onChange={handleChangeLocation} required />
                            </div>
                        </div>

                        <div className="half">
                            <div className="location">
                                <p>Province</p>
                                <input type="text" placeholder='Province' name='province'
                                    value={formLocation.province}
                                    onChange={handleChangeLocation}
                                    required />
                            </div>
                            <div className="location">
                                <p>Country</p>
                                <input type="text" placeholder='Country' name='country'
                                    value={formLocation.country}
                                    onChange={handleChangeLocation}
                                    required />
                            </div>
                        </div>
                        <h3>Share some basics about your place</h3>
                        <div className="basics">
                            <div className="basic">
                                <p>Guests</p>
                                <div className="basic_count">
                                    <RemoveCircleOutline sx={{
                                        fontSize: "25px", cursor: "pointer",
                                        "&:hover": { color: variables.pinkred }
                                    }}
                                        onClick={() => { guestCount > 1 && setGuestCount(guestCount - 1) }}
                                    />
                                    <p>{guestCount}</p>
                                    <AddCircleOutline sx={{
                                        fontSize: "25px", cursor: "pointer",
                                        "&:hover": { color: variables.pinkred }
                                    }}
                                        onClick={() => { setGuestCount(guestCount + 1) }} />

                                </div>
                            </div>
                            <div className="basic">
                                <p>Bedrooms</p>
                                <div className="basic_count">
                                    <RemoveCircleOutline sx={{
                                        fontSize: "25px", cursor: "pointer",
                                        "&:hover": { color: variables.pinkred }
                                    }}
                                        onClick={() => { bedroomCount > 1 && setBedroomCount(bedroomCount - 1) }}
                                    />
                                    <p>{bedroomCount}</p>
                                    <AddCircleOutline sx={{
                                        fontSize: "25px", cursor: "pointer",
                                        "&:hover": { color: variables.pinkred }
                                    }}
                                        onClick={() => { setBedroomCount(bedroomCount + 1) }} />

                                </div>
                            </div>
                            <div className="basic">
                                <p>Beds</p>
                                <div className="basic_count">
                                    <RemoveCircleOutline sx={{
                                        fontSize: "25px", cursor: "pointer",
                                        "&:hover": { color: variables.pinkred }
                                    }}
                                        onClick={() => { bedCount > 1 && setBedCount(bedCount - 1) }}
                                    />
                                    <p>{bedCount}</p>
                                    <AddCircleOutline sx={{
                                        fontSize: "25px", cursor: "pointer",
                                        "&:hover": { color: variables.pinkred }
                                    }}
                                        onClick={() => { setBedCount(bedCount + 1) }} />

                                </div>
                            </div>
                            <div className="basic">
                                <p>Bathrooms</p>
                                <div className="basic_count">
                                    <RemoveCircleOutline sx={{
                                        fontSize: "25px", cursor: "pointer",
                                        "&:hover": { color: variables.pinkred }
                                    }}
                                        onClick={() => { bathroomCount > 1 && setBathroomCount(bathroomCount - 1) }}
                                    />
                                    <p>{bathroomCount}</p>
                                    <AddCircleOutline sx={{
                                        fontSize: "25px", cursor: "pointer",
                                        "&:hover": { color: variables.pinkred }
                                    }}
                                        onClick={() => { setBathroomCount(bathroomCount + 1) }} />

                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="create-listing_step2">
                        <h2>Step 2: Make your place stand out</h2>
                        <hr />

                        <h3>Tell guests what your place has to offer</h3>
                        <div className="amenities">
                            {facilities.map((item, index) => (
                                <div className={`facility ${amenities.includes(item.name) ? "selected" : ""}`} key={index}
                                    onClick={handleSelectAmenities(item.name)}>
                                    <div className="facility_icon">
                                        {item.icon}
                                    </div>
                                    <p>{item.name}</p>
                                </div>
                            ))}
                        </div>

                        <h3>Add some photos of your place</h3>
                        <DragDropContext onDragEnd={handleDragPhoto}>
                            <Droppable droppableId="photos" direction='horizontal'>
                                {(provided) => (
                                    <div className='photos' {...provided.droppableProps} ref={provided.innerRef}>
                                        {photos.length < 1 && (
                                            <>
                                                <input type="file" id='image' style={{ display: 'none' }} accept='image/*' onChange={handleUploadPhotos} multiple />
                                                <label htmlFor="image" className='alone'>
                                                    <div className="icon">
                                                        <IoIosImages />
                                                    </div>
                                                    <p>Upload from your device</p>
                                                </label>
                                            </>
                                        )}
                                    </div>
                                )}

                                {photos.length >= 1 && (
                                    <>
                                        {photos.map((photo, index) => {
                                            return (
                                                <Draggable key={index} draggableId={index.toString()} index={index}>
                                                    {(provided) => (
                                                        <div className='photo' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                            <img src={URL.createObjectURL(photo)} alt="place" />
                                                            <button type="button" onClick={handleRemovePhoto(index)}>
                                                                <BiTrash />
                                                            </button>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            )
                                        })}
                                        <input type="file" id='image' style={{ display: 'none' }} accept='image/*' onChange={handleUploadPhotos} multiple />
                                        <label htmlFor="image" className='together'>
                                            <div className="icon">
                                                <IoIosImages />
                                            </div>
                                            <p>Upload from your device</p>
                                        </label>
                                    </>
                                )}
                            </Droppable>
                        </DragDropContext>
                        <h3>What make your place attractive and exciting?</h3>
                        <div className="description">
                            <p>Title</p>
                            <input type="text" name="title" placeholder='Title' value={formDescription.title} required 
                                onChange={handleChangeDescription} />
                            <p>Description</p>
                            <textarea name="description" placeholder='Description' required
                                value={formDescription.description} onChange={handleChangeDescription}></textarea>
                            <p>Highlight</p>
                            <input type="text" name="highlight" placeholder='HighLight' required
                              value={formDescription.highlight} onChange={handleChangeDescription}/>
                            <p>Highlight details</p>
                            <textarea name="highlightDesc" placeholder='Highlight Details' required
                                value={formDescription.highlightDesc} onChange={handleChangeDescription}></textarea>
                            <p>Now, set your PRICE</p>
                            <span>$</span>
                            <input type="number" name="price" placeholder='100' className='price' required
                                value={formDescription.price} onChange={handleChangeDescription} />
                        </div>
                    </div>
                    <button className='submit_btn' type='submit'>CREATE YOUR LISTING</button>
                </form>
            </div>
        </>
    )
}

export default CreateListing