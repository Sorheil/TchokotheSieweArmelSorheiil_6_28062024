class MediaCard {
    constructor(media, author) {
        this._media = media
        this._author = author
    }

}

class PictureCard extends MediaCard {
    constructor(media, author) {
        super(media, author);
    }

    createMediaCard() {
        const $wrapper = document.createElement('a');
        $wrapper.classList.add('media-card');
        $wrapper.href = "#";
        const picturePath = `./assets/SamplePhotos/${this._author}/${this._media.image}`;
        const content = `
            <img src="${picturePath}" alt="${this._media.title}">
            <div class="media-card-description">
                <p class="title">${this._media.title}</p>
                <p class="wrapper-likes">
                    <span class="number-likes-media">${this._media.likes}</span>
                        <i class="fa-solid fa-heart like-button unliked"></i>
                </p>
            </div>
        `;
        $wrapper.innerHTML = content;
        return $wrapper;
    }
}
class VideoCard extends MediaCard {
    constructor(media, author) {
        super(media, author);
    }

    createMediaCard() {
        const $wrapper = document.createElement('a');
        $wrapper.classList.add('media-card');
        const videoPath = `./assets/SamplePhotos/${this._author}/${this._media.video}`;
        const content = `
            <div class="video-container">
                <video>
                    <source src="${videoPath}" type="video/mp4">
                        Votre navigateur ne supporte pas la balise vidéo.
                </video>
                    <i class="fa fa-play play-button" aria-label="Play button"></i>
            </div>
            <div class="media-card-description">
                <p class="title">${this._media.title}</p>
                <p class="wrapper-likes">
                    <span class="number-likes-media">${this._media.likes} </span>
                    <i class="fa-regular fa-heart like-button unlike" aria-label="likes"></i>
                </p>
            </div>
        `;
        $wrapper.innerHTML = content;
        return $wrapper;
    }
}