import 'mocha';
import { Order } from './order';
import { Line } from './line';
import { Bike } from './bike';
import { expect } from 'chai';
import { Brand } from './brandEnum';
import { Company } from "./companyEnum";
import { DiscountCode } from './discountCode';

const defy = new Bike(Brand.Giant, "Defy 1", Bike.OneThousand);
const elite = new Bike(Brand.Specialized, "Venge Elite", Bike.TwoThousand);
const duraAce = new Bike(Brand.Specialized, "S-Works Venge Dura-Ace", Bike.FiveThousand);
const defyAdvanced = new Bike(Brand.Giant, "Defy Advanced", Bike.TwoThousandFiveHundred);
const superSixEVO = new Bike(Brand.Cannondale, "SuperSix EVO", Bike.TenThousand);

const resultStatementOneDefy = `Order Receipt for Anywhere Bike Shop
\t1 x Giant Defy 1 = $1,000.00
Sub-Total: $1,000.00
Tax: $72.50
Total: $1,072.50`;

describe('Receipt 1 Defy', () => {
    it('should print a receipt with 1 Defy 1', () => {
        var order = new Order(Company.AnyWhereBikeShop);
        order.AddLine(new Line(defy, 1));
        expect(order.Receipt()).to.equal(resultStatementOneDefy);
    });
});

const resultStatementSuperSixEvo = `Order Receipt for Select Spots Bike Shop
\t1 x Cannondale SuperSix EVO = $10,000.00
Sub-Total: $10,000.00
Tax: $725.00
Total: $10,725.00`;

describe('Receipt 1 Super Six EVO', () => {
    it('should print a receipt with 1 Super Six EVO', () => {
        var order = new Order(Company.SelectSpotsBikeShop);
        order.AddLine(new Line(superSixEVO, 1));
        expect(order.Receipt()).to.equal(resultStatementSuperSixEvo);
    });
});

const resultStatementOneDefyWithTenPercentDiscount = `Order Receipt for Anywhere Bike Shop
\t1 x Giant Defy 1 - 10% (RIDECHEAPER10) = $900.00
Sub-Total: $900.00
Tax: $65.25
Total: $965.25`;

describe('Receipt 1 Defy With 10% Discount', () => {
    it('should print a receipt with 1 Defy 1 with 10% discount', () => {
        var order = new Order(Company.AnyWhereBikeShop);
        var discountCode = new DiscountCode("RIDECHEAPER10", 10);
        order.AddLine(new Line(defy, 1, discountCode));
        expect(order.Receipt()).to.equal(resultStatementOneDefyWithTenPercentDiscount);
    });
});

const resultStatementOneDefyWithFakeDiscount = `Order Receipt for Anywhere Bike Shop
\t1 x Giant Defy 1 = $1,000.00
Sub-Total: $1,000.00
Tax: $72.50
Total: $1,072.50`;

describe('Receipt 1 Defy Fake Discount Code', () => {
    it('should print a receipt with 1 Defy 1 without fake discount code', () => {
        var order = new Order(Company.AnyWhereBikeShop);
        var discountCode = new DiscountCode("CHEATCODE", 100);
        order.AddLine(new Line(defy, 1, discountCode));
        expect(order.Receipt()).to.equal(resultStatementOneDefyWithFakeDiscount);
    });
});

const resultStatementOneDefyAdvanced = `Order Receipt for Anywhere Bike Shop
\t1 x Giant Defy Advanced = $2,500.00
Sub-Total: $2,500.00
Tax: $181.25
Total: $2,681.25`;

describe('Receipt 1 Defy Advanced', () => {
    it('should print a receipt with 1 Defy Advanced', () => {
        var order = new Order(Company.AnyWhereBikeShop);
        order.AddLine(new Line(defyAdvanced, 1));
        expect(order.Receipt()).to.equal(resultStatementOneDefyAdvanced);
    });
});

const resultStatementOneElite = `Order Receipt for Anywhere Bike Shop
\t1 x Specialized Venge Elite = $2,000.00
Sub-Total: $2,000.00
Tax: $145.00
Total: $2,145.00`;

describe('Receipt 1 Elite', () => {
    it('should print a receipt with 1 Venge Elite', () => {
        var order = new Order("Anywhere Bike Shop");
        order.AddLine(new Line(elite, 1));
        expect(order.Receipt()).to.equal(resultStatementOneElite);
    });
});

const resultStatementOneDuraAce = `Order Receipt for Anywhere Bike Shop
\t1 x Specialized S-Works Venge Dura-Ace = $5,000.00
Sub-Total: $5,000.00
Tax: $362.50
Total: $5,362.50`;

describe('Receipt 1 Dura-Ace', () => {
    it('should print a receipt with 1 Dura-Ace', () => {
        var order = new Order(Company.AnyWhereBikeShop);
        order.AddLine(new Line(duraAce, 1));
        expect(order.Receipt()).to.equal(resultStatementOneDuraAce);
    });
});

const resultStatementAllBikes = `Order Receipt for Anywhere Bike Shop
\t1 x Giant Defy 1 = $1,000.00
\t1 x Specialized Venge Elite = $2,000.00
\t1 x Specialized S-Works Venge Dura-Ace = $5,000.00
Sub-Total: $8,000.00
Tax: $580.00
Total: $8,580.00`;

describe('Receipt 3 Bikes', () => {
    it('should print a receipt with 3 different bikes', () => {
        var order = new Order(Company.AnyWhereBikeShop);
        order.AddLine(new Line(defy, 1));
        order.AddLine(new Line(elite, 1));
        order.AddLine(new Line(duraAce, 1));
        expect(order.Receipt()).to.equal(resultStatementAllBikes);
    });
});


const htmlResultStatementOneDefy = '<html><body><h1>Order Receipt for Anywhere Bike Shop</h1><ul><li>1 x Giant Defy 1 = $1,000.00</li></ul><h3>Sub-Total: $1,000.00</h3><h3>Tax: $72.50</h3><h2>Total: $1,072.50</h2></body></html>';

describe('Html Receipt 1 Defy', () => {
    it('should print an html receipt with 1 Defy 1', () => {
        var order = new Order(Company.AnyWhereBikeShop);
        order.AddLine(new Line(defy, 1));
        expect(order.HtmlReceipt()).to.equal(htmlResultStatementOneDefy);
    });
});

describe('Html Receipt 1 Defy With Invalid Discount Code', () => {
    it('should print an html receipt with 1 Defy 1', () => {
        var order = new Order(Company.AnyWhereBikeShop);
        var discountCode = new DiscountCode("CHEATCODE", 100);
        order.AddLine(new Line(defy, 1, discountCode));
        expect(order.HtmlReceipt()).to.equal(htmlResultStatementOneDefy);
    });
});


const htmlResultStatementOneDefyWithTenPercentDiscount = '<html><body><h1>Order Receipt for Anywhere Bike Shop</h1><ul><li>1 x Giant Defy 1 - 10% (RIDECHEAPER10) = $900.00</li></ul><h3>Sub-Total: $900.00</h3><h3>Tax: $65.25</h3><h2>Total: $965.25</h2></body></html>';

describe('Html Receipt 1 Defy With Valid Discount Code', () => {
    it('should print an html receipt with 1 Defy 1', () => {
        var order = new Order(Company.AnyWhereBikeShop);
        var discountCode = new DiscountCode("RIDECHEAPER10", 10);
        order.AddLine(new Line(defy, 1, discountCode));        
        expect(order.HtmlReceipt()).to.equal(htmlResultStatementOneDefyWithTenPercentDiscount);
    });
});


const htmlResultStatementOneElite = '<html><body><h1>Order Receipt for Anywhere Bike Shop</h1><ul><li>1 x Specialized Venge Elite = $2,000.00</li></ul><h3>Sub-Total: $2,000.00</h3><h3>Tax: $145.00</h3><h2>Total: $2,145.00</h2></body></html>';

describe('Html Receipt 1 Elite', () => {
    it('should print an html receipt with 1 Venge Elite', () => {
        var order = new Order(Company.AnyWhereBikeShop);
        order.AddLine(new Line(elite, 1));
        expect(order.HtmlReceipt()).to.equal(htmlResultStatementOneElite);
    });
});

const htmlResultStatementOneDuraAce = '<html><body><h1>Order Receipt for Anywhere Bike Shop</h1><ul><li>1 x Specialized S-Works Venge Dura-Ace = $5,000.00</li></ul><h3>Sub-Total: $5,000.00</h3><h3>Tax: $362.50</h3><h2>Total: $5,362.50</h2></body></html>';

describe('Html Receipt 1 Dura-Ace', () => {
    it('should print an html receipt with 1 Dura-Ace', () => {
        var order = new Order(Company.AnyWhereBikeShop);
        order.AddLine(new Line(duraAce, 1));
        expect(order.HtmlReceipt()).to.equal(htmlResultStatementOneDuraAce);
    });
});

const htmlResultStatementAllBikes = '<html><body><h1>Order Receipt for Anywhere Bike Shop</h1><ul><li>1 x Giant Defy 1 = $1,000.00</li><li>1 x Specialized Venge Elite = $2,000.00</li><li>1 x Specialized S-Works Venge Dura-Ace = $5,000.00</li></ul><h3>Sub-Total: $8,000.00</h3><h3>Tax: $580.00</h3><h2>Total: $8,580.00</h2></body></html>';

describe('Html Receipt 3 Bikes', () => {
    it('should print an html receipt with 3 different bikes', () => {
        var order = new Order(Company.AnyWhereBikeShop);
        order.AddLine(new Line(defy, 1));
        order.AddLine(new Line(elite, 1));
        order.AddLine(new Line(duraAce, 1));
        expect(order.HtmlReceipt()).to.equal(htmlResultStatementAllBikes);
    });
});

