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
            var itensMensagem = '';
            if (isValid){
                if(itens.length != []){
                    for(var i=0;i < itens.length; i++){
                        itensMensagem += ', ' +itens[i].desc;
                        putIten(itens[i]._id, $scope.email);
                    }
                    

                var mensagem = "Obrigado, você escolheu: " + itensMensagem;
                    enviarMensagem('ericaediego@ericaediego.com.br', $scope.email, 'Obrigado!', mensagem);

                    limpaTudo();
                    alert('Seus presentes foram Escolhidos com sucesso!, Obrigado!!');
                }else{
                    alert('Selecione ao menos um presente para continuar =)')
                }
            }
        }

        $scope.submitFormDuvidas = function(isValid){
            if(isValid){
                var origem      = 'ericaediego@ericaediego.com.br';
                var destino     = 'diegosouza20049@hotmail.com';
                var assunto     = 'Duvidas ' + $scope.nomeDuvida;
                var mensagem    = $scope.mensagemDuvida + ' ' + $scope.emailDuvida;
                
                enviarMensagem(origem, destino, assunto, mensagem); 

                limpaTudo();
                alert('Mensagem Enviada com Sucesso!')
            }
        }

        //load from JsonFile
        $http({
            method: 'GET',
             url: 'http://hidden-refuge-3353.herokuapp.com/api/lista/'
             //url: 'http://localhost:5000/api/lista'            
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

                //url: 'http://localhost:5000/api/email/'+origem+'/'
                //+ destino +'/'+ assunto +'/'+ mensagem


            }).success(function(){
                              
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