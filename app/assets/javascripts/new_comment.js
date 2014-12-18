NewComment = {};
NewComment.create_comment= function(){
  var content = $("#comment_body").val()
  var post_id = $("#comment_post_id").val()
    $.ajax({
      url: "/comments",
      type: "POST",
      dataType: "JSON",
      data: {comment: content, post_id: post_id}
    }).success(function(data){
      NewComment.get_comment(data)
    })
  }

NewComment.get_comment= function(data){
  var post_id = data.id

  //clear the comments to avoid duplication
  $('#comment_body').val("");

  $.ajax({
    url: "/posts/" + post_id,
    type: "GET",
    dataType: "JSON"
  }).success(function(data){
    console.log(data.comments[data.comments.length -1])
    var comment = data.comments[data.comments.length -1]
    // $.each(data.comments.last, function(index, item){
      var row = $("<div><h3>"+
         comment.body +"</h3>"+  
        "<p>" + humanized_time_span(comment.created_at) + "</p></div>");
      row.appendTo("#comments");
    // })
  })
}
  
NewComment.get_all_comments = function(){
  console.log("soooo")
  var post_id = $("#comment_post_id").val()

  //clear the comments to avoid duplication
  // $('#comments').empty();

  $.ajax({
    url: "/posts/" + post_id,
    type: "GET",
    dataType: "JSON"
  }).success(function(data){
    console.log(data.comments)
    var comments = data.comments 
    $.each(comments, function(index, comment){
    var row = $("<div><h3>"+
         comment.body +"</h3>"+  
        "<p>" + humanized_time_span(comment.created_at) + "</p></div>");
      row.appendTo("#comments");
    })
  })

}

$(document).ready(function(){
  $(".new_comment").on("submit", function(event){
    event.preventDefault()
    NewComment.create_comment()

    // NewCommentAjax.getComments();
    // $('#comment_body, comment_post_id')
    // var comments = '#' + $(this).attr('id').replace('_link', '');
    // if(comments === '#new_comment'){
    //   $.each(CommentsAjax.fields.concat(['id']), function(index, field){
    //     $("input[name=" + field + "]").val('');
    //   });
    // };
  })

  NewComment.get_all_comments()

})