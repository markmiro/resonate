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

function postUserBio(userid, biojson, callback){
    $.post(ENDPOINT + "postUserBio.php", { "userid": userid, "biojson": biojson })
    .done(function(data) {
        jsonData = JSON.parse(data);
        callback(jsonData);
    })
    .fail(function() { console.log("postUserBio Error"); })
}

//[{"userid":"1","header":"Experiences","bullets":[{"bullet":"CEO of Apples","date":null,"image":null},{"bullet":"Leader of a pack","date":null,"image":null},{"bullet":"Stud","date":null,"image":null}]},{"userid":"1","header":"Power","bullets":[{"bullet":"Boss","date":null,"image":null},{"bullet":"Damn Son..","date":null,"image":null}]}]
function postCards(userid, cards, callback){
    $.post(ENDPOINT + "postCards.php", { "userid": userid, "cards": cards })
    .done(function(data) {
        jsonData = JSON.parse(data);
        callback(jsonData);
    })
    .fail(function() { console.log("postCards Error"); })
}