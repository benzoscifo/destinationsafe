NewComment = {};
NewComment.create_comment= function(){
  var content = $("#comment_body").val()
  var post_id = $("#comment_post_id").val()
    $.ajax({
      url: "/comments",
      type: "POST",
      dataType: "JSON",
      data: {comment: content, post_id: post_id}
    }).success(function(){
      console.log("done")
    })
    
}


$(document).ready(function(){
  $(".new_comment").on("submit", function(event){
    event.preventDefault()
    NewComment.create_comment()
  })



})