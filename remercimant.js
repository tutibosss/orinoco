let dataCommande = JSON.parse(localStorage.getItem('reponseCommande'));

let totalCommande = 0
for(i=0; i<dataCommande.products.length; i++){
    totalCommande = totalCommande + dataCommande.products[i].price;
}

document.getElementById('prix').innerText = totalCommande + "€";
document.getElementById('idCommande').innerText = dataCommande.orderId