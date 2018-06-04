  
        var cururl = window.location.origin;
        var socket = io(cururl, { forceNew: true });

        var app = angular.module('myApp', []);
        app.directive("forgotPassword", function ($rootScope, $http) {
            return {
                // templateurl:  '<div>A Custom Directive <br> <b ng-show="directiveCtrlCalled">directiveCtrl() was called!!</b> </div>',
                templateUrl: "/admin/ngViews/forgotpassword.html",
                //templateUrl: "/login/public/views/forgotpassword.html",
                restrict: "E",
                replace: true,
                scope: { options: "=" },
                link: function (scope) {
                    scope.directiveCtrlCalled = false;
                    var UserInfo;
                    scope.sendotp = function () {
                        scope.validateotp();
                    }
                    scope.$on("UserInfo", function (evt, data) {
                        UserInfo = data;
                    });
                    scope.$on("loginshow", function (evt, data) {
                        scope.directiveCtrlCalled = false;
                        scope.createNewPassword = false;
                    });
                    angular.extend(scope.options, {
                        directiveFunction: function () {
                            scope.directiveCtrlCalled = true;
                            scope.emailid = UserInfo.email;
                            var res = UserInfo.email.split("@");
                            var email = '';
                            angular.forEach(res[1], function (value, key) {
                                email += 'x';
                            });
                            scope.eemailid = res[0] + '@' + email;
                            $rootScope.$broadcast('Email', scope.eemailid);
                        }
                    });
                    scope.cancelforgotpass = function () {
                        $rootScope.$broadcast('forgotcancel', true);
                    }
                    scope.$on("forgotcancel", function (evt, data) {                        
                        scope.directiveCtrlCalled = false;                       
                    }); 
                    scope.reset = function () {
                        scope.otpform.$setPristine();
                        scope.eemailid = '';
                        scope.emailid = '';
                    }
                    scope.validateotp = function () {
                        try {

                            if (scope.emailid) {
                                if (typeof (scope.emailid) == "undefined") {
                                    alert("Please Fill Email Id");
                                    return;
                                }
                            }

                            $http.post("/sendmail", { "EmailId": scope.emailid, "UserId": UserInfo.userid })
                                .then(function (response) {
                                    if (response.data == 'sucsess') {
                                        scope.directiveCtrlCalled = false;
                                        scope.createNewPassword = true;
                                        $rootScope.$broadcast('UserInfo1', UserInfo);
                                        alert('Verification Mail Send Sucsessfully')
                                    }
                                    else { alert('Verification Mail  Send Fail') }

                                });
                        } catch (e) {
                            return false;
                        }
                    }
                }
            };
        });
        app.directive("createNewPassword", function ($rootScope, $http) {
            return {
                // templateurl:  '<div>A Custom Directive <br> <b ng-show="directiveCtrlCalled">directiveCtrl() was called!!</b> </div>',
                templateUrl: "/admin/ngViews/createNewPassword.html",
                //templateUrl: "/login/public/views/createNewPassword.html",
                restrict: "E",
                replace: true,
                scope: { options: "&" },
                link: function (scope, elements, attributes) {
                    var UserInfo;
                    scope.createNewPassword = false;
                    scope.$on("UserInfo1", function (evt, data) {
                        UserInfo = data;
                        scope.cemailid = UserInfo.email;
                    });
                    scope.$on("Email", function (evt, data) {
                        scope.reset();
                        scope.ceemailid = data;
                    });
                    scope.resendotp = function () {
                        scope.validateresendotp();
                    }
                    scope.changepassword = function () {
                        scope.changepasswordsubmit();
                    }
                    angular.extend(scope.options, {
                        directiveFunction: function () {

                        }
                    });
                    scope.reset = function () {
                        scope.changepassform.$setPristine();
                        scope.cemailid = '';
                        scope.ceemailid = '';
                        scope.cpassword = '';
                        scope.conpassword = '';
                        scope.otp = '';
                    }
                    scope.validateresendotp = function () {
                        try {

                            if (scope.cemailid) {
                                if (typeof (scope.cemailid) == "undefined") {
                                    alert("Please Fill Email Id");
                                    return;
                                }
                            }

                            $http.post("/sendmail", { "EmailId": scope.cemailid, "UserId": UserInfo.userid })
                                .then(function (response) {
                                    if (response.data == 'sucsess') {
                                        //$rootScope.$broadcast('UserInfo1', UserInfo);
                                        alert('Verification Mail Re Send Sucsessful')
                                    }
                                    else { alert('Verification Mail Re Send Fail') }

                                });
                        } catch (e) {
                            return false;
                        }
                    }
                    scope.cancelmail = function () {
                        $rootScope.$broadcast('loginshow', true);
                    }
                    scope.changepasswordsubmit = function () {
                        try {
                            $http.post("/resetpassword", { "EmailId": scope.cemailid, "UserId": UserInfo.userid, "password": scope.conpassword, "OtpCode": scope.otp })
                                .then(function (response) {
                                    if (response.data.toString() == 'sucsess') {
                                        $rootScope.$broadcast('loginshow', true);
                                        alert('Reset Password Sucsessful');
                                        //window.location.reload();
                                    }
                                    else if (response.data.toString() == 'Expire') {
                                        alert('OTP Is Expired');
                                    }
                                    else { alert('Reset Password Fail') }

                                });
                        } catch (e) {
                            return false;
                        }
                    }
                }
            };
        });
        app.controller('myCtrl', function ($scope, $http, $log, $rootScope) {
            $scope.dirOptions = {};
            $scope.callDirFunc = function () {
                if (typeof ($scope.userid) == 'undefined' || $scope.userid == '') {
                    $scope.msg = 'UserId is Required';
                    return false;
                }
                $scope.forgote = false;
                $scope.dirOptions.directiveFunction();
                $scope.loginshow = false;
            };
            $scope.$on("loginshow", function (evt, data) {
                UserInfo = data;
                $scope.loginshow = UserInfo;
            });
            $scope.$on("forgotcancel", function (evt, data) {

                $scope.loginshow = true;
            });
            $scope.loginshow = true;
            $scope.isloginDisable = true;
            $scope.isMultirole = false;
            $scope.clusters = [];
            $scope.usercluster = "";
            $scope.lastlogin = "";
            $scope.forgote = false;
            $scope.Validate = function () {
                try {

                    if ($scope.isMultirole) {
                        if (typeof ($scope.selectedrole) == "undefined") {
                            alert("Please select role");
                            $("#userrole").focus();
                            return;
                        }
                    }

                    $http.post("/validate", { "userid": $scope.userid, "pass": $scope.pass })
                        .then(function (response) {
                            debugger;
                            $log.info(response);
                            if (response.data == "1" || response.data == "2") {
                                alert("Invalid password");
                                $("#pass").focus();
                                return false;
                            }
                            else if (response.data == "3") {
                                alert("Another User is already logged In, kindly close the current session or use another browser.");
                                return false;
                            }
                            else {
                                document.getElementById('roleid').value = $scope.selectedrole.Roleid;
                                document.getElementById('rolename').value = $scope.selectedrole.Rolename;
                                $("#loginForm").submit();
                                socket.emit('connecteduser', $scope.userid, $scope.usercluster, $scope.lastlogin);
                            }
                        });
                } catch (e) {
                    return false;
                }
            }

            $scope.GetUserRole = function () {
                try {

                    if (typeof ($scope.userid) != "undefined") {
                        $scope.msg = '';
                        $http.post("/FetchUserInfo", { "userid": $scope.userid })
                            .then(function (response) {
                                if (response.data == "1" || response.data == "2") {
                                    alert("Invalid user id");
                                    return false;
                                }
                                else {
                                    $rootScope.$broadcast('UserInfo', response.data[0]);
                                    $scope.forgote = true;
                                    $scope.lastlogin = response.data[0].lastlogin;
                                    $scope.clusters = response.data[0].clusters;
                                    if (response.data[0].role.length == 1) {
                                        $scope.isMultirole = false;
                                        $scope.isloginDisable = false;
                                        $scope.selectedrole = response.data[0].role[0];
                                    }
                                    else if (response.data[0].role.length > 1) {
                                        $scope.isMultirole = true;
                                        $scope.UserRoles = response.data[0].role;
                                        $scope.isloginDisable = false;
                                    }
                                    $scope.usercluster = GetUserCluster($scope.clusters);
                                }
                            });
                    }
                } catch (e) {
                    return false;
                }

            };

            function GetUserCluster(clusters) {
                var userclusters = "";
                clusters.forEach(item => {
                    if (userclusters == "")
                        userclusters = item;
                    else
                        userclusters = userclusters + "," + item;
                });
                return userclusters;
            };

        });

      
