





// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


//modal start game
setTimeout(function(){
    $(".modal1").css("display", "block");
}, 0);


$(".start").click(function(){
    $(".modal1").css("display", "none");
    start();
});

// timer function
let min, sec, setTimer, seconds;
min = 0;
sec = 0;

$(".timer").html("Time " + min + ":" + sec);

function startTimer(){
    setTimer = setInterval(countTime, 1000);
    seconds = 0;
    function countTime(){
    ++seconds;
    min = Math.floor(seconds/60);
    sec = Math.floor(seconds - min*60);
    $(".timer").html("Time " + min + ":" + sec);
    }
}

//function to stop timer
function stopTimer(){
    clearInterval(setTimer);
}

//function to reset timer
function resetTimer(){
    min = 0;
    sec = 0;
    seconds=0;
    $(".timer").html("Time " + min + ":" + sec);
}

// function to start timer by one click;
function clickStart(){
    $(".deck").one("click", function(){
    startTimer();
    });
}

//game logic
let checkList, matchedList, setOfCards, moves, stars;
checkList = [];
matchedList = [];
moves = 0;

//array of cards to suffle
setOfCards = ["fa fa-diamond", "fa fa-diamond", "fa fa-anchor", "fa fa-anchor", "fa fa-cube", "fa fa-cube", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb", "fa fa-leaf", "fa fa-leaf", "fa fa-bolt", "fa fa-bolt", "fa fa-paper-plane-o", "fa fa-paper-plane-o"];

$(".moves").html("Moves" + " :" + moves); // Show moves in score panel

//click function for cards
$(".card").click(function () {
    matching($(this));
    performance();
});


function matching(card){
    let openClass = card.toggleClass("open show").children();
    checkList.push(openClass);
    if (checkList.length>1){
        let check1 = checkList[0].attr("class");
        let check2 = checkList[1].attr("class");
        if(check1==check2){
            checkList[0].parent().removeClass("open show").toggleClass("match");
            checkList[1].parent().removeClass("open show").toggleClass("match");
            matchedList.push(checkList[0]);
            matchedList.push(checkList[1]);
            console.log(matchedList);
            checkList = [];
        }else {
            checkList[0].parent().addClass("no-match");
            checkList[1].parent().addClass("no-match");
            setTimeout(function(){
                checkList[0].parent().removeClass("open show no-match");
                checkList[1].parent().removeClass("open show no-match");
                checkList = [];
            }, 600);
        }
    }
    eventWin();
}

//Performance function to reduce star
function performance(){
    moves = ++moves;
    $(".moves").html("Moves" + " :" + moves);
    if (moves<21){
        stars = "3 star";
    }
    if(moves>20) {
        stars = "2 stars";
        $("#3").removeClass();
    }
    if (moves>25){
        stars = "1 star";
        $("#2").removeClass();
    }
}

//Main function to start game
function start (){
    stopTimer();
    resetTimer();
    clickStart();
    matchedList = [];
    checkList = [];
    moves = 0;
    $(".moves").html("Moves" + " :" + moves);
    $("#3").addClass("fa fa-star");
    $("#2").addClass("fa fa-star");
    setOfCards = shuffle(setOfCards);
    cards = $(".card");
    cards.removeClass("open show match");
    cards.children().removeClass();
    for (i=0; i<cards.length; i++){
        $(cards[i]).children().addClass(setOfCards[i]);
    }
};

//Restart function on click
$(".fa-repeat").click(function(){
    start();
});

//End of game
function eventWin(){
    if(matchedList.length == 16){
    stopTimer();
    $(".modal2").css("display", "block");
    $(".message").html("Your time is " + min + ":" + sec + " and you get " + stars);
    }
}

$("#press1").click(function(){
    start();
    $(".modal2").css("display", "none");
});

$("#press2").click(function(){
    $(".modal1").css("display", "block");
    $(".modal2").css("display", "none");
});

