$(() => {

    // initialisattion
    var activePlayer1 = true;
    $('.roll').hide()
    $('.hold').hide()
    $('.message').hide()

    //Reinitialisation de la partie
    $('.newGame').click(function(){
        reset()
    });
    //fonction qui reinitialise
    function reset(){
        // on remet a zero tous les scores
        $('.scoreRound1').text('0')
        $('.scoreRound2').text('0')
        $('.scoreGlobal1').text('0')
        $('.scoreGlobal2').text('0')
        $('.message').text("Vous avez fait 1 !")
        //on affiche ou cache les div de commandes
        $('.message').hide()
        $('.roll').show()
        $('.hold').show()
        //on choisi un joueur pour demarrer
        choicePlayerStart()
    }

    //Choix joueur qui demarre la partie
    function choicePlayerStart(){
        //choix ente 1 et 2
        let number = Math.floor(Math.random() * 2)
        // si nombre egal 1 alors joueur 1 actif
        if (number===1){
            $('.active1').css({ 'color': 'red'})
            $('.active2').css({ 'color': 'black'})
            activePlayer1 = true
        }else{// sinon joueur 1 inactif
            $('.active1').css({ 'color': 'black'})
            $('.active2').css({ 'color': 'red'})
            activePlayer1 = false
        }
    }

    //Change de joueur actif
    function changePlayer(){
        // si joueur 1 actif on change de joueur
        if (activePlayer1 === true){
            $('.active1').css({ 'color': 'black'})
            $('.active2').css({ 'color': 'red'})
            activePlayer1 = false
        }else{// si joueur 2 actif on change de joueur
            $('.active1').css({ 'color': 'red'})
            $('.active2').css({ 'color': 'black'})
            activePlayer1 = true
        }
    }

    //fonction qui sauve le score courant dans le global avec changementd de joueur
    $('.hold').click(function(){
        saveScore()
    });
    //save score round dans score total et verifie si victoire
    function saveScore(){
        if (activePlayer1){
            // on recupere le score courant
            let currentScore = $(".scoreRound1").text()
            // on le transforme en int
            currentScore = parseInt(currentScore)
            // on recupere le score global
            let scoreGlobal = $(".scoreGlobal1").text()
            // on le transforme en int
            scoreGlobal = parseInt(scoreGlobal)
            //on ajoute le score global au score courant
            scoreGlobal = scoreGlobal+currentScore
            // on affiche dans la class scoreGlobal1
            $(".scoreGlobal1").text(scoreGlobal)
            // on remet la classe scoreRound1 a 0
            $('.scoreRound1').text('0')
            //si score superieure a 99 victoire du joueur 1
            if(scoreGlobal>99){
                // affichage d'un popup pour afficher le gagant
                $('.message').text("VICTOIRE DU JOUEUR 1")
                $('.message').show()
                //on cache les div pour empecher de jouer apres une victoire
                $('.roll').hide()
                $('.hold').hide()
            }
            changePlayer()
        }
        else{
            // on recupere le score courant
            let currentScore = $(".scoreRound2").text()
            // on le transforme en int
            currentScore = parseInt(currentScore)
            /// on recupere le score global
            let scoreGlobal = $(".scoreGlobal2").text()
            // on le transforme en int
            scoreGlobal = parseInt(scoreGlobal)
            //on ajoute le score global au score courant
            scoreGlobal = scoreGlobal+currentScore
             // on affiche dans la class scoreGlobal2
            $(".scoreGlobal2").text(scoreGlobal)
            // on remet la classe scoreRound2 a 0
            $('.scoreRound2').text('0')
            //si score superieure a 99 victoire du joueur 2
            if(scoreGlobal>99){
                // affichage d'un popup pour afficher le gagant
                $('.message').text("VICTOIRE DU JOUEUR 2")
                $('.message').show()
                //on cache les div pour empecher de jouer apres une victoire
                $('.roll').hide()
                $('.hold').hide()
            }
            changePlayer()
        }
    }

    $('.roll').click(function(){
        rollDice()
    });

    //lorsque le dé égale un on masque des div avec timer
    function diceOne(){
        $('.roll').hide()
        $('.hold').hide()
        $('.message').show()
        setTimeout(function(){
            $('.roll').show()
            $('.message').hide()
            $('.hold').show()
        },2000);
    }
    //Lancé du dé
    function rollDice(){
        let dice = Math.floor(Math.random() * 6)+1
        console.log("VALEUR DU DE "+dice)
        switch (dice) {
            case 1:
                $(".dice").attr("src", "images/1.png");
                break;
            case 2:
                $(".dice").attr("src", "images/2.png");
                break;
            case 3:
                $(".dice").attr("src", "images/3.png");
                break;
            case 4:
                $(".dice").attr("src", "images/4.png");
                break;
            case 5:
                $(".dice").attr("src", "images/5.png");
                break;
            case 6:
                $(".dice").attr("src", "images/6.png");
                break;
            default:
          }
        if (activePlayer1){
            if (dice===1){
                diceOne()
                changePlayer()
                $(".scoreRound1").text("0")
            }else{
                let currentScore = $(".scoreRound1").text()
                currentScore = parseInt(currentScore)
                currentScore += dice
                $(".scoreRound1").text(currentScore)
            }

        }
        else{
            if(dice===1){
                diceOne()
                changePlayer()
                $(".scoreRound2").text("0")
            }
            else{
                let currentScore = $(".scoreRound2").text()
                currentScore = parseInt(currentScore)
                currentScore += dice
                $(".scoreRound2").text(currentScore)
            }
        }
    }
});