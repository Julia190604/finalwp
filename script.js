// Event Listener für den Suchbutton
document.querySelector('.search-bar .submit').addEventListener('click', function() {
    const query = document.querySelector('.search-bar input[name="search"]').value;

    // Überprüfen, ob die Suchanfrage mindestens 3 Zeichen lang ist
    if (query && query.trim().length > 2) {
        fetchData(query);
    } else {
        document.getElementById('hint-text').textContent = 'Bitte geben Sie mindestens 3 Zeichen ein.';
    }
});

function fetchData(query) {
    fetch(`https://dummyjson.com/products/search?q=${query}`) 
    .then(res => res.json())
    .then(data => {
        displayResults(data);
    })
    .catch(error => {
        console.error("Es gab einen Fehler beim Abrufen der Daten:", error);
        document.getElementById('hint-text').textContent = 'Es gab einen Fehler bei der Suche.';
    });
}

function displayResults(data) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = ''; // Vorherige Suchergebnisse löschen
    console.log(data)
    data = data.products;
    console.log(data)
    if (data && data.length > 0) {
        data.forEach(product => {
            const productDiv = document.createElement('div');
    
            // Produktbild
            const productImg = document.createElement('img');
            productImg.src = product.images[0];
            productImg.alt = product.title;
            productImg.classList.add('responsive-image'); // Fügt die Klasse für responsive Design hinzu
            productImg.addEventListener("click", function(){
                displayProductDetails(product);
            })
            productDiv.appendChild(productImg);
    
            // Produktlink
            const productName = document.createElement('span');
            productName.innerHTML = product.title;
            productName.classList.add('product-name'); // CSS-Klasse für Styling
            productDiv.appendChild(productName);
            
            const productDetails = document.createElement('div');
            productDetails.setAttribute("id", `product-details-${product.id}`);
           
            resultsContainer.appendChild(productDiv);
            resultsContainer.appendChild(productDetails);

        });
    } else {
        resultsContainer.innerHTML = '<p>Keine Produkte gefunden.</p>';
    }
}


function displayProductDetails(product) {
    const content = document.getElementById(`product-details-${product.id}`);
    content.classList.add('product-details'); // CSS-Klasse für das Styling
    if(content.textContent.length==0){
      let productHtml = `
        <p>${product.description}</p>
        <p>Preis: $${product.price}</p>
        <p>Rabatt: ${product.discountPercentage}%</p>
        <p>Bewertung: ${product.rating}</p>
        <p>Verfügbarer Bestand: ${product.stock}</p>
        <p>Marke: ${product.brand}</p>
        <p>Kategorie: ${product.category}</p>
    `;

    content.innerHTML = productHtml;  
    }
    else{
        content.innerHTML = "";
    }
}
