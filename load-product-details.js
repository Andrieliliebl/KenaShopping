const btnAddCart = document.querySelector('.btn-add-cart');
let currentProductDetail = null


async function loadProductDetails(id) {
    const response = await fetch("https://dummyjson.com/products/" + id)
    const productDetail = await response.json()
    currentProductDetail = productDetail
    showProductDetail(productDetail)
}

function showProductDetail(productDetail) {
    const modalTitle = document.querySelector('#modal-title')
    const modalDescription = document.querySelector('#modal-description')
    const modalColor = document.querySelector('#modal-color')
    const modalSize = document.querySelector('#modal-size')
    const modalprice = document.querySelector('#modal-price')
    modalTitle.innerHTML = productDetail.title
    modalDescription.innerHTML = productDetail.description
    modalColor.innerHTML = productDetail.category
    modalSize.innerHTML = productDetail.brand
    modalprice.innerHTML = `R$ ${productDetail.price}`


    productDetail.images.forEach((image, index) => {

        const carouselIndicators = document.querySelector('.carousel-indicators')
        const carouselIndicator = document.createElement('button')
        carouselIndicator.setAttribute('type', 'button')
        carouselIndicator.setAttribute('data-bs-target', '#carouselExampleIndicators')
        carouselIndicator.setAttribute('data-bs-slide-to', index)
        carouselIndicator.setAttribute('aria-label', `Slide ${index + 1}`)
        carouselIndicators.append(carouselIndicator)

        const carouselItem = document.createElement('div')
        const carouselImg = document.createElement('img')
        const carouselInner = document.querySelector('.carousel-inner')
        carouselItem.classList.add('carousel-item')

        if (index == 0) {
            carouselItem.classList.add('active')
            carouselIndicator.classList.add('active')
            carouselIndicator.setAttribute('aria-current', 'true')
        }

        carouselImg.classList.add('d-block')
        carouselImg.classList.add('w-100')
        carouselImg.classList.add('modal-image')
        carouselImg.setAttribute('src', image)
        carouselItem.append(carouselImg)
        carouselInner.append(carouselItem)
    })


}

function addToCart() {
    saveProducts(currentProductDetail)
}

let currentProductCategory = null 

async function loadProductCategory(category) {
    const response = await fetch("https://dummyjson.com/products/" + category)
    const productCategory = await response.json()
    currentProductCategory = productCategory
    showProductCategory(productCategory)
}

function showProductsCategory (productCategory) {

}