var loadProductDetails = () => {
    var pDataUrl = 'http://localhost:8081/get/data/products';
    $("main-container").html('');
    $.ajax({
        url: pDataUrl,
        method: 'GET',
        dataType: 'json',
        success: (response) => {
            response.forEach(function(item, index) {
                console.log(item);
                console.log(index)
                var discount =((item.price) * item.discount) / 100;
                response[index].discountPrice = item.price - discount;
            });
            loadProductsOnPage(response);
        }
    });
}

var loadProductsOnPage = (data) => {
    var productTemplate;
    $.ajax({
        url: 'templates/prodDetails.htm',
        method: 'GET',
        success: function(res) {            
            productTemplate = res;
            $("#templateContent").html(res);
            var divTag = $("<div class='PDetailsContainer'></div>");
            var logoutLink = $("<div onclick='logoutuser()' class='logoutLink'>Logout </div>")
            divTag.append(logoutLink)
            
            // main-container
            data.forEach(function(product, index) {
                divTag.loadTemplate($("#templateContent"), product, {append: true});
            });
            $("main-container").append(divTag);
        }
    })
}

var logoutuser = () => {
    $.ajax({
        url: '/logoutuser',
        method: 'POST',
        dataType: 'JSON',
        success: (res) => {
            loadPage('login');
        }
    })
}