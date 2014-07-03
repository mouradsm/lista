(function() {
    var app = angular.module('lista', []);
    var JsonFile = 'Panela.json' //caminho do arquivo json

    function getById(arr, id) {
        for (var i = 0; i < arr.length; i++) {
            var result = arr[i];
            if (result._id === id) {
                return result;
            }
        }
    }

    app.controller('TabController', function() {

        this.tab = 1;

        this.setTab = function(setTab) {
            this.tab = setTab;
        };

        this.isSet = function(checkTab) {
            return this.tab === checkTab;
        };
    });

    app.controller('SelectController', function($scope, $http) {

        $scope.Itens = [];
        $scope.selectedItens = [];
        $scope.selectedItem = "";

        $scope.addItemLista = function(id, e) {
            e.preventDefault();
            var item = getById($scope.Itens, id);
            if (typeof(item) != 'undefined') {
                if (item.disponivel == true) {
                    $scope.selectedItens.push(item);
                    $scope.updateItemDisponibilidade(item, false);
                }
            }
        }

        $scope.removeItemLista = function(id, e) {
            e.preventDefault();
            var item = getById($scope.Itens, id);
            if (item) {
                $scope.selectedItens.shift(item);
                $scope.updateItemDisponibilidade(item, true);
            }
        }

        $scope.updateItemDisponibilidade = function(itemToUpdate, newDisponibilidade) {
            if (itemToUpdate)
                itemToUpdate.disponivel = newDisponibilidade;
        }

        $scope.submitFormPresentes = function(isValid) {
            var itens = $scope.selectedItens;
            if (isValid){
                if(itens.length != []){
                    for(var i=0;i < itens.length; i++){
                        putIten(itens[i]._id, $scope.email);
                    }
                    limpaTudo();
                    alert('Seus presentes foram Salvos com sucesso!, Obrigado!!')
                }else{
                    alert('Selecione ao menos um presente =)')
                }
            }
        }

        $scope.submitFormDuvidas = function(isValid){
            if(isValid){
                var origem      = $scope.emailDuvida;
                var destino     = 'ericaediego@ericaediego.com.br, diegosouza20049@hotmail.com';
                var assunto     = 'Duvidas ' + $scope.nomeDuvida;
                var mensagem    = $scope.mensagemDuvida;
                
                enviarMensagem(origem, destino, assunto, mensagem)


            }
        }

        //load from JsonFile
        $http({
            method: 'GET',
             url: 'http://hidden-refuge-3353.herokuapp.com/api/lista/'
            // url: 'http://localhost:5000/api/lista'            
        }).success(function(result) {
            $scope.Itens = result;
        })

        function putIten(id, email){
            $http({
                 method: 'PUT',
                 url: 'http://hidden-refuge-3353.herokuapp.com/api/lista/'+id+'/'+email
               //url: 'http://localhost:5000/api/lista/'+id+'/'+email
             }).success(function(message){
                message = "Atualizado com sucesso!";
             });

        }

        function enviarMensagem(origem, destino, assunto, mensagem){

            $http({
                method: 'POST',
                url: 'http://hidden-refuge-3353.herokuapp.com/api/email/'+origem+'/'
                + destino +'/'+ assunto +'/'+ mensagem
            }).success(function(){
                alert('Mensagem Enviada!');                
            });
        }

        function limpaTudo(){
            $scope.nome             = '';
            $scope.email            = '';
            $scope.selectedItens    = [];
            $scope.emailDuvida      = '';
            $scope.mensagemDuvida   = '';
            $scope.nomeDuvida       = '';
        }

    });

})();