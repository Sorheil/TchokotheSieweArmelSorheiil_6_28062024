class PhotographerCard {

    constructor(photographer) {
        this._photographer = photographer
    }

    createPhotographerCard() {
        const $wrapper = document.createElement('div')
        $wrapper.classList.add('photographer-card')

        //paths to profile picture
        const pathPortrait = `./assets/SamplePhotos/Photographers ID Photos/${this._photographer.portrait}`
        console.log(pathPortrait)

        //Creating the tags 
        console.log(this._photographer.tags)

        const tags = this._photographer.tags.map(tag => {
            const tagLink = document.createElement('a')
            tagLink.href = '#'
            tagLink.classList.add('tag')
            tagLink.innerHTML = `<span aria-hidden="true">#</span><span class="sr-only">Tag</span> ${tag}</a>`
            return tagLink.outerHTML

        }).join('')

        const PhotographersCard = `
        <a href="photographer.html?id=${this._photographer.id}" class="portrait">
            <img src="${pathPortrait}" alt="">
            <h2 aria-labelledby="photographers-name">${this._photographer.name}</h2>    
        </a>
        <p id="photographers-name">
            <span class="city"> ${this._photographer.city} </span> 
            <br>
            <span clas="tagline">${this._photographer.tagline}</span>
            <br>
            <span class ="price">
                ${this._photographer.price}€/jour
            </span>
        </p>
        
        <div class="tags-wrapper">
            ${tags} 
        </div>
        `

        $wrapper.innerHTML = PhotographersCard;
        return $wrapper;
    }
}