import { Product } from "../models/product.model"

export interface LoadProducts {
        paging:
        {
            total: number;
        };
        results: Product[];
}