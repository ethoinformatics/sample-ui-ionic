/* global angular: false, _: false */

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
	var currentModal, currentId = 0;

	$scope.records = [];
	$scope.recordTypes = [
		{
			id: 1, 
			label: 'Labeled Flags', 
			template: 'templates/labeled-flags.html', 
			model: {
				type: 1,
			}
		},
		{
			id: 2, 
			label: 'Record B', 
			template: 'templates/login.html',
			model: {
				type: 2,
			}
		},
		{
			id: 3, 
			label: 'Record C', 
			template: 'templates/login.html',
			model: {
				type: 3,
			}
		},
	];

	function recordTypeById(id){
		return _.find($scope.recordTypes, function(r){ return id == r.id; });
	}

	function loadRecordModal(recordType){
		return $ionicModal.fromTemplateUrl(recordType.template, { scope: $scope });
	}

	$scope.closeModal = function() {
		if (!currentModal) return;
		currentModal.hide();
	};

	$scope.addRecord = function(recordTypeId) {
		var recordType = recordTypeById(recordTypeId);
		$scope.record = _.extend({}, recordType.model);
		$scope.record.id = ++currentId;
		$scope.records.push($scope.record);

		loadRecordModal(recordType)
			.then(function(modal){
				currentModal = modal;
				currentModal.show();
			});
	};

	$scope.editRecord = function(recordId) {
		var record = _.find($scope.records, function(r){ return r.id == recordId; });
		var recordType = recordTypeById(record.type);
		$scope.record = record;

		loadRecordModal(recordType)
			.then(function(modal){
				currentModal = modal;
				currentModal.show();
			});
	};

	$scope.removeRecord = function(recordId) {
		_.remove($scope.records, function(r){ return r.id == recordId; });
	};

	$scope.saveRecord = function(){
		console.dir($scope.record);
		$scope.closeModal();
	};

})

.controller('PlaylistsCtrl', function($scope) {
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
