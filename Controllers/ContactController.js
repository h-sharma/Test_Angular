var app = angular.module("app", []);
app.controller("ContactController", function ($scope, $http) {
    $scope.Contacts = []
    $scope.IsEdit = false;
    $scope.AddNew = false;
    $scope.IsShow_ContactList = false;
    $scope.ShowErrorMessage = '';
    $scope.AddContact = {
        firstName: "",
        lastName: "",
        phone: "",
        id: ""
    },
        $scope.getContacts = function () {
            $http.get("https://my-json-server.typicode.com/voramahavir/contacts-mock-response/contacts")
                .then(function (response) {
                    $scope.Contacts = response.data;
                    $scope.IsShow_ContactList = true;
                });
        },

        $scope.Edit = function (c) {
            $scope.AddContact = $.extend(true, {}, c);
            $scope.IsEdit = true;
            $scope.IsShow_ContactList = false;
        },
        $scope.Delete = function (c) {
            var index = $scope.Contacts.indexOf(c);
            $scope.Contacts.splice(index, 1);
            $scope.Clear();
        },
        $scope.Add = function () {
            if (!$scope.myForm.firstName.$valid) {
                $scope.ShowErrorMessage = "FirstName is required";
                return;
            }
            else if (!$scope.myForm.lastName.$valid) {
                $scope.ShowErrorMessage = "SecondName is required";
                return;
            }
            else if (!$scope.myForm.phone.$valid) {
                $scope.ShowErrorMessage = "Phone is required";
                return;
            }
            else {
                if ($scope.Contacts.length > 0)
                    $scope.AddContact.id = Math.max.apply(Math, $scope.Contacts.map(function (o) { return o.id; })) + 1;
                else
                    $scope.AddContact.id = 1;
                $scope.Contacts.push($.extend(true, {}, $scope.AddContact));
                $scope.ShowContacts();
            }
        },
        $scope.Update = function () {
            if (!$scope.myForm.firstName.$valid) {
                $scope.ShowErrorMessage = "FirstName is required";
                return;
            }
            else if (!$scope.myForm.lastName.$valid) {
                $scope.ShowErrorMessage = "SecondName is required";
                return;
            }
            else if (!$scope.myForm.phone.$valid) {
                $scope.ShowErrorMessage = "Phone is required";
                return;
            }
            else {
                var x = $scope.Contacts.find(x => x.id === $scope.AddContact.id)
                var index = $scope.Contacts.indexOf(x)
                $scope.Contacts[index] = $.extend(true, {}, $scope.AddContact);
                $scope.ShowContacts();
            }
        },
        $scope.Cancel = function () {
            $scope.Clear();
            $scope.ShowContacts();
        },
        $scope.Clear = function () {
            AddContact = {
                firstName: "",
                lastName: "",
                phone: "",
                id: ""
            }
            $scope.AddContact = $.extend(true, {}, AddContact);
        },
        $scope.ShowContacts = function () {
            $scope.IsShow_ContactList = true;
            $scope.AddNew = false;
            $scope.IsEdit = false;
            $scope.ShowErrorMessage = '';
            $scope.Clear();
        }

    $scope.getContacts();

});