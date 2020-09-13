export enum BreadType {
    BreadTop = 'bread-top',
    BreadBottom = 'bread-bottom'
}

export interface Ingredients {
    [type: string]: number;
}

export interface OrderUserInfo {
    name: string;
    street: string;
    zipCode: string;
    country: string;
    email: string;
    deliveryMethod: string;
}

export interface Order {
    id?: string;
    userId: string;
    ingredients: Ingredients;
    price: number;
    date: string;
    userInfo: OrderUserInfo;
}

export interface User {
    email: string;
    password: string;
    isSignup: boolean;
}