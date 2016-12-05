angular.module('starter.controllers', [])
  .controller('LoginCtrl', LoginCtrl)
  .controller('ProjectsCtrl', ProjectsCtrl);

LoginCtrl.$inject = ['$http', '$state'];
ProjectsCtrl.$inject = ['$http', '$state'];

function LoginCtrl($http, $state) {
  var vm = this;
  vm.title = 'Login';
  vm.user = {};

  localStorage.removeItem('token');

  vm.handleLogin = function() {
    if(!!vm.user.username && !!vm.user.password){
      vm.login(vm.user);
    } else {
      alert('Username/password is missing');
    }
  }

  vm.login = function() {
    $http.post('http://localhost:3000/api/auth/login', vm.user)
      .then(function success(data) {
        if(data.data.success) {
          localStorage.setItem('token', data.data.data);
          vm.user = {};
          $state.go('projects');
        } else {
          localStorage.removeItem('token');
          alert('Incorrect username/password');
          vm.user.password = '';
        }
      }, function failure(data) {
        localStorage.removeItem('token');
        alert('An error has occurred');
      });
  }
}

function ProjectsCtrl($http, $state) {
  var vm = this;
  vm.title = 'Projects';

  $http.get('')
    .then(function(data){
      vm.projects = data.data.data;
    });

   vm.handleToggle = function(id, status) {
    $http.patch('' + id, { active: status })
      .then(function(data){

        vm.projects = vm.projects.map(function(p){
          if(p._id == id){
            return data.data.data;
          } else {
            return p;
          }
        })
      }, function(){
        vm.projects = vm.projects.map(function(p){
          if(p._id == id){
            p.active = !p.active;
            return p;
          } else {
            return p;
          }
        })
      });
  }
}
