class CounterLike {
  constructor(photographer, media) {
    this._photographer = photographer;
    this._media = media;
  }
  createPhotographerDetail() {
    //some of likes 
    const numberLikes = this._media.reduce((likes, media) => likes + media.likes, 0);

    const $detailsWrapper = document.createElement('p');
    $detailsWrapper.classList.add('photographer-details');
    //id designe le nombre de like , il est a changer 
    const content = `
        <span class='wrapper-likes-photographer'> 
            <p><span class="counter-likes-photographer">${numberLikes} </span><i class="fa-solid fa-heart"></i>  </p>
        </span>        
        <span class ='price-photographer'> ${this._photographer.price}€ / jour</span>
        `;
    $detailsWrapper.innerHTML = content;
    return $detailsWrapper;
  }
}