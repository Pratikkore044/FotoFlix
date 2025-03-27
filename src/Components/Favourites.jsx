import React from 'react'
import Photos from './Photos'

const Favourites = ({favouritePhotos,handleRemoveFavourite}) => {
  return (
    <div>
      <nav className='navbar'>
        <div className="navbar_logo">FotoFlix</div>
        <div className="navbar_links">
          <a href='/'>Home</a>
        </div>
      </nav>
      <main>
        <section className="photos">
          <div className="photos-center">
            {favouritePhotos.map((image, index) => {
              return (
                <article
                  key={index}
                  {...image}
                  isFavorite={true} // All images in the Favourite component are favorites
                  onFavoriteClick={() => handleRemoveFavourite(image)} // Pass the handleRemoveFavorite function here
                >
                  {/* Pass isFavorite to Photos to show the favorite status */}
                  <span>Added to Favorites</span>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  )
}

export default Favourites