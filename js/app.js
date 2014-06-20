(function(){
    var app = angular.module('lista',[]);

    app.controller('TabController', function(){

        this.tab = 1;

        this.setTab = function(setTab){
          this.tab = setTab;
        };

        this.isSet = function(checkTab){
            return this.tab === checkTab;
        };
    });

    app.controller('SelectController', function($scope, $http){

        $scope.Itens = [];
        $scope.selectedItem = "02";

        $http({
           method   : 'GET',
           url      : 'Panela.json'


        }).success(function(result){
           $scope.Itens = result;
        });
    });
})();

