ENDPOINT = "http://ec2-54-215-213-168.us-west-1.compute.amazonaws.com/Server/";

function getUserBio(userid, callback){
    $.get(ENDPOINT + "getUserBio.php", { "userid": userid })
    .done(function(data) {
        jsonData = JSON.parse(data);
        callback(jsonData);
    })
    .fail(function() { console.log("getUserBio Error"); })
}

function getCards(userid, callback){
    $.get(ENDPOINT + "getCards.php", { "userid": userid })
    .done(function(data) {
        jsonData = JSON.parse(data);
        callback(jsonData);
    })
    .fail(function() { console.log("getCards Error"); })
}

function postUserBio(biojson, callback){
    $.post(ENDPOINT + "postUserBio.php", { "biojson": biojson })
    .done(function(data) {
        jsonData = JSON.parse(data);
        callback(jsonData);
    })
    .fail(function() { console.log("postUserBio Error"); })
}