// favoriteAjax = {};
// favoriteAjax.fields = ["is_favorited", "post_id", "user_id"];

// favoriteAjax.togglePages = function(showPage){
//   var hidePage = (showPage === '#new_favorite') ? '#all_favorites' : '#new_favorite';
//   $(hidePage).slideUp(function(){
//     $(showPage).slideDown();
//   });
// }

// favoriteAjax.favoriteForm = function(event){
//   event.preventDefault();
//   var id = $("form #id").val();
//   if(id != ""){
//     url = '/favorites/' + id;
//     type = "PUT"
//   } else {
//     url = '/favorites';
//     type = "POST";
//   }

//   var data = {};
//   $.each(favoriteAjax.fields, function(index, field){
//     data[field] = $('#' + field).val();
//   })

//   $.ajax({
//     url: url,
//     type: type,
//     data: {favorite: data},
//     dataType: "json"
//   }).success(function(data){
//     //Fetch all favorites from the server (will include the favorite we just created);
//     favoriteAjax.getFavorites();
//     favoriteAjax.togglePages('#all_favorites');
//   })
// }

// favoriteAjax.getFavorites = function(){
//   //Clear the favorites table to avoid duplicating favorites;
//   $('#all_favorites table tbody').empty();
  
//   //Ajax request to the server to get all the favorites;
//   $.ajax({
//     url: '/favorites',
//     type: 'GET',
//     dataType: "json"
//   }).success(function(data){
//     $.each(data, function(index, item){
//       var row = $("<tr>"+
//         "<td>" + item.user_id +"</td>"+
//         "<td>" + item.title+"</td>"+
//         "<td>" + item.body +"</td>"+
//         "<td>" + item.latitude+"</td>"+
//         "<td>" + item.latitude+"</td>"+
//         "<td><button data-id='" + item.id+"' class='btn edit_favorite'>Edit</button> <button data-id='" + item.id+"' class='btn btn-danger delete_favorite'>Delete</button></td>"+
//         "</tr>");
//       row.appendTo("#all_favorites table tbody");
//     })
//   })
// }

// favoriteAjax.deleteFavorite = function(){
//   $this = $(this);
//   var favoriteId = $this.data('id');
//   $.ajax({
//     url: '/favorites/' + favoriteId,
//     type: 'DELETE',
//     dataType: "json"
//   }).success(function(data){
//     // $this.parent().parent().remove();
//     $this.closest('tr').remove();
//   });
// }

// favoriteAjax.editFavorite = function(){
//   console.log('editfavorite');
//   //Look up the favorite in the database so we can prepopulate the form with data;
//   var favoriteId = $(this).data('id');
//   $.ajax({
//     url: '/favorites/' + favoriteId,
//     type: 'GET',
//     dataType: "json"
//   }).success(function(data){
//     $.each(favoriteAjax.fields.concat(['id']), function(index, field){
//       $("input[name=" + field + "]").val(data[field]);
//     });
//     favoriteAjax.togglePages('#new_favorite');
//   })
// }

// $(document).ready(function(){

//   $('#new_favorite_link, #all_favorites_link').on('click', function(event){
//     event.preventDefault();
//     var showPage = '#' + $(this).attr('id').replace('_link', '');
//     if(showPage === '#new_favorite'){
//       $.each(favoriteAjax.fields.concat(['id']), function(index, field){
//         $("input[name=" + field + "]").val('');
//       });
//     };
//     favoriteAjax.togglePages(showPage);
//   });

//   $('#favorite_form').on('submit', favoriteAjax.favoriteForm);
//   favoriteAjax.getFavorites();
//   //Need to use event delegation here, as .delete_favorites is not in html when page loads;
//   $('#all_favorites').on('click', '.delete_favorite', favoriteAjax.deleteFavorite);
//   $('#all_favorites').on('click', '.edit_favorite', favoriteAjax.editFavorite);
// })













//  