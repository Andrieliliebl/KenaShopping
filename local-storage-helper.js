const MY_CART_PRODUCTS_KEY_ONE = 'MY_CART_PRODUCTS_KEY'


function getProducts() {
    let previousProducts = localStorage.getItem(MY_CART_PRODUCTS_KEY_ONE)  //Vai no local e vê o que tem lá
    const products = JSON.parse(previousProducts) //traduz o que tem lá pra uma lista
    return products //mostra o que tem na lista 
}

function saveProducts(productDetail) {
    let previousProducts = getProducts()  //vai na local e ve o que tá rolando
    if (previousProducts == null) { //verifica se está vazio
        const products = [productDetail] // se estiver vazio ele cria o array para salvar produtos futuros
        localStorage.setItem(MY_CART_PRODUCTS_KEY_ONE, JSON.stringify(products)) // adiciona no array e converte
    } else {
        previousProducts.push(productDetail) // adiciona um novo 
        localStorage.setItem(MY_CART_PRODUCTS_KEY_ONE, JSON.stringify(previousProducts)) //converte
        showSuccessMessage()
    }
}

function removeProduct(index) {
    let products = getProducts() //vai dar uma olhadinha

    products.splice(index, 1) //remove o que foi clicado

    if (products.length == 0) { //ve se o carrinho está vazio
        localStorage.setItem(MY_CART_PRODUCTS_KEY_ONE, null) //se tiver vazio ele converte a string para null normal 
    }
    else {
        localStorage.setItem(MY_CART_PRODUCTS_KEY_ONE, JSON.stringify(products)) //se n ele mostra o que tem ainda
    }
}
