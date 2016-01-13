var express = require('express');
var router = express.Router();
var api = require('./api');



router.get('/', function(req, res, next) {
  res.render('landing', {
    title: 'TrailMix'
  });
});

router.get('/editor', function(req, res, next) {
  res.render('editor', {
    title: 'TrailMix'
  });
});

router.get('/makeprofile', function(req, res, next) {
  //check to see if user exists in the database
  api.users.getUser_googleid(req.user.google_id).then(function(user) {
    //if they already exist, then redirect to timeline
    if (user) {
      res.redirect('/timeline/' + user.id);
    } else {
      //if they do not exist, then render makeprofile view
      res.render('makeprofile', {
        title: 'TrailMix',
        profile: req.user
      });
    }
  }).catch(function(error) {
    console.log(error);
  });
});

router.post('/makeprofile', function(req, res, next) {
  //insert user data to database
  api.users.createUser({
    username: req.body.userName,
    google_id: req.user.google_id,
    photo_url: req.user.profilePhoto,
    personal_info: 'none'
  }).then(function(id) {
    //redirect to timeline with userid in url
    res.redirect('/timeline/' + id);
  });
});

router.get('/post', function(req, res, next) {
  res.render('post', {
    title: 'TrailMix'
  });
});

router.get('/post/postid', function(req, res, next) {
  api.posts.readOne().then(function(postid) {
    var date = formatDate(created_at);
    res.render('post', {
      post: posts,
      title: posts.title,
      username: posts.username,
      body:posts.body,
      photo_url: posts.photo_url,
      latitude: posts.latitude,
      longitude: posts.longitude,
      created_at: date
    });
  });
});


router.get('/profile/:userid', function(req, res, next) {
  api.users.getUser(req.params.userid).then(function(userdata) {
    var date = formatDate(userdata.created_at);
    res.render('profile', {
      title: 'TrailMix',
      profile: {
        id: userdata.id,
        username: userdata.username,
        date_created: date,
        personal_info: userdata.personal_info,
        photo_url: userdata.photo_url
      }
    });
  });
});

router.get('/settings/:userid', function(req, res, next) {
  api.users.getUser(req.params.userid).then(function(userdata) {
    var date = formatDate(userdata.created_at);
    res.render('settings', {
      title: 'TrailMix',
      profile: {
        id: userdata.id,
        username: userdata.username,
        date_created: date,
        personal_info: userdata.personal_info,
        photo_url: userdata.photo_url
      }
    });
  });
});

router.get('/timeline/:userid', function(req, res, next) {
  api.posts.readAll().then(function(posts) {
    res.render('timeline', {
      post: posts,
      title: posts.title,
      photo_url: posts.photo_url,
      latitude: posts.latitude,
      longitude: posts.longitude
    });
  });
});

function formatDate(dateString){
  var newDate = (dateString).toString().split(' ');
  var formattedDate = newDate[1] + ' ' + newDate[2] + ", " + newDate[3];
  return formattedDate;
}



module.exports = router;
