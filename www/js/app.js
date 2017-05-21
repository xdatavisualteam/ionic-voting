'use strict';

/* App module */
var app = angular.module('atwm', ['ionic', 'ngFileUpload']);
app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

/* global functions */
var getQuestion = function(questionId) {
  for (var i = 0; i<questions.length; i++) {
    if (questionId == questions[i].id) {
      return questions[i];
    }
  }
};

var getNextQuestion = function(question) {
  for (var i = 0; i<questions.length; i++) {
    if (question.id == questions[i].id) {
      return questions[(i+1) % questions.length];
    }
  }
};

var recordQuestion = function (target, $rootScope) {
  $rootScope.showAlert("Sorry", "This feature is not available yet.", "OK");
  return;
  var recognition = new SpeechRecognition();//for pc webkitSpeechRecognition()
  recognition.onresult = function (event) {
    if (event.results.length > 0) {
      $root.target = event.results[0][0].transcript;
      $scope.$apply()
    }
  };
  recognition.start();
};

app.service('sessionService', [function () {
  var localStoreAvailable = typeof (Storage) !== "undefined";
  this.store = function (name, details) {
    if (localStoreAvailable) {
      if (angular.isUndefined(details)) {
        details = null;
      } else if (angular.isObject(details) || angular.isArray(details) || angular.isNumber(+details || details)) {
        details = angular.toJson(details);
      };
      sessionStorage.setItem(name, details);
    } 
  };

  this.persist = function(name, details) {
    if (localStoreAvailable) {
      if (angular.isUndefined(details)) {
        details = null;
      } else if (angular.isObject(details) || angular.isArray(details) || angular.isNumber(+details || details)) {
        details = angular.toJson(details);
      };
      localStorage.setItem(name, details);
    } 
  };

  this.get = function (name) {
    if (localStoreAvailable) {
      return getItem(name);
    }
  };

  this.destroy = function (name) {
    if (localStoreAvailable) {
      localStorage.removeItem(name);
      sessionStorage.removeItem(name);
    }
  };

  var getItem = function (name) {
    var data;
    var localData = localStorage.getItem(name);
    var sessionData = sessionStorage.getItem(name);

    if (sessionData) {
      data = sessionData;
    } else if (localData) {
      data = localData;
    } else {
      return null;
    }

    if (data === '[object Object]') { return null; };
    if (!data.length || data === 'null') { return null; };

    if (data.charAt(0) === "{" || data.charAt(0) === "[" || angular.isNumber(data)) {
      return angular.fromJson(data);
    };

    return data;
  };

  return this;
}])