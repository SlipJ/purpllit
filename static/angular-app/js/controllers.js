/* Controllers */

var linksControllers = angular.module('linksControllers', []);

linksControllers.controller('linksListCtrl', ['$scope', 'Link',
    function($scope, Link){
        $scope.links = Link.query();
        $scope.user = 'Purple User';

        $scope.linkVote = function(link, vote){
            //button not clicked yet
            if(!link.voted)
            {
                link.voted = 1;
                link.votes += parseInt(vote);
                if(vote == 1){
                    link.voted_up = 1;
                }
                else{
                    link.voted_up = 0;
                };
            }
            //button already clicked
            else {
                link.votes -= parseInt(vote);
                link.voted = 0;
                link.voted_up = 0;
            }
        };

        $scope.addLink = function(obj)
        {
            var d = new Date();
            var newLink = {
                title: obj.title,
                link: obj.link,
                votes: 0,
                datetime: d.toLocaleString(),
                username: $scope.username,
                voted: 0,
                voted_up: 0
            };
            $scope.links.push(newLink);
            $scope.obj = {}
        };


        $scope.changeUsername = function (username){
            if (!/^\w+$/.test(username)){
                alert("Only alphanumerical characters allowed");
                return
            }
            for (var i=0; i< $scope.links.length; i++){
                if ($scope.links[i].username == $scope.user){
                    $scope.links[i].username = username;
                }
            }
            $scope.user = username;

        };

        $scope.hideUserChangeForm = function(){$scope.change=0};
        $scope.showUserChangeForm = function(){$scope.change=1};

        $scope.orderProp = 'datetime';
    }]);