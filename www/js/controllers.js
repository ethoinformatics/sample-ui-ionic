/* global angular: false, _: false */

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
	var currentModal, currentId = 0;

	$scope.records = [];
	$scope.recordTypes = [
		{
			id: 1, 
			label: 'Labeled flags', 
			template: 'labeled-flags.html', 
			model: {
				type: 1,
			}
		},
		{
			id: 2, 
			label: 'Name and age', 
			template: 'name-age.html',
			model: {
				type: 2,
			}
		},
		{
			id: 3, 
			label: 'Text area', 
			template: 'text-area.html',
			model: {
				type: 3,
			}
		},
	];

	function recordTypeById(id){
		return _.find($scope.recordTypes, function(r){ return id == r.id; });
	}

	function loadRecordModal(recordType){
		$scope.closeModal();
		return $ionicModal.fromTemplateUrl('templates/record-types/'+ recordType.template, { scope: $scope });
	}

	function loadDataModal(rawData){
		$scope.rawData = rawData;
		$scope.closeModal();
		
		return $ionicModal.fromTemplateUrl('templates/data-view.html', { scope: $scope});
	}

	$scope.closeModal = function() {
		if (!currentModal) return;
		currentModal.hide();
	};

	function createRecord(recordType){
		var r = _.extend({}, recordType.model);
		r.id = ++currentId;
		r.label = recordType.label;

		return r;
	}

	$scope.addRecord = function(recordTypeId) {
		var recordType = recordTypeById(recordTypeId);
		$scope.record = createRecord(recordType);
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

	$scope.saveRecords = function(){

		loadDataModal(JSON.stringify($scope.records, null, "\t"))
			.then(function(modal){
				currentModal = modal;
				currentModal.show();
			});
	};

})

.controller('PlaylistsCtrl', function($scope) {
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
