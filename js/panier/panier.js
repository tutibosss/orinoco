//récuperation des données pour la conception de la page
const Panier = JSON.parse(localStorage.getItem('panier'));
const conteneurPanier = document.getElementById('recap');
let Facture = [];

//construction du tableau pour le récap de la commande
const creePage = async function(){

    if(localStorage.getItem('panier') === null){
        conteneurPanier.appendChild(document.createElement('p')).innerText = 'Votre panier est vide'
    }else{
        dataMeuble = await recupDataPanier(Panier)

        //création du tableau avec son entête
        let Entete = ["Id élément", "Nom", "Quantité", "Prix unitaire", "Total par objet"];
        CreeTableauRecapComande(conteneurPanier,"tableaux", Entete)
        
        //création du contenu du tableau
        let tableaux = document.getElementById('tableaux').appendChild(document.createElement('tbody'))
        
        for(i = 0; i<dataMeuble.length; i++){

            let elementEnCours = dataMeuble[i];
            
            let totalLigne = calculePrixQuantiter(elementEnCours.price, Panier[i].quantiter)
            Facture.push(totalLigne);

            let dataLigne = [elementEnCours._id, elementEnCours.name, Panier[i].quantiter,elementEnCours.price + '€',totalLigne+'€']

            creeLigneContenueTableau(tableaux, elementEnCours._id, dataLigne, Entete);

            //ajout de la possibilité de supprimer chaque ligne
            let deletLigneTableaux = function(){
                tableaux.removeChild(document.getElementById(elementEnCours._id));
                totalFacture = totalFacture - totalLigne;
                let delet = i;
                if(totalFacture === 0){
                    deletPanier();
                }else{
                    document.getElementById('tbTotal').innerText = totalFacture;
                    Panier.splice(delet, delet--);
                    let update = JSON.stringify(Panier);
                    localStorage.setItem('panier', update);
                }
            }

            document.getElementById(elementEnCours._id).appendChild(document.createElement('td')).setAttribute('id',"delet"+i);
            creeBouton(document.getElementById("delet"+i), i, "X", 'click', deletLigneTableaux)
        }

        //calcule du total de la facture

        let totalFacture = calculeFacture(Facture)

        //création du tfoot du tableau
        CreeTfootTableaux ('tableaux', Entete.length-1, 'droit', 'total de la commande',  totalFacture +"€")

        // ajout du bouton pour vider totalement le panier et suprimer le tableau
        const deletPanier = function(){
            let p = document.createElement('p')
            conteneurPanier.replaceChild(p, document.getElementById('tableaux'));
            p.innerText = "Votre panier a bien été vidé";
            localStorage.removeItem('panier');
            conteneurPanier.removeChild(document.getElementById('deletPanier'));
        }
        creeBouton(conteneurPanier,'deletPanier','Vider le panier', 'click', deletPanier)
    }

creeLien(conteneurPanier, "rependreAchat", "./index.html", "Reprendre les achats");
}

let datameuble;
creePage();