'use strict';

/**
 * @ngdoc function
 * @name yakilaWebApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the yakilaWebApp
 */

var Handler =function($scope,$http,CONSTANTS,$rootScope,socialLoginService,$cookies,$window){
			$scope.logout=function(){
				socialLoginService.logout()
				$cookies.remove('user.imageUrl');
				$cookies.remove('user.name');
				$window.location.reload();

			}
						$scope.userImageUrl=$cookies.get('user.imageUrl');

						$scope.userName=$cookies.get('user.name');						

$scope.addUser=function(saveForm){
		$http({
			url: CONSTANTS.API_HOST + '/users',
			method: 'post',
			headers: {
			data: {
				"name": saveForm.name,
				"lastname": saveForm.lastname,
				"city": saveForm.city,
				"email": saveForm.email,
				"number": saveForm.number,
				'job': saveForm.job,
				'password': saveForm.password,
				'type': saveForm.type,
				'path': saveForm.path,
				'gmail': saveForm.gmail,
				'fb': saveForm.fb,
				'favourite': saveForm.favourite,
				'path_photo_profil': saveForm.path_photo_profil,
				'list_path_image': saveForm.list_path_image,
				"sex":saveForm.sex,
				"token":saveForm.token
			}
		}})
		.then(
			function(res) {
			console.log(res)		
				}
   		
			)
			}








				$rootScope.$on('event:social-sign-in-success', function(event, userDetails){
						$cookies.put('user.imageUrl' , userDetails.imageUrl);
						$scope.userImageUrl=$cookies.get('user.imageUrl');
						$cookies.put('user.name' , userDetails.name);
						$scope.userName=$cookies.get('user.name');						
						console.log($scope.userImageUrl)
						$http({
						url: CONSTANTS.API_HOST + '/authenticatefb',
						method: 'post',
						
						data: {
							"email": userDetails.email,
							"fb": userDetails.uid
						}
					})
					.then(
						function(res) {
						console.log(res)		
							}
			   		
						)


				})
				$rootScope.$on('event:social-sign-out-success', function(event, logoutStatus){
					console.log(logoutStatus)
				})
		}










Handler.$inject=['$scope','$http','CONSTANTS','$rootScope','socialLoginService','$cookies','$window']
angular.module('yakilaWebApp').controller('UserCtrl', Handler);
