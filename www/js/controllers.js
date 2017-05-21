'use strict';

/******************** App controller *********************/
app.controller("AppCtrl", function ($scope, $location, $ionicNavBarDelegate, $rootScope, $state, $ionicPopup, $ionicHistory, $ionicScrollDelegate, sessionService) {
  $scope.data = {};
  $scope.hist = [];
  if (!sessionService.get("isDemo")) {
    sessionService.store("isDemo", true);
  }

  $scope.isDemo = sessionService.get("isDemo") == "true";

  $scope.$on("logIn", function (event, args) {
    $scope.isDemo = sessionService.get("isDemo") == "true";
  });

  $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    var path = $location.path();
    $scope.hist.push(path);
    if ($scope.hist.length > 5) {
      $scope.hist = $scope.hist.slice($scope.hist.length - 4, 5);
    }
    $scope.options = $scope.options || {};

    if (path == "/answering" || path == "/ask" || path == '/demo-answering' || path == '/demo-ask' || path == "/registermsgdemoanswering" || path == "/askresultbysignup") {
      $ionicNavBarDelegate.showBackButton(false);
    }
    else {
      $ionicNavBarDelegate.showBackButton(true);
    }

    if (!isBackView($ionicHistory.viewHistory(), path)) {
      $scope.scrollTop(false);
    }

  });

  var isBackView = function (h, p) {
    if (h == null || h.currentView == null) {
      return false;
    }
    var prev = null;
    var a = $scope.hist;
    for (var i = a.length - 1; i >= 0 ; i--) {
      if (i > 0) {
        prev = a[i - 1];
      }
      if (a[i] == p) {
        if (prev == h.currentView.url) {
          return true;
        }
        break;
      }
    }
    return false;
  }

  $scope.scrollTop = function () {
    $ionicScrollDelegate.scrollTop();
  };

  $rootScope.showAlert = function (title, msg, okText) {
    if (okText) {
      var okText = okText;
    } else {
      var okText = "OK";
    }
    $ionicPopup.alert({
      title: title,
      template: "<div align=center>" + msg + "</div>",
      okText: okText
    });
  };

  $scope.clearSearch = function () {
     $scope.data.searchQuery = '';
  };

  $scope.showSearch = function (e) {
    e.preventDefault();
    $('#logoMenu').toggle();
    $('.search-box').animate({ width: "toggle" });
  }

  $scope.showMenu = function () {
    if ($(".fold-down-menu").css("display") == "block") {

      $(".fold-down-menu").slideUp(300, function () {
        $("#subheader-links").css("display", "inherit");
      });
    } else {
      $("#subheader-links").css("display", "none");
      $(".fold-down-menu").slideDown(300, function () {

      });
    }
  };

  var mainMenu = $(".fold-down-menu");
  if (mainMenu) {
    mainMenu.find("a").on("click", function () {
      mainMenu.css("display", "none");
      $("#subheader-links").css("display", "inherit");
    });
  }

  $scope.logOut = function () {
    sessionService.store("isDemo", true);
    $scope.isDemo = true;
    $rootScope.$broadcast("logIn", false);
    $state.go("answering-home", {}, { reload: true });
  }

});

/************************* Answering flow **************************/
app.controller('AnswerCtrl', function ($scope, $state, $ionicPopup, $rootScope, $ionicHistory, $ionicScrollDelegate, $ionicModal, $location, sessionService) {

  var pathHasID = function (path) {
    if (path.indexOf("/answering")!=0 ){
      return false;
    }

    if (path.length - "/answering".length>1) {
      return true;
    }

    return false;
  }
  $scope.topicNames = topicNameObj;
  $scope.data = {};
  $scope.missionQues = missionQues;

  $scope.limitReasons = 5;
  $scope.limitAnswers = 5;

  $scope.showMoreReasonsLabel = "Show more reasons";
  $scope.showMoreAnswersLabel = "Show more answers";

  $scope.setShowMoreReasons = function (items) {
    if ($scope.limitReasons == 5) {
      $scope.limitReasons = 25;
      $scope.showMoreReasonsLabel = "Show more reasons";
      if (items.length > 25) {
        $scope.showMoreReasonsLabel = "Show all reasons";
      } else {
        $scope.limitReasons = items.length;
        $scope.showMoreReasonsLabel = "Show fewer reasons";
      }
    } else if ($scope.limitReasons == 25) {
      $scope.limitReasons = items.length;
      $scope.showMoreReasonsLabel = "Show fewer reasons";
    } else {
      $scope.limitReasons = 5;
      $scope.showMoreReasonsLabel = "Show more reasons";
    }
  };


  $scope.setShowMoreAnswers = function (items) {
    if ($scope.limitAnswers == 5) {
      $scope.limitAnswers = 25;
      $scope.showMoreAnswersLabel = "Show more answers";
      if (items.length > 25) {
        $scope.showMoreAnswersLabel = "Show all answers";
      } else {
        $scope.limitAnswers = items.length;
        $scope.showMoreAnswersLabel = "Show fewer answers";
      }
    } else if ($scope.limitAnswers == 25) {
      $scope.limitAnswers = items.length;
      $scope.showMoreAnswersLabel = "Show fewer answers";
    } else {
      $scope.limitAnswers = 5;
      $scope.showMoreAnswersLabel = "Show more answers";
    }
  };


  $scope.isHomePage = function () {
    return !pathHasID($location.path());
  };



  if($rootScope.recaptchaObj == undefined) {
    $rootScope.recaptchaObj = {};
  }
  
  $rootScope.$on("$ionicView.afterLeave", function () {
    // $ionicHistory.clearCache();
  });
  if ($location.path() == "/demo-answering") {
    sessionService.store("isDemo", true);
  }

  $scope.isDemo = function () {
    return sessionService.get("isDemo") == "true";
  }

  $scope.zoomImage = function ($event, answer) {
    //var panel = $($event.target.parentNode.parentNode);//div > a
    //$event.stopPropagation();
    //if (panel.hasClass("zoomed")) {
    //  panel.removeClass("zoomed");
    //  $('img', panel).draggable("destroy");
    //  $('img', panel).removeAttr("style");
    //} else {
    //  panel.addClass("zoomed");
    //  $('img', panel).draggable()
    //}
    $event.stopPropagation();

    $scope.zoomPopup  =$ionicPopup.show({
      template: "<div class='zoom-panel zoomed'><img src='" + answer.img + "' style='object-fit: cover;width:100%'/><a href='' ng-click='zoomPopup.close()'><div></div> </a> </div>",
      title:answer.name,
      scope: $scope,
      cssClass:'zoomPopup'
    });
  }

  

  //$scope.$on("logIn", function (event, args) {
  //  $scope.isDemo = sessionService.get("isDemo") == "true";
  //});

  if( typeof $rootScope.showedQuesPageCount == "undefined" )
    $rootScope.showedQuesPageCount = 0;
  else
    $rootScope.showedQuesPageCount = $rootScope.showedQuesPageCount + 1;
  $scope.showedQuesPageCount = $rootScope.showedQuesPageCount;

  $scope.closeBtnClickGreatQues = function() {
    $rootScope.closeBtnClickedGreatQues = true;
    $scope.closeBtnClickedGreatQues = $rootScope.closeBtnClickedGreatQues;
  }

  $rootScope.isAnswerQuestion = pathHasID($location.path());
  $scope.isAnswerQuestion = $rootScope.isAnswerQuestion;

  $scope.answerQuestionShow = function () {
    $rootScope.isAnswerQuestion = true;
    $scope.isAnswerQuestion = $rootScope.isAnswerQuestion;
  }

  $scope.closeAnonymousMsg = function() {
    $rootScope.anonymousMsgHide = false;
    $scope.anonymousMsgHide = $rootScope.anonymousMsgHide;
  }
  $scope.switchAnonymousMsgVisible = function() {
    $scope.switchAnonymousMsgVisibleFlag = !$scope.switchAnonymousMsgVisibleFlag;
  }

  $scope.closeLetRegisterMsg = function() {
    $rootScope.letRegisterMsgHide = true;
    $scope.letRegisterMsgHide = $rootScope.letRegisterMsgHide;
  }
  $scope.switchLetRegisterMsgVisible = function() {
    $scope.letRegisterMsgVisibleFlag = !$scope.letRegisterMsgVisibleFlag;
  }

  $scope.question = getQuestion($state.params.questionId || 1);
  $scope.selected = {
    answer: '',
    newAnswer: '',
    clickedVote: '',
    reason: {},
    reasonExpand: {}
  };
  $scope.anonymous = false;
  $scope.anonymityOption = '';
  $scope.getNextQuestion = getNextQuestion;

  $scope.answerChanged = function($scope) {
   $scope.selected.reason = {};
  };

  $scope.castVote = function($event) {
    $rootScope.selectedReason = $scope.selected;
    if( $scope.isDemo() && !$rootScope.recaptchaObj[$scope.question.id]) {
      if( !$rootScope.recaptchaObj[$scope.question.id] ) {
        $rootScope.showAlert("Warning", "You are voting without checking captcha!")
      }
      $event.preventDefault();
      return false;
    }

    if ($scope.selected.answer == '' || ($scope.selected.answer == 'new' && $scope.selected.newAnswer == '')) {
      $event.preventDefault();
      $scope.showAlert('Missing answer', 'Select or enter an answer first');
      return false;
    } else {
      var pass = false;
      for (var key in $scope.selected.reason) {
        if ($scope.selected.reason.hasOwnProperty(key)) {
          var val = $scope.selected.reason[key];
          if (key.indexOf('-new') == -1 && val === true) { //Regular reasons
            pass = true;
            break;
          } else if (key.indexOf('-new') + 4 == key.length && val === true) { //Regular answer with custom reasons
            if ($scope.selected.reason.hasOwnProperty(key+'-another') && $scope.selected.reason[key+'-another'].length > 0) {
              pass = true;
              break;
            }
          } else if (key=='new-new' && val.length > 0) { //Custom answer, custom reason
            pass = true;
            break;
          }
        }
      }
      if (!pass) {
        $event.preventDefault();
        $scope.showAlert('Missing reason', 'You must provide at least one reason');
        return false;
      }
    }
    
    var curQusIndex;
    _.forEach(questions, function(val, index){
      if(questions[index].id == $scope.question.id)
        curQusIndex = index;
    });
    var curAnswers = questions[curQusIndex].answers;

    var curAnsIndex;
    if( $scope.selected.answer != 'new' ) {
      _.forEach(curAnswers, function(val, index){
        if( curAnswers[index].id == $scope.selected.answer ) 
          curAnsIndex = index;
      });
      var curAns = curAnswers[curAnsIndex];
      var newIndexStr = $scope.selected.answer+'-new';

      // alert($scope.selected.reason[newIndexStr])
      if( $scope.selected.reason[newIndexStr] ) {
        var newAnotherIndexStr = $scope.selected.answer+'-new-another';
        var newDetailIndexStr = $scope.selected.answer+'-new-detail';
        var newAnotherReason = $scope.selected.reason[newAnotherIndexStr];
        var newAnotherReasonDetail = $scope.selected.reason[newDetailIndexStr];
        var curAnsReasons = curAns.reasons;
        var id = curAnsReasons.length + 1;
        var newAnotherReasonObj = { 
          id: id, 
          name: newAnotherReason, 
          votes: 1, 
          details: newAnotherReasonDetail 
        }
        // alert(JSON.stringify(newAnotherReasonObj))

        curAnsReasons.push(newAnotherReasonObj);
        $rootScope.curAnsReasons = curAnsReasons;
      }
    }

    if( $scope.selected.answer == 'new' ) {
      var id = curAnswers.length + 1;
      var newAdditionalReason = {
        id: id,
        name: $scope.selected.newAnswer,
        votes: 1,
        percent: 1,
        reasons: [
          {
            id: 1, 
            name: $scope.selected.reason['new-new'], 
            votes: 1, 
            details: $scope.selected.newAnswerDetail 
          }
        ]
      };
      questions[curQusIndex].answers.push(newAdditionalReason);
      $scope.selected.newAnswer = "";
      $scope.selected.newAnswerDetail = "";
      $scope.selected.reason['new-new'] = "";
      $rootScope.curQuesAnswers = questions[curQusIndex].answers;
    }
  };
  $scope.toggleGroup = function(ans, flag) {
    if( !flag ) {
      $("input[value='new']").prop('checked', true);
      $scope.selected.answer = "new";
    } 
    $scope.selected.reason = {};
    if ($scope.isGroupShown(ans)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = ans;
    }
    $ionicScrollDelegate.resize();
  };
  $scope.isGroupShown = function(ans) {
    return $scope.shownGroup === ans;
  };
  $scope.reasonExpandFn = function() {
    $ionicScrollDelegate.resize();
  }

  $ionicModal.fromTemplateUrl('templates/registermsgdemoanswering.html', function($modal){
    $scope.modal = $modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  /* override ionic back button start */
  var oldSoftBack = $rootScope.$ionicGoBack;
  $rootScope.$ionicGoBack = function() {
    if( $state.current.name == "voted" ) {
      if( $rootScope.curAnsReasons )
        $rootScope.curAnsReasons.pop();
      if( $rootScope.curQuesAnswers )
        $rootScope.curQuesAnswers.pop();
    }
    $ionicHistory.goBack();
  };
  /* override ionic back button end */
  
  $scope.recaptchaChange = function() {
    $rootScope.recaptchaObj[$scope.question.id] = !$rootScope.recaptchaObj[$scope.question.id];
  }
  $rootScope.gotoNextQuestion = function( ) {
    
   
    var selected = $scope.getNextQuestion($scope.question).id;

    if( typeof $rootScope.questionArr != "object" ) {
      $rootScope.questionArr = [];
    }
    if( _.indexOf($rootScope.questionArr, selected) == -1 )
      $rootScope.questionArr.push( selected );
    if( !($rootScope.questionArr.length % 4) ) {
      if( $rootScope.isDemo && !$rootScope.donotshowregmsg ) {
        $rootScope.curQues = selected;
        $scope.modal.show();
      } else {
        $location.path("/answering/"+selected);
      }
    } else {
      $location.path("/answering/"+selected);
    }  
  }
  $scope.doNotShowRegMsg = function(flag) {
    $rootScope.donotshowregmsg = flag;
  }
  $scope.continueAnswering = function() {
    $rootScope.questionArr = [];
    $scope.modal.hide();
    $location.path("/answering/"+$rootScope.curQues);
  }
  $scope.goDemoAsk = function() {
    $scope.modal.hide();
    $state.go("demo-ask");
  }

  $scope.moreNewQuestions = getNewQuestions(0, 3)
  $scope.moreNewQuestionsLastIndex = $scope.moreNewQuestions.length;

  $scope.loadMoreQuestions = function () {
    var result = getNewQuestions($scope.moreNewQuestionsLastIndex, 3);
    if (result) {
      $scope.moreNewQuestions = result;
      $scope.moreNewQuestionsLastIndex = $scope.moreNewQuestionsLastIndex + result.length;
    }
    $(".question-item").each(function () {
      $(this).addClass("animated bounceInRight");
      $(this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $(this).removeClass("animated bounceInRight");
      });
    });
  }


  /*$scope.$on(
    "$locationChangeSuccess",
    function handleLocationChangeSuccessEvent(event) {
      $scope.isHomePage = !pathHasID($location.path());
    }
);*/



});

/*************************** Voted flow ***********************/
app.controller('VotedCtrl', function ($scope, $state, $ionicModal, $rootScope, $ionicPopup, $ionicHistory, $timeout, $location, sessionService) {
  var q = getQuestion($state.params.questionId || 1);
  q = setQuestionPercent(q);
  $scope.question = q;
 
  $scope.topAnswer = {};
  if ($scope.question && $scope.question.answers) {
    var topAns;
    angular.forEach($scope.question.answers, function (val) {
      if (!topAns || topAns.votes < val.votes) {
        topAns = val;
      }
    });
    $scope.topAnswer = topAns;
  }
  $scope.getNextQuestion = getNextQuestion;

  $scope.limitReasons = 5;
  $scope.limitAnswers = 5;

  $scope.showMoreReasonsLabel = "Show more reasons";
  $scope.showMoreAnswersLabel = "Show more answers";
  $scope.zoomImage = function ($event, answer) {
    $event.stopPropagation();

    $scope.zoomPopup = $ionicPopup.show({
      template: "<div class='zoom-panel zoomed'><img src='" + answer.img + "' style='object-fit: cover;width:100%'/><a href='' ng-click='zoomPopup.close()'><div></div> </a> </div>",
      title: answer.name,
      scope: $scope,
      cssClass: 'zoomPopup'
    });
  }


  $scope.setShowMoreReasons = function (items) {
    if ($scope.limitReasons == 5) {
      $scope.limitReasons = 25;
      $scope.showMoreReasonsLabel = "Show more reasons";
      if (items.length > 25) {
        $scope.showMoreReasonsLabel = "Show all reasons";
      } else {
        $scope.limitReasons = items.length;
        $scope.showMoreReasonsLabel = "Show fewer reasons";
      }
    } else if ($scope.limitReasons == 25) {
      $scope.limitReasons = items.length;
      $scope.showMoreReasonsLabel = "Show fewer reasons";
    } else {
      $scope.limitReasons = 5;
      $scope.showMoreReasonsLabel = "Show more reasons";
    }
  };


  $scope.setShowMoreAnswers = function (items) {
    if ($scope.limitAnswers == 5) {
      $scope.limitAnswers = 25;
      $scope.showMoreAnswersLabel = "Show more answers";
      if (items.length > 25) {
        $scope.showMoreAnswersLabel = "Show all answers";
      } else {
        $scope.limitAnswers = items.length;
        $scope.showMoreAnswersLabel = "Show fewer answers";
      }
    } else if ($scope.limitAnswers == 25) {
      $scope.limitAnswers = items.length;
      $scope.showMoreAnswersLabel = "Show fewer answers";
    } else {
      $scope.limitAnswers = 5;
      $scope.showMoreAnswersLabel = "Show more answers";
    }
  };

  $scope.filtering = function () {
    if ($scope.question) {
      $location.path('/filteringtype/' + $scope.question.id)
    } else {
      $location.path('/filteringtype/')
    }
  }


  $scope.buildCanvas = function (e) {
    var DonutChart = function (canvas, radius, lineWidth, arraySlices) {
      this._radius = radius;
      this._lineWidth = lineWidth; //px
      this._arraySlices = arraySlices;
      this._x_center = canvas.width / 2;
      this._y_center = canvas.height / 2;
      this._context = canvas.getContext("2d");

      this.drawCircle = function () {
        var context = this._context;
        context.lineWidth = this._lineWidth;
        var shadowSize = 8;
        var radius = this._radius;
        var offset_radians = -0.5 * Math.PI;
        var start_radians = offset_radians;
        var counterClockwise = true;
        var self = this;
      
        context.save();
        context.beginPath();
        context.strokeStyle = 'silver';
        context.lineWidth = 1;
        context.shadowBlur = shadowSize
        context.shadowColor = '#4f4f4f';
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.arc(self._x_center, self._y_center, radius - this._lineWidth / 2 - shadowSize, 0, Math.PI * 2, false);
        context.stroke();

        context.beginPath();
        context.strokeStyle = 'silver';
        context.lineWidth = 1;
        context.shadowBlur = shadowSize
        context.shadowColor = '#4f4f4f';
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.arc(self._x_center, self._y_center, radius + this._lineWidth / 2 - shadowSize, 0, Math.PI * 2, false);
        context.stroke();

        context.restore();
        this._arraySlices.forEach(function (slice) {
          context.beginPath();
          context.strokeStyle = slice.color;
          var end_radians = start_radians - (Math.PI * 2) * slice.percent / 100;
          context.arc(self._x_center, self._y_center, radius - shadowSize, start_radians, end_radians, counterClockwise);
          context.stroke();
          start_radians = end_radians;
        });
      };

      this.render = function () {
        this.drawCircle();
      };
    };

    //create canvas
    var canvasElem$ = $("#answerDonut");
    var canvas = $(canvasElem$).get(0);
    var sideLength = 124;
    canvas.width = canvas.height = sideLength;
    var lineWidth = 28;
    var radius = (sideLength - lineWidth) / 2;


    var slices = [];
    var topSet = false;
   
    var index = 0;
    angular.forEach($scope.question.answers, function (val) {
      index+=2;
      if (!topSet && val.percent == $scope.topAnswer.percent) {
        slices.splice(0, 0 , { percent: val.percent, color: "#ab5558" });
        topSet = true;
      } else {
        slices.push({
          percent: val.percent,
          color: "rgb(" + (204 - val.percent - index) + "," + (204 - val.percent - index) + "," + (204 - val.percent - index) + ")"
        });
      }
    });


    var donutChart = new DonutChart(canvas, radius, lineWidth, slices);
    donutChart.render();

  };

  $scope.selected = {
    answerExpand: {}
  };

  $rootScope.$on("$ionicView.afterLeave", function () {
    if ($scope.counter && $scope.counter < 10) {
      $scope.counter = 10;
      $timeout.cancel(mytimeout);
    }
  });

  $scope.isDemo = sessionService.get("isDemo")=="true";
  $scope.$on("logIn", function (event, args) {
    $scope.isDemo = sessionService.get("isDemo") == "true";
  });

  $scope.counter = 10;
  //$scope.hideTimeout = false;
  $scope.onTimeout = function () {
    $scope.counter--;
    if ($scope.counter > 0) {
      mytimeout = $timeout($scope.onTimeout, 1000);
    } else {
      $location.path('/answering/' + $scope.getNextQuestion($scope.question).id);
    }
  }
  var mytimeout = $timeout($scope.onTimeout, 1000);

  $("body").on("mousedown DOMMouseScroll mousewheel touchstart", function () {
    if (mytimeout) {
      $timeout.cancel(mytimeout);
      //$scope.hideTimeout = true;
    }
  });


  $scope.goAnswering = function() {
    if( $scope.isDemo )
      $ionicHistory.goBack();
    else 
      $state.go("answering");
  }
  $scope.goAsk = function() {
    $ionicHistory.clearCache();
    if( $scope.isDemo )
      $state.go("demo-ask");
    else
      $state.go("ask");
  }
  $scope.popupMsg = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Alert',
      template: "<div onClick=alert('Share&nbsp;with&nbsp;Facebook!')><button class='button button-block icon-left ion-social-facebook button-positive'>Facebook</button></div><div><button class='button button-block icon-left ion-social-tumblr button-positive'>Twitter</button></div><div><button class='button button-block icon-left ion-email button-positive'>Email</button></div>"
    });
  }
  $scope.checkNewAnswerVisibility = function( ans, flag ) {
    var newIndexStr = ans.id+'-new';
    var newAnotherIndexStr = ans.id+'-new-another';
    var newDetailIndexStr = ans.id+'-new-detail';
    $scope.anotherReason = $rootScope.selectedReason.reason[newAnotherIndexStr];
    $scope.anotherDetail = $rootScope.selectedReason.reason[newDetailIndexStr]
    console.log($rootScope.selectedReason.reason[newIndexStr]);
    if( $rootScope.selectedReason.answer == ans.id && $rootScope.selectedReason.reason[newIndexStr] ) {
      if( flag == 1 ) {
        if( $scope.anotherReason )
          return true;
        else
          return false;
        
      } else if( flag == 2 ) {
        if( $scope.anotherReason && $scope.anotherDetail )
          return true;
        else
          return false;
      }
    } else {
      return false;
    }
  }
});

/**************************** Asking flow *************************/
app.controller('AskCtrl', function ($scope, $ionicModal, $state, $rootScope, $ionicPopup, $location, sessionService) {
  $scope.flagDetail = false;
  $scope.wordWrapFlag = false;
  $scope.duplicatedQues = questions[4];
  $scope.question = {
    q: '',
    details: ''
  };

  $scope.recordQuestion = function (target) {
    recordQuestion(target, $rootScope);
  }

  $scope.isDemo = sessionService.get("isDemo") == "true";
  $scope.$on("logIn", function (event, args) {
    $scope.isDemo = sessionService.get("isDemo") == "true";
  });

  if( $location.path() == "/demo-ask" ) {
    sessionService.store("isDemo", true);
    $scope.isDemo = true;
  }

   

  $ionicModal.fromTemplateUrl('templates/quesdupchecking.html', function($modal){
    $scope.modal = $modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $ionicModal.fromTemplateUrl('templates/reasonfordupques.html', function($modal){
    $scope.modal1 = $modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  $scope.detailClicked = function() {
    /*
    if( !$scope.flagDetail ) {
      $scope.modal.show();
      $scope.flagDetail = true;
    }
    */
  }
  $scope.titleCollapse = function() {
    if( !$scope.wordWrapFlag ) {
      $(".title_collapse").addClass("title_expended");
      $(".collapse-icon").removeClass("ion-ios-plus-empty");
      $(".collapse-icon").addClass("ion-ios-minus-empty");
    }
    else {
      $(".title_collapse").removeClass("title_expended");
      $(".collapse-icon").addClass("ion-ios-plus-empty");
      $(".collapse-icon").removeClass("ion-ios-minus-empty");
    }
    $scope.wordWrapFlag = !$scope.wordWrapFlag;
  }
  $scope.noDuplicateQues = function() {
    $scope.modal1.show();
  }
  $scope.closeAllModal = function() {
    $scope.modal.hide();
    $scope.modal1.hide();
  }
  $scope.addQuestionDetail = function () {
    //$rootScope.askingTitle = $scope.question.q;
    //$rootScope.askingDesc = $scope.question.details;
    if (!$rootScope.askingTitle) {
      $rootScope.showAlert("Warning", "Please input question title.", "OK");
    } else {
      if ($rootScope.askingTitle.length < 10 || $rootScope.askingTitle.indexOf("?") == -1)
        $rootScope.showAlert("Error", "There doesn't appear to be a question. Please make sure you have entered a question.", "OK");
      else if ($rootScope.askingTitle.length > 200 || ($rootScope.askingDesc && $rootScope.askingDesc.length > 500)) {
        $rootScope.showAlert("Error", "You have exceeded the maximum number of characters.", "OK");
      } else {
        $state.go("addquestiondetail");
      }
    }
  }

  $scope.anonymous = false;
  $scope.switchAnonymousMsgVisible = function() {
    $scope.switchAnonymousMsgVisibleFlag = !$scope.switchAnonymousMsgVisibleFlag;
  }
  $scope.closeAnonymousMsg = function() {
    $rootScope.anonymousMsgHideForAsking = true;
    $scope.anonymousMsgHideForAsking = $rootScope.anonymousMsgHideForAsking;
  }
  $scope.closeBtnClickDemoAsk = function() {
    $rootScope.closeBtnClickedDemoAsk = true;
  }
});

app.controller('AddQuestionDetailCtrl', function ($scope, $ionicModal, $state, $rootScope, $ionicHistory, sessionService) {
  $scope.askObj = {};
  $scope.question = {};
  $scope.$on('$ionicView.enter', function (e) {
    var f = ""
    angular.forEach($rootScope.currentFilterSelection, function (val) {
      if (val != "") {
        f = f + val + " ";
      }
    });

    if (f != "") {
      $scope.currentFilterSelectionStr = f;
    }
  });

  $scope.checkIfEdit = function () {
    if ($rootScope.editLastQuestion) {
      $scope.question = $rootScope.newQuestion;
      $rootScope.editLastQuestion = false;
    }
  }

  $scope.isDemo = sessionService.get("isDemo")=="true";
  $scope.askFirstImg = (newQuestion.answers[0].imgSrc == undefined) ? "img/first.png" : newQuestion.answers[0].imgSrc;
  $scope.askSecondImg = (newQuestion.answers[1].imgSrc == undefined) ? "img/second.png" : newQuestion.answers[1].imgSrc;
  $scope.askThirdImg = (newQuestion.answers[2].imgSrc == undefined) ? "img/more.png" : newQuestion.answers[2].imgSrc;
  $scope.askFourthImg = (newQuestion.answers[3].imgSrc == undefined) ? "img/more.png" : newQuestion.answers[3].imgSrc;
  
  $scope.question.firstOption   = newQuestion.answers[0].name ;
  $scope.question.secondOption  = newQuestion.answers[1].name ;
  $scope.question.thirdOption   = newQuestion.answers[2].name ;
  $scope.question.fourthOption  = newQuestion.answers[3].name ;
  $scope.question.fifthOption   = newQuestion.answers[4].name ;

  if( $rootScope.allowCreateAsk == undefined )
    $rootScope.allowCreateAsk = true;
  if( $rootScope.allowSee == undefined )
    $rootScope.allowSee = false;

  $scope.switchOption = function() {
    $rootScope.askTypeOption = !$scope.askTypeOption;
    if( $rootScope.askTypeOption ) {
      $rootScope.tmpAllowCreateAsk = $rootScope.allowCreateAsk;
      $rootScope.allowCreateAsk = false;
    }
    if( !$rootScope.askTypeOption ) {
      $rootScope.allowCreateAsk = $rootScope.tmpAllowCreateAsk;
    }
  }
  $scope.allowCreateOptions = function() {
    if(!$rootScope.askTypeOption)
      $rootScope.allowCreateAsk = !$rootScope.allowCreateAsk;
  }
  $scope.allowSeeOptions = function() {
    $rootScope.allowSee = !$rootScope.allowSee;
  }
  $scope.editAsk = function() {
    newQuestion.answers[0].name = $scope.question.firstOption;
    newQuestion.answers[1].name = $scope.question.secondOption;
    newQuestion.answers[2].name = $scope.question.thirdOption;
    newQuestion.answers[3].name = $scope.question.fourthOption;
    newQuestion.answers[4].name = $scope.question.fifthOption;
    if( $rootScope.askTypeOption )
      newQuestion.type = "image";
    else
      newQuestion.type = "text";
    newQuestion.answers[0].imgSrc = $("#file_1").attr("src");
    newQuestion.answers[1].imgSrc = $("#file_2").attr("src");
    newQuestion.answers[2].imgSrc = $("#file_3").attr("src");
    newQuestion.answers[3].imgSrc = $("#file_4").attr("src");

    $ionicHistory.goBack();
  }
  $scope.goPostQuestion = function() {
    newQuestion.answers[0].name = $scope.question.firstOption;
    newQuestion.answers[1].name = $scope.question.secondOption;
    newQuestion.answers[2].name = $scope.question.thirdOption;
    newQuestion.answers[3].name = $scope.question.fourthOption;
    newQuestion.answers[4].name = $scope.question.fifthOption;

    newQuestion.answers[0].imgSrc = $("#file_1").attr("src");
    newQuestion.answers[1].imgSrc = $("#file_2").attr("src");
    newQuestion.answers[2].imgSrc = $("#file_3").attr("src");
    newQuestion.answers[3].imgSrc = $("#file_4").attr("src");

    if ($rootScope.askTypeOption) {
      newQuestion.type = "image";
    } else {
      newQuestion.type = "text";
    }

    //Validation for minimum number of options
    var countTxt = 0;
    var countImg = 0;
    angular.forEach(newQuestion.answers, function (v) {
      if (newQuestion.type == "text" && v.name && v.name != "") {
        countTxt++;
      }
      if (newQuestion.type == "image" && v.imgSrc && v.imgSrc != "" && v.imgSrc != "img/first.png" && v.imgSrc != "img/second.png" && v.imgSrc != "img/more.png") {
        countImg++;
      }
    });

    if (newQuestion.type == "text" && countTxt < 2 && !$scope.allowCreateAsk) {
      $rootScope.showAlert("Error", "Please provide at least two answers, or allow people to add their own answers.");
      return;
    } else if (newQuestion.type == "image" && countImg < 2) {
      $rootScope.showAlert("Error", "Please provide at least two pictures.");
      return;
    }
    //End of validation

    $rootScope.newQuestion = $scope.question;
    $rootScope.newQuestion.askingTitle = $rootScope.askingTitle;
    $rootScope.newQuestion.askingDesc = $rootScope.askingDesc;

    $scope.question = {};
    $scope.askObj = {};
    $rootScope.askingTitle = "";
    $rootScope.askingDesc = "";

    $scope.isDemo = sessionService.get("isDemo") == "true";
    if( $scope.isDemo ) {
      $state.go("invitationtosignup");
    } else {
      $state.go("qustionlive");  
    }
  }

  $scope.imgClick = function( index ) {
    $("#img_"+index).trigger("click");
  }

  $scope.closeBtnClickDemoAsk = function() {
    $rootScope.closeBtnClickedDemoAsk = true;
  }
  $scope.getAskingDesc = function() {
    if( $rootScope.askingDesc ) {
      return $rootScope.askingDesc;
    } else {
      return "No question details";
    }
  }
  $scope.switchTypeTxt = function() {
    if( !$scope.askTypeOption ) {
      return "Switch to Photo options";
    }
    else
      return "Switch to Text options";
  }

  $scope.showImgName = function (id, show, save) {
    $scope.question["imgNameShow" + id] = show;
    $scope.question["imgName" + id] = $scope.question["imgNameTmp" + id];
  }

  $scope.setFile = function (fileObj, id) {
    //$scope.currentFile = element.files[0];
    var reader = new FileReader();

    reader.onload = function (event) {
      $scope[id] = event.target.result
      $scope.$apply()

    }
    
    reader.readAsDataURL(fileObj);
  }

});

app.controller('PostQuestionCtrl', function($scope, $ionicModal, $state, $rootScope, $ionicPopup) {
  $scope.questionTitle = $rootScope.askingTitle;

  $scope.toggleGroup = function( index ) {
    if( $scope.isGroupShown(index) ) {
      $scope.shownGroupIndex = null;
    } else {
      $scope.shownGroupIndex = index;
    }
  }
  $scope.isGroupShown = function( index ) {
    return $scope.shownGroupIndex === index;
  }
  $scope.popupMsg = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Help',
      template: 'Hide your name and bio from the person who asked the question and anyone else who views the results of this question.  If you want to show your bio but not your name, you may.'
    });
  }
  $scope.editMyQuestion = function() {}
  $scope.postQuestion = function() {
    $state.go("qustionlive");
  }
});

app.controller('QuestionLiveCtrl', function ($scope, $state, $rootScope, $ionicPopup, $ionicHistory) {
  $scope.questionTitle = $rootScope.askingTitle;
  newQuestion = setQuestionPercent(newQuestion);
  $scope.newQuestion = newQuestion;
  $scope.goAnswering = function () {
    $ionicHistory.clearCache();
    $state.go("answering");
  }
  $scope.hasAnswers = function () {
    if (!$scope.newQuestion || !$scope.newQuestion.answers) {
      return false;
    }

    for (var i = 0; i < $scope.newQuestion.answers.length; i++) {
      if ($scope.newQuestion.answers[i].name != "") {
        return true;
      }
    }

    return false;
  };


});

app.controller('AskResultBySignUpCtrl', function($scope, $state, $rootScope, $ionicPopup, $ionicHistory){
  newQuestion = setQuestionPercent(newQuestion)
  $scope.newQuestion = newQuestion;
});
/***************** Invitation to Sign up for demo asking *******************/
app.controller('InvitationToSignUpCtrl', function($scope, $state, $rootScope, $ionicPopup, $ionicHistory){
  $scope.goDemoAnswering = function() {
    $state.go("demo-answering");
  }
  $scope.goBackAndEdit = function () {
    $rootScope.editLastQuestion = true;
    if ($rootScope.newQuestion) {
      $rootScope.askingTitle = $rootScope.newQuestion.askingTitle;
      $rootScope.askingDesc = $rootScope.newQuestion.askingDesc;
    }

    $state.go("demo-ask");
  }
  $scope.goAskRestultBySignUp = function() {
    $state.go("askresultbysignup");
  }
});
/************* Filtering type ************/
app.controller('FilteringtypeCtrl', function($scope, $state, $rootScope, $ionicPopup, $ionicHistory, $location){

  $scope.filteringObj = filteringObj;

  $scope.saveAndGoBack = function () {
    $rootScope.currentFilter = $scope.filteringObj;

    $rootScope.currentFilterSelection = []

    if ($scope.checkedItemStrAge !== "all ages") {
      $rootScope.currentFilterSelection.push($scope.checkedItemStrAge+" year old");
    }

    if ($scope.checkedItemStrEthnicities !== "all") {
      $rootScope.currentFilterSelection.push($scope.checkedItemStrEthnicities);
    }
    if ($scope.checkedItemStrRelationship !== "all") {
      $rootScope.currentFilterSelection.push($scope.checkedItemStrRelationship);
    }
    if ($scope.checkedItemStrGender !== "all") {
      $rootScope.currentFilterSelection.push($scope.checkedItemStrGender);
    }
    if ($scope.checkedItemStrChildren !== "all") {
      if ($scope.currentFilterSelection == "Yes") {
        $rootScope.currentFilterSelection.push("with children");
      }
      else {
        $rootScope.currentFilterSelection.push("with no children");
      }
    }
    if ($scope.checkedItemStrCountry !== "all") {
      $rootScope.currentFilterSelection.push("from " + $scope.checkedItemStrCountry);
    }
    /*if ($scope.expertiseData.checkedItemStrExpertise !== "All respondents") {
      $rootScope.currentFilterSelection.push($scope.expertiseData.checkedItemStrExpertise);
    }*/
    if ($scope.filteringObj.occupation.str !== "all occupations" && $scope.filteringObj.occupation.str!=="") {
      $rootScope.currentFilterSelection.push("in the " + $scope.filteringObj.occupation.str + " field");
    }
    if ($scope.checkedItemStrHousehold !== "all types of households") {
      $rootScope.currentFilterSelection.push($scope.checkedItemStrHousehold);
    }
    if ($scope.filteringObj.culturalOrigin.str !== "all countries" && $scope.filteringObj.culturalOrigin.str !=="") {
      $rootScope.currentFilterSelection.push("with " + $scope.filteringObj.culturalOrigin.str + " background");
    }
    if ($scope.checkedItemStrReligion !== "any religion") {
      $rootScope.currentFilterSelection.push($scope.checkedItemStrReligion);
    }
    if ($scope.checkedItemStrPolitical !== "all") {
      $rootScope.currentFilterSelection.push($scope.checkedItemStrPolitical);
    }

    $ionicHistory.goBack();
  };

  $scope.question = getQuestion($state.params.questionId || 1);

  $scope.hasQuestion = function () {
    if ($state.params.questionId) {
      return true;
    }
    return false;
  }

  if ($scope.question.category == "life") {
    $scope.filteringObj.expertiseCat = expertiseLife;
  } else if ($scope.question.category == "work") {
    $scope.filteringObj.expertiseCat = expertiseWork;
  } else {
    $scope.filteringObj.expertiseCat = expertiseDefault;
  }

  
  $scope.selectFilterOption = function( optionType ){
    if( $scope.selectedFilter == optionType )
      $scope.selectedFilter = '';
    else
      $scope.selectedFilter = optionType;
  }

  /* For age start */
  $scope.changeFilterStrAge = function() {
    if( !$scope.filteringObj.age['all']['unlocked'] ) {
      $scope.checkedItemStrAge = $scope.filteringObj.age['all']['str'];
    } else {
      var keyArr = _.keys($scope.filteringObj.age);
      var tempStr;
      $scope.countOfUnlockedAge = 0;
      _.forEach(keyArr, function(value, index){
        if( value != "id" && value != "all" && value != "under18" ) {
          if($scope.filteringObj.age[value]['unlocked']) {
            $scope.countOfUnlockedAge++;
            if( tempStr == undefined )
              tempStr = $scope.filteringObj.age[value]['str'];
            else
              tempStr = tempStr + " or " + $scope.filteringObj.age[value]['str'];
          }
        }
      });
      if($scope.countOfUnlockedAge == 0 || $scope.countOfUnlockedAge == 5) {
        $scope.checkedItemStrAge = $scope.filteringObj.age['all']['str'];
        $scope.allAgeFilter = true;
      } else {
        $scope.checkedItemStrAge = tempStr;
        $scope.allAgeFilter = false;
      }
    }
  }

  $scope.changeFilterStrAge();

  $scope.today = function() {
    var d = new Date();
    d.setHours(0,0,0,0);
    return d;
  }
  
  $scope.initBirthday = function() {
    $scope.birthday =  {
      value: $scope.today()
    }
  }
  $scope.initBirthday();
  $scope.unlockSeletedAge = function($event) {
    if ($scope.birthday.value >= $scope.today()) {
      $event.preventDefault();
      $scope.showAlert('Missing input', 'Please input your birthday to continue.');
      return false;
    }
    $scope.popup1.close();
    user.demo.birthday = $scope.birthday.value;
    $scope.filteringObj.age[$scope.curSeletedOptionAge]['unlocked'] = true;
    $scope.filteringObj.age.all.unlocked = true;
    $scope.changeFilterStrAge();
  }
  $scope.tellBirthdayAge = function() {
    $scope.popup1.close();
    $scope.popup1 = $ionicPopup.show({
       template: "<div><input type='date' ng-model='birthday.value'></div><div>Note: Because your birthdate doesn't change, you won't be able to change this later.  This also helps us provide accurate results to anyone who asks questions here.</div><a class='button button-full button-positive' ng-click='unlockSeletedAge($event)'>Save and unlock this filter</a><div align=center style='color: #387ef5' ng-click='closePopup1()'>No thanks; go back</div>",
       title: 'My birthdate:',
       scope: $scope
      });
  }
  $scope.closePopup1 = function() {
    $scope.popup1.close();
    $scope.selectedFilter = '';
  }
  $scope.itemSelectAge = function( curSeletedOptionAge ) {
    $scope.curSeletedOptionAge = curSeletedOptionAge;
    if( !$scope.filteringObj.age.all.unlocked ) {
      $scope.popup1 = $ionicPopup.show({
       template: '<div align=center><p>' + text.filters.fairness + 'Please provide your birthday to unlock this filter.</p><p>' + text.filters.privacy + '</p></div><a class="button button-full button-positive" ng-click="tellBirthdayAge()">Yes, sounds good to me</a><div align=center style="color: #387ef5" ng-click="closePopup1()">No thanks; go back</div>',
       title: 'This filter is locked.',
       scope: $scope
      });
    } else {
      $scope.filteringObj.age[$scope.curSeletedOptionAge]['unlocked'] = !$scope.filteringObj.age[$scope.curSeletedOptionAge]['unlocked'];
    }
    $scope.changeFilterStrAge();
  }
  /* For age end */

  /* For gender start */
  $scope.itemSelectGender = function( curSeletedOptionGender ) {
    $scope.curSeletedOptionGender = curSeletedOptionGender;

    $scope.filteringObj.gender[$scope.curSeletedOptionGender]['unlocked'] = !$scope.filteringObj.gender[$scope.curSeletedOptionGender]['unlocked'];
    $scope.filteringObj.gender['all']['unlocked'] = true;

    $scope.changeFilterStrGender();
  }
  $scope.changeFilterStrGender = function() {
    var keyArr = _.keys($scope.filteringObj.gender);
    var tempStr;
    $scope.countOfActivatedGender = 0;
    _.forEach(keyArr, function(value, index){
      if( value != "id" && value != "all" && value != "other" ) {
        if($scope.filteringObj.gender[value]['unlocked']) {
          $scope.countOfActivatedGender++;
          if( tempStr == undefined )
            tempStr = $scope.filteringObj.gender[value]['str'];
          else
            tempStr = tempStr + " or " + $scope.filteringObj.gender[value]['str'];
        }
      }
    });
    if($scope.countOfActivatedGender == 0 || $scope.countOfActivatedGender == 3) {
      $scope.checkedItemStrGender = $scope.filteringObj.gender['all']['str'];
    } else {
      $scope.checkedItemStrGender = tempStr;
    }
  }
  $scope.changeFilterStrGender();
  /* For gender end */

  /* For Country start */
  $scope.itemSelectCountry = function( curSeletedOptionCountry ) {
    $scope.curSeletedOptionCountry = curSeletedOptionCountry;

    $scope.filteringObj.country[$scope.curSeletedOptionCountry]['unlocked'] = !$scope.filteringObj.country[$scope.curSeletedOptionCountry]['unlocked'];
    $scope.filteringObj.country['all']['unlocked'] = true;
    
    $scope.changeFilterStrCountry();
  }
  $scope.changeFilterStrCountry = function() {
    var keyArr = _.keys($scope.filteringObj.country);
    var tempStr;
    $scope.countOfActivatedCountry = 0;
    _.forEach(keyArr, function(value, index){
      if( value != "id" && value != "all" ) {
        if($scope.filteringObj.country[value]['unlocked']) {
          $scope.countOfActivatedCountry++;
          if( tempStr == undefined )
            tempStr = $scope.filteringObj.country[value]['str'];
          else
            tempStr = tempStr + " or " + $scope.filteringObj.country[value]['str'];
        }
      }
    });
    if($scope.countOfActivatedCountry == 0 || $scope.countOfActivatedCountry == 3) {
      $scope.checkedItemStrCountry = $scope.filteringObj.country['all']['str'];
    } else {
      $scope.checkedItemStrCountry = tempStr;
    }
  }
  $scope.changeFilterStrCountry();
  /* For Country end */

  /* For Household start */
  $scope.changeFilterStrHousehold = function() {
    if( !$scope.filteringObj.household['all']['unlocked'] ) {
      $scope.checkedItemStrHousehold = $scope.filteringObj.household['all']['str'];
    } else {
      var keyArr = _.keys($scope.filteringObj.household);
      var tempStr;
      $scope.countOfUnlockedHousehold = 0;
      _.forEach(keyArr, function(value, index){
        if( value != "id" && value != "all" && value != "not" && value != "to200" && value != "over200" ) {
          if($scope.filteringObj.household[value]['unlocked']) {
            $scope.countOfUnlockedHousehold++;
            if( tempStr == undefined )
              tempStr = $scope.filteringObj.household[value]['str'];
            else
              tempStr = tempStr + " or " + $scope.filteringObj.household[value]['str'];
          }
        }
      });
      if($scope.countOfUnlockedHousehold == 0 || $scope.countOfUnlockedHousehold == 6) {
        $scope.checkedItemStrHousehold = $scope.filteringObj.household['all']['str'];
        $scope.allHouseholdFilter = true;
      } else {
        $scope.checkedItemStrHousehold = tempStr;
        $scope.allHouseholdFilter = false;
      }
    }
  }

  $scope.changeFilterStrHousehold();

  $scope.unlockSeletedHousehold = function($event) {
    //Validates input
    if ($scope.selectedItemDlgHousehold === undefined || $scope.selectedItemDlgHousehold == '') {
      $event.preventDefault();
      $scope.showAlert('Missing input', 'Please select your household formation to continue.');
      return false;
    }
    
    //Accepts input
    $scope.popup1.close();
    user.demo.household = $scope.selectedItemDlgHousehold;
    $scope.filteringObj.household[$scope.curSeletedOptionHousehold]['unlocked'] = true;
    $scope.filteringObj.household.all.unlocked = true;
    $scope.changeFilterStrHousehold();
  }
  $scope.selectItemDlgHousehold = function(item) {
    $scope.selectedItemDlgHousehold = item;
  }
  $scope.openRangeDlgHousehold = function() {
    $scope.popup1.close();
    $scope.popup1 = $ionicPopup.show({
       template: "<div class='button-bar'><a class='button button-outline button-dark item item-icon-bottom' ng-class=" + '"'+ "{'activatedBtn': selectedItemDlgHousehold == 'alone'}"+'"'+" ng-click=selectItemDlgHousehold('alone')><p>Living alone</p></a><a class='button button-outline button-dark item item-icon-bottom' ng-class=" + '"'+ "{'activatedBtn': selectedItemDlgHousehold == 'withparent'}"+'"'+" ng-click=selectItemDlgHousehold('withparent')>With parent(s)</a><a class='button button-outline button-dark item item-icon-bottom' ng-class=" + '"'+ "{'activatedBtn': selectedItemDlgHousehold == 'withroommate'}"+'"'+" ng-click=selectItemDlgHousehold('withroommate')>With roommate(s)</a></div><div style='padding:2px;'></div><div class='button-bar'><a class='button button-outline button-dark item item-icon-bottom' ng-class=" + '"'+ "{'activatedBtn': selectedItemDlgHousehold == 'withpartner_spouse_nochildren'}"+'"'+" ng-click=selectItemDlgHousehold('withpartner_spouse_nochildren')>With partner/spouse, no children</a><a class='button button-outline button-dark item item-icon-bottom' ng-class=" + '"'+ "{'activatedBtn': selectedItemDlgHousehold == 'withchildren'}"+'"'+" ng-click=selectItemDlgHousehold('withchildren')>With children</a><a class='button button-outline button-dark item item-icon-bottom' ng-class=" + '"'+ "{'activatedBtn': selectedItemDlgHousehold == 'multigenerational'}"+'"'+" ng-click=selectItemDlgHousehold('multigenerational')>Multi-generational household</a></div><a class='button button-full button-positive' ng-click='unlockSeletedHousehold($event)'>Save and unlock this filter</a><div align=center style='color: #387ef5' ng-click='closePopup1()'>No thanks; go back</div>",
       title: 'My household formation:',
       cssClass: 'householdPopup-cls',
       scope: $scope
      });
  }
  
  $scope.itemSelectHousehold = function( curSeletedOptionHousehold ) {
    $scope.curSeletedOptionHousehold = curSeletedOptionHousehold;
    if( !$scope.filteringObj.household.all.unlocked ) {
      $scope.popup1 = $ionicPopup.show({
        template: '<div align=center><p>' + text.filters.fairness + 'Please provide your household formation to unlock this filter.</p><p>' + text.filters.privacy + '</p><p>' + text.filters.mayChange + '</p></div><a class="button button-full button-positive" ng-click="openRangeDlgHousehold()">Yes, sounds good to me</a><div align=center style="color: #387ef5" ng-click="closePopup1()">No thanks; go back</div>',
       title: 'This filter is locked.',
       cssClass: 'householdPopup-cls',
       scope: $scope
      });
    } else {
      $scope.filteringObj.household[$scope.curSeletedOptionHousehold]['unlocked'] = !$scope.filteringObj.household[$scope.curSeletedOptionHousehold]['unlocked'];
    }
    $scope.changeFilterStrHousehold();
  }
  /* For Household end */

  /* Relationship status start */
  $scope.changeFilterStrRelationship = function() {
    if( !$scope.filteringObj.relationshipStatus['all']['unlocked'] ) {
      $scope.checkedItemStrRelationship = $scope.filteringObj.relationshipStatus['all']['str'];
    } else {
      var keyArr = _.keys($scope.filteringObj.relationshipStatus);
      var tempStr;
      $scope.countOfUnlockedRelationship = 0;
      _.forEach(keyArr, function(value, index){
        if( value != "id" && value != "all" && value != "widowed" && value != "divorced" && value != "domestic_partner" ) {
          if($scope.filteringObj.relationshipStatus[value]['unlocked']) {
            $scope.countOfUnlockedRelationship++;
            if( tempStr == undefined )
              tempStr = $scope.filteringObj.relationshipStatus[value]['str'];
            else
              tempStr = tempStr + " or " + $scope.filteringObj.relationshipStatus[value]['str'];
          }
        }
      });
      if($scope.countOfUnlockedRelationship == 0 || $scope.countOfUnlockedRelationship == 6) {
        $scope.checkedItemStrRelationship = $scope.filteringObj.relationshipStatus['all']['str'];
        $scope.allRelationshipFilter = true;
      } else {
        $scope.checkedItemStrRelationship = tempStr;
        $scope.allRelationshipFilter = false;
      }
    }
  }

  $scope.changeFilterStrRelationship();

  $scope.unlockSeletedRelationship = function($event) {
    //Validates input
    if ($scope.selectedItemDlgRelationship === undefined || $scope.selectedItemDlgRelationship == '') {
      $event.preventDefault();
      $scope.showAlert('Missing input', 'Please select your relationship status to continue.');
      return false;
    }
    
    //Accepts input
    $scope.popup1.close();
    user.demo.relationshipStatus = $scope.selectedItemDlgRelationship;
    $scope.filteringObj.relationshipStatus[$scope.curSeletedOptionRelationship]['unlocked'] = true;
    $scope.filteringObj.relationshipStatus.all.unlocked = true;
    $scope.changeFilterStrRelationship();
  }
  $scope.selectItemDlgRelationship = function(item) {
    $scope.selectedItemDlgRelationship = item;
  }
  $scope.selDlgRelationship = function() {
    $scope.popup1.close();
    $scope.popup1 = $ionicPopup.show({
       template: "<div class='button-bar'><a class='button button-outline button-dark item item-icon-bottom' ng-class=" + '"'+ "{'activatedBtn': selectedItemDlgRelationship == 'single'}"+'"'+" ng-click=selectItemDlgRelationship('single')><p>Single</p></a><a class='button button-outline button-dark item item-icon-bottom' ng-class=" + '"'+ "{'activatedBtn': selectedItemDlgRelationship == 'in'}"+'"'+" ng-click=selectItemDlgRelationship('in')><p>In a Relationship</p></a><a class='button button-outline button-dark item item-icon-bottom' ng-class=" + '"'+ "{'activatedBtn': selectedItemDlgRelationship == 'married'}"+'"'+" ng-click=selectItemDlgRelationship('married')><p>Married</p></a></div><div style='padding:2px;'></div><div class='button-bar'><a class='button button-outline button-dark item item-icon-bottom' ng-class=" + '"'+ "{'activatedBtn': selectedItemDlgRelationship == 'widowed'}"+'"'+" ng-click=selectItemDlgRelationship('widowed')><p>Widowed</p></a><a class='button button-outline button-dark item item-icon-bottom' ng-class=" + '"'+ "{'activatedBtn': selectedItemDlgRelationship == 'divorced'}"+'"'+" ng-click=selectItemDlgRelationship('divorced')><p>Divorced</p></a><a class='button button-outline button-dark item item-icon-bottom' ng-class=" + '"'+ "{'activatedBtn': selectedItemDlgRelationship == 'domestic_partner'}"+'"'+" ng-click=selectItemDlgRelationship('domestic_partner')><p>Domestic partnership</p></a></div><a class='button button-full button-positive' ng-click='unlockSeletedRelationship($event)'>Save and unlock this filter</a><div align=center style='color: #387ef5' ng-click='closePopup1()'>No thanks; go back</div>",
       title: 'My relationship status:',
       cssClass: 'householdPopup-cls',
       scope: $scope
      });
  }
  
  $scope.itemSelectRelationship = function( curSeletedOptionRelationship ) {
    $scope.curSeletedOptionRelationship = curSeletedOptionRelationship;
    if( !$scope.filteringObj.relationshipStatus.all.unlocked ) {
      $scope.popup1 = $ionicPopup.show({
        template: '<div align=center><p>' + text.filters.fairness + 'Please provide your relationship status to unlock this filter.</p><p>' + text.filters.privacy + '</p><p>' + text.filters.mayChange + '</p></div><a class="button button-full button-positive" ng-click="selDlgRelationship()">Yes, sounds good to me</a><div align=center style="color: #387ef5" ng-click="closePopup1()">No thanks; go back</div>',
       title: 'This filter is locked.',
       cssClass: 'householdPopup-cls',
       scope: $scope
      });
    } else {
      $scope.filteringObj.relationshipStatus[$scope.curSeletedOptionRelationship]['unlocked'] = !$scope.filteringObj.relationshipStatus[$scope.curSeletedOptionRelationship]['unlocked'];
    }
    $scope.changeFilterStrRelationship();
  }
  /* Relationship status end */

  /* Children start */
  $scope.changeFilterStrChildren = function () {
    if (!$scope.filteringObj.children['all']['unlocked']) {
      $scope.checkedItemStrChildren = $scope.filteringObj.children['all']['str'];
      return;
    }

    if (($scope.filteringObj.children['yes']['unlocked'] && $scope.filteringObj.children['no']['unlocked'])
      || (!$scope.filteringObj.children['yes']['unlocked'] && !$scope.filteringObj.children['no']['unlocked'])) {
      $scope.checkedItemStrChildren = $scope.filteringObj.children['all']['str'];
      return;
    }

    if ($scope.filteringObj.children['yes']['unlocked']) {
      $scope.checkedItemStrChildren = "Yes";

    } else if ($scope.filteringObj.children['no']['unlocked']) {
      $scope.checkedItemStrChildren = "No";
    }
  }

  $scope.changeFilterStrChildren();

  $scope.unlockSeletedChildren = function($event) {
    //Validates input
    if ($scope.selectedItemDlgChildren === undefined || $scope.selectedItemDlgChildren == '') {
      $event.preventDefault();
      $scope.showAlert('Missing input', 'Please select whether you have children to continue.');
      return false;
    }
    
    //Accepts input
    $scope.popup1.close();
    user.demo.children = $scope.selectedItemDlgChildren;
    $scope.filteringObj.children[$scope.curSeletedOptionChildren]['unlocked'] = true;
    $scope.filteringObj.children.all.unlocked = true;
    $scope.changeFilterStrChildren();
  }
  $scope.selectItemDlgChildren = function(item) {
    $scope.selectedItemDlgChildren = item;
  }
  $scope.selDlgChildren = function() {
    $scope.popup1.close();
    $scope.popup1 = $ionicPopup.show({
       template: "<div class='button-bar'><a class='button button-outline button-dark item item-icon-bottom' ng-class=" + '"'+ "{'activatedBtn': selectedItemDlgChildren == 'yes'}"+'"'+" ng-click=selectItemDlgChildren('yes')><p>Yes</p></a><a class='button button-outline button-dark item item-icon-bottom' ng-class=" + '"'+ "{'activatedBtn': selectedItemDlgChildren == 'no'}"+'"'+" ng-click=selectItemDlgChildren('no')><p>No</p></a><div class='empty-cell'></div></div><a class='button button-full button-positive' ng-click='unlockSeletedChildren($event)'>Save and unlock this filter</a><div align=center style='color: #387ef5' ng-click='closePopup1()'>No thanks; go back</div>",
       title: 'I have children:',
       cssClass: 'householdPopup-cls',
       scope: $scope
      });
  }
  
  $scope.itemSelectChildren = function( curSeletedOptionChildren ) {
    $scope.curSeletedOptionChildren = curSeletedOptionChildren;
    if( !$scope.filteringObj.children.all.unlocked ) {
      $scope.popup1 = $ionicPopup.show({
       template: '<div align=center><p>' + text.filters.fairness + 'Please tell us whether you have children to unlock this filter.</p><p>' + text.filters.privacy + '</p><p>' + text.filters.mayChange + '</p></div><a class="button button-full button-positive" ng-click="selDlgChildren()">Yes, sounds good to me</a><div align=center style="color: #387ef5" ng-click="closePopup1()">No thanks; go back</div>',
       title: 'This filter is locked.',
       cssClass: 'householdPopup-cls',
       scope: $scope
      });
    } else {
      $scope.filteringObj.children[$scope.curSeletedOptionChildren]['unlocked'] = !$scope.filteringObj.children[$scope.curSeletedOptionChildren]['unlocked'];
    }
    $scope.changeFilterStrChildren();
  }
  /* Children end */

  /* Ethnicities start */
  $scope.changeFilterStrEthnicities = function() {
    if( !$scope.filteringObj.ethnicities['all']['unlocked'] ) {
      $scope.checkedItemStrEthnicities = $scope.filteringObj.ethnicities['all']['str'];
    } else {
      var keyArr = _.keys($scope.filteringObj.ethnicities);
      var tempStr;
      $scope.countOfUnlockedEthnicities = 0;
      _.forEach(keyArr, function(value, index){
        if( value != "id" && value != "all" && value != "mid" && value != "native" && value != "pacific" && value != "other" ) {
          if($scope.filteringObj.ethnicities[value]['unlocked']) {
            $scope.countOfUnlockedEthnicities++;
            if( tempStr == undefined )
              tempStr = $scope.filteringObj.ethnicities[value]['str'];
            else
              tempStr = tempStr + " or " + $scope.filteringObj.ethnicities[value]['str'];
          }
        }
      });
      if($scope.countOfUnlockedEthnicities == 0 || $scope.countOfUnlockedEthnicities == 8) {
        $scope.checkedItemStrEthnicities = $scope.filteringObj.ethnicities['all']['str'];
        $scope.allEthnicitiesFilter = true;
      } else {
        $scope.checkedItemStrEthnicities = tempStr;
        $scope.allEthnicitiesFilter = false;
      }
    }
  }

  $scope.changeFilterStrEthnicities();

  $scope.selectedItemDlgEthnicities = {};
  $scope.unlockSeletedEthnicities = function($event) {
    //Input validation
    var pass = false;
    for (var key in $scope.selectedItemDlgEthnicities) {
      if ($scope.selectedItemDlgEthnicities.hasOwnProperty(key) && $scope.selectedItemDlgEthnicities[key] === true) {
        pass = true;
        break;
      }
    }
    if (!pass) {
      $event.preventDefault();
      $scope.showAlert('Missing input', 'Please input your ethnicities to continue.');
      return false;
    }

    //Accept input
    $scope.popup1.close();
    user.demo.ethnicities = $scope.selectedItemDlgEthnicities;
    $scope.filteringObj.ethnicities[$scope.curSeletedOptionEthnicities]['unlocked'] = true;
    $scope.filteringObj.ethnicities.all.unlocked = true;
    $scope.changeFilterStrEthnicities();
  }
  $scope.selectItemDlgEthnicities = function(item) {
    $scope.selectedItemDlgEthnicities[item] = !$scope.selectedItemDlgEthnicities[item];
  }
  $scope.selDlgEthnicities = function() {
    $scope.popup1.close();
    $scope.popup1 = $ionicPopup.show({
       template: "<div class='button-bar'><a class='button button-outline button-dark item item-icon-bottom' ng-class=" + '"'+ "{'activatedBtn': selectedItemDlgEthnicities.asian}"+'"'+" ng-click=selectItemDlgEthnicities('asian')><p>Asian</p></a><a class='button button-outline button-dark item item-icon-bottom' ng-class=" + '"'+ "{'activatedBtn': selectedItemDlgEthnicities.black}"+'"'+" ng-click=selectItemDlgEthnicities('black')><p>Black</p></a><a class='button button-outline button-dark item item-icon-bottom' ng-class=" + '"'+ "{'activatedBtn': selectedItemDlgEthnicities.lat_his}"+'"'+" ng-click=selectItemDlgEthnicities('lat_his')><p>Latino/Hispanic</p></a></div><div style='padding:2px;'></div><div class='button-bar'><a class='button button-outline button-dark item item-icon-bottom' ng-class=" + '"'+ "{'activatedBtn': selectedItemDlgEthnicities.mid_eas}"+'"'+" ng-click=selectItemDlgEthnicities('mid_eas')><p>Middle Eastern</p></a><a class='button button-outline button-dark item item-icon-bottom' ng-class=" + '"'+ "{'activatedBtn': selectedItemDlgEthnicities.native}"+'"'+" ng-click=selectItemDlgEthnicities('native')><p>Native Am./First Nations</p></a><a class='button button-outline button-dark item item-icon-bottom' ng-class=" + '"'+ "{'activatedBtn': selectedItemDlgEthnicities.pacific}"+'"'+" ng-click=selectItemDlgEthnicities('pacific')><p>Pacific Islander</p></a></div><div style='padding:2px;'></div><div class='button-bar'><a class='button button-outline button-dark item item-icon-bottom' ng-class=" + '"'+ "{'activatedBtn': selectedItemDlgEthnicities.white}"+'"'+" ng-click=selectItemDlgEthnicities('white')><p>White</p></a><a class='button button-outline button-dark item item-icon-bottom' ng-class=" + '"'+ "{'activatedBtn': selectedItemDlgEthnicities.other}"+'"'+" ng-click=selectItemDlgEthnicities('other')><p>Other</p></a><div class='empty-dialog-cell'></div></div><div>Please only include the ethnicities that you are.  As with your birthday, this is not a demographic that you can change later.</div><a class='button button-full button-positive' ng-click='unlockSeletedEthnicities($event)'>Save and unlock this filter</a><div align=center style='color: #387ef5' ng-click='closePopup1()'>No thanks; go back</div>",
       title: 'My ethnicities:',
       cssClass: 'householdPopup-cls',
       scope: $scope
      });
  }
  
  $scope.itemSelectEthnicities = function( curSeletedOptionEthnicities ) {
    $scope.curSeletedOptionEthnicities = curSeletedOptionEthnicities;
    if( !$scope.filteringObj.ethnicities.all.unlocked ) {
      $scope.popup1 = $ionicPopup.show({
       template: '<div align=center><p>' + text.filters.fairness + 'Please tell us your ethnicity to unlock this filter.</p><p>' + text.filters.privacy + '</p></div><a class="button button-full button-positive" ng-click="selDlgEthnicities()">Yes, sounds good to me</a><div align=center style="color: #387ef5" ng-click="closePopup1()">No thanks; go back</div>',
       title: 'This filter is locked.',
       cssClass: 'householdPopup-cls',
       scope: $scope
      });
    } else {
      $scope.filteringObj.ethnicities[$scope.curSeletedOptionEthnicities]['unlocked'] = !$scope.filteringObj.ethnicities[$scope.curSeletedOptionEthnicities]['unlocked'];
    }
    $scope.changeFilterStrEthnicities();
  }
  /* Ethnicities end */

  /* Religion start */
  $scope.changeFilterStrReligion = function() {
    if( !$scope.filteringObj.religion['all']['unlocked'] ) {
      $scope.checkedItemStrReligion = $scope.filteringObj.religion['all']['str'];
    } else {
      var keyArr = _.keys($scope.filteringObj.religion);
      var tempStr;
      $scope.countOfUnlockedReligion = 0;
      _.forEach(keyArr, function(value, index){
        if( value != "id" && value != "all" && value != "mormon" && value != "christian" && value != "jewish" && value != "sikh" && value != "buddhist" && value != "taoist" && value != "otherreligion" && value != "atheist" && value != "agnostic" ) {
          if($scope.filteringObj.religion[value]['unlocked']) {
            $scope.countOfUnlockedReligion++;
            if( tempStr == undefined )
              tempStr = $scope.filteringObj.religion[value]['str'];
            else
              tempStr = tempStr + " or " + $scope.filteringObj.religion[value]['str'];
          }
        }
      });
      if($scope.countOfUnlockedReligion == 0 || $scope.countOfUnlockedReligion == 14) {
        $scope.checkedItemStrReligion = $scope.filteringObj.religion['all']['str'];
        $scope.allReligionFilter = true;
      } else {
        $scope.checkedItemStrReligion = tempStr;
        $scope.allReligionFilter = false;
      }
    }
  }

  $scope.changeFilterStrReligion();

  $scope.unlockSeletedReligion = function($event) {
    //Validates input
    if ($scope.selectedItemDlgReligion === undefined || $scope.selectedItemDlgReligion == '') {
      $event.preventDefault();
      $scope.showAlert('Missing input', 'Please select your religion to continue.');
      return false;
    }
    
    //Accepts input
    $scope.popup1.close();
    user.demo.religion = $scope.selectedItemDlgReligion;
    $scope.filteringObj.religion[$scope.curSeletedOptionReligion]['unlocked'] = true;
    $scope.filteringObj.religion.all.unlocked = true;
    $scope.changeFilterStrReligion();
  }
  $scope.selectItemDlgReligion = function(item) {
    $scope.selectedItemDlgReligion = item;
  }
  $scope.selDlgReligion = function() {
    $scope.popup1.close();
    $scope.popup1 = $ionicPopup.show({
       template: "<div class='button-bar'><a class='button button-outline button-dark item item-icon-bottom' ng-class=" + '"'+ "{'activatedBtn': selectedItemDlgReligion == '1'}"+'"'+" ng-click=selectItemDlgReligion('1')><p>Protestant</p></a><a class='button button-outline button-dark item item-icon-bottom' ng-class=" + '"'+ "{'activatedBtn': selectedItemDlgReligion == '2'}"+'"'+" ng-click=selectItemDlgReligion('2')><p>Roman Catholic</p></a><a class='button button-outline button-dark item item-icon-bottom' ng-class=" + '"'+ "{'activatedBtn': selectedItemDlgReligion == '3'}"+'"'+" ng-click=selectItemDlgReligion('3')><p>Mormon</p></a></div><div style='padding:2px;'></div><div class='button-bar'><a class='button button-outline button-dark item item-icon-bottom' ng-class=" + '"'+ "{'activatedBtn': selectedItemDlgReligion == '4'}"+'"'+" ng-click=selectItemDlgReligion('4')><p>Christian - Other</p></a><a class='button button-outline button-dark item item-icon-bottom' ng-class=" + '"'+ "{'activatedBtn': selectedItemDlgReligion == '5'}"+'"'+" ng-click=selectItemDlgReligion('5')><p>Jewish</p></a><a class='button button-outline button-dark item item-icon-bottom' ng-class=" + '"'+ "{'activatedBtn': selectedItemDlgReligion == '6'}"+'"'+" ng-click=selectItemDlgReligion('6')><p>Muslim</p></a></div><div style='padding:2px;'></div><div class='button-bar'><a class='button button-outline button-dark item item-icon-bottom' ng-class=" + '"'+ "{'activatedBtn': selectedItemDlgReligion == '7'}"+'"'+" ng-click=selectItemDlgReligion('7')><p>Hindu</p></a><a class='button button-outline button-dark item item-icon-bottom' ng-class=" + '"'+ "{'activatedBtn': selectedItemDlgReligion == '8'}"+'"'+" ng-click=selectItemDlgReligion('8')><p>Sikh</p></a><a class='button button-outline button-dark item item-icon-bottom' ng-class=" + '"'+ "{'activatedBtn': selectedItemDlgReligion == '9'}"+'"'+" ng-click=selectItemDlgReligion('9')><p>Buddhist</p></a></div><div style='padding:2px;'></div><div class='button-bar'><a class='button button-outline button-dark item item-icon-bottom' ng-class=" + '"'+ "{'activatedBtn': selectedItemDlgReligion == '10'}"+'"'+" ng-click=selectItemDlgReligion('10')><p>Taoist</p></a><a class='button button-outline button-dark item item-icon-bottom' ng-class=" + '"'+ "{'activatedBtn': selectedItemDlgReligion == '11'}"+'"'+" ng-click=selectItemDlgReligion('11')><p>Other religion</p></a><a class='button button-outline button-dark item item-icon-bottom' ng-class=" + '"'+ "{'activatedBtn': selectedItemDlgReligion == '12'}"+'"'+" ng-click=selectItemDlgReligion('12')><p>Atheist</p></a></div><div style='padding:2px;'></div><div class='button-bar'><a class='button button-outline button-dark item item-icon-bottom' ng-class=" + '"'+ "{'activatedBtn': selectedItemDlgReligion == '13'}"+'"'+" ng-click=selectItemDlgReligion('13')><p>Agnostic</p></a><a class='button button-outline button-dark item item-icon-bottom' ng-class=" + '"'+ "{'activatedBtn': selectedItemDlgReligion == '14'}"+'"'+" ng-click=selectItemDlgReligion('14')><p>Other  Non-religious</p></a><div class='empty-dialog-cell'></div></div><a class='button button-full button-positive' ng-click='unlockSeletedReligion($event)'>Save and unlock this filter</a><div align=center style='color: #387ef5' ng-click='closePopup1()'>No thanks; go back</div>",
       title: 'I consider myself:',
       cssClass: 'householdPopup-cls',
       scope: $scope
      });
  }
  
  $scope.itemSelectReligion = function( curSeletedOptionReligion ) {
    $scope.curSeletedOptionReligion = curSeletedOptionReligion;
    if( !$scope.filteringObj.religion.all.unlocked ) {
      $scope.popup1 = $ionicPopup.show({
       template: '<div align=center><p>' + text.filters.fairness + 'Please tell us what religion (if any) you follow to unlock this filter.</p><p>' + text.filters.privacy + '</p><p>' + text.filters.mayChange + '</p></div><a class="button button-full button-positive" ng-click="selDlgReligion()">Yes, sounds good to me</a><div align=center style="color: #387ef5" ng-click="closePopup1()">No thanks; go back</div>',
       title: 'This filter is locked.',
       cssClass: 'householdPopup-cls',
       scope: $scope
      });
    } else {
      $scope.filteringObj.religion[$scope.curSeletedOptionReligion]['unlocked'] = !$scope.filteringObj.religion[$scope.curSeletedOptionReligion]['unlocked'];
    }
    $scope.changeFilterStrReligion();
  }
  /* Religion end */

  /* Political views start */
  $scope.changeFilterStrPolitical = function() {
    if( !$scope.filteringObj.political['all']['unlocked'] ) {
      $scope.checkedItemStrPolitical = $scope.filteringObj.political['all']['str'];
    } else {
      var keyArr = _.keys($scope.filteringObj.political);
      var tempStr;
      $scope.countOfUnlockedPilitical = 0;
      _.forEach(keyArr, function(value, index){
        if( value != "id" && value != "all" && value != "veryconservative" && value != "libertarian" && value != "socialist" && value != "green" && value != "independent" && value != "other" ) {
          if($scope.filteringObj.political[value]['unlocked']) {
            $scope.countOfUnlockedPilitical++;
            if( tempStr == undefined )
              tempStr = $scope.filteringObj.political[value]['str'];
            else
              tempStr = tempStr + " or " + $scope.filteringObj.political[value]['str'];
          }
        }
      });
      if($scope.countOfUnlockedPilitical == 0 || $scope.countOfUnlockedPilitical == 10) {
        $scope.checkedItemStrPolitical = $scope.filteringObj.political['all']['str'];
        $scope.allPoliticalFilter = true;
      } else {
        $scope.checkedItemStrPolitical = tempStr;
        $scope.allPoliticalFilter = false;
      }
    }
  }

  $scope.changeFilterStrPolitical();

  $scope.unlockSeletedPolitical = function($event) {
    //Validates input
    if ($scope.selectedItemDlgPolitical === undefined || $scope.selectedItemDlgPolitical == '') {
      $event.preventDefault();
      $scope.showAlert('Missing input', 'Please select your political view to continue.');
      return false;
    }
    
    //Accepts input
    $scope.popup1.close();
    user.demo.political = $scope.selectedItemDlgPolitical;
    $scope.filteringObj.political[$scope.curSeletedOptionPolitical]['unlocked'] = true;
    $scope.filteringObj.political.all.unlocked = true;
    $scope.changeFilterStrPolitical();
  }
  $scope.selectItemDlgPolitical = function(item) {
    $scope.selectedItemDlgPolitical = item;
  }
  $scope.selDlgPolitical = function() {
    $scope.popup1.close();
    $scope.popup1 = $ionicPopup.show({
       template: "<div class='button-bar'><a class='button button-outline button-dark item item-icon-bottom' ng-class=" + '"'+ "{'activatedBtn': selectedItemDlgPolitical == '1'}"+'"'+" ng-click=selectItemDlgPolitical('1')>Very Liberal</a><a class='button button-outline button-dark item item-icon-bottom' ng-class=" + '"'+ "{'activatedBtn': selectedItemDlgPolitical == '2'}"+'"'+" ng-click=selectItemDlgPolitical('2')>Somewhat Liberal</a><a class='button button-outline button-dark item item-icon-bottom' ng-class=" + '"'+ "{'activatedBtn': selectedItemDlgPolitical == '3'}"+'"'+" ng-click=selectItemDlgPolitical('3')><p>Moderate/Centrist</p></a></div><div style='padding:2px;'></div><div class='button-bar'><a class='button button-outline button-dark item item-icon-bottom' ng-class=" + '"'+ "{'activatedBtn': selectedItemDlgPolitical == '4'}"+'"'+" ng-click=selectItemDlgPolitical('4')><p>Somewhat Conservative</p></a><a class='button button-outline button-dark item item-icon-bottom' ng-class=" + '"'+ "{'activatedBtn': selectedItemDlgPolitical == '5'}"+'"'+" ng-click=selectItemDlgPolitical('5')><p>Very Conservative</p></a><a class='button button-outline button-dark item item-icon-bottom' ng-class=" + '"'+ "{'activatedBtn': selectedItemDlgPolitical == '6'}"+'"'+" ng-click=selectItemDlgPolitical('6')><p>Libertarian</p></a></div><div style='padding:2px;'></div><div class='button-bar'><a class='button button-outline button-dark item item-icon-bottom' ng-class=" + '"'+ "{'activatedBtn': selectedItemDlgPolitical == '7'}"+'"'+" ng-click=selectItemDlgPolitical('7')><p>Socialist</p></a><a class='button button-outline button-dark item item-icon-bottom' ng-class=" + '"'+ "{'activatedBtn': selectedItemDlgPolitical == '8'}"+'"'+" ng-click=selectItemDlgPolitical('8')><p>Green</p></a><a class='button button-outline button-dark item item-icon-bottom' ng-class=" + '"'+ "{'activatedBtn': selectedItemDlgPolitical == '9'}"+'"'+" ng-click=selectItemDlgPolitical('9')><p>Independent</p></a></div><div style='padding:2px;'></div><div class='button-bar'><a class='button button-outline button-dark item item-icon-bottom' ng-class=" + '"'+ "{'activatedBtn': selectedItemDlgPolitical == '10'}"+'"'+" ng-click=selectItemDlgPolitical('10')><p>Other</p></a><div class='empty-dialog-cell'></div><div class='empty-dialog-cell' style='border-left-width: 0px;'></div></div><a class='button button-full button-positive' ng-click='unlockSeletedPolitical($event)'>Save and unlock this filter</a><div align=center style='color: #387ef5' ng-click='closePopup1()'>No thanks; go back</div>",
       title: 'I consider myself:',
       cssClass: 'householdPopup-cls',
       scope: $scope
      });
  }
  
  $scope.itemSelectPolitical = function( curSeletedOptionPolitical ) {
    $scope.curSeletedOptionPolitical = curSeletedOptionPolitical;
    if( !$scope.filteringObj.political.all.unlocked ) {
      $scope.popup1 = $ionicPopup.show({
       template: '<div align=center><p>' + text.filters.fairness + 'Please tell us your political view to unlock this filter.</p><p>' + text.filters.privacy + '</p><p>' + text.filters.mayChange + '</p></div><a class="button button-full button-positive" ng-click="selDlgPolitical()">Yes, sounds good to me</a><div align=center style="color: #387ef5" ng-click="closePopup1()">No thanks; go back</div>',
       title: 'This filter is locked.',
       cssClass: 'householdPopup-cls',
       scope: $scope
      });
    } else {
      $scope.filteringObj.political[$scope.curSeletedOptionPolitical]['unlocked'] = !$scope.filteringObj.political[$scope.curSeletedOptionPolitical]['unlocked'];
    }
    $scope.changeFilterStrPolitical();
  }
  /* Political views end */

  /* Cultural origin start */
  $scope.boxStr = {};
  $scope.unlockCulturalOrigin = function($event) {
    //Input validation
    if ($scope.boxStr.culturalDlgbox === undefined || $scope.boxStr.culturalDlgbox.trim() == '') {
      $event.preventDefault();
      $scope.showAlert('Missing input', 'Please enter your cultural origin to continue.');
      return false;
    }

    //Accept input
    $scope.filteringObj.culturalOrigin.unlocked = true;
    user.demo.culturalOrigin = $scope.boxStr.culturalDlgbox;
    $scope.popup1.close();
  }
  $scope.selDlgCulturalbox = function() {
    $scope.popup1.close();
    $scope.popup1 = $ionicPopup.show({
       template: "<div><input type='text' ng-model='boxStr.culturalDlgbox' placeholder='Country you most identify with on culture'></div><a class='button button-full button-positive' ng-click='unlockCulturalOrigin($event)'>Save and unlock this filter</a><div align=center style='color: #387ef5' ng-click='closePopup1()'>No thanks; go back</div>",
       title: 'My cultural origin:',
       cssClass: 'householdPopup-cls',
       scope: $scope
      });
  }
  $scope.clickCulturalOriginbox = function() {
    if( $scope.filteringObj.culturalOrigin.unlocked ) {

    } else {
      $scope.popup1 = $ionicPopup.show({
       template: '<div align=center><p>' + text.filters.fairness + 'Please tell us your cultural origin to unlock this filter. This is the country whose culture and values you most identify with.</p><p>' + text.filters.privacy + '</p><p>' + text.filters.mayChange + '</p></div><a class="button button-full button-positive" ng-click="selDlgCulturalbox()">Yes, sounds good to me</a><div align=center style="color: #387ef5" ng-click="closePopup1()">No thanks; go back</div>',
       title: 'This filter is locked.',
       cssClass: 'householdPopup-cls',
       scope: $scope
      });
    }
  }
  /* Cultural origin end */

  /* Expertise start */
  $scope.expertiseData = {};
  $scope.expertiseData.expertise = 'all';
  if ($scope.expertiseData.expertise == "all") {
    $scope.expertiseData.checkedItemStrExpertise = "All respondents";
  }
  $scope.expertiseData.category = topicNameObj[$scope.question.category].toLowerCase();
 
  
  $scope.expertiseCheckClick = function( index ) {
    var varStr = 'sub_aud_'+index;
    if( $scope.expertiseData[varStr] != undefined ) {
      $scope.filteringObj.expertiseCat[varStr]['checked'] = $scope.expertiseData[varStr];
      var keysArr = _.keys($scope.filteringObj.expertiseCat); 
      var tmpStr = "";
      _.forEach(keysArr, function(value, index){
        if( value != 'id' ) {
          if( $scope.filteringObj.expertiseCat[value]['checked'] ) {
            if( tmpStr == "" ) {
              tmpStr = $scope.filteringObj.expertiseCat[value]['star'];
            } else {
              tmpStr = tmpStr+", "+$scope.filteringObj.expertiseCat[value]['star'];
            }
          }
        }
      });
      if( tmpStr == "" ) {
        $scope.expertiseData.checkedItemStrExpertise = "All audience";
      } else {
        $scope.expertiseData.checkedItemStrExpertise = tmpStr;
      }
    }
  }
 

  $scope.clickExpertiseRadio = function() {
    if( $scope.expertiseData.expertise == "all" ) {
      $scope.expertiseData.checkedItemStrExpertise = "All respondents";
      $scope.expertiseData['sub_aud_1'] = false, $scope.filteringObj.expertiseCat['sub_aud_1']['checked'] = false;
      $scope.expertiseData['sub_aud_2'] = false, $scope.filteringObj.expertiseCat['sub_aud_2']['checked'] = false;
      $scope.expertiseData['sub_aud_3'] = false, $scope.filteringObj.expertiseCat['sub_aud_3']['checked'] = false;
      $scope.expertiseData['sub_aud_4'] = false, $scope.filteringObj.expertiseCat['sub_aud_4']['checked'] = false;
      $scope.expertiseData['sub_aud_5'] = false, $scope.filteringObj.expertiseCat['sub_aud_5']['checked'] = false;
      $scope.expertiseData['sub_aud_6'] = false, $scope.filteringObj.expertiseCat['sub_aud_6']['checked'] = false;
    } 
  }
  /* Expertise end */

  /* Unregistered User start */
  $scope.data = {};
  $scope.changeUnregistereduserStr = function () {
    if( $scope.data.unregistereduser ) {
      return "Show";
    } else {
      return "hidden";
    }
  }
  $scope.unregistereduserCheck = function () {
    
  }
  /* Unregistered User end */

  /* Occupation start */
  $scope.boxStr = {};
  $scope.unlockOccupation = function($event) {
    //Input validation
    if ($scope.boxStr.occupationDlgbox === undefined || $scope.boxStr.occupationDlgbox.trim() == '') {
      $event.preventDefault();
      $scope.showAlert('Missing input', 'Please enter your occupation to continue.');
      return false;
    }

    //Accept input
    $scope.popup1.close();
    user.demo.occupation = $scope.boxStr.occupationDlgbox.trim();
    $scope.filteringObj.occupation.unlocked = true;
  }
  $scope.selDlgOccupationbox = function() {
    $scope.popup1.close();
    $scope.popup1 = $ionicPopup.show({
       template: "<div><input type='text' ng-model='boxStr.occupationDlgbox' placeholder='Enter your occupation'></div><a class='button button-full button-positive' ng-click='unlockOccupation($event)'>Save and unlock this filter</a><div align=center style='color: #387ef5' ng-click='closePopup1()'>No thanks; go back</div>",
       title: 'My occupation:',
       cssClass: 'householdPopup-cls',
       scope: $scope
      });
  }
  $scope.clickOccupationbox = function() {
    if( $scope.filteringObj.occupation.unlocked ) {

    } else {
      $scope.popup1 = $ionicPopup.show({
        template: '<div align=center><p>' + text.filters.fairness + 'Please tell us your occupation to unlock this filter.</p><p>' + text.filters.privacy + '</p><p>' + text.filters.mayChange + '</p></div><a class="button button-full button-positive" ng-click="selDlgOccupationbox()">Yes, sounds good to me</a><div align=center style="color: #387ef5" ng-click="closePopup1()">No thanks; go back</div>',
       title: 'This filter is locked.',
       cssClass: 'householdPopup-cls',
       scope: $scope
      });
    }
  }
  /* Occupation end */
});


/***************** Onboarding (all steps) *******************/
app.controller('OnboardingCtrl', function ($scope, $state, $rootScope, $ionicPopup, $ionicHistory, $ionicSlideBoxDelegate, $location, sessionService, $stateParams) {
  
  $scope.recordQuestion = function (target) {
    recordQuestion(target, $rootScope);
  }

  $scope.fbProfileImg = "img/user.svg";
  $scope.changeProfilePic = function( index ) {
    $("#fbProfileImgInputId").trigger("click");
  }
  $scope.resetFbPic = function() {
    $("#fbProfileImgId").attr("src", "img/user.svg")
  }

  $scope.toStars = function (v) {
    if (!v || v=="") {
      return null
    }
    if (v.endsWith("1")) {
      return "☆☆☆☆☆"
    }
    if (v.endsWith("2")) {
      return "★☆☆☆☆"
    }
    if (v.endsWith("3")) {
      return "★★☆☆☆"
    }
    if (v.endsWith("4")) {
      return "★★★☆☆"
    }
    if (v.endsWith("5")) {
      return "★★★★☆"
    }
    if (v.endsWith("6")) {
      return "★★★★★"
    }
  }

  $scope.moveToStep5 = function () {
    if ($scope.checkStarSelection()) {
      $location.path("onboarding/emails");
    }
  }

  $scope.checkStarSelection = function () {
    var fiveStar = 0;
    if ($scope.followdata.tech && $scope.data.cate1 && $scope.data.cate1.endsWith("6")) {
      fiveStar++;
      if (!$scope.data.rate1 || $scope.data.rate1.trim() == "") {
        $rootScope.showAlert("Error", "Please enter a short description for your 5-star rating in Technology. Example: Olympic gold medalist.");
        return false;
      }
    }
    if ($scope.followdata.sport && $scope.data.cate2 && $scope.data.cate2.endsWith("6")) {
      fiveStar++;
      if (!$scope.data.rate2 || $scope.data.rate2.trim() == "") {
        $rootScope.showAlert("Error", "Please enter a short description for your 5-star rating in Sports. Example: Olympic gold medalist.");
        return false;
      }
    }
    if ($scope.followdata.tv && $scope.data.cate3 && $scope.data.cate3.endsWith("6")) {
      fiveStar++;
      if (!$scope.data.rate3 || $scope.data.rate3.trim() == "") {
        $rootScope.showAlert("Error", "Please enter a short description for your 5-star rating in Tv. Example: Olympic gold medalist.");
        return false;
      }
    }
    if ($scope.followdata.movies && $scope.data.cate4 && $scope.data.cate4.endsWith("6")) {
      fiveStar++;
      if (!$scope.data.rate4 || $scope.data.rate4.trim() == "") {
        $rootScope.showAlert("Error", "Please enter a short description for your 5-star rating in Movies. Example: Olympic gold medalist.");
        return false;
      }
    }
    if ($scope.followdata.life && $scope.data.cate5 && $scope.data.cate5.endsWith("6")) {
      fiveStar++;
      if (!$scope.data.rate5 || $scope.data.rate5.trim() == "") {
        $rootScope.showAlert("Error", "Please enter a short description for your 5-star rating in Life. Example: Olympic gold medalist.");
        return false;
      }
    }
    if ($scope.followdata.work && $scope.data.cate6 && $scope.data.cate6.endsWith("6")) {
      fiveStar++;
      if (!$scope.data.rate6 || $scope.data.rate6.trim() == "") {
        $rootScope.showAlert("Error", "Please enter a short description for your 5-star rating in Work. Example: Olympic gold medalist.");
        return false;
      }
    }
    if ($scope.followdata.food && $scope.data.cate7 && $scope.data.cate7.endsWith("6")) {
      fiveStar++;
      if (!$scope.data.rate7 || $scope.data.rate7.trim() == "") {
        $rootScope.showAlert("Error", "Please enter a short description for your 5-star rating in Food. Example: Olympic gold medalist.");
        return false;
      }
    }
    if ($scope.followdata.best && $scope.data.cate8 && $scope.data.cate8.endsWith("6")) {
      fiveStar++;
      if (!$scope.data.rate8 || $scope.data.rate8.trim() == "") {
        $rootScope.showAlert("Error", "Please enter a short description for your 5-star rating in Best. Example: Olympic gold medalist.");
        return false;
      }
    }

    var fourStar = 0;
    if ($scope.followdata.tech && $scope.data.cate1 && $scope.data.cate1.endsWith("5")) {
      fourStar++;
    }
    if ($scope.followdata.sport && $scope.data.cate2 && $scope.data.cate2.endsWith("5")) {
      fourStar++;
    }
    if ($scope.followdata.tv && $scope.data.cate3 && $scope.data.cate3.endsWith("5")) {
      fourStar++;
    }
    if ($scope.followdata.movies && $scope.data.cate4 && $scope.data.cate4.endsWith("5")) {
      fourStar++;
    }
    if ($scope.followdata.life && $scope.data.cate5 && $scope.data.cate5.endsWith("5")) {
      fourStar++;
    }
    if ($scope.followdata.work && $scope.data.cate6 && $scope.data.cate6.endsWith("5")) {
      fourStar++;
    }
    if ($scope.followdata.food && $scope.data.cate7 && $scope.data.cate7.endsWith("5")) {
      fourStar++;
    }
    if ($scope.followdata.best && $scope.data.cate8 && $scope.data.cate8.endsWith("5")) {
      fourStar++;
    }

    if (fiveStar > 1 || fourStar > 2) {
      $rootScope.showAlert("Error", "To make 4- and 5-star ratings more believable for everyone, there is a maximum limit of one 5-star and two 4-stars per person. Please change your star ratings to be within this limit.");
      return false;
    }

    return true;
  }

  $scope.skip = function() {
    $ionicSlideBoxDelegate.next();
  };

  $scope.onboardingTopics = $location.path() != "/topics";

  $scope.next = function() {
    if( $scope.slideIndex == 8 ) {
      $location.path("onboarding/topics_and_expertise");
    } else {
      $ionicSlideBoxDelegate.next();
    }
  };

  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };
  
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
    if( $scope.slideIndex == 8 ) {
      $scope.nextStr = "Next: Follow Topics";
    } else {
      $scope.nextStr = "Next";
    }
  };
  $scope.slideChangedQuesFeedDlg = function(index) {
    $scope.slideIndex = index;
    if( $scope.slideIndex == 8 ) {
      $scope.nextStr = "Next: Follow Topics";
    } else {
      $scope.nextStr = "Next";
    }
  };

  if( $scope.slideIndex == undefined )
    $scope.slideIndex = 0;
  $scope.nextStr = "Next";

  $scope.disableSwipe = function() {
    $ionicSlideBoxDelegate.enableSlide(false);
  };

  $scope.gender = {};
  $scope.country = {};
  $scope.location = {
    city: "",
    state: "",
    zip: ""
  }
  $scope.ethnicity = {};
  $scope.relationship = {};
  $scope.children = {};
  $scope.religion = {};
  $scope.political = {};
  $scope.income = {};
  $scope.birthday = {
    value: new Date()
  };
  $scope.household = {};
  $scope.occupation = {
    value: ''
  };
  $scope.data = {};
  $scope.missionQues = missionQues;
  $scope.topicNameObj = topicNameObj;
  $scope.featuredQuestID = 1;

  $scope.registered = $location.search().registered;
  $scope.topic = $location.search().topic;

  $scope.topicName = topicNameObj[$scope.topic];
  
  $scope.selGender = function( item ) {
    $scope.gender.curSel = item;
    user.demo.gender = item;
  }
  $scope.selCountry = function( item ) {
    $scope.country.curSel = item;
    user.demo.country = item;
  }
  $scope.selEthnicity = function( item ) {
    $scope.ethnicity[item] = !$scope.ethnicity[item];
    user.demo.ethnicities = $scope.ethnicity;
  }
  $scope.selRelationship = function( item ) {
    $scope.relationship.curSel = item;
    user.demo.relationshipStatus = item;
  }
  $scope.selChildren = function( item ) {
    $scope.children.curSel = item;
  }
  $scope.selReligion = function( item ) {
    $scope.religion.curSel = item;
  }
  $scope.selPolitical = function( item ) {
    $scope.political.curSel = item;
    user.demo.political = item;
  }
  $scope.onBirthdayChange = function() {
    user.demo.birthday = $scope.birthday;
  }
  $scope.onLocationChange = function() {
    user.demo.stateProvince = $scope.location.state;
    user.demo.city = $scope.location.city;
  }
  $scope.onOccupationChange = function() {
    user.demo.occupation = $scope.occupation.value;
  }
  $scope.selHousehold = function( item ) {
    $scope.household.curSel = item; 
    user.demo.household = item;
  }

  $scope.selCate = function (item, skipChecks) {
    if (!skipChecks && !$scope.checkStarSelection()) {
      return
    }
    var state = !$scope.data[item];
    $scope.data['tech'] = false;
    $scope.data['sport'] = false;
    $scope.data['tv'] = false;
    $scope.data['movies'] = false;
    $scope.data['life'] = false;
    $scope.data['work'] = false;
    $scope.data['food'] = false;
    $scope.data['best'] = false

    $scope.data[item] = state;
  }

  $scope.followCate = function (item) {

    $scope.data['tech'] = false;
    $scope.data['sport'] = false;
    $scope.data['tv'] = false;
    $scope.data['movies'] = false;
    $scope.data['life'] = false;
    $scope.data['work'] = false;
    $scope.data['food'] = false;
    $scope.data['best'] = false

    $rootScope.followdata[item] = !$rootScope.followdata[item];
    $scope.data[item] = $rootScope.followdata[item];
    if( $rootScope.followdata[item] ) {
      if( _.isUndefined($rootScope.followingTopics) )
        $rootScope.followingTopics = [];
      $rootScope.followingTopics.push(item);
    } else {
      var tmpArr = [];
      _.forEach($rootScope.followingTopics, function(val, index){
        if( val != item )
          tmpArr.push(val);
      });
      $rootScope.followingTopics = tmpArr;
    }
  }

  if (topicTempFollow[$scope.topic])
    $scope.topicFollowingStr = "Following";
  else
    $scope.topicFollowingStr = "Follow";

  if (_.isUndefined($rootScope.followdata)) {
    $rootScope.followdata = {};
  }

  $scope.followTopic = function () {
    if ($scope.topicFollowingStr == "Follow") {
      $scope.topicFollowingStr = "Following";
    } else {
      $scope.topicFollowingStr = "Follow";
    }
  }

  $scope.quesFeedDlgClose = function() {
    $scope.question_feed_dlg_closed = true;    
  }

  var tmpQueArr = [];
  _.forEach(missionQues, function(val, index){
    if (val.category == $scope.topic) {
      tmpQueArr.push(val);
    }
  });

  $scope.filteredMissionQues = tmpQueArr;
  $scope.filteredQuestionsForMe = [];
  for (var i = 0; i < questions.length; i++) {
    if (questions[i].recommend_reason && questions[i].recommend_reason.match(/^.+/)) {
      $scope.filteredQuestionsForMe.push(questions[i]);
    }
  }
  

  $scope.loadMoreData = function() {
    var i = 0;
    _.forEach($scope.filteredQuestionsForMe, function (val, ind) {
      $scope.filteredQuestionsForMe.push(val);
      i++;
      if( i == 8 ) 
        return false;
    });
    $scope.$broadcast('scroll.infiniteScrollComplete');
  };

  $scope.loadMoreData1 = function() {
    var i = 0;
    _.forEach($scope.filteredMissionQues, function (val, ind) {
      $scope.filteredMissionQues.push(val);
      i++;
      if( i == 5 ) 
        return false;
    });
    $scope.$broadcast('scroll.infiniteScrollComplete');
  };

  $scope.filterQuestionsForMe = function (element) {
    return element.recommend_reason && element.recommend_reason.match(/^.+/) ? true : false;
  };

  $scope.loginWithFacebook = function () {
    sessionService.store("isDemo", false);
    $scope.isDemo = false;
    $rootScope.isDemo = false;
    $rootScope.newQuestion = {};
    $rootScope.askingTitle = $rootScope.askingTitle;
    $rootScope.askingDesc = $rootScope.askingDesc;
    $scope.question = {};
    $scope.askObj = {};
    $rootScope.askingTitle = "";
    $rootScope.askingDesc = "";
    $rootScope.$broadcast("logIn", true);
    $location.path($stateParams.next_step);
  }

});

/***************** About *******************/
app.controller('AboutCtrl', function($scope, $state, $rootScope, $ionicPopup, $ionicHistory){
  
});

/***************** LogIn *******************/
app.controller('LogInCtrl', function ($scope, $state, $rootScope, $ionicPopup, $ionicHistory) {

});
