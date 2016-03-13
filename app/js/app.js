'use strict';

/* App Module */

var phonecatApp = angular.module('phonecatApp', [
  'ngRoute',
  'phonecatAnimations',

  'phonecatControllers',
  'phonecatFilters',
  'phonecatServices',
  'ngFileUpload'
]);

// lodash support
phonecatApp.constant('_', window._);

phonecatApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/phones', {
        templateUrl: 'partials/phone-list.html',
        controller: 'PhoneListCtrl',
        controllerAs: 'phListCtrl'
      }).
      when('/phones/:phoneId', {
        templateUrl: 'partials/phone-detail.html',
        controller: 'PhoneDetailCtrl',
        controllerAs: 'phDetCtrl'
      }).
      when('/newPhone', {
        templateUrl: 'partials/phone-form.html',
        controller: 'NewPhoneCtrl',
        controllerAs: 'vm'
      }).
      otherwise({
        redirectTo: '/phones'
      });
  }]);
