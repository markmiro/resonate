function getUserBio(userid){
    array=[];
    $.get("http://ec2-54-215-213-168.us-west-1.compute.amazonaws.com/Server/getUserBio.php", { "userid"=userid })
    .done(function(data) {
        jsonData = JSON.parse(data);
        console.log(jsonData);
    })
    .fail(function() { console.log("getUserBio Error"); })
}