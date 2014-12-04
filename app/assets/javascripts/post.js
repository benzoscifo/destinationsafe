railsAjax = {};
railsAjax.fields = ["user_id", "title", "body", "latitude", "longitude"];

railsAjax.togglePages = function(showPage){
  var hidePage = (showPage === '#new_post') ? '#all_posts' : '#new_post';
  $(hidePage).slideUp(function(){
    $(showPage).slideDown();
  });
}

railsAjax.postForm = function(event){
  event.preventDefault();
  var id = $("form #id").val();
  if(id != ""){
    url = '/posts/' + id;
    type = "PUT"
  } else {
    url = '/posts';
    type = "POST";
  }

  var data = {};
  $.each(railsAjax.fields, function(index, field){
    data[field] = $('#' + field).val();
  })

  $.ajax({
    url: url,
    type: type,
    data: {post: data},
    dataType: "json"
  }).success(function(data){
    //Fetch all posts from the server (will include the post we just created);
    railsAjax.getPosts();
    railsAjax.togglePages('#all_posts');
  })
}

railsAjax.getPosts = function(){
  //Clear the posts table to avoid duplicating posts;
  $('#all_posts table tbody').empty();
  
  //Ajax request to the server to get all the posts;
  $.ajax({
    url: '/posts',
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
        "<td><button data-id='" + item.id+"' class='btn edit_post'>Edit</button> <button data-id='" + item.id+"' class='btn btn-danger delete_post'>Delete</button></td>"+
        "</tr>");
      row.appendTo("#all_posts table tbody");
    })
  })
}

railsAjax.deletePost = function(){
  $this = $(this);
  var postId = $this.data('id');
  $.ajax({
    url: '/posts/' + postId,
    type: 'DELETE',
    dataType: "json"
  }).success(function(data){
    // $this.parent().parent().remove();
    $this.closest('tr').remove();
  });
}

railsAjax.editPost = function(){
  console.log('editPost');
  //Look up the post in the database so we can prepopulate the form with data;
  var postId = $(this).data('id');
  $.ajax({
    url: '/posts/' + postId,
    type: 'GET',
    dataType: "json"
  }).success(function(data){
    $.each(railsAjax.fields.concat(['id']), function(index, field){
      $("input[name=" + field + "]").val(data[field]);
    });
    railsAjax.togglePages('#new_post');
  })
}

$(document).ready(function(){

  $('#new_post_link, #all_posts_link').on('click', function(event){
    event.preventDefault();
    var showPage = '#' + $(this).attr('id').replace('_link', '');
    if(showPage === '#new_post'){
      $.each(railsAjax.fields.concat(['id']), function(index, field){
        $("input[name=" + field + "]").val('');
      });
    };
    railsAjax.togglePages(showPage);
  });

  $('#post_form').on('submit', railsAjax.postForm);
  railsAjax.getPosts();
  //Need to use event delegation here, as .delete_posts is not in html when page loads;
  $('#all_posts').on('click', '.delete_post', railsAjax.deletePost);
  $('#all_posts').on('click', '.edit_post', railsAjax.editPost);
})













 