import { Line } from "./line";
import { Bike } from "./bike";
import { DiscountCode } from "./discountCode";

const newline = '\n';
const digitSeperatorRegex = /(\d{3})(?=\d)/g;

function formatMoney(amount: number, decimalCount: number = 2, decimal: string = ".", thousandsSeperator: string = ","): string {
    try {
        const negativeSign = amount < 0 ? "-" : "";

        decimalCount = Math.abs(decimalCount);
        let amountWithDecimals = Math.abs(amount).toFixed(decimalCount);
        
        let amountWithoutDecimalss: string = parseInt(amountWithDecimals).toString();
        
        let digitSeperatorIndex: number = (amountWithoutDecimalss.length > 3) ? amountWithoutDecimalss.length % 3 : 0;

        let thousandsWithSeperator = digitSeperatorIndex ? amountWithoutDecimalss.substr(0, digitSeperatorIndex) + thousandsSeperator : '';
        let hundreds = amountWithoutDecimalss.substr(digitSeperatorIndex).replace(digitSeperatorRegex, "$1" + thousandsSeperator);
        let cents = (decimalCount && decimal + Math.abs(amount - parseInt(amountWithoutDecimalss)).toFixed(decimalCount).slice(2));
            
        return negativeSign + thousandsWithSeperator + hundreds + cents;
    } catch (e) {
        console.log(e);
    }
}

function calculatePrice(quantity: number, price: number) : number {
    let amount = 0;

    switch (price) {
        case Bike.OneThousand:
            if (quantity >= 20)
                amount += quantity * price * .9;
            else
                amount += quantity * price;
            break;
        case Bike.OneThousandFiveHundred:
            if (quantity >= 15)
                amount += quantity * price * .9;
            else
                amount += quantity * price;
            break;
        case Bike.TwoThousand:
            if (quantity >= 10)
                amount += quantity * price * .8;
            else
                amount += quantity * price;
            break;
        case Bike.TwoThousandFiveHundred:
            if (quantity >= 7)
                amount += quantity * price * .8;
            else
                amount += quantity * price;
            break;
        case Bike.FiveThousand:
            if (quantity >= 5)
                amount += quantity * price * .8;
            else
                amount += quantity * price;
            break;
        case Bike.TenThousand:
            if (quantity > 1)
                amount += quantity * price * .7;
            else
                amount += quantity * price;
            break;     
    }

    return amount;
}

export class Order {
    private _taxRate: number = .0725;
    private _lines: Line[] = [];
    private _company: string;

    constructor(company: string) {
        this._company = company;
    }

    public get Company(): string {
        return this._company;
    }

    public AddLine(line: Line): void {
        this._lines.push(line);
    }

    public Receipt(): string {
        var totalAmout = 0;
        var result = 'Order Receipt for ' + this._company + newline;

        for (var i = 0; i < this._lines.length; i++) {
            var thisAmount = 0;

            thisAmount = calculatePrice(this._lines[i].quantity, this._lines[i].bike.price);

            result += `\t${this._lines[i].quantity} x ${this._lines[i].bike.brand} ${this._lines[i].bike.model}`;

            if (this._lines[i].discountCode) {
                var validDiscountCode = DiscountCode.AvailableDiscountCodes.filter(x => x === this._lines[i].discountCode.name);
                if (validDiscountCode.length === 1) {
                    thisAmount = thisAmount - (thisAmount * (this._lines[i].discountCode.discountPercentage / 100));
                    result += ` - ${this._lines[i].discountCode.discountPercentage}% (${this._lines[i].discountCode.name})`;
                }
            }

            result += ' = $' + formatMoney(thisAmount) + newline;
            totalAmout += thisAmount;
        }

        result += 'Sub-Total: $' + formatMoney(totalAmout) + newline;
        var tax = totalAmout * this._taxRate;
        result += 'Tax: $' + formatMoney(tax) + newline;
        result += 'Total: $' + formatMoney(totalAmout + tax);

        return result;
    }

    public HtmlReceipt() {
        var totalAmout = 0;
        var result = '<html><body><h1>Order Receipt for ' + this._company + '</h1>';

        result += '<ul>';
        for (var i = 0; i < this._lines.length; i++) {
            var thisAmount = 0;

            thisAmount = calculatePrice(this._lines[i].quantity, this._lines[i].bike.price);

            result += `<li>${this._lines[i].quantity} x ${this._lines[i].bike.brand} ${this._lines[i].bike.model}`;
           
            if (this._lines[i].discountCode) {
                var validDiscountCode = DiscountCode.AvailableDiscountCodes.filter(x => x === this._lines[i].discountCode.name);
                if (validDiscountCode.length === 1) {
                    thisAmount = thisAmount - (thisAmount * (this._lines[i].discountCode.discountPercentage / 100));
                    result += ` - ${this._lines[i].discountCode.discountPercentage}% (${this._lines[i].discountCode.name})`;
                }
            }
            
            result += ` = $${formatMoney(thisAmount)}</li>`;
            totalAmout += thisAmount;
        };
        result += '</ul>';

        result += '<h3>Sub-Total: $' + formatMoney(totalAmout) + '</h3>';
        var tax = totalAmout * this._taxRate;
        result += '<h3>Tax: $' + formatMoney(tax) + '</h3>';
        result += '<h2>Total: $' + formatMoney(totalAmout + tax) + '</h2>';
        result += '</body></html>';
        return result;
    }
}