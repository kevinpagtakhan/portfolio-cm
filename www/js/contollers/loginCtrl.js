angular.module('starter')
  .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['$http', '$state'];

function LoginCtrl($http, $state) {
  var vm = this;

  console.log('hello');
}
