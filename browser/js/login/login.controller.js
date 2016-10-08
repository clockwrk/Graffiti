app.controller('LoginCtrl', function ($scope, AuthService, $state) {

    $scope.login = {};
    $scope.error = null;

    $scope.sendLogin = function (loginInfo) {

        $scope.error = null;

        AuthService.login(loginInfo).then(function () {
            $state.go('home');
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });
    };
    //
    // $scope.sendSignUp = function (signUpInfo) {
    //
    //     $scope.error = null;
    //
    //     AuthService.signUp(signUpInfo.userName, signUpInfo.email, signUpInfo.password)
    //     $state.go('home');
    //
    // };
});
