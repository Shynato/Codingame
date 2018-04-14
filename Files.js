/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

const n = parseInt(readline()); // the number of cards for player 1
let cardPlayer1 = [];//contiendra le deck du joueur 1 (valeur et symbole)
for (let i = 0; i < n; i++) {
    const cardp1 = readline(); // the n cards of player 1
    cardPlayer1.push(cardp1);  // ajoute chacune des cartes à la fin du deck du joueur 1
}
const m = parseInt(readline()); // the number of cards for player 2
let cardPlayer2 = [];//contiendra le deck du du joueur 2 (valeur et symbole)
for (let i = 0; i < m; i++) {
    const cardp2 = readline(); // the m cards of player 2
    cardPlayer2.push(cardp2); // ajoute chacune des cartes à la fin du deck du joueur 2
}
//-----------------------------------------------------
// -------------------- FONCTIONS ---------------------  
//-----------------------------------------------------

//Supprime le symbole de chaque cartes dans une liste de carte donné
//Remplace les valeurs non numérique de cartes par leur equivalent en nombre
function convertToValue(cardPlayer){
    const cardRank = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
    var CardValue = cardPlayer.map(function(elem){
        elem = elem.replace(/D|C|H|S/,'');
        elem = elem.replace(/^J/,'11');
        elem = elem.replace(/^Q/,'12');
        elem = elem.replace(/^K/,'13');
        elem = elem.replace(/^A/,'14');
        return elem;
    });
    //renvoie le deck de carte ex : [2,5,7,8,9,7,14]
    return CardValue;
}
//Prend une carte du deck2 pour l'ajouter à la fin du deck1
function addCard(deck1, deck2){
        k = deck2.shift();
        deck1.push(k);
    //renvoie le deck1
    return deck1;
}


//-----------------------------------------------------
// ----------- INITIALISATION DES VARIABLES -----------
//-----------------------------------------------------
    // ---- DECK DES JOUEURS 
//deck du joueur 1 sans les symboles
let p1CardValue = convertToValue(cardPlayer1);
        //Affichage du deck du joueur 1
        printErr('P1 Start:'+p1CardValue);
//deck du joueur 2 sans les symboles
let p2CardValue = convertToValue(cardPlayer2);
        //Affichage du deck du joueur 1
        printErr('P2 Start:'+p2CardValue);

    // ---- AUTRE VARIABLE
let round = 0; // compteur des manches
let p1cardInGame =[];// deck des cartes du joueur 1 en attente
let p2cardInGame =[];// deck des cartes du joueur 2 en attente

    //--- OPTION 
let cardWithdraw = 3; // nombre de cartes à défausser lors d'une bataille


//-----------------------------------------------------
// ------------ DEROULEMENT DU JEU --------------------
//-----------------------------------------------------


//nombre de cartes dans la partie ( nombre de carte du joueur 1 + nombre de carte du joueur 2)
printErr(`CardValue.length : ${p2CardValue.length + p1CardValue.length}`);

while(p1CardValue.length>0 && p2CardValue.length>0 /*&& round<12*/){
    
    printErr('');//Ligne vide pour la clarté
//INITIALISATION de la manche:
        p1CurrentCard=p1CardValue[0];
        p2CurrentCard=p2CardValue[0];
         addCard(p1cardInGame ,p1CardValue);
         addCard(p2cardInGame ,p2CardValue);

        
// Affichage de la manche en cours
printErr('Manche en cours :'+round);        
printErr(`Le joueur 1 tire :${p1CurrentCard}
Le joueur 2 tire :${p2CurrentCard}`);

//BATAILLE ?
    if(parseInt(p1CurrentCard) === parseInt(p2CurrentCard)){
       //Affichage des cartes en tirées
        printErr('BATAILLE');
        
        //Test les joueurs sont "PAT"
        if(typeof p1CardValue[cardWithdraw] !=="string" || typeof p2CardValue[cardWithdraw] !=="string"){
            print('PAT');
            //Si "PAT", on arrête le script
            break;
        }
        // Mise en attente des cartes du joueur 1
        for(var i=0;i<cardWithdraw;i++){
            addCard(p1cardInGame ,p1CardValue);
        }
        // Mise en attente des cartes du joueur 2
        for(var i=0;i<cardWithdraw;i++){
            addCard(p2cardInGame ,p2CardValue);
        }
    }

//JOUEUR 1 GAGNANT
    if(parseInt(p1CurrentCard) > parseInt(p2CurrentCard)){
        round++;//Incrémentation du nombre de manche
        //Affichage du vaiqueur et des deux decks de carte en attente
        printErr(`Le joueur 1 Gagne`);
         
         //Le joueurs 1 recupère ses cartes en attente
        while(p1cardInGame.length>0){
           addCard(p1CardValue , p1cardInGame);
        }
        //Le joueurs 1 recupères les cartes en attente du joueur 2
        while(p2cardInGame.length>0){
             addCard(p1CardValue , p2cardInGame);
        }
        // Les deux decks de carte en attente sont réinitialisés à vide
        p1cardInGame= [];
        p2cardInGame= [];
    }else{
    
//JOUEUR 2 GAGNANT
        if(parseInt(p1CurrentCard) < parseInt(p2CurrentCard)){
            round++;//Incrémentation du nombre de manche
            //Affichage du vaiqueur et des deux decks de carte en attente
printErr(`Le joueur 2 Gagne`);
            //Le joueurs 2 recupère Les cartes en attente du joueur 1
            while(p1cardInGame.length>0){
                 addCard(p2CardValue , p1cardInGame);
            }
            //Le joueurs 2 recupère ses cartes en attente
            while(p2cardInGame.length>0){
                 addCard(p2CardValue , p2cardInGame);
            } 
            // Les deux decks de carte en attente sont réinitialisés à vide
             p1cardInGame= [];
             p2cardInGame= [];
    
        }//Fin Joueur 2 gagne ?
    }
    printErr('');//Ligne vide pour la clarté
}//Fin  du jeu

//-----------------------------------------------------
//----------- AFFICHAGE DU RESULTAT (hors PAT) --------
//-----------------------------------------------------
    if(p1CardValue.length===0){
        printErr('P2 win the game');
        print(`2 ${round}`);
    }
    if(p2CardValue.length===0){
        printErr('P1 win the game');
        print(`1 ${round}`);
    }