ENDPOINT = "http://ec2-54-215-213-168.us-west-1.compute.amazonaws.com/Server/";

function getUserBio(userid, callback){
    $.get(ENDPOINT + "getUserBio.php", { "userid": userid })
    .done(function(data) {
        jsonData = JSON.parse(data);
        callback(jsonData);
    })
    .fail(function() { console.log("getUserBio Error"); })
}

function getUserData(userid, callback){
    $.get(ENDPOINT + "getUserData.php", { "userid": userid })
    .done(function(data) {
        jsonData = JSON.parse(data);
        callback(jsonData);
    })
    .fail(function() { console.log("getUserData Error"); })
}

function getCards(userid, callback){
    $.get(ENDPOINT + "getCards.php", { "userid": userid })
    .done(function(data) {
        jsonData = JSON.parse(data);
        callback(jsonData);
    })
    .fail(function() { console.log("getCards Error"); })
}

function removeCard(header, callback){
    $.post(ENDPOINT + "postRemoveCard.php", { "header": header })
    .done(function(data) {
        jsonData = JSON.parse(data);
        callback(jsonData);
    })
    .fail(function() { console.log("removeCard Error"); })
}

function getCardsStatic(userid, callback){
    jsonData = JSON.parse('[{"userid":"1","header":"Experiences","bullets":[{"bullet":"CEO of Apples","date":null,"image":null,"link":null},{"bullet":"Leader of a pack","date":null,"image":null,"link":null},{"bullet":"Stud","date":null,"image":null,"link":null}]},{"userid":"1","header":"Power","bullets":[{"bullet":"Boss","date":null,"image":null,"link":null},{"bullet":"Damn Son..","date":null,"image":null,"link":null}]}]');
    callback(jsonData);
}

function postUserBio(userid, biojson, callback){
    $.post(ENDPOINT + "postUserBio.php", { "userid": userid, "biojson": biojson })
    .done(function(data) {
        jsonData = JSON.parse(data);
        callback(jsonData);
    })
    .fail(function() { console.log("postUserBio Error"); })
}

//{"userid":"1","header":"Test","bullets":[{"bullet":"CEO of Apples","date":null,"image":null,"link":null},{"bullet":"Leader of a pack","date":null,"image":null,"link":null},{"bullet":"Stud","date":null,"image":null,"link":null}]}
function postCard(userid, card, callback){
    $.post(ENDPOINT + "postCard.php", { "userid": userid, "card": card })
    .done(function(data) {
        jsonData = JSON.parse(data);
        callback(jsonData);
    })
    .fail(function() { console.log("postCard Error"); })
}