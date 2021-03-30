import { Bike } from "./bike";
import { DiscountCode } from "./discountCode";

export class Line {
  constructor(bike: Bike, quantity: number, discountCode?: DiscountCode) {
    this.bike = bike;
    this.quantity = quantity;
    this.discountCode = discountCode;
  }

  public bike: Bike;
  public quantity: number;
  public discountCode?: DiscountCode;
}
