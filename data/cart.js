// Define the Wallet class
class Wallet {
    constructor() {
        this.funds = 0;
        this.paymentMethod = null;
    }

    addFunds(amount) {
        this.funds += amount;
        console.log(`Added ${amount} to the wallet. Total funds: ${this.funds}`);
    }

    setPaymentMethod(paymentMethod) {
        this.paymentMethod = paymentMethod;
        console.log(`Payment method set: ${this.paymentMethod}`);
    }

    purchaseItem(item) {
        if (this.paymentMethod === null) {
            console.log('Please set a payment method before making a purchase.');
            return;
        }

        if (this.funds < item.price) {
            console.log('Insufficient funds. Please add more funds to your wallet.');
            return;
        }

        this.funds -= item.price;
        console.log(`Purchased item: ${item.name}. Remaining funds: ${this.funds}`);
        updateCartTotal();
    }
}

// Define the Item class
class Item {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}

// Usage example
const wallet = new Wallet();

wallet.addFunds(100);
wallet.setPaymentMethod('Credit Card');

const item = new Item('Example Item', 50);
wallet.purchaseItem(item);

function updateCartTotal() {
    const cartItems = document.querySelectorAll('#cart-items .cart-item');
    let total = 0;

    cartItems.forEach(item => {
        const priceElement = item.querySelector('.item-price');
        const price = parseFloat(priceElement.textContent.replace('$', ''));
        total += price;
    });

    const totalAmountElement = document.getElementById('total-amount');
    totalAmountElement.textContent = total.toFixed(2);
}

// Define the Wishlist class
class Wishlist {
    constructor() {
        this.items = [];
    }

    addItem(item) {
        this.items.push(item);
        console.log(`Added item to wishlist: ${item.name}`);
        updateWishlistTotal();
    }
}

// Usage example
const wishlist = new Wishlist();

const wishlistItem = new Item('Wishlist Item', 75);
wishlist.addItem(wishlistItem);

function updateWishlistTotal() {
    const wishlistItems = document.querySelectorAll('#wishlist-items .wishlist-item');
    let total = 0;

    wishlistItems.forEach(item => {
        const priceElement = item.querySelector('.item-price');
        const price = parseFloat(priceElement.textContent.replace('$', ''));
        total += price;
    });

    const wishlistAmountElement = document.getElementById('wishlist-amount');
    wishlistAmountElement.textContent = total.toFixed(2);
}

// Add to Cart button event listener
const addToCartButton = document.getElementById('add-to-cart-btn');
addToCartButton.addEventListener('click', () => {
    const wishlistItems = document.querySelectorAll('#wishlist-items .wishlist-item');
    wishlistItems.forEach(item => {
        const nameElement = item.querySelector('.item-name');
        const priceElement = item.querySelector('.item-price');
        const name = nameElement.textContent;
        const price = parseFloat(priceElement.textContent.replace('$', ''));
        const cartItem = new Item(name, price);
        wallet.purchaseItem(cartItem);
    });
});

const addFundsButton = document.getElementById('add-funds-btn');
const addFundsInput = document.getElementById('add-funds-input');

addFundsButton.addEventListener('click', () => {
    const amount = parseFloat(addFundsInput.value);
    if (isNaN(amount)) {
        console.log('Invalid amount. Please enter a valid number.');
        return;
    }
    wallet.addFunds(amount);
    addFundsInput.value = '';
});

addFunds(amount) {
    this.funds += amount;
    console.log(`Added ${amount} to the wallet. Total funds: ${this.funds}`);
    const walletAmountElement = document.getElementById('wallet-amount');
    walletAmountElement.textContent = this.funds.toFixed(2);
}
