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

function removeCard(userid, header, callback){
    $.post(ENDPOINT + "postRemoveCard.php", { "header": header, "userid": userid })
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
    $.post(ENDPOINT + "postUserBio.php", { "userid": userid, "biojson": JSON.stringify(biojson) })
    .done(function(data) {
        jsonData = data ? JSON.parse(data) : "";
        callback(jsonData);
    })
    .fail(function() { console.log("postUserBio Error"); })
}

function addUser(user, pass, name, callback){
    $.post(ENDPOINT + "postUserBio.php", { "user": user, "pass": pass, "name": name })
    .done(function(data) {
        jsonData = JSON.parse(data);
        callback(jsonData);
    })
    .fail(function() { console.log("addUser Error"); })
}

function validateUser(user, pass, callback){
    $.post(ENDPOINT + "validateUser.php", { "user": user, "pass": pass })
    .done(function(data) {
        //returns the user_id as a json response
        jsonData = JSON.parse(data);
        callback(jsonData);
    })
    .fail(function() { console.log("validateUser Error"); })
}

function updateCardWithHeader(userid, header, card, callback){
    $.post(ENDPOINT + "updateCard.php", { "userid": userid, "header": header, "card": card })
    .done(function(data) {
        jsonData = JSON.parse(data);
        callback(jsonData);
    })
    .fail(function() { console.log("updateCard Error"); })
}

function getVCF(biojson, callback){
    $.post(ENDPOINT + "postVCF.php", { "biojson": biojson })
    .done(function(data) {

        //YOU JUST NEED TO HEAD TO THE URL AND IT WILL DOWNLOAD THE VCF FILE!


    })
    .fail(function() { console.log("getVCF Error"); })
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