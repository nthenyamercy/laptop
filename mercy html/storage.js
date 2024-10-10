// Array of laptop objects
const laptops = [
    { id: 1, model: "Hp pavilion 14", price: 1200, description: "13.3-inch display, Intel i7, 16GB RAM" },
    { id: 2, model: "dell inspiration 15", price: 2000, description: "14-inch display, M1 Pro chip, 16GB RAM" },
    { id: 3, model: "MSI GT Titan", price: 1400, description: "13.3-inch display, Intel i7, 16GB RAM" },
    { id: 4, model: "Dell latitude rugged", price: 1800, description: "14-inch display, Intel i7, 16GB RAM" },
    { id: 5, model: "Accer Aspire one", price: 1100, description: "13.3-inch display, Intel i5, 8GB RAM" },
    { id: 6, model: "Dell precision", price: 900, description: "14-inch display, AMD Ryzen 7, 8GB RAM" },
    { id: 7, model: "lenovo thinkpad", price: 1500, description: "13.5-inch display, Intel i7, 16GB RAM" },
    { id: 8, model: "macbook pro", price: 2200, description: "15.6-inch display, Intel i7, 32GB RAM, RTX 3080" },
    { id: 9, model: "lenovo chromebook", price: 2100, description: "15.6-inch display, Intel i7, 32GB RAM, RTX 3070" },
    { id: 10, model: "Apple macbook", price: 1700, description: "17-inch display, Intel i7, 16GB RAM" }
];

// Example: Fetching a specific laptop by ID
function getLaptopById(id) {
    return laptops.find(laptop => laptop.id === id);
}

// Example: Displaying all laptops
function displayLaptops() {
    laptops.forEach(laptop => {
        console.log(`${laptop.model} - $${laptop.price}: ${laptop.description}`);
    });
}

// Display laptops in console
displayLaptops();
