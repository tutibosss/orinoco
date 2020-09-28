//recuperation des donne renvoiyer par l'api
let dataCommande = JSON.parse(localStorage.getItem('reponsePost'));

// calcule du total de la commande
let facture = []
for(i=0; i<dataCommande.products.length; i++){
    facture.push(dataCommande.products[i].price);
}
let totalCommande = calculeFacture(facture);

//affichage de l'iD et du prix de la commande
document.getElementById('prix').innerText = totalCommande + "€";
document.getElementById('idCommande').innerText = dataCommande.orderId