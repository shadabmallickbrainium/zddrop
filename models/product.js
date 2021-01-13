class Product {
    constructor(id, categoryId, name, price,imageUrl, description, createdAt, updatedAt, vendorId) {
        this.id = id,
        this.categoryId = categoryId,
        this.name = name,
        this.price = price,
        this.imageUrl = imageUrl,
        this.description = description,
        this.createdAt = createdAt,
        this.updatedAt = updatedAt,
        this.vendorId = vendorId
    }
}

export default Product;