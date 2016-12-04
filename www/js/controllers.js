angular.module('starter.controllers', [])
  .controller('LoginCtrl', LoginCtrl)
  .controller('ProjectsCtrl', ProjectsCtrl);

LoginCtrl.$inject = ['$http', '$state'];
ProjectsCtrl.$inject = ['$http', '$state'];

function LoginCtrl($http, $state) {
  var vm = this;
  vm.title = 'Login';
  vm.user = {};

  vm.handleLogin = function() {
    if(!!vm.user.name && !!vm.user.password){
      vm.login(vm.user);
    } else {
      alert('Username/password is missing')
    }
  }

  vm.login = function() {
    // test credentials
    if(vm.user.name === 'user' && vm.user.password === 'password'){
      $state.go('projects');
      vm.user = {};
    } else {
      vm.user.password = '';
      alert('Username/password incorrect');
    }
  }
}

function ProjectsCtrl($http, $state) {
  var vm = this;
  vm.title = 'Projects'
}
