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

    // Fonction pour ajouter des gestionnaires de clics aux tags
    function addTagClickHandlers() {
        const allTags = document.querySelectorAll('.tag');
        allTags.forEach(tag => {
            tag.addEventListener('click', (event) => {
                event.preventDefault();
                // Extrait le texte du tag, enlève le symbole # et le met en minuscule
                const selectedTag = tag.textContent.replace('#', '').trim().toLowerCase();
                const filteredPhotographers = photographers.filter(photographer =>
                    photographer.tags.some(tag => selectedTag.includes(tag.toLowerCase()))
                );
                console.log(filteredPhotographers);
                displayPhotographers(filteredPhotographers);
            });
        });
    }

    displayPhotographers(photographers);

    console.log(photographers);
}

main();
