# Group-16-Repository

### This is a repository for Group 16's CS546 project. We will be developing an ecommerce web application for thrifted clothing.


# Group-16-Repository - $waggle

## Introduction

This is a repository for Group 16's CS546 project. $waggle is an e-commerce web application for second hand clothing.

## Installation

Make sure your system has node.js, then proceed to the following instructions:

1. `npm install` - installs all package dependencies
2. `npm run seed` - populates database
3. `npm start` - runs the web application

## Usage

You will initially be greeted to the Home page which displays all of the site's listings. From there you can click on items you are interested in to view addition details like more pictures and tags, and have the option to edit or delete their listings.

Through the navigation bar at the top, you can go to the Search page. From there you can search for specific items by name, and/or select filters, which will limit the search results to only those which fall under the selected filters.

Next on the navigation bar is the About Us section. From the drop down menu, you can learn more about Our Mission behind the creation of $waggle, and more about the team behind the site.

The next tab on the navigation bar allows users to create their own listings. By filling out all of the required fields, the user's listing will be added to the database, and will be displayed on the home screen and will make it available for searches.

The User Profile page initially prompts users to log in. If the user does not already have an account they are given the option to register for an account. If their registration is successful, they are again prompted to log in, and once they are logged in they will have access to their User Profile which displays their personal information.

The next tab is the Cart/Wallet. There users can view the totals of their carts, wishlists, and the funds in their wallets. Users can add their wishlists to their cart which will clear their wishlists and update the total of their cart. If users have enough funds in their wallets, they can checkout their cart which will clear the cart and subtract the corresponding funds from their wallets. If they do not have enough funds they are notified, and have the option to add additional funds to their wallet.

The last tab is an easter egg, implemented using AJAX. If you type in the secret password, you are greeted with a fun little message! Hint: It rhymes with kwaggle.