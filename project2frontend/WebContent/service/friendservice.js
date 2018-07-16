/**
 * 
 */
app.factory('FriendService',function($http){
	var friendService={}
	friendService.getAllSuggestedUsers = function(){
		return $http.get("http://localhost:8010/project2middleware/suggestedUsers")
	}
	
	friendService.addFriend=function(toId){
		return $http.post("http://localhost:8010/project2middleware/addfriend",toId)
	}
	friendService.getPendingRequests=function(){
		return $http.get("http://localhost:8010/project2middleware/pendingrequests")
	}
	friendService.acceptRequest=function(request){
		return $http.post("http://localhost:8010/project2middleware/acceptrequest",request);
	}
	friendService.deleteRequest=function(request){
		return $http.post("http://localhost:8010/project2middleware/deleterequest",request);
	}
	friendService.getAllFriends=function(){
		return $http.get("http://localhost:8010/project2middleware/friends");
	}
	
	return friendService;
})