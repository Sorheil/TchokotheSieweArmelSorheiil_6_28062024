class MediaFactory {
    static createMediaCard(data, author) {
        if (data.hasOwnProperty('image')) {
            return new PictureCard(data, author)
        } else if (data.hasOwnProperty('video')) {
            return new VideoCard(data, author)
        } else {
            throw new Error('Unknown card type');

        }
    }
}