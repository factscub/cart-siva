
const getBrands = (data, category) => {
    return new Set(data?.products
        .filter((product) => product.category === category)
        .filter(
            (product, i, self) =>
                i === self.findIndex((t) => t.brand === product.brand)
        )
        .map((product) => product.brand.toLowerCase()))
}

export default getBrands