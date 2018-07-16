package com.niit.dao;

import org.springframework.stereotype.Repository;

import com.niit.model.BlogPost;
import com.niit.model.BlogPostLikes;


@Repository
public interface BlogPostLikesDao {
	BlogPostLikes hasUserLikedBlog(int blogId, String email);

	BlogPost updateLikes(int id, String email);
}