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
    const cardH4 = document.createElement('h5')
    const cardH5 = document.createElement('h6')
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

        const myModalElement = document.getElementById('myModal')

        myModalElement.addEventListener('hidden.bs.modal', event => {
            document.querySelector('.carousel-inner').innerHTML = ''
            document.querySelector('.carousel-indicators').innerHTML = ''

        })

        loadProductDetails(product.id)

    })
}


async function loadProductsCategories() {
    const response = await fetch("https://dummyjson.com/products/categories")
    let productCategories = await response.json()
    createCategoryLine(productCategories);
}

function createCategoryLine(categories) {
    let categoryListContainer = document.getElementById('categories-list')
    categories.forEach(category => {
        let categoryLine = document.createElement('option')
        categoryListContainer.appendChild(categoryLine)
        categoryLine.textContent = category.slug
        categoryLine.value = category.slug
    });

    categoryListContainer.addEventListener('change', event => {
        if (event.target.value == 'categorias') {
            loadProducts()
        } else {
            loadProductsByCategory(event.target.value)
        }
    })
}

loadProductsCategories()


async function loadProductsByCategory(category) {
    const response = await fetch("https://dummyjson.com/products/category/" + category)
    let productsResponse = await response.json()
    const appProducts = document.querySelector('#app-products')
    appProducts.innerHTML = ''
    productsResponse.products.forEach(product => {
        createElementCard(product)
    })
}



let searchBtn = document.getElementById('search-btn')
searchBtn.addEventListener('click', event => {
    searchProduct()
})


async function searchProduct() {
    const inputValue = document.getElementById('input-value')
    const response = await fetch("https://dummyjson.com/products/search?q=" + inputValue.value)
    let searchResponse = await response.json()
    const appProducts = document.querySelector('#app-products')
    appProducts.innerHTML = ''
    searchResponse.products.forEach(product => {
        createElementCard(product)
    })
}