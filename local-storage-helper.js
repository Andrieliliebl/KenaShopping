const MY_CART_PRODUCTS_KEY_ONE = 'MY_CART_PRODUCTS_KEY'


function getProducts() {
    let previousProducts = localStorage.getItem(MY_CART_PRODUCTS_KEY_ONE)  //Vai no local e vê o que tem lá
    const products = JSON.parse(previousProducts) //traduz o que tem lá pra uma lista
    return products //mostra o que tem na lista 
}

function saveProducts(productDetail) {
    let previousProducts = getProducts(); // Vai na local e ve o que tá rolando
    if (previousProducts == null) { // Verifica se está vazio
        productDetail.quantity = 1; // Inicializa a quantidade como 1
        const products = [productDetail]; // Se estiver vazio ele cria o array para salvar produtos futuros
        localStorage.setItem(MY_CART_PRODUCTS_KEY_ONE, JSON.stringify(products)); // Adiciona no array e converte
    } else {
        let productExists = false;

        // Verifica se o produto já está no carrinho
        previousProducts.forEach((product) => {
            if (product.id === productDetail.id) {
                product.quantity += 1; // Incrementa a quantidade
                productExists = true;
            }
        });

        if (!productExists) {
            productDetail.quantity = 1; // Inicializa a quantidade como 1
            previousProducts.push(productDetail); // Adiciona um novo produto
        }

        localStorage.setItem(MY_CART_PRODUCTS_KEY_ONE, JSON.stringify(previousProducts)); // Converte
    }
    showSuccessMessage();
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
