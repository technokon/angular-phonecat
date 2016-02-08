'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['Phone',
  function(Phone) {
    var vm  = this;

    Phone.query().$promise.then(function(data){
      vm.phones = data;
    }).catch(function(error){
      console.log(error);
    });

    vm.orderProp = 'age';

  }]);

phonecatControllers.controller('PhoneDetailCtrl', ['$routeParams', '$location', 'Phone',
  function($routeParams, $location, Phone) {
    var vm = this;

    Phone.get({phoneId: $routeParams.phoneId}).
    $promise.then(function(data){
        vm.phone = data;
        vm.mainImageUrl = data.images[0];
      }).catch(function(error){
        console.log(error);
      });

    vm.setImage = function(imageUrl) {
      vm.mainImageUrl = imageUrl;
    };

    vm.listPage = function listPage(){
       $location.path('/phones');
    };
  }]);
