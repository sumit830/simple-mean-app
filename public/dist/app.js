(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

angular.module('app', []);

angular.module('app').controller('appCtrl', AppCtrl);

AppCtrl.$inject = ['$scope', '$http'];

function AppCtrl($scope, $http) {
    var vm = this;
    vm.fields = [{ label: 'Name', key: 'name' }, { label: 'Email', key: 'email' }, { label: 'Phone', key: 'phone' }];
    vm.record = {};
    vm.records = [];

    vm.handleError = function (response) {
        console.log(response.status + " - " + response.statusText + " - " + response.data);
    };

    vm.getAllRecords = function () {
        $http.get('/records').then(function (response) {
            vm.records = response.data;
        }, function (response) {
            vm.handleError(response);
        });
    };

    vm.getAllRecords();

    vm.editMode = false;
    vm.saveRecord = function () {
        if (vm.editMode) {
            vm.updateRecord();
        } else {
            vm.addRecord();
        }
    };

    vm.addRecord = function () {
        console.log(vm.record);
        $http.post('/records', vm.record).then(function (response) {
            vm.record = {};
            vm.getAllRecords();
        }, function (response) {
            vm.handleError(response);
        });
    };

    vm.updateRecord = function () {
        $http.put('/records/' + vm.record._id, vm.record).then(function (response) {
            vm.record = {};
            vm.getAllRecords();
            vm.editMode = false;
        }, function (response) {
            vm.handleError(response);
        });
    };

    vm.editRecord = function (record) {
        vm.record = record;
        vm.editMode = true;
    };

    vm.deleteRecord = function (recordid) {
        $http.delete('/records/' + recordid).then(function (response) {
            console.log("Deleted");
            vm.getAllRecords();
        }, function (response) {
            vm.handleError(response);
        });
    };

    vm.cancelEdit = function () {
        vm.editMode = false;
        vm.record = {};
        vm.getAllRecords();
    };
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxRQUFRLE1BQVIsQ0FBZSxLQUFmLEVBQXNCLEVBQXRCOztBQUVBLFFBQ0ssTUFETCxDQUNZLEtBRFosRUFFSyxVQUZMLENBRWdCLFNBRmhCLEVBRTJCLE9BRjNCOztBQUlBLFFBQVEsT0FBUixHQUFrQixDQUFDLFFBQUQsRUFBVyxPQUFYLENBQWxCOztBQUVBLFNBQVMsT0FBVCxDQUFpQixNQUFqQixFQUF5QixLQUF6QixFQUFnQztBQUM1QixRQUFJLEtBQUssSUFBVDtBQUNBLE9BQUcsTUFBSCxHQUFZLENBQ1IsRUFBQyxPQUFPLE1BQVIsRUFBZ0IsS0FBSyxNQUFyQixFQURRLEVBRVIsRUFBQyxPQUFPLE9BQVIsRUFBaUIsS0FBSyxPQUF0QixFQUZRLEVBR1IsRUFBQyxPQUFPLE9BQVIsRUFBaUIsS0FBSyxPQUF0QixFQUhRLENBQVo7QUFLQSxPQUFHLE1BQUgsR0FBWSxFQUFaO0FBQ0EsT0FBRyxPQUFILEdBQWEsRUFBYjs7QUFFQSxPQUFHLFdBQUgsR0FBaUIsVUFBUyxRQUFULEVBQW1CO0FBQ2hDLGdCQUFRLEdBQVIsQ0FBWSxTQUFTLE1BQVQsR0FBa0IsS0FBbEIsR0FBMEIsU0FBUyxVQUFuQyxHQUFnRCxLQUFoRCxHQUF3RCxTQUFTLElBQTdFO0FBQ0gsS0FGRDs7QUFJQSxPQUFHLGFBQUgsR0FBbUIsWUFBVztBQUMxQixjQUFNLEdBQU4sQ0FBVSxVQUFWLEVBQXNCLElBQXRCLENBQTJCLFVBQVMsUUFBVCxFQUFrQjtBQUN6QyxlQUFHLE9BQUgsR0FBYSxTQUFTLElBQXRCO0FBQ0gsU0FGRCxFQUVHLFVBQVMsUUFBVCxFQUFrQjtBQUNqQixlQUFHLFdBQUgsQ0FBZSxRQUFmO0FBQ0gsU0FKRDtBQUtILEtBTkQ7O0FBUUEsT0FBRyxhQUFIOztBQUVBLE9BQUcsUUFBSCxHQUFjLEtBQWQ7QUFDQSxPQUFHLFVBQUgsR0FBZ0IsWUFBVztBQUN2QixZQUFHLEdBQUcsUUFBTixFQUFnQjtBQUNaLGVBQUcsWUFBSDtBQUNILFNBRkQsTUFFTztBQUNILGVBQUcsU0FBSDtBQUNIO0FBQ0osS0FORDs7QUFRQSxPQUFHLFNBQUgsR0FBZSxZQUFXO0FBQ3RCLGdCQUFRLEdBQVIsQ0FBWSxHQUFHLE1BQWY7QUFDQSxjQUFNLElBQU4sQ0FBVyxVQUFYLEVBQXVCLEdBQUcsTUFBMUIsRUFBa0MsSUFBbEMsQ0FBdUMsVUFBUyxRQUFULEVBQWtCO0FBQ3JELGVBQUcsTUFBSCxHQUFZLEVBQVo7QUFDQSxlQUFHLGFBQUg7QUFDSCxTQUhELEVBR0csVUFBUyxRQUFULEVBQWtCO0FBQ2pCLGVBQUcsV0FBSCxDQUFlLFFBQWY7QUFDSCxTQUxEO0FBTUgsS0FSRDs7QUFVQSxPQUFHLFlBQUgsR0FBa0IsWUFBVztBQUN6QixjQUFNLEdBQU4sQ0FBVSxjQUFjLEdBQUcsTUFBSCxDQUFVLEdBQWxDLEVBQXVDLEdBQUcsTUFBMUMsRUFBa0QsSUFBbEQsQ0FBdUQsVUFBUyxRQUFULEVBQWtCO0FBQ3JFLGVBQUcsTUFBSCxHQUFZLEVBQVo7QUFDQSxlQUFHLGFBQUg7QUFDQSxlQUFHLFFBQUgsR0FBYyxLQUFkO0FBQ0gsU0FKRCxFQUlHLFVBQVMsUUFBVCxFQUFrQjtBQUNqQixlQUFHLFdBQUgsQ0FBZSxRQUFmO0FBQ0gsU0FORDtBQU9ILEtBUkQ7O0FBVUEsT0FBRyxVQUFILEdBQWdCLFVBQVMsTUFBVCxFQUFpQjtBQUM3QixXQUFHLE1BQUgsR0FBWSxNQUFaO0FBQ0EsV0FBRyxRQUFILEdBQWMsSUFBZDtBQUNILEtBSEQ7O0FBS0EsT0FBRyxZQUFILEdBQWtCLFVBQVMsUUFBVCxFQUFtQjtBQUNqQyxjQUFNLE1BQU4sQ0FBYSxjQUFZLFFBQXpCLEVBQW1DLElBQW5DLENBQXdDLFVBQVMsUUFBVCxFQUFrQjtBQUN0RCxvQkFBUSxHQUFSLENBQVksU0FBWjtBQUNBLGVBQUcsYUFBSDtBQUNILFNBSEQsRUFHRyxVQUFTLFFBQVQsRUFBa0I7QUFDakIsZUFBRyxXQUFILENBQWUsUUFBZjtBQUNILFNBTEQ7QUFNSCxLQVBEOztBQVNBLE9BQUcsVUFBSCxHQUFnQixZQUFXO0FBQ3ZCLFdBQUcsUUFBSCxHQUFjLEtBQWQ7QUFDQSxXQUFHLE1BQUgsR0FBWSxFQUFaO0FBQ0EsV0FBRyxhQUFIO0FBQ0gsS0FKRDtBQU1IIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFtdKTtcclxuXHJcbmFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ2FwcCcpXHJcbiAgICAuY29udHJvbGxlcignYXBwQ3RybCcsIEFwcEN0cmwpO1xyXG5cclxuQXBwQ3RybC4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGh0dHAnXTtcclxuXHJcbmZ1bmN0aW9uIEFwcEN0cmwoJHNjb3BlLCAkaHR0cCkge1xyXG4gICAgdmFyIHZtID0gdGhpcztcclxuICAgIHZtLmZpZWxkcyA9IFtcclxuICAgICAgICB7bGFiZWw6ICdOYW1lJywga2V5OiAnbmFtZSd9LFxyXG4gICAgICAgIHtsYWJlbDogJ0VtYWlsJywga2V5OiAnZW1haWwnfSxcclxuICAgICAgICB7bGFiZWw6ICdQaG9uZScsIGtleTogJ3Bob25lJ31cclxuICAgIF07XHJcbiAgICB2bS5yZWNvcmQgPSB7fTtcclxuICAgIHZtLnJlY29yZHMgPSBbXTtcclxuXHJcbiAgICB2bS5oYW5kbGVFcnJvciA9IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzICsgXCIgLSBcIiArIHJlc3BvbnNlLnN0YXR1c1RleHQgKyBcIiAtIFwiICsgcmVzcG9uc2UuZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgdm0uZ2V0QWxsUmVjb3JkcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICRodHRwLmdldCgnL3JlY29yZHMnKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuICAgICAgICAgICAgdm0ucmVjb3JkcyA9IHJlc3BvbnNlLmRhdGE7XHJcbiAgICAgICAgfSwgZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG4gICAgICAgICAgICB2bS5oYW5kbGVFcnJvcihyZXNwb25zZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdm0uZ2V0QWxsUmVjb3JkcygpO1xyXG5cclxuICAgIHZtLmVkaXRNb2RlID0gZmFsc2U7XHJcbiAgICB2bS5zYXZlUmVjb3JkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYodm0uZWRpdE1vZGUpIHtcclxuICAgICAgICAgICAgdm0udXBkYXRlUmVjb3JkKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdm0uYWRkUmVjb3JkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZtLmFkZFJlY29yZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHZtLnJlY29yZCk7XHJcbiAgICAgICAgJGh0dHAucG9zdCgnL3JlY29yZHMnLCB2bS5yZWNvcmQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG4gICAgICAgICAgICB2bS5yZWNvcmQgPSB7fTtcclxuICAgICAgICAgICAgdm0uZ2V0QWxsUmVjb3JkcygpO1xyXG4gICAgICAgIH0sIGZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuICAgICAgICAgICAgdm0uaGFuZGxlRXJyb3IocmVzcG9uc2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHZtLnVwZGF0ZVJlY29yZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICRodHRwLnB1dCgnL3JlY29yZHMvJyArIHZtLnJlY29yZC5faWQsIHZtLnJlY29yZCkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XHJcbiAgICAgICAgICAgIHZtLnJlY29yZCA9IHt9O1xyXG4gICAgICAgICAgICB2bS5nZXRBbGxSZWNvcmRzKCk7XHJcbiAgICAgICAgICAgIHZtLmVkaXRNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgfSwgZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG4gICAgICAgICAgICB2bS5oYW5kbGVFcnJvcihyZXNwb25zZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdm0uZWRpdFJlY29yZCA9IGZ1bmN0aW9uKHJlY29yZCkge1xyXG4gICAgICAgIHZtLnJlY29yZCA9IHJlY29yZDtcclxuICAgICAgICB2bS5lZGl0TW9kZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgdm0uZGVsZXRlUmVjb3JkID0gZnVuY3Rpb24ocmVjb3JkaWQpIHtcclxuICAgICAgICAkaHR0cC5kZWxldGUoJy9yZWNvcmRzLycrcmVjb3JkaWQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRlbGV0ZWRcIik7XHJcbiAgICAgICAgICAgIHZtLmdldEFsbFJlY29yZHMoKTtcclxuICAgICAgICB9LCBmdW5jdGlvbihyZXNwb25zZSl7XHJcbiAgICAgICAgICAgIHZtLmhhbmRsZUVycm9yKHJlc3BvbnNlKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHZtLmNhbmNlbEVkaXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB2bS5lZGl0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHZtLnJlY29yZCA9IHt9O1xyXG4gICAgICAgIHZtLmdldEFsbFJlY29yZHMoKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19
