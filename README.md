

# Product Upload API Integration

This project allows you to submit product data to an API endpoint, including handling image file uploads. The product data, along with images, is sent to a backend server through a POST request using **axios** and **FormData**. It supports both uploading image files directly from the client and fetching images from URLs for upload.

## Table of Contents
- [Project Overview](#project-overview)
- [Installation](#installation)
- [Usage](#usage)
- [Code Explanation](#code-explanation)
- [Error Handling](#error-handling)
- [License](#license)

## Project Overview
The primary goal of this project is to enable product submissions through an API. Each product contains the following information:
- **name**: Name of the product
- **description**: Description of the product
- **price**: Price of the product
- **category**: The category of the product
- **subCategory**: The subcategory of the product
- **bestseller**: A boolean value indicating if the product is a bestseller
- **sizes**: Available sizes for the product
- **image**: An array containing image files or URLs

The image files are appended to a `FormData` object, and the `POST` request is sent to the backend API, with images either uploaded directly or fetched from URLs.

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/your-username/product-upload-api.git
```

### 2. Install dependencies
```bash
cd product-upload-api
npm install
```

### 3. Start the development server (if required)
```bash
npm start
```

## Usage

### 1. Prepare Product Data
You need to send an array of products, each with the required fields (name, description, etc.) and a list of images (either File objects or image URLs).

Example of a product array:
```javascript
const productsArray = [
  {
    name: "Women Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt.",
    price: 100,
    category: "Women",
    subCategory: "Topwear",
    bestseller: true,
    sizes: ["S", "M", "L"],
    image: ["./path/to/image1.png", new File([""], "image2.jpg")]
  }
];
```

### 2. Call the `submitAllProducts` function

To submit the products to the API, call the `submitAllProducts` function and pass the product array to it:
```javascript
import submitAllProducts from './submitAllProducts';

submitAllProducts(productsArray)
  .then(() => {
    console.log("All products have been successfully submitted.");
  })
  .catch((error) => {
    console.error("Error submitting products:", error);
  });
```

### 3. Backend API Configuration
The backend API URL is defined in the `API_URL` variable:
```javascript
const API_URL = 'http://localhost:4000/api/product/add';
```
Ensure that the backend server is running and properly configured to handle `POST` requests at this endpoint.

## Code Explanation

### Key Variables:
- `API_URL`: The backend API endpoint where the product data will be sent.
- `token`: The authentication token required for making requests to the API.

### `submitAllProducts` function:
1. **Form Data Construction**: 
   - For each product in the `productsArray`, a `FormData` object is created to append the product data.
   - For each image in the `product.image` array:
     - If the image is a `File` object, it's appended directly to the `FormData` object.
     - If the image is a URL or file path, it's fetched as a `Blob` and converted to a `File` object before being appended to the `FormData`.
   
2. **Image Fetching**:
   - If the image is not a `File` object, a `fetch()` request is made to download the image as a `Blob`. This blob is then converted to a `File` and appended to the form data.
   
3. **Sending Data to the API**:
   - After all product data and images are added to the `FormData`, a `POST` request is made using `axios`.
   - The request includes the `token` in the headers for authentication.

4. **Error Handling**:
   - If there is an error while fetching or appending the images, it is logged and the process continues for the other products.
   - If the API response indicates failure, the error is thrown and logged.

### Helper Function `logFormData`:
- This function logs all the key-value pairs in the `FormData` object for debugging purposes. It's useful to verify the data before sending it.

## Error Handling

- If there is an issue with fetching an image (e.g., an invalid URL or fetch failure), an error message will be logged, and the image will be skipped.
- If any product fails to be added due to a server-side error, the product name and the error message will be displayed in the console.
- If the `POST` request fails (e.g., server returns an error), the error is thrown and logged with the error message from the server.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---