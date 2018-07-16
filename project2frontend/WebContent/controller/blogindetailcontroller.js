/**
 * 
 */
app.controller('BlogInDetailCtrl',function($scope, $location, $rootScope, BlogService,$routeParams,$sce) {
	var id=$routeParams.id
	
	BlogService.getBlogPost(id).then(function(response){
		$scope.blogPost=response.data
		$scope.content=$sce.trustAsHtml($scope.blogPost.blogContent)
	},function(response){
		$rootScope.error = response.data
		if (response.status == 401)
			$location.path('/login')
	})
	
	
	BlogService.hasUserLikedBlog(id).then(function(response) {

		if (response.data == "")
			$scope.isLiked = false
		else
			$scope.isLiked = true

	}, function(response) {
		$rootScope.error = response.data
		if (response.status == 401)
			$location.path('/login')
	})
	
	
	$scope.approve=function(blogPost){
		blogPost.approved=true
		BlogService.updateApprovalStatus(blogPost).then(function(response){
			$location.path('/blogswaitingforapproval')
		},function(response){
			$scope.error=response.data
			if (response.status == 401)
				$location.path('/login')
		})
	}
	
	$scope.reject=function(blogPost){
		blogPost.approved=false
		BlogService.updateApprovalStatus(blogPost).then(function(response){
			$location.path('/blogswaitingforapproval')
		},function(response){
			$scope.error=response.data
			if (response.status == 401)
				$location.path('/login')
		})
	}
	
	$scope.updateLikes = function(id) {
		BlogService.updateLikes(id).then(function(response) {
			$scope.blogPost = response.data; //update blogpost likes
			$scope.isLike=!$scope.isLiked
		}, function(response) {
			$rootScope.error = response.data
			if (response.status == 401)
				$location.path('/login')

		});
	}
	
	$scope.addComment = function(blogid, commentTxt) {
		$scope.blogComment = {}
		$scope.blogComment.commentTxt = commentTxt;
		BlogService.addComment(blogid, $scope.blogComment).then(
				function(response) {
					$scope.commentTxt = ''
					getBlogComments(id)
				}, function(response) {
					$rootScope.error = response.data
					if (response.status == 401)
						$location.path('/login')
					else {
						$scope.exceptionMessage = response.data
					}
				});
	}
	
	function getBlogComments(id) {
		BlogService.getBlogComments(id).then(function(response) {
			$scope.comments = response.data
		}, function(response) {
			$rootScope.error = response.data
			if (response.status == 401)
				$location.path('/login')
		});
	}
	getBlogComments(id);
})