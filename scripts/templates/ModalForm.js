class ModalForm {
    constructor() {
    }

    createModalForm() {
        const $wrapper = document.createElement('form');
        $wrapper.classList.add('modal-form');
        const content = `
            <h1>Contactez-moi<br>Mimi Keel</h1>
            <div class="form-data">
                <div class="form-prename">
                    <label for="prename">Prénom</label>
                    <input type="text" id="prename" name="prename">
                </div>
                <div class="form-name">
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name">
                </div>
                <div class="form-mail">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email">
                </div>
                <div class="form-message">
                    <label for="message">Votre message</label>
                    <textarea id="message" name="message"></textarea>
                </div>
            </div>
            <input type="submit">
            <button class="close-popup"><i class="fa-solid fa-xmark"></i></button>
        `;
        $wrapper.innerHTML = content;

        return $wrapper;
    }

}

