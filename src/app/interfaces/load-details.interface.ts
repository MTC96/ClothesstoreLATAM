export interface LoadDetails {
    pictures: [
        {
            url: string;
        }
    ];
    shipping: {
        free_shipping: boolean
    };
    title: string;
    price: number;
    available_quantity: number;
    thumbnail: string;
}