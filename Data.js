export const restaurantData = [
    {
        id: 0,
        name: 'Guac de la Costa',
        description: 'tortillas de mais, fruit de la passion, mango',
        cost: 7,
        checked: 0,
        qty: 1,
    },
    {
        id: 1,
        name:'KFC',
        description: 'Burger, Fast Food,Beverages',
        cost: 7,
        checked: 0,
        qty:1
    },
    {
        id: 2,
        name: 'Thalappakatti',
        description: 'South indian, Chettinad,Chinese',
        cost: 7,
        checked: 0,
        qty:1
    },
    {
        id: 3,
        name: 'Madras foods',
        description: 'Sandwich, Fast Food, Shake',
        cost: 7,
        checked: 0,
        qty:1
    }
]

export function getProducts() {
    return restaurantData;
}
export function getProduct(id) {
    return restaurantData.find((product) => (product.id == id));
}