package com.niit.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.niit.model.Friend;
import com.niit.model.User;

@Repository("friendDao")
public interface FriendDao {
	List<User> suggestedUsers(String email);
	void addFriend(Friend friend);
	List<Friend> pendingRequests(String toIdEmail);
	void acceptRequest(Friend request);
	void deleteRequest(Friend request);
	List<Friend> listOfFriends(String email);


}
