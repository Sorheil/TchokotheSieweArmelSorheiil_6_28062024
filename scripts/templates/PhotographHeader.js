class PhotographHeader {
    constructor(photographer) {
        this._photographer = photographer;
    }

    createPhotographHeader() {
        const wrapper = document.createElement('section');
        // add class wrapper
        wrapper.classList.add('photographer-header')
        // paths portrait
        const pathPortrait = `./assets/SamplePhotos/Photographers ID Photos/${this._photographer.portrait}`;

        // Creating the tags
        console.log(this._photographer["tags"])

        const tags = this._photographer.tags.map(tag => {
            const tagLink = document.createElement('a');
            tagLink.href = '#';
            tagLink.classList.add('tag');
            tagLink.innerHTML = `<span aria-hidden="true">#</span><span class="sr-only">Tag</span> ${tag}`
            return tagLink.outerHTML;
        }).join('');

        const content = `
            <div class="details">
                <h2>${this._photographer.name}</h2>
                <p>
                    ${this._photographer.city}, ${this._photographer.country}
                    <br>
                    <span class="tagline">${this._photographer.tagline}</span>
                </p>
                <div class="tags-wrapper">
                    ${tags} 
                </div>
            </div>

            <button class="cta">
                contactez-moi
            </button>

            <div class="wrapper-portrait">
                <img src="${pathPortrait}" alt="${this._photographer.name}">
            </div>
        `;
        wrapper.innerHTML = content;
        return wrapper;
    }
}
