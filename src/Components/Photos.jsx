import React from 'react'
import { useState, useEffect } from 'react'
import { FaHeart, FaDownload, FaShare } from 'react-icons/fa'
import "yet-another-react-lightbox/styles.css";
import Lightbox from "yet-another-react-lightbox";

const Photos = () => {
    const [loading, setLoading] = useState(false);
    const [photos, setPhotos] = useState([]);
    const [favouritePhotos, setFavouritePhotos] = useState([]);
    const [lightboxIndex, setLightboxIndex] =  useState(0);
    const [isLightboxOpen, setIsLightboxOpen] =  useState(false);
    const [searchQuery, setSearchQuery] =  useState("");


    useEffect(() => {
        const fetchImages = async () => {
            setLoading(true);
            const clientID = '?client_id=KGto17TAAUxVdhIltwr55oupnlB9ULhpFGaw5TeIj_Y';
            const mainUrl = 'https://api.unsplash.com/photos/';
            let url = mainUrl+clientID;
            if(searchQuery){
                url = `https://api.unsplash.com/search/photos/${clientID}&query=${searchQuery}`
            }
            try {
                const response = await fetch(url);
                const data = await response.json()
                setPhotos(data.results || data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.log(error)
            }
        }
        fetchImages();
    }, [searchQuery]);

    const handleFavouriteClick = (photoId) => {
        setFavouritePhotos((prevFavourites) => {
            const existingIndex = prevFavourites.findIndex((favPhoto) => favPhoto.id === photoId);

            if (existingIndex !== -1) {
                return prevFavourites.filter((favPhoto) => favPhoto.id !== photoId);
            } else {
                const photoToAdd = photos.find((photo) => photo.id === photoId);
                return photoToAdd ? [...prevFavourites, photoToAdd] : prevFavourites;
            }
        });
    };

    const handleShare = (photoUrl)=>{
        const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`checkout the awesome photo:${photoUrl}`)}`;
        window.open(shareUrl,"_blank");
    }

    const handleDownload = (photoUrl, photoId) =>{
        const link = document.createElement('a');
        link.href = photoUrl;
        link.download = `photo_${photoId}.jpg`;
        link.click();
    }

    const openLightbox = (index) =>{
        setLightboxIndex(index);
        setIsLightboxOpen(true);
    }
    const closeLightbox = () =>{
        setIsLightboxOpen(false);
    }


    return (
        <main>
            <section className="photos">
                <div className='photos-center'>
                {loading ? (
                    <p>Loading..</p>
                ) : (
                    photos.map((photo,index) => (
                        <article key={photo.id} className={`photo ${favouritePhotos.some((favPhoto) => favPhoto.id === photo.id) ? 'favorite-photo' : ""}`}>
                            <img src={photo.urls.regular} alt={photo.alt_description} onClick={()=>openLightbox(index)}/>
                            <div className='photo_info'>
                                <div className="photo-header">
                                    <h4>{photo.user.name}</h4>
                                    <button className={`favourite-btn ${favouritePhotos.some((favPhoto) => favPhoto.id === photo.id) ? 'active' : ''}`} onClick={() => handleFavouriteClick(photo.id)}>
                                        <FaHeart />
                                    </button>
                                    <div className="photo-actions">
                                        <p>
                                            <FaHeart className='heart-icon' /> {photo.likes}
                                        </p>
                                        <button className='share-btn' onClick={()=>handleShare(photo.urls.regular)}>
                                            <FaShare />
                                        </button>
                                        <button className='download-btn'onClick={()=>handleDownload(photo.urls.full,photo.id)} >
                                            <FaDownload />
                                        </button>
                                        </div>
                                        <a href={photo.user.portfolio_url || '#'} target="_blank" rel="noopener noreferrer">
                                            <img src={photo.user.profile_image.medium} className='user-img' alt={photo.user.name} />
                                        </a>
                                </div>
                            </div>
                        </article>
                    ))
                )}
                </div>
            </section>
            {isLightboxOpen && (
    <Lightbox
        open={isLightboxOpen}
        close={closeLightbox}
        index={lightboxIndex}
        slides={photos.map(photo => ({ src: photo.urls.full }))}
    />
)}
        </main>
    );
};

export default Photos;