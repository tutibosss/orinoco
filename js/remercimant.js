//recuperation des donne renvoiyer par l'api
let dataCommande = JSON.parse(localStorage.getItem('reponseCommande'));

// calcule du total de la commande
let totalCommande = 0
for(i=0; i<dataCommande.products.length; i++){
    totalCommande = totalCommande + dataCommande.products[i].price;
}

//affichage de l'iD et du prix de la commande
document.getElementById('prix').innerText = totalCommande + "€";
document.getElementById('idCommande').innerText = dataCommande.orderId