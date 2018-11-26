import { Bike } from "./bike";

export class Line {
    constructor(bike: Bike, quantity: number) {
        this.bike = bike;
        this.quantity = quantity;
    }

    public bike: Bike;
    public quantity: number;
}