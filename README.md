# Pangaea-FE-Coding-Challenge

## Challenge Requirements

Recreate the luminskin.com product page and cart using a GraphQL API.

## Product Page Requirements
1. Should query from
https://pangaea-interviews.now.sh/api/graphql, retrieve the products and display them in a grid.
2. Each item should display the image, title, price and a "Add to Cart" button.
3. For screens wider than 768px, it should show grid of 3 items, for less than 768px wide it should show a grid of two wide.
4. There is no need to implement the page navbar, or filter dropdown 

## Cart Requirements
1. When a user clicks "Add to Cart" on an item it should open the cart sidebar and add the item in.
2. If the item already exists it should increment the quantity.
3. Clicking the + or - buttons will increase or descrease the quantity, if the quantity is 1 and the "-" button is pressed it should remove the item.
4. In the top left there is a currency select, doing so should requery the GraphQL api with a new currency and update the prices.
5. It should sum the items in the cart and display them in the correct selected currency.
6. Ignore anything related to subscriptions

## Viewing Project Locally
- React was used to build this.
- In order to run this app locally, first ensure all dependencies are downloaded with `npm install`

 ### In the project directory, you can run:
**npm start**
- Runs the app in the development mode.
- Open http://localhost:3000 to view it in the browser.

- The page will reload if you make edits.


