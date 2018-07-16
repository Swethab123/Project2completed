/**
 * 
 */

app.factory('BlogService',function($http){
	var blogService={}
	
	blogService.addBlog=function(blog){
		return $http.post("http://localhost:8010/project2middleware/addblogpost",blog);
	}
	
	blogService.blogsApproved=function(){
		return $http.get("http://localhost:8010/project2middleware/blogsapproved")
	}
	
	blogService.blogsWaitingForApproval=function(){
		return $http.get("http://localhost:8010/project2middleware/blogswaitingforapproval")
	}
	
	blogService.getBlogPost=function(id){
		return $http.get("http://localhost:8010/project2middleware/getblogpost/"+id)
	}
	
	blogService.updateApprovalStatus=function(blogPost){
		return $http.put("http://localhost:8010/project2middleware/updateapprovalstatus",blogPost)
	}
	
	blogService.hasUserLikedBlog=function(blogId){
		return $http.get("http://localhost:8010/project2middleware/hasuserlikedblog/"+blogId)
	}
	
	blogService.updateLikes=function(id){
		return $http.put("http://localhost:8010/project2middleware/updatelikes/"+id)
	}
	
	blogService.addComment=function(id,blogComment){         
		return $http.post("http://localhost:8010/project2middleware/addcomment/"+id,blogComment)             
	}
	
	blogService.getBlogComments=function(id){
		return $http.get("http://localhost:8010/project2middleware/blogcomments/"+id)
	}
	return blogService;
	
})