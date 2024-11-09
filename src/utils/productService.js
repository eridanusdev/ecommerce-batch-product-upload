const API_URL = 'http://localhost:4000/api/product/add';

const token = '';  // add your token here

import axios from 'axios';

const logFormData = (formData) => {
    for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
    }
};

const submitAllProducts = async (productsArray) => {
    try {
        for (const product of productsArray) {
            const formData = new FormData();
            formData.append("name", product.name);
            formData.append("description", product.description);
            formData.append("price", product.price);
            formData.append("category", product.category);
            formData.append("subCategory", product.subCategory);
            formData.append("bestseller", product.bestseller);
            formData.append("sizes", JSON.stringify(product.sizes));

            console.log(`Processing product: ${product.name}`);
            console.log(`Product images:`, product.image);

            // Create an array of promises for image fetches
            const imagePromises = product.image.map((img, index) => {
                if (img instanceof File) {
                    console.log(`Appending file directly: ${img.name}`);
                    formData.append(`image${index + 1}`, img);
                    return Promise.resolve(); // Already a file, no need to fetch
                } else if (typeof img === "string") {
                    // If the image is a URL or path, fetch it as a file or blob
                    return fetch(img)
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error(`Failed to fetch image: ${img}`);
                            }
                            return response.blob();
                        })
                        .then((blob) => {
                            const file = new File([blob], `image${index + 1}.jpg`, { type: blob.type });
                            console.log(`Appending fetched image: ${file.name}`, file);
                            formData.append(`image${index + 1}`, file);
                        })
                        .catch((err) => {
                            console.error("Error fetching image:", err);
                        });
                }
            });

            // Wait for all images to be processed before continuing
            await Promise.all(imagePromises);

            logFormData(formData); // Log form data for debugging

            const response = await axios.post(
                API_URL,
                formData,
                { headers: { token } }
            );

            if (!response.data.success) {
                throw new Error(`Failed to add product ${product.name}: ${response.data.message}`);
            }

            console.log(`Successfully added product: ${product.name}`);
        }
    } catch (error) {
        console.error(`Error adding product: ${error}`);
        throw new Error(
            error.response?.data?.message || "An error occurred while adding products"
        );
    }
};


export default submitAllProducts;
