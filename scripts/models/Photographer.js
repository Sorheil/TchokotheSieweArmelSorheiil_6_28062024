class Photographer {
    constructor(photographer) {
        this._name = photographer.name
        this._id = photographer.id
        this._city = photographer.city
        this._country = photographer.country
        this._tags = photographer.tags
        this._tagline = photographer.tagline
        this._price = photographer.price
        this._portrait = photographer.portrait
    }
    get name() {
        return this._name
    }
    get city() {
        return this._city
    }
    get country() {
        return this._country
    }
    get tags() {
        return this._tags
    }
    get tagline() {
        return this._tagline
    }
    get price() {
        return this._price
    }
    get portrait() {
        return this._portrait
    }

}