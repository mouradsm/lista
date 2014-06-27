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
            if(typeof(item) != 'undefined'){
                if(item.disponivel == true){
                    $scope.selectedItens.push(item);
                    $scope.updateItemDisponibilidade(item, false);
                }
            }
        }

        $scope.removeItemLista = function(id){
           var item = getById($scope.Itens, id);
           if(item){
            $scope.selectedItens.shift(item);
            $scope.updateItemDisponibilidade(item, true);
        }


        $scope.submitForm = function(isValid){
            if(isValid && ($scope.selectedItens.length == 0))
                alert('Aqui tá marotão')



        };
    }

    $scope.updateItemDisponibilidade = function(itemToUpdate, newDisponibilidade){
        if(itemToUpdate)
            itemToUpdate.disponivel = newDisponibilidade;
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



