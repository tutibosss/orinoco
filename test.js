const getMeuble = async function(){
    let reponse = await fetch ('http://localhost:3000/api/furniture')
    if (reponse.ok){
        localStorage.setItem('dataMeuble', await reponse.text());
    }else{
        console.log('erreur resaux');
    }
}