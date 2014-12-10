class CommentsController < ApplicationController

  def new
    @comment = Comment.new
  end
  
  def create
    @post = Post.find(params["comment"][:post_id])
    @comment = @post.comments.new(params[:comment])
    @comment.user_id= current_user.id
    @comment.save
    redirect_to @post
  end
end

# <%= @comment.user.id %>

