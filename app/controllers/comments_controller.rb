class CommentsController < ApplicationController
  def index
    @comments = Comment.all
  end
  
  def new
    @comment = Comment.new(:user => current_user)
  end
  
  def create
    @post = Post.find(params[:post_id])
    @comment = @post.comments.new(:body=>params[:comment])
    @comment.user_id= current_user.id
    @comment.save
    redirect_to @post
  end
end

# <%= @comment.user.id %>

