
const getCategories = (data) => {

    return new Set(data?.products.map((product) => product.category.toLowerCase()))

}

export default getCategories