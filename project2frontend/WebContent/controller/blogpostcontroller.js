/**
 * BlogCtrl
 */
app.controller('BlogCtrl',function($scope, $location, $rootScope, BlogService) {
	$scope.addBlog = function(blog) {
		BlogService.addBlog(blog).then(function(response) {
			alert('BlogPost is added successfully and it is waiting for approval');
			$location.path('/home')
		},function(response){
			$rootScope.error = response.data
			if (response.status == 401)
				$location.path('/login')
			
		})
		
	}
	function blogsApproved(){
		BlogService.blogsApproved().then(function(response){
			$scope.blogsApproved=response.data
		},function(resonse){
			$rootScope.error = response.data
			if (response.status == 401)
				$location.path('/login')
		})
	}
	
	function blogsWaitingForApproval(){
		BlogService.blogsWaitingForApproval().then(function(response){
			$scope.blogsWaitingForApproval=response.data
			console.log('Waiting blogs in not approved function '+ JSON.stringify($scope.blogsWaitingForApproval));
		},function(resonse){
			$rootScope.error = response.data
			if (response.status == 401)
				$location.path('/login')
		})
	}
	
	blogsApproved()
	if($rootScope.loggedInUser.role=='ADMIN')
		blogsWaitingForApproval()
})