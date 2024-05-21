
async function loadProducts() {
    const response = await fetch("https://dummyjson.com/products")
    const productResponse = await response.json()
    productResponse.products.forEach(product => {
        createElementCard(product)
    });
}

loadProducts()


function createElementCard(product) {

    const cardColumn = document.createElement('div')
    const cardContainer = document.createElement('div')
    const cardImg = document.createElement('img')
    const cardBody = document.createElement('div')
    const cardH4 = document.createElement('h4')
    const cardH5 = document.createElement('h5')
    const cardP = document.createElement('p')

    const appProducts = document.querySelector('#app-products')

    cardColumn.classList.add('col', 'mb-4')
    cardContainer.classList.add('card', 'h-100')
    cardImg.classList.add('card-img-top', 'img-fluid')
    cardBody.classList.add('card-body')
    cardH4.classList.add('card-title')
    cardH5.classList.add('card-price')
    cardP.classList.add('card-text')

    cardColumn.append(cardContainer)
    cardContainer.append(cardImg)
    cardContainer.append(cardBody)
    cardBody.append(cardH4)
    cardBody.append(cardH5)
    cardBody.append(cardP)
    appProducts.append(cardColumn)

    cardImg.setAttribute('src', product.thumbnail)
    cardImg.setAttribute('style', 'height: 12em; object-fit:cover;')  //No Css não está puxando, então tive que fazer por aqui. 

    cardH4.innerHTML = product.title
    cardH5.innerHTML = `R$ ${product.price}`
    cardP.innerHTML = `No pix ou crédito (4x s/juros)`

    cardContainer.addEventListener('click', () => {
        const myModal = new bootstrap.Modal('#myModal', {
            keyboard: false
        })
        myModal.show()

        loadProductDetails(product.id)
    })
}

async function loadProductDetails(id) {
    const response = await fetch("https://dummyjson.com/products/" + id)
    const productDetail = await response.json()

    showProductDetail(productDetail)
}

function showProductDetail(productDetail) {
    const modalTitle = document.querySelector('.modal-title')
    const modalDescription = document.querySelector('.modal-description')
    const modalColor = document.querySelector('.modal-color')
    const modalSize = document.querySelector('.modal-size')
    const modalprice = document.querySelector('.modal-price')
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
        carouselImg.setAttribute('src', image)
        carouselItem.append(carouselImg)
        carouselInner.append(carouselItem)
    })

}