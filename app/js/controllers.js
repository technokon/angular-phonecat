'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$location', 'Phone',
  function($location, Phone) {
    var vm  = this;

    Phone.query().
      $promise.then(setAllPhones).
      catch(function(error){
        logError('Phone.query()',error);});

    vm.orderProp = 'age';

    vm.addPhone = function addPhone(){
      $location.path('/newPhone');
    };

    function setAllPhones(data){
      vm.phones = data;
    }

  }]);


phonecatControllers.controller('PhoneDetailCtrl', ['$routeParams', '$location', 'Phone',
  function($routeParams, $location, Phone) {
    var vm = this;

    Phone.get({phoneId: $routeParams.phoneId}).
      $promise.then(setPhoneData).
      catch(function(error){
        logError('Phone.get{phoneId: ' + $routeParams.phoneId + '}}',error);});

    vm.setImage = function(imageUrl) {
      vm.mainImageUrl = imageUrl;
    };

    function setPhoneData(data){
      vm.phone = data;
      vm.mainImageUrl = data.images[0];
    }

    vm.listPage = function listPage(){
       $location.path('/phones');
    };

  }]);


phonecatControllers.controller('NewPhoneCtrl', ['$routeParams', '$location', '$timeout', '_', 'Phone', 'Upload',
  function($routeParams, $location, $timeout, _, Phone, Upload) {
    var vm = this;

    vm.phone = initPhone(); // empty phone object

    vm.savePhone = function savePhone(){
      // Save the phone as new JSON file
    };

    vm.pushItem = function pushItem(array, element) {
      if (element && !!!~array.indexOf(element)) {
        array.push(element);
      }
    };

    vm.pullItem = function pullItem(array, element) {
      _.pull(array, element);
    };

    vm.cancel = function onCancel() {
      $location.path('/phones');;
    };

    vm.uploadFiles = function (files) {
      vm.showProgress  = false;
      vm.progress = 0;
      vm.files = files;
      if (files && files.length) {
        vm.uploadP = Upload.upload({
          url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
          data: {
            files: files
          }
        });

        vm.uploadP.then(function (response) {
          $timeout(function () {
            vm.result = response.data;
          });
        }, function (response) {
          if (response.status > 0) {
            vm.errorMsg = response.status + ': ' + response.data;
          }
          vm.progress = null;
          vm.files = null;
          vm.showProgress  = false;
        }, function (evt) {
          vm.progress =
              Math.min(100, parseInt(100.0 * evt.loaded / evt.total));

          vm.showProgress = vm.progress > 0 && vm.progress < 100;
        });
      }
    };

    vm.abortUploading = function abortUploading(){
      if (vm.uploadP){
        vm.uploadP.abort(); // abort uploading
        console.log("aborting upload...");
      }
    };

    function initPhone(){
      return {
        "availability": [],
        "camera": {
          "features": [],
          "primary": ""
        },
        "sizeAndWeight": {
          "dimensions": [],
          "weight": ""
        }
      };
    }

  }]);


function logError(errorSrc, error){
  console.log(errorSrc + ": " + error);
}
