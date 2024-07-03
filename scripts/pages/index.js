async function main() {
  // API call  
  const photographersAPI = new PhotographersAPI('./datas/FishEyeData.json');
  const photographers = await photographersAPI.getPhotographers();

  const $photographersWrapper = document.querySelector('.photographers-wrapper');

  // Function to show all photographers
  function displayPhotographers(filteredPhotographers) {
    $photographersWrapper.innerHTML = '';
    filteredPhotographers.forEach(photographer => {
      const photographerCard = new PhotographerCard(photographer);
      $photographersWrapper.appendChild(photographerCard.createPhotographerCard());
    });

    // adding click handlers to new tags
    addTagClickHandlers();
  }

  // function to add click handler to tags
  function addTagClickHandlers() {
    const allTags = document.querySelectorAll('.tag');
    allTags.forEach(tag => {
      tag.addEventListener('click', (event) => {
        event.preventDefault();
        // extract the text from the tag, remove the # symbol and make it to lowercase
        const selectedTag = tag.textContent.replace('#', '').trim().toLowerCase();
        const filteredPhotographers = photographers.filter(photographer =>
          photographer.tags.some(tag => selectedTag.includes(tag.toLowerCase()))
        );
        displayPhotographers(filteredPhotographers);
      });
    });
  }

  displayPhotographers(photographers);

}

main();
