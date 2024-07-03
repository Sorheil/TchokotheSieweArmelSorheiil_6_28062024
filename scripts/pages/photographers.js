async function main() {
  // Get photographer ID from URL parameters
  const params = new URL(document.location).searchParams;
  const id = parseInt(params.get('id'));

  // Fetch photographer data
  const photographersAPI = new PhotographersAPI('./datas/FishEyeData.json');
  const photographers = await photographersAPI.getPhotographers();
  const photographer = photographers.find(photographer => photographer.id === id);

  // Set page title
  document.title = `Photographer ${photographer.name}`;

  // Fetch media data
  const mediaAPI = new MediaAPI('./datas/FishEyeData.json');
  const mediaList = await mediaAPI.getMedia();
  const media = mediaList.filter(media => media.photographerId === id);

  // Insert photographer header element
  const $main = document.querySelector('main');
  const photographHeader = new PhotographHeader(photographer);
  $main.insertBefore(photographHeader.createPhotographHeader(), $main.firstChild);


  // Insert photographer counter like
  const $sortMenu = document.querySelector('.sort-menu')
  const counterLike = new CounterLike(photographer, media);
  $main.insertBefore(counterLike.createPhotographerDetail(), $sortMenu);

  const $dropdownButton = document.getElementById('dropdown-button');
  const $dropdownContent = document.getElementById('dropdown-content');
  const $iconDropdown = document.querySelector('.icon-dropdown');

  $dropdownButton.addEventListener('focus', () => {
    $iconDropdown.click()
  })

  $iconDropdown.addEventListener('click', function (event) {
    event.stopPropagation();
    const expanded = $dropdownButton.getAttribute('aria-expanded') === 'true' || false;
    $dropdownButton.setAttribute('aria-expanded', !expanded);
    $dropdownContent.classList.toggle('show');
    $iconDropdown.classList.toggle('rotate');
  });


  // Close the dropdown if the user clicks outside of it
  window.addEventListener('click', function (event) {
    if (!event.target.closest('.dropdown')) {
      $dropdownButton.setAttribute('aria-expanded', 'false');
      $dropdownContent.classList.remove('show');
      $iconDropdown.classList.remove('rotate');

    }
  });


  // Sort handlers
  document.querySelector('.btn-sort-by-popularity').addEventListener('click', () => sortMedia('popularity'));
  document.querySelector('.btn-sort-by-date').addEventListener('click', () => sortMedia('date'));
  document.querySelector('.btn-sort-by-title').addEventListener('click', () => sortMedia('title'));

  // Sort media function
  function sortMedia(criteria) {
    switch (criteria) {
      case 'popularity':
        media.sort((a, b) => b.likes - a.likes);
        break;
      case 'date':
        media.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'title':
        media.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    // Insert sorted media
    insertPhotographerMedia(media, photographer.name);

    // Initialize lightbox and likes functionality
    initLightbox();
    addLikeHandler();
  }

  // Insert modal form
  const modalForm = new ModalForm();
  const $modalForm = modalForm.createModalForm();
  document.body.appendChild($modalForm);

  // Open modal form
  const $cta = document.querySelector('.cta');
  $cta.addEventListener('click', function (event) {
    event.preventDefault();
    openModal($modalForm);
    $modalForm.click()
    prename.focus()
    makeAllNonFocusableExcept($modalForm )
  });

  // Close modal form
  const $closeModalBtn = $modalForm.querySelector('.close-popup');
  $closeModalBtn.addEventListener('click', function (event) {
    event.preventDefault();
    closeModal($modalForm);
    makeAllFocusable()
  });

  // Handle form submission
  document.querySelector('.btn-submit').addEventListener('click', function (event) {
    event.preventDefault();
    const prename = document.getElementById('prename').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    console.log('First Name:', prename, '\nLast Name:', name, '\nEmail:', email, '\nMessage:', message);
    // $closeModalBtn.click();
  });

  // Insert photographer media
  insertPhotographerMedia(media, photographer.name);

  // Initialize lightbox and likes functionality
  initLightbox();
  addLikeHandler();
}

// Open modal function
function openModal($modalForm) {
  const backdrop = document.querySelector('.backdrop');
  $modalForm.style.display = 'block';
  backdrop.style.display = 'block';
  document.body.classList.add('modal-open');
  backdrop.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';


}

// Close modal function
function closeModal($modalForm) {
  const backdrop = document.querySelector('.backdrop');
  $modalForm.style.display = 'none';
  backdrop.style.display = 'none';
  document.body.classList.remove('modal-open');
}

// Insert photographer media function
function insertPhotographerMedia(media, photographerName) {
  const $wrapperMediaCard = document.querySelector('.wrapper-media-cards');
  $wrapperMediaCard.innerHTML = '';
  media.forEach(mediaItem => {
    const mediaCard = MediaFactory.createMediaCard(mediaItem, photographerName);
    const $mediaCard = mediaCard.createMediaCard();
    $wrapperMediaCard.appendChild($mediaCard);
  });
}

// Initialize lightbox function
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxVideo = document.getElementById('lightbox-video');
  const lightboxTitle = document.getElementById('lightbox-title');
  let currentIndex = 0;

  // Open lightbox function
  function openLightbox(card) {
    const backdrop = document.querySelector('.backdrop');
    backdrop.style.display = 'block';
    document.body.classList.add('modal-open');
    backdrop.style.backgroundColor = 'white';

    const media = card.querySelector('img, video');
    const title = card.querySelector('.title').innerText;
    lightboxImg.style.display = 'none';
    lightboxVideo.style.display = 'none';


    if (media.tagName.toLowerCase() === 'img') {
      lightboxImg.src = media.src;
      lightboxImg.style.display = 'block';
    } else {
      lightboxVideo.src = media.querySelector('source').src;
      lightboxVideo.style.display = 'block';
    }

    lightboxTitle.textContent = title;
    lightbox.style.display = 'flex';

    lightbox.click()
    lightbox.focus

  }

  // Update lightbox function
  function updateLightbox() {
    const mediaCards = document.querySelectorAll('.media-card');
    currentIndex = (currentIndex < 0) ? mediaCards.length - 1 : currentIndex % mediaCards.length;
    openLightbox(mediaCards[currentIndex]);
  }

  // Add event listeners for lightbox navigation
  const mediaCards = document.querySelectorAll('.media-card');
  mediaCards.forEach((card, index) => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      currentIndex = index;
      openLightbox(card);
      document.getElementById('close-lightbox').focus()
      newlightbox = document.querySelector('.lightbox')
      makeAllNonFocusableExcept(newlightbox)

    });
  });

  // Close lightbox event listener
  document.getElementById('close-lightbox').addEventListener('click', () => {
    lightbox.style.display = 'none';
    const backdrop = document.querySelector('.backdrop');
    backdrop.style.display = 'none';
    document.body.classList.remove('modal-open');
    makeAllFocusable()
  });

  // Previous media event listener
  document.getElementById('prev-media').addEventListener('click', () => {
    currentIndex--;
    updateLightbox();
  });

  // Next media event listener
  document.getElementById('next-media').addEventListener('click', () => {
    currentIndex++;
    updateLightbox();
  });

  // Keyboard navigation for lightbox
  document.addEventListener('keydown', (event) => {
    if (lightbox.style.display === 'flex') {
      switch (event.key) {
        case 'ArrowRight':
          currentIndex++;
          updateLightbox();
          break;
        case 'ArrowLeft':
          currentIndex--;
          updateLightbox();
          break;
        case 'Escape':
          document.getElementById('close-lightbox').click();
          break;
      }
    }
  });
}

// Add like handler function
function addLikeHandler() {
  const likeElements = document.querySelectorAll('.like-button');
  likeElements.forEach(element => {
    element.addEventListener('click', (event) => {
      event.stopPropagation();
      event.preventDefault();

      const $numberLikeMedia = element.parentElement.querySelector('.number-likes-media');
      let numberLikeMedia = parseInt($numberLikeMedia.innerText);
      const $numberlikePhotographer = document.querySelector('.counter-likes-photographer');
      let numberlikePhotographer = parseInt($numberlikePhotographer.innerText);

      if (element.classList.contains('liked')) {
        element.classList.remove('liked');
        numberLikeMedia--;
        numberlikePhotographer--;
      } else {
        element.classList.add('liked');
        numberLikeMedia++;
        numberlikePhotographer++;
      }

      $numberLikeMedia.innerText = Math.max(numberLikeMedia, 0).toString();
      $numberlikePhotographer.innerText = Math.max(numberlikePhotographer, 0).toString();
    });
  });
}

function makeAllNonFocusableExcept(elementToKeepFocusable) {
  // Récupérer tous les éléments de la page
  const allElements = document.querySelectorAll('*');

  // Parcourir tous les éléments
  allElements.forEach(element => {
    // Vérifier si l'élément n'est pas celui que nous voulons garder focusable et n'est pas un enfant de cet élément
    if (element !== elementToKeepFocusable && !elementToKeepFocusable.contains(element)) {
      element.setAttribute('tabindex', '-1'); // Rendre l'élément non focusable
    } else {
      element.removeAttribute('tabindex'); // Retirer l'attribut tabindex s'il existe (pour les enfants de l'élément à garder focusable)
    }
  });
}

function makeAllFocusable() {
  // Récupérer tous les éléments de la page
  const allElements = document.querySelectorAll('*');

  // Parcourir tous les éléments
  allElements.forEach(element => {
    // Retirer l'attribut tabindex s'il existe
    element.removeAttribute('tabindex');
  });
}

// Appeler la fonction pour rendre tous les éléments focusables
makeAllFocusable();


document.addEventListener('DOMContentLoaded', main);
