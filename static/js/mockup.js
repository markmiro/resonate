// GLOBALS...

currentUserId = 9; // just make this up for now

state = 1;
// states:
// 1. view mode
// 2. edit mode
// set this to make sure the resume loads in the right mode

function getUserData(userid, callback) {
    var data = {
        "userbio": {
            "name": "John Appleseed",
            "title": "Web Developer",
            "location": "San Francisco, CA",
            "objective": "I want to find something cool to do with my life",
            "email": "john@gmail.com",
            "phone": "(916) 668-0717",
            "linkedin": "linkedin.com"
        },
        "cards": [
          {
            "userid":"1",
            "header":"Experiences",
            "bullets":[
              {
                "bullet":"CEO of Apples",
                "date":null,
                "image":null,
                "link":null
              },
              {
                "bullet":"Leader of a pack",
                "date":null,
                "image":null,
                "link":null
              },
              {
                "bullet":"Stud",
                "date":null,
                "image":null,
                "link":null
              }
            ]
          },
          {
            "userid":"1",
            "header":"Power",
            "bullets":[
              {
                "bullet":"Boss",
                "date":null,
                "image":null,
                "link":null
              },
              {
                "bullet":"Damn Son..",
                "date":null,
                "image":null,
                "link":null
              }
            ]
          }
        ]
    };
    callback(data);
}