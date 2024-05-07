document.addEventListener('DOMContentLoaded', function () {
    let update = document.getElementById('uploadForm');
    if (update) {
        update.addEventListener('submit', (event) => {
            if (!checkCreate()) {
                event.preventDefault();
            }
        });
    }
    });

    function updateCreate() {
        let seller = document.getElementById('seller').value;
        let photos = document.getElementById('photos').value;
        let title = document.getElementById('title').value;
        let description = document.getElementById('description').value;
        let article = document.getElementById('article').value;
        let size = document.getElementById('size').value;
        let color = document.getElementById('color').value;
        let gender = document.getElementById('gender').value;
        let price = document.getElementById('price').value;
        let condition = document.getElementById('condition').value;
        let tags = document.getElementById('tags').value;

        if (!sellerChecker(seller)) {
            alert('Invalid seller');
            return false;
        }
    
        if (!photosChecker(photos)) {
            alert('Invalid photos.');
            return false;
        }
    
        if (!titleChecker(title)) {
            alert('Invalid title.');
            return false;
        }

        if (!descriptionChecker(description)) {
            alert('Invalid last name.');
            return false;
        }
    
        if (!articleChecker(article)) {
            alert('Invalid article.');
            return false;
        }

        if (!priceChecker(price)) {
            alert('Invalid price.');
            return false;
        }

        if (!tagsChecker(tags)) {
            alert('Invalid tags.');
            return false;
        }
    
        if (size.trim()==="") {
            alert('Choose a condition.');
            return false
        }
    
        if (condition.trim()==="") {
            alert('Choose a condition.');
            return false
        }

        if (gender.trim()==="") {
            alert('Choose a gender.');
            return false
        }

        if (color.trim()==="") {
            alert('Choose a color.');
            return false
        }
    
        return true;
    }
    
    function sellerChecker(seller) {
        if(typeof seller !== 'string') {
            return false;
        }
        seller = seller.trim();
        if(seller.length <= 0) {
            return false;
        }
        return true;
    }

    function photosChecker(photos) {
        if(!Array.isArray(photos)) {
            return false;
        }
        for (let i = 0; i < photos.length; i++) {
            photos[i] = photos[i].trim();
            if (
                photos[i].substring(photos[i].length - 4) !== ".png" &&
                photos[i].substring(photos[i].length - 5) !== ".jpeg" &&
                photos[i].substring(photos[i].length - 4) !== ".jpg"
            )
            return false;
        }
        return true;
    }

    function titleChecker(title) {
        if(typeof title !== 'string') {
            return false;
        }
        title = title.trim();
        if(title.length <= 0) {
        return false;
        }
        return true;
    }

    function articleChecker(article) {
        if(typeof article !== 'string') {
            return false;
        }
        article = article.trim();
        if(article.length <= 0) {
        return false;
        }
        return true;
    }

    function descriptionChecker(description) {
        if(typeof description !== 'string') {
            return false;
        }
        description = description.trim();
        if(description.length <= 0) {
        return false;
        }
        return true;
    }

    function colorChecker(color) {
        if(typeof color !== 'string') {
            return false;
        }
        color = color.trim();
        if(color.length <= 0) {
        return false;
        }
        return true;
    }

    function sizeChecker(size) {
        if(typeof size !== 'string') {
            return false;
        }
        size = size.trim();
        if(size.length <= 0) {
            return false;
        }
        return true;
    }

    function genderChecker(gender) {
        if(typeof gender !== 'string') {
            return false;
        }
        gender = gender.trim();
        if(gender.length <= 0) {
            return false;
        }
        return true;
    }

    function conditionChecker(condition) {
        if(typeof condition !== 'string') {
            return false;
        }
        condition = condition.trim();
        if(condition.length <= 0) {
            return false;
        }
        return true;
    }

    function priceChecker(price) {
        if(typeof price !== 'string') {
            return false;;
        }
        price = price.trim();
        if(price.length <= 0) {
            return false;
        }
        if (typeof price !== 'float' || price <= 0) {
            return false;
          }
          const priceString = price.toString();
          if (priceString.includes(".") && priceString.split(".")[1].length > 2) {
            return false;
        }
        return true;
    }

    function tagsChecker(tags) {
        if(!Array.isArray(tags)) {
            return false;
        }
        for (let i = 0; i < tags.length; i++) {
            tags[i] = tags[i].trim();
            if (typeof tags[i] !== 'string' || tags[i].trim().length === 0) {
                return false; // Invalid tag format
            }
        }
        return true;
    }
    