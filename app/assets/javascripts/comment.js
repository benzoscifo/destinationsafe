CommentsAjax = {};
CommentsAjax.fields = ["user_id", "post_id", "body", "image"];

CommentsAjax.togglePages = function(showPage){
  var hidePage = (showPage === '#new_comment') ? '#all_comments' : '#new_comment';
  $(hidePage).slideUp(function(){
    $(showPage).slideDown();
  });
}

CommentsAjax.commentForm = function(event){
  event.preventDefault();
  var id = $("form #id").val();
  if(id != ""){
    url = '/comments/' + id;
    type = "PUT"
  } else {
    url = '/comments';
    type = "comment";
  }

  var data = {};
  $.each(CommentsAjax.fields, function(index, field){
    data[field] = $('#' + field).val();
  })

  $.ajax({
    url: url,
    type: type,
    data: {comment: data},
    dataType: "json"
  }).success(function(data){
    //Fetch all comments from the server (will include the comment we just created);
    CommentsAjax.getcomments();
    CommentsAjax.togglePages('#all_comments');
  })
}

CommentsAjax.getComments = function(){
  //Clear the comments table to avoid duplicating comments;
  $('#all_comments table tbody').empty();
  
  //Ajax request to the server to get all the comments;
  $.ajax({
    url: '/comments',
    type: 'GET',
    dataType: "json"
  }).success(function(data){
    $.each(data, function(index, item){
      var row = $("<tr>"+
        "<td>" + item.user_id +"</td>"+
        "<td>" + item.title+"</td>"+
        "<td>" + item.body +"</td>"+
        "<td>" + item.latitude+"</td>"+
        "<td>" + item.latitude+"</td>"+
        "<td><button data-id='" + item.id+"' class='btn edit_comment'>Edit</button> <button data-id='" + item.id+"' class='btn btn-danger delete_comment'>Delete</button></td>"+
        "</tr>");
      row.appendTo("#all_comments table tbody");
    })
  })
}

CommentsAjax.deleteComment = function(){
  $this = $(this);
  var commentId = $this.data('id');
  $.ajax({
    url: '/comments/' + commentId,
    type: 'DELETE',
    dataType: "json"
  }).success(function(data){
    // $this.parent().parent().remove();
    $this.closest('tr').remove();
  });
}

CommentsAjax.editComment = function(){
  console.log('editcomment');
  //Look up the comment in the database so we can prepopulate the form with data;
  var commentId = $(this).data('id');
  $.ajax({
    url: '/comments/' + commentId,
    type: 'GET',
    dataType: "json"
    }).success(function(data){
    $.each(CommentsAjax.fields.concat(['id']), function(index, field){
      $("input[name=" + field + "]").val(data[field]);
    });
    CommentsAjax.togglePages('#new_comment');
  })
}

$(document).ready(function(){

  CommentsAjax.getComments();

  $('#new_comment_link, #all_comments_link').on('click', function(event){
    event.preventDefault();
    var showPage = '#' + $(this).attr('id').replace('_link', '');
    if(showPage === '#new_comment'){
      $.each(CommentsAjax.fields.concat(['id']), function(index, field){
        $("input[name=" + field + "]").val('');
      });
    };
    CommentsAjax.togglePages(showPage);
  });

  $('#comment_form').on('submit', CommentsAjax.commentForm);
  
  //Need to use event delegation here, as .delete_comments is not in html when page loads;
  $('#all_comments').on('click', '.delete_comment', CommentsAjax.deleteComment);
  $('#all_comments').on('click', '.edit_comment', CommentsAjax.editComment);
})













 