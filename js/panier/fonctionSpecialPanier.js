//fonction qui cree un tbleau avec les reponse des requete get du panier
const recupDataPanier = async function(Panier){
    let tableauxPanier = []
    for(i = 0; i < Panier.length; i++){
        let data = await getMeudleId(Panier[i].name)
        tableauxPanier.push(data)
    }
    return tableauxPanier
}

//fonction de creation du tableau avec son entete
const CreeTableauRecapComande = function(conteneur, id, arrayTitreColone,){
    let tableaux = conteneur.appendChild(document.createElement('table'))
    tableaux.setAttribute('id', id);
    let head = document.getElementById(id).appendChild(document.createElement('thead'))
    head.appendChild(document.createElement('tr')).setAttribute('id', 'description');
    for(let i = 0 ; i<arrayTitreColone.length; i++){
        document.getElementById('description').appendChild(document.createElement('th')).innerText = arrayTitreColone[i];
    }
}

//fonction pour le calcule du prix de chaque ligne du tableau
const calculePrixQuantiter = function(prix, quantiter){
    return prix*quantiter
}

//fonction pour cree le contenue de chaque ligne du body du tableau
const creeLigneContenueTableau = function(conteneur, idLigne, dataAffiche,){
    conteneur.appendChild(document.createElement('tr')).setAttribute('id', idLigne);
    
    for(let i=0; i<dataAffiche.length; i++){
        document.getElementById(idLigne).appendChild(document.createElement('td')).innerText = dataAffiche[i]
    }
}

//fonction pour la creation du foot du tableau
CreeTfootTableaux = function(tableaux, colspan, nomClassColspan, text_a_affiche, prixAffiche){
    tableau = document.getElementById(tableaux)
    tableau.appendChild(document.createElement('tfoot')).setAttribute('id', 'tfoot');
    document.getElementById('tfoot').appendChild(document.createElement('tr')).setAttribute('id', 'total');
    let tbDescript = document.getElementById('total').appendChild(document.createElement('td'));
    tbDescript.setAttribute('colspan', colspan)
    tbDescript.classList.add(nomClassColspan);
    tbDescript.innerText = text_a_affiche;
    let tbTotal = document.createElement('td');
    document.getElementById('total').appendChild(tbTotal).setAttribute('id', 'tbTotal');
    tbTotal.innerText = prixAffiche
}