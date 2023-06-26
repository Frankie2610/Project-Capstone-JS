// Định nghĩa Product constructor
function Product(
  id,
  name,
  price,
  goldPurity,
  weight,
  size,
  img,
  description,
  quantity,
  codeProduct,
  priceDateTime,
  manufactureFee
) {
  // Khai báo các thuộc tính (properties)
  this.id = id;
  this.name = name;
  this.price = price;
  this.goldPurity = goldPurity;
  this.weight = weight;
  this.size - size;
  this.img = img;
  this.description = description;
  this.quantity = quantity;
  this.codeProduct = codeProduct;
  this.priceDateTime = priceDateTime;
  this.manufactureFee = manufactureFee;
}

// Constructor Price
function Price(
  buyingPrice,
  sellingPrice,
  code,
  sellChange,
  sellChangePercent,
  buyChange,
  buyChangePercent,
  dateTime,
  id
) {
  this.buyingPrice = buyingPrice;
  this.sellingPrice = sellingPrice;
  this.code = code;
  this.sellChange = sellChange;
  this.sellChangePercent = sellChangePercent;
  this.buyChange = buyChange;
  this.buyChangePercent = buyChangePercent;
  this.dateTime = dateTime;
  this.id = id;
}

//Constructor GlobalGoldPrice
class GlobalGoldPrice {
  constructor(
    buyingPrice,
    sellingPrice,
    buyChange,
    sellChange,
    code,
    name,
    importNumber,
    dateTime,
    changed,
    id
  ) {
    this.buyingPrice = buyingPrice;
    this.sellingPrice = sellingPrice;
    this.buyChange = buyChange;
    this.sellChange = sellChange;
    this.code = code;
    this.name = name;
    this.importNumber = importNumber;
    this.dateTime = dateTime;
    this.changed = changed;
    this.id = id;
  }
}
