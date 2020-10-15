//récuperation des données renvoyées par le serveur.
let dataCommande = JSON.parse(localStorage.getItem('reponsePost'));

//calcul du total de la commande
let facture = []
for(i=0; i<dataCommande.products.length; i++){
    facture.push(dataCommande.products[i].price);
}
let totalCommande = calculeFacture(facture);

//affichage de l'iD et du prix de la commande
document.getElementById('prix').innerText = totalCommande + "€";
document.getElementById('idCommande').innerText = dataCommande.orderId