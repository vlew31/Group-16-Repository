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

    function checkUpdate() {
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

        // if (!sellerChecker(seller)) {
        //     alert('Invalid seller');
        //     return false;
        // }
    
        if (!photosChecker(photos)) {
            alert('Invalid last name.');
            return false;
        }
    
        // if (!titleChecker(title)) {
        //     alert('Invalid title.');
        //     return false;
        // }

        // if (!descriptionChecker(description)) {
        //     alert('Invalid last name.');
        //     return false;
        // }
    
        // if (!articleChecker(article)) {
        //     alert('Invalid article.');
        //     return false;
        // }

        if (!priceChecker(price)) {
            alert('Invalid price.');
            return false;
        }

        // if (!tagsChecker(tags)) {
        //     alert('Invalid tags.');
        //     return false;
        // }
    
    
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

        if (size.trim()==="") {
            alert('Choose a size.');
            return false
        }
    
        return true;
    }
    
    // function sellerChecker(seller) {
    //     if() {
    //         return "Invalid seller input";
    //       }
    // }

    function photosChecker(photos) {
        if( photos.substring(photos.length - 4) !== ".png" ||
        photos.substring(photos.length - 5) !== ".jpeg" ||
        photos.substring(photos.length - 4) !== ".jpg") {
            return "Invalid photos input";
          }
    }

    // function titleChecker(title) {
    //     if() {
    //         return "Invalid title input";
    //       }
    // }

    // function articleChecker(article) {
    //     if() {
    //         return "Invalid article input";
    //       }
    // }

    // function descriptionChecker(description) {
    //     if() {
    //         return "Invalid description input";
    //       }
    // }

    // function colorChecker(color) {
    //     if() {
    //         return "Invalid color input";
    //       }
    // }

    // function sizeChecker(size) {
    //     if() {
    //         return "Invalid name input";
    //       }
    // }

    // function genderChecker(gender) {
    //     if() {
    //         return "Invalid name input";
    //       }
    // }

    // function conditionChecker(condition) {
    //     if() {
    //         return "Invalid condition input";
    //       }
    // }

    function priceChecker(price) {
        if(!Number.isInteger(price) || price <= 0 || (priceString.includes(".") && priceString.split(".")[1].length > 2)) {
            return "Invalid price input";
          }
    }

    // function tagsChecker(tags) {
    //     if() {
    //         return "Invalid tags input";
    //       }
    // }
    