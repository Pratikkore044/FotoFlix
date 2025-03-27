import React from 'react'
import Photos from './photos'

const Favourites = ({favouritePhotos,handleRemoveFavourite}) => {
  return (
    <div>
      <nav className='navbar'>
        <div className="div navbar_logo">FotoFlix</div>
        <div className="div navbar_links">
          <a href='/'>Home</a>
        </div>
      </nav>
      <main>
        <section className='photod'>
          {favouritePhotos.map((image,index)=>{
            return (
              <Photos key={index} {...image}
              isFavourite={true} onFavouriteClick = {()=>
              handleRemoveFavourite(image)}>
                <span>Added to  favourites</span>
              </Photos>
            )
          })
        }
        </section>
      </main>
    </div>
  )
}

export default Favourites