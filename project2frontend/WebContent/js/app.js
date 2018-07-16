/**
 * Angular JS Module
 */
var app=angular.module("app",['ngRoute','ngCookies'])
app.config(function($routeProvider){
	$routeProvider
	.when('/registration',{
		controller:'UserCtrl',
		templateUrl:'views/registrationform.html'
	})
	.when('/home',{
		templateUrl:'views/home.html'
	})
	.when('/login',{
		controller:'UserCtrl',
		templateUrl:'views/login.html'
	})
	.when('/updateprofile',{
		controller:'UserCtrl',
		templateUrl:'views/updateprofile.html' //user object in updateprofile.html
	})
	.when('/addjob',{ //V to C
		controller:'JobCtrl',
		templateUrl:'views/jobform.html'
	})
	.when('/activejobs',{ //C to V,  $scope.activeJobs=[{},{}]
		controller:'JobCtrl',
		templateUrl:'views/activejobslist.html'
	})
	.when('/inactivejobs',{
		controller:'JobCtrl',
		templateUrl:'views/inactivejobslist.html'
	})

	.when('/addblog',{
		controller:'BlogCtrl',
		templateUrl:'views/	blogform.html'
	})
	.when('/blogsapproved',{
		controller:'BlogCtrl',
		templateUrl:'views/	blogsapproved.html'
	})
	.when('/blogswaitingforapproval',{
		controller:'BlogCtrl',
		templateUrl:'views/	blogswaitingforapproval.html'
	})
	.when('/getblogapproved/:id',{
		controller:'BlogInDetailCtrl',
		templateUrl:'views/	blogindetail.html'
	})
	.when('/getblogwaitingforapproval/:id',{
		controller:'BlogInDetailCtrl',
		templateUrl:'views/	blogapprovalform.html'
	})
	.when('/suggestedUsers', {
		templateUrl : 'views/suggestedusers.html',
		controller : 'FriendCtrl'
	})
	.when('/pendingrequests', {
		templateUrl : 'views/pendingrequests.html',
		controller : 'FriendCtrl'
	})
	.when('/friends', {
		templateUrl : 'views/friendslist.html',
		controller : 'FriendCtrl'
	})
	.when('/chat',{
		templateUrl:'views/chat.html',
		controller:'ChatCtrl'
	})
    	
	.when('/uploadprofilepic', {
		templateUrl : 'views/uploadprofilepic.html'
	})
	

		
	.otherwise({
		templateUrl:'views/home.html'
	})
})
app.run(function($rootScope,$cookieStore,UserService,$location){
	if($rootScope.loggedInUser==undefined)
		$rootScope.loggedInUser=$cookieStore.get('loggedInUser')
		
		$rootScope.logout=function(){
		UserService.logout().then(function(response){
			$rootScope.message="Loggedout successfully..."
				delete $rootScope.loggedInUser
				$cookieStore.remove('loggedInUser')
			$location.path('/login')
		},function(response){
			$rootScope.error=response.data //ErrorClazz object returned from middleware
			$location.path('/login')
		})
	}	
})