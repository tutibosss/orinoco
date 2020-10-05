//recuperation de la base de donnes des meuble
const getMeuble = async function(){
    let reponse = await fetch ('http://localhost:3000/api/furniture')
    if (reponse.ok){
        return await reponse.json();
    }else{
        console.log('erreur resaux');
    }
}

const getMeudleId = async function(id){
    let adresse = 'http://localhost:3000/api/furniture/'+ id
    let reponse = await fetch (adresse);
    console.log(adresse)
    if (reponse.ok){
        return await reponse.json();
    }else{
        console.log('erreur resaux');
    }
}


//envoi de la commande au serveur et recuperation de la reponse
const Post = async function(elementPost, pageRedirection){
    let reponse = await fetch('http://localhost:3000/api/furniture/order',{
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(elementPost)
    });
    if(reponse.ok){
        let repComande = await reponse.text();
        localStorage.setItem('reponsePost', repComande)
        location.href = pageRedirection
    }else{
        console.log(reponse)
    }
}
