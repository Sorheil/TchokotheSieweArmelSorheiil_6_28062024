class MediaFactory {
  static createMediaCard(data, author) {
    if ('image' in data) {
      return new PictureCard(data, author);
    } else if ('video' in data) {
      return new VideoCard(data, author);
    } else {
      throw new Error('Unknown card type');
    }
  }
}
