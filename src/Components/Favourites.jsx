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
                <Photos
                  key={index}
                  {...image}
                  isFavorite={true} 
                  onFavoriteClick={() => handleRemoveFavourite(image)} 
                >
                  <span>Added to Favorites</span>
                </Photos>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  )
}

export default Favourites