package com.niit.dao;

import java.util.List;

import javax.transaction.Transactional;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.niit.dao.BlogPostDao;
import com.niit.model.BlogComment;
import com.niit.model.BlogPost;


@Repository
@EnableTransactionManagement
@Transactional
public class BlogPostDaoImpl implements BlogPostDao {
	@Autowired
	private SessionFactory sessionFactory;

	public BlogPostDaoImpl() {

		System.out.println("BlogPostDaoImpl bean is created");
	}

	public void saveBlogPost(BlogPost blogPost) {
		Session session = sessionFactory.getCurrentSession();
		session.save(blogPost);
		
	}

	public List<BlogPost> approvedBlogs() {
		Session session=sessionFactory.getCurrentSession();
		Query query=session.createQuery("from BlogPost where approved=true");
		return query.list();
	}

	public List<BlogPost> blogsWaitingForApproval() {
		Session session=sessionFactory.getCurrentSession();
		Query query=session.createQuery("from BlogPost where approved=false");
		return query.list();
	}

	public BlogPost getBlogPost(int id) {
		Session session=sessionFactory.getCurrentSession();
		BlogPost blogPost=(BlogPost)session.get(BlogPost.class,id);
		return blogPost;
	}

	public void updateApprovalStatus(BlogPost blogPost) {
		Session session=sessionFactory.getCurrentSession();
		if(blogPost.isApproved()){
			session.update(blogPost);
		}
		else{
			session.delete(blogPost);
		}
	}

	
	public void addBlogComment(BlogComment blogComment) {
		Session session = sessionFactory.getCurrentSession();
		session.save(blogComment);

	}

	public List<BlogComment> getAllBlogComment(int blogPostId) {
		Session session=sessionFactory.getCurrentSession();
		Query query=session.createQuery("from BlogComment where blogPost.id=?");
		query.setInteger(0,blogPostId);
		List<BlogComment>blogComments =query.list();
		return blogComments;
	}
}