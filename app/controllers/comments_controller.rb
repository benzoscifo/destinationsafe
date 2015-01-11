class CommentsController < ApplicationController
  respond_to :html, :js
  def index
    @comments = Comment.all
  end
  
  def new
    @comment = Comment.new(:user => current_user)
  end
  
  def create
    # binding.pry
    if params[:post_id] == nil
      @post = Post.find(params[:comment][:post_id])
      @comment = @post.comments.new(:body=>params[:comment][:body])
      @comment.user_id= current_user.id
      @comment.save
      respond_with(@comment)
    else
      @post = Post.find(params[:post_id])
      @comment = @post.comments.new(:body=>params[:comment])
      @comment.user_id= current_user.id
      @comment.save
      redirect_to @post
    end
  end
end

# <%= @comment.user.id %>

