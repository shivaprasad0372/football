var angularApp = angular.module('footballApp', ['ngResource','ngRoute']);

angularApp.config(function ($routeProvider) {
  $routeProvider
  .when ('/', {
    templateUrl: 'pages/landing.html',
    controller: 'HomeController',
    controllerAs: 'vh'
  })

  .when ('/leaguedetails/:uniqId', {
    templateUrl: 'pages/details.html',
    controller: 'DetailsController',
    controllerAs: 'dc'
  })


.when ('/playersdetails', {
  templateUrl: 'pages/players.html',
  controller: 'PlayersController',
  controllerAs: 'pc'
})
//
});



angularApp.config(['$httpProvider', function ($httpProvider) {
   $httpProvider.defaults.headers.common['X-Auth-Token'] = 'af86c338f9014ef3bae9c0d3e246961a';
}]);


angularApp.controller("HomeController",['$resource','$filter', '$http','$q',function($resource,$filter,$http,$q){
  var vm=this;
    var footballResource = $resource('http://api.football-data.org/v1/soccerseasons/');
    vm.footballResponse = footballResource.query();
    console.log(vm.footballResponse);

    // $http.get("http://api.football-data.org/v1/soccerseasons/")
    //     .then(function(response){
    //       if (typeof response.data === 'object') {
    //                         vm.footballResponse = response.data;
    //                     } else {
    //                         return $q.reject(response.data);
    //                     }},
    //         function(response) {
    //           return $q.reject(response.data);
    //                     });






}]);


angularApp.controller("DetailsController",['$filter','$routeParams','$location','$rootScope','FootballService','playerService',function($filter,$routeParams,$location,$rootScope,FootballService,playerService){
    var vm=this;

      // console.log(data);
      //   $rootScope.teamPlayer = data.href;
      //   $location.url('/teamdetails');


    var id = $routeParams.uniqId;
    vm.detailsResponse = FootballService.getTeams(id);
    vm.pointsResponse = FootballService.getPoints(id);
    vm.teamPlayers = function(data){
      playerService.api = data;
    }

    console.log(vm.detailsResponse);
    console.log(vm.pointsResponse);

  }]);


    angularApp.controller("PlayersController",['$resource','$filter','playerService',function($resource,$filter,playerService){

      // var vm = this;
      // var url = $rootScope.teamPlayer;
      // function getTeamPlayers(){
      //   vm.players = FootballService.getTeamdetails(url);
      // }
      // getTeamPlayers();

      var vm = this;
        vm.getApi =  playerService.api;
         vm.getFixt = $resource(vm.getApi+'/fixtures').get();
        console.log(vm.getFixt);
        vm.getPlayers = $resource(vm.getApi+'/players').get();
        console.log(vm.getPlayers);


}]);




angularApp.service('FootballService', function($resource) {
  var vm =this;
    vm.getTeams = function (id) {
      var footballDetails = $resource('http://api.football-data.org/v1/soccerseasons/' + id + '/teams');
      vm.detailsResponse = footballDetails.get();
      return vm.detailsResponse;
    }

    vm.getPoints = function(id) {
      var footballDetails = $resource('http://api.football-data.org/v1/soccerseasons/' + id + '/leagueTable');
      vm.pointsResponse = footballDetails.get();
      return vm.pointsResponse;
    }

    vm.getTeamdetails = function(url) {
      var teamDetails = $resource(url);
      vm.teamsResponse = teamDetails.get();
      return vm.teamsResponse;
    }

    // vm.playerDetails = function(){
    //   var vm= this;
    //   vm.api = '';
    // }

});

angularApp.service('playerService',function(){
var vm= this;
vm.api = '';
});
