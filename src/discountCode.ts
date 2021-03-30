export class DiscountCode {
  static AvailableDiscountCodes = ["RIDEMINUS5", "RIDECHEAPER10"];

  constructor(name: string, discountPercentage: number) {
    this.name = name;
    this.discountPercentage = discountPercentage;
  }

  public name: string;
  public discountPercentage: number;
}
