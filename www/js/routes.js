'use strict';

/* defined routes */
app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('answering', {
    url: '/answering{slash:[/]?}:questionId',
    templateUrl: 'templates/answering.html'
  });
  
  $stateProvider.state('voted', {
    cache: false,
    url: '/voted{slash:[/]?}:questionId',
    templateUrl: 'templates/voted.html'
  });
  
  $stateProvider.state('ask', {
    url: '/ask',
    templateUrl: 'templates/ask.html'
  });

  $stateProvider.state('addquestiondetail', {
    url: '/addquestiondetail',
    templateUrl: 'templates/addquestiondetail.html',
    controller: 'AddQuestionDetailCtrl'
  });
  
  /* This step has been merged with the main asking flow
  $stateProvider.state('postquestion', {
    url: '/postquestion',
    templateUrl: 'templates/postquestion.html',
    controller: 'PostQuestionCtrl'
  });
  */

  $stateProvider.state('qustionlive', {
    url: '/qustionlive',
    templateUrl: 'templates/qustionlive.html',
    controller: 'QuestionLiveCtrl'
  });

  $stateProvider.state('answering-home', {
    url: '/',
    cache: false,
    templateUrl: 'templates/answering.html'
  });

  $stateProvider.state('demo-ask', {
    url: '/demo-ask',
    templateUrl: 'templates/ask.html'
  });

  $stateProvider.state('invitationtosignup', {
    url: '/invitationtosignup',
    templateUrl: 'templates/invitationtosignup.html',
    controller: 'InvitationToSignUpCtrl'
  });

  $stateProvider.state('askresultbysignup', {
    url: '/askresultbysignup',
    templateUrl: 'templates/askresultbysignup.html',
    controller: 'AskResultBySignUpCtrl'
  });

  $stateProvider.state('onboarding', {
    url: '/onboarding/:step?next_step',
    templateUrl: function (params) {
      return 'templates/onboarding/' + params.step + '.html';
    },
    controller: 'OnboardingCtrl'
  });

  $stateProvider.state('onboarding_feed', {
    cache: false,
    url: '/question_feed_for_topic',
    templateUrl: 'templates/onboarding/question_feed_for_topic.html',
    controller: 'OnboardingCtrl'
  });

  $stateProvider.state('about', {
    url: '/about',
    templateUrl: 'templates/about.html',
    controller: 'AboutCtrl'
  });


  $stateProvider.state('filteringtype', {
    //cache: false,
    url: '/filteringtype{slash:[/]?}:questionId',
    templateUrl: 'templates/filteringtype.html',
    controller: 'FilteringtypeCtrl'
  });

  $stateProvider.state('alltopics', {
    url: '/topics',
    templateUrl: 'templates/onboarding/topics_list.html',
    controller: 'FilteringtypeCtrl'
  });

  $urlRouterProvider.otherwise('/');
});