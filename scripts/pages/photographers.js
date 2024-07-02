async function main() {
    // Get photographer ID from URL parameters
    const params = new URL(document.location).searchParams;
    const id = params.get('id');

    // Fetch photographer data
    const photographersAPI = new PhotographersAPI('./datas/FishEyeData.json');
    const photographers = await photographersAPI.getPhotographers();
    const photographer = photographers.find(photographer => photographer.id == id);

    // Set page title
    document.title = `Photographe ${photographer.name}`;

    // Fetch media data
    const mediaAPI = new MediaAPI('./datas/FishEyeData.json');
    const mediaList = await mediaAPI.getMedia();
    const media = mediaList.filter(media => media.photographerId == id);

    // Insert photographer header element
    const $main = document.querySelector('main');
    const photographHeader = new PhotographHeader(photographer);
    $main.insertBefore(photographHeader.createPhotographHeader(), $main.firstChild);

    // Insert photographer details
    const counterLike = new CounterLike(photographer, media);
    $main.appendChild(counterLike.createPhotographerDetail());

    // Insert photographer media
    const $wrapperMediaCard = document.querySelector('.wrapper-media-cards');
    media.forEach(mediaItem => {
        const mediaCard = MediaFactory.createMediaCard(mediaItem, photographer.name);
        const $mediaCard = mediaCard.createMediaCard();
        $wrapperMediaCard.appendChild($mediaCard);
    });

    // Insert modal form
    const modalForm = new ModalForm();
    const $modalForm = modalForm.createModalForm();
    document.body.appendChild($modalForm);

    // Handle form submission
    $modalForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const prename = document.getElementById('prename').value;
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        console.log("Prénom:", prename, "\nNom:", name, "\nEmail:", email, "\nMessage:", message);
    });

    // Open modal
    const $cta = document.querySelector('.cta');
    $cta.addEventListener('click', function (event) {
        event.preventDefault();
        $modalForm.style.display = 'block';
        backdrop.style.display = 'block';
        document.body.classList.add('modal-open');
        backdrop.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        const header = document.querySelector('header');
        header.style.display = "none";
    });

    // Close modal
    const $closeModalBtn = $modalForm.querySelector('.close-popup');
    $closeModalBtn.addEventListener('click', function (event) {
        event.preventDefault();
        $modalForm.style.display = "none";
        backdrop.style.display = 'none';
        document.body.classList.remove('modal-open');
    });

    // Lightbox handling
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxVideo = document.getElementById("lightbox-video");
    const lightboxTitle = document.getElementById("lightbox-title");
    const mediaCards = document.querySelectorAll(".media-card");
    let currentIndex = 0;

    mediaCards.forEach((card, index) => {
        card.addEventListener("click", (e) => {
            e.preventDefault();
            currentIndex = index;
            openLightbox(card);
        });
    });

    // Close lightbox
    document.getElementById("close-lightbox").addEventListener("click", closeLightbox);

    // Go to previous media
    document.getElementById("prev-media").addEventListener("click", () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : mediaCards.length - 1;
        openLightbox(mediaCards[currentIndex]);
    });

    // Go to next media
    document.getElementById("next-media").addEventListener("click", () => {
        currentIndex = (currentIndex < mediaCards.length - 1) ? currentIndex + 1 : 0;
        openLightbox(mediaCards[currentIndex]);
    });

    // Open lightbox
    function openLightbox(card) {
        backdrop.style.display = 'block';
        document.body.classList.add('modal-open');
        backdrop.style.backgroundColor = "white";

        const media = card.querySelector("img, video");
        const title = card.querySelector('.title').innerText;
        lightboxImg.style.display = "none";
        lightboxVideo.style.display = "none";

        if (media.tagName.toLowerCase() === "img") {
            lightboxImg.src = media.src;
            lightboxImg.style.display = "block";
        } else {
            lightboxVideo.src = media.querySelector("source").src;
            lightboxVideo.style.display = "block";
        }

        lightboxTitle.textContent = title;
        lightbox.style.display = "flex";
    }

    // Close lightbox function
    function closeLightbox() {
        lightbox.style.display = "none";
        backdrop.style.display = 'none';
        document.body.classList.remove('modal-open');
    }

    // Keydown event for navigation and close
    document.addEventListener("keydown", (event) => {
        if (lightbox.style.display === "flex") {
            switch (event.key) {
                case "ArrowRight":
                    document.getElementById("next-media").click();
                    break;
                case "ArrowLeft":
                    document.getElementById("prev-media").click();
                    break;
                case "Escape":
                    closeLightbox();
                    break;
            }
        }
    });

    // Like handler
    const likeElements = document.querySelectorAll('.like-button');
    likeElements.forEach(element => {
        element.addEventListener('click', (event) => {
            event.stopPropagation();
            event.preventDefault();

            const $numberLikeMedia = element.parentElement.querySelector('.number-likes-media');
            let numberLikeMedia = parseInt($numberLikeMedia.innerText);
            let $numberlikePhotographer = document.querySelector('.counter-likes-photographer');
            let numberlikePhotographer = parseInt($numberlikePhotographer.innerText);

            if (element.classList.contains('liked')) {
                element.classList.remove('liked');
                element.classList.add('unliked');
                numberLikeMedia--;
                numberlikePhotographer--;
            } else {
                element.classList.remove('unliked');
                element.classList.add('liked');
                numberLikeMedia++;
                numberlikePhotographer++;
            }

            $numberLikeMedia.innerText = numberLikeMedia >= 0 ? `${numberLikeMedia}` : `0`;
            $numberlikePhotographer.innerText = numberlikePhotographer >= 0 ? `${numberlikePhotographer}` : `0`;
        });
    });

    const $iconDropdown = document.querySelector('.icon-dropdown');
    const $dropdownContent = document.getElementById('dropdown-content');

    // Modifier l'événement click sur l'icône dropdown
    $iconDropdown.addEventListener('click', (event) => {
        event.stopPropagation();
        $dropdownContent.classList.toggle('show'); 
        $iconDropdown.classList.toggle('rotate');
    });

    // Close the dropdown if the user clicks outside of it
    window.addEventListener('click', function (event) {
        if (!event.target.closest('.dropdown')) {
            $dropdownContent.classList.remove('show');
            $iconDropdown.classList.remove('rotate');
        }
    });



    // Sort handlers
    // Gestionnaires d'événements pour les boutons de tri
    document.querySelector('.btn-sort-by-popularity').addEventListener('click', () => sortMedia('popularity'));
    document.querySelector('.btn-sort-by-date').addEventListener('click', () => sortMedia('date'));
    document.querySelector('.btn-sort-by-title').addEventListener('click', () => sortMedia('title'));

    // Fonction de tri des médias
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
        updateMediaDisplay();
    }

    // Fonction de mise à jour de l'affichage des médias
    function updateMediaDisplay() {
        const $wrapperMediaCard = document.querySelector('.wrapper-media-cards');
        $wrapperMediaCard.innerHTML = ''; // Efface le contenu actuel
        media.forEach(mediaItem => {
            const mediaCard = MediaFactory.createMediaCard(mediaItem, photographer.name);
            const $mediaCard = mediaCard.createMediaCard();
            $wrapperMediaCard.appendChild($mediaCard);
        });
        // Réinitialiser les gestionnaires d'événements pour les cartes médias après le tri
        initLightboxEventListeners();
    }

    // Fonction pour initialiser les gestionnaires d'événements des cartes médias (à appeler après chaque mise à jour)
    function initLightboxEventListeners() {
        const mediaCards = document.querySelectorAll(".media-card");
        mediaCards.forEach((card, index) => {
            card.addEventListener("click", (e) => {
                e.preventDefault();
                currentIndex = index;
                openLightbox(card);
            });
        });
    }

    // Appelez initLightboxEventListeners après avoir initialisé l'affichage initial des médias
    initLightboxEventListeners();

}

document.addEventListener("DOMContentLoaded", main);
