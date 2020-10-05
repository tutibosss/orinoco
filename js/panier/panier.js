//recuperation des donne pour la conceeption de la page
let Panier = JSON.parse(localStorage.getItem('panier'));
let conteneurPanier = document.getElementById('recap');
let Facture = [];

//construction du tableaux our le recap de la commande
const creePage = async function(){
    dataMeuble = await recupDataPanier(Panier);

    if(localStorage.getItem('panier') === null){
        conteneurPanier.appendChild(document.createElement('p')).innerText = 'votre panier et vide'
    }else{
        //creation de du tableau avec son entete
        let Entete = ["id element", "nom", "quantiter", "prix unitaire", "total par objet"];
        CreeTableauRecapComande(conteneurPanier,"tableaux", Entete)
        
        //creation du contenue du tableaux
        let tableaux = document.getElementById('tableaux').appendChild(document.createElement('tbody'))
        
        for(i = 0; i<dataMeuble.length; i++){
            console.log(dataMeuble[i]._id)

            let elementEnCours = dataMeuble[i];
            
            let totalLigne = calculePrixQuantiter(elementEnCours.price, Panier[i].quantiter)
            Facture.push(totalLigne);

            let dataLigne = [elementEnCours._id, elementEnCours.name, Panier[i].quantiter,elementEnCours.price + '€',totalLigne+'€']

            creeLigneContenueTableau(tableaux, elementEnCours._id, dataLigne);

            //ajout de la possibliter de suprimer chaque ligne
            let deletLigneTableaux = function(){
                tableaux.removeChild(document.getElementById(elementEnCours._id));
                totalFacture = totalFacture - totalLigne;
                let delet = i;
                if(totalFacture === 0){
                    deletPanier();
                }else{
                    document.getElementById('tbTotal').innerText = totalFacture;
                    Panier.splice(delet, delet--);
                    console.log(Panier);
                    let update = JSON.stringify(Panier);
                    localStorage.setItem('panier', update);
                }
            }

            document.getElementById(elementEnCours._id).appendChild(document.createElement('td')).setAttribute('id',"delet"+i);
            creeBouton(document.getElementById("delet"+i), i, "X", 'click', deletLigneTableaux)
        }

        //calcule du total de la facture

        let totalFacture = calculeFacture(Facture)

        //creation du foot du tableau
        CreeTfootTableaux ('tableaux', Entete.length-1, 'droit', 'total de la comande',  totalFacture +"€")

        // ajout du boutton pour vide totalement le panier et suprime le tableau
        const deletPanier = function(){
            let p = document.createElement('p')
            conteneurPanier.replaceChild(p, document.getElementById('tableaux'));
            p.innerText = "votre panier a bien etait vide";
            localStorage.removeItem('panier');
            conteneurPanier.removeChild(document.getElementById('deletPanier'));
        }
        creeBouton(conteneurPanier,'deletPanier','vide le panier', 'click', deletPanier)
    }

creeLien(conteneurPanier, "rependreAchat", "./index.html", "reprendre les achat");
}

let datameuble;
creePage();