export class Bike {
    static OneThousand = 1000;
    static OneThousandFiveHundred = 1500;
    static TwoThousand = 2000;
    static TwoThousandFiveHundred = 2500;
    static FiveThousand = 5000;
    static TenThousand = 10000;

    constructor(brand: string, model: string, price: number) {
        this.brand = brand;
        this.model = model;
        this.price = price;
    }

    public brand: string;
    public model: string;
    public price: number;
}