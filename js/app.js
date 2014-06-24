(function(){
    var app = angular.module('lista',[]);
    var JsonFile = 'Panela.json' //caminho do arquivo json

    function getById(arr, id){
        for(var i = 0; i < arr.length; i++){
            var result = arr[i];
            if(result.id === id){
                return result;
            }
        }
    }

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
        $scope.selectedItens = [];
        $scope.selectedItem = "";

        $scope.addItemLista = function(id){
            var item = getById($scope.Itens, id);
                $scope.selectedItens.push(item);
                $scope.updateItemStatus(item, 0);
        }

        $scope.updateItemStatus = function(itemToUpdate, newStatus){
            if(itemToUpdate)
                itemToUpdate.status = newStatus;
        }





        //load from JsonFile
        $http({
           method   : 'GET',
           url      : JsonFile
        }).success(function(result){
           $scope.Itens = result;
        })

    });
})();

