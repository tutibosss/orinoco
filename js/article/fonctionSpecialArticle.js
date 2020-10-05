const creeListe = function(conteneur, id, arrayDataListe,){
    conteneur.appendChild(document.createElement('select')).setAttribute('id', id);
    for(let i = 0; i < arrayDataListe.length; i++){
    document.getElementById(id).appendChild(document.createElement("option")).innerText = arrayDataListe[i];
    }
}


const creePanier = function(){
    let Panier = [{
        name: articleID,
        quantiter: 1,
    }]
    localStorage.setItem('panier', JSON.stringify(Panier));
}

const recherche = function (Panier, ID){

    let reponse = {
        value: false,
        idPanier: null
    }
    for(let i = 0; i<Panier.length; i++){
        if(ID === Panier[i].name){
            reponse.value = true;
            reponse.idPanier = i;
        }
    }
    return reponse
}


const ModificationQuantiter = function(Panier, IdPanier){
    let quantiter = Panier[IdPanier].quantiter;
    quantiter ++;
    Panier[IdPanier].quantiter = quantiter;
    localStorage.setItem('panier', JSON.stringify(Panier));
}

const ajoutObjetPanier = function(Panier, articleID){
    let nouvPanier = {
        name: articleID,
        quantiter: 1,
    }
    Panier.push(nouvPanier)
    localStorage.setItem('panier', JSON.stringify(Panier));
}

const AjoutAuPanier = function(){
    let panier = PanierQuantiter(JSON.parse(localStorage.getItem('panier')))
    panier ++;
    document.getElementById('quantiterPanier').innerText = "("+panier+")"

    if(localStorage.getItem('panier') === null){
        creePanier()
    }else{
        let Panier = JSON.parse(localStorage.getItem('panier'));
        let reponse = recherche(Panier, articleID);

        if(reponse.value === true){
            ModificationQuantiter(Panier,reponse.idPanier);
        }else{
            ajoutObjetPanier(Panier,articleID);
        }
    }
    alert("votre aticle a bien etait au panier");
}