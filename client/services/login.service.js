(function() {
	'use strict';

	loginService.$inject = [
		'$http'
	];

	angular
		.module('app')
		.service('loginService', loginService);

	function loginService(
		$http
	) {
		var loginInfo = {
				username: '',
				avatarUrl: '',
				isLogin: false
			};

		return {
			loginInfo: loginInfo,
			getCurrentUser: getCurrentUser,
			uploadAvatar: uploadAvatar,
			isLoggedIn: isLoggedIn,
			getUsername: getUsername,
			getAvatarUrl: getAvatarUrl,
			signIn: signIn,
			signUp: signUp,
			logout: logout
		};

		function isLoggedIn() {
			return loginInfo.isLogin;
		}

		function getUsername() {
			return loginInfo.username;
		}

		function getAvatarUrl() {
			return loginInfo.avatarUrl;
		}

		function getCurrentUser() {
			return $http({
				method: 'GET',
				url: '/currentUser'
			}).then(function(response) {
				if (response.data) {
					loginInfo.username = response.data.username;
					loginInfo.avatarUrl = response.data.avatarurl;
					loginInfo.isLogin = true;
				} else {
					loginInfo.isLogin = false;
				}
			});
		}

		function uploadAvatar(avatarUrl) {
			loginInfo.avatarUrl = avatarUrl;
			$http({
				method: 'POST',
				url: '/uploadAvatar',
				data: { avatarUrl : avatarUrl }
			});
		}

		function signIn(username, password) {
			return $http({
				method: 'POST',
				url: '/login',
				data: {
					username : username,
					password : password
				}
			});
		}

		function signUp(userData) {
			return $http({
				method: 'POST',
				url: '/register',
				data: {
					name : userData.name,
					email : userData.email,
					username : userData.username,
					password : userData.password,
					password2 : userData.password2
				}
			});
		}

		function logout() {
			return $http({
				method: 'GET',
				url: '/logout'
			});
		}
	}
})();
