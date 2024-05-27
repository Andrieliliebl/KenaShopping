const myModalCartElement = document.getElementById('modalCart')


function onCartBtnClicked() {
    const myModal = new bootstrap.Modal('#modalCart', {
        keyboard: false
    })
    myModal.show()
    loadCart()
}

myModalCartElement.addEventListener('hidden.bs.modal', event => {
    document.getElementById('cart-row-container').innerHTML = ''  //tá esvaziando a how quando fecha o modal do carrinho. 
})

function loadCart() {

    let emptyCart = document.getElementById('empty-cart')
    let productsContainer = document.getElementById('products-container')
    const cartRowContainer = document.getElementById('cart-row-container')
    cartRowContainer.innerHTML = ''
    let products = getProducts()
    if (products == null) {
        emptyCart.classList.remove('d-none')
        productsContainer.classList.add('d-none')
        updateTotalPrice([])

    } else {
        emptyCart.classList.add('d-none')
        productsContainer.classList.remove('d-none')
        updateTotalPrice(products)
        showCartProducts(products)
    }
}

function updateTotalPrice(products) {
    const inicialPrice = 0
    const sum = products
        .map(product => product.price)
        .reduce(
            (accumulator, currentValue) => accumulator + currentValue, inicialPrice
        )
    document.getElementById('cart-total-price').innerText = 'R$' + sum
}


function showCartProducts(products) {
    products.forEach((product, index) => {

        const cartRowContainer = document.querySelector('#cart-row-container')
        const cartRow = document.createElement('div')
        const cartImgDiv = document.createElement('div')
        const cartImg = document.createElement('img')
        const cartTitleDiv = document.createElement('div')
        const cartPriceDiv = document.createElement('div')
        const cartInputDiv = document.createElement('div')
        const cartInputElement = document.createElement('input')
        const cartRemoveItemDiv = document.createElement('div')
        const cartRemoveItemBtn = document.createElement('i')

        cartTitleDiv.innerHTML = product.title
        cartPriceDiv.innerHTML = product.price

        cartRow.classList.add('row', 'cart-row')
        cartImgDiv.classList.add('col-2', 'pt-2', 'img-div')
        cartImg.classList.add('img-fluid', 'img-thumbnail')
        cartImg.setAttribute('src', product.thumbnail)
        cartTitleDiv.classList.add('col-3', 'd-flex', 'align-items-center', 'title-div')
        cartPriceDiv.classList.add('col-3', 'd-flex', 'align-items-center', 'price-div')
        cartInputDiv.classList.add('col-2', 'd-flex', 'align-items-center', 'Input-div')
        cartInputElement.classList.add('cart-qnt')
        cartInputElement.setAttribute('type', 'number')
        cartInputElement.setAttribute('id', 'quantity')
        cartInputElement.setAttribute('name', 'quantity')
        cartInputElement.setAttribute('min', 0)
        cartInputElement.setAttribute('max', 100)
        cartInputElement.setAttribute('step', 1)
        cartInputElement.setAttribute('value', 1)
        cartRemoveItemDiv.classList.add('col-1', 'd-flex', 'align-items-center', 'btn-remove-item')
        cartRemoveItemBtn.classList.add('bi', 'bi-trash-fill')

        cartRowContainer.append(cartRow)
        cartRow.append(cartImgDiv)
        cartImgDiv.append(cartImg)
        cartRow.append(cartTitleDiv)
        cartRow.append(cartPriceDiv)
        cartRow.append(cartInputDiv)
        cartInputDiv.append(cartInputElement)
        cartRow.append(cartRemoveItemDiv)
        cartRemoveItemDiv.append(cartRemoveItemBtn)

        cartRemoveItemBtn.addEventListener('click', () => {
            removeProduct(index)
            loadCart()
        })
    })

}

function showSuccessMessage() {
    const messageElement = document.getElementById('success-message')
 
    messageElement.classList.remove('d-none')

    setTimeout(() => {
        messageElement.classList.add('d-none')
    }, 2000);
}