export class Product {
    constructor(
        public id: string,
        public thumbnail: string,
        public title: string,
        public price: number,
        public seller: {
            id: number
        },
        public category_id: string,
        public seller_nick: string
    ) { }
}