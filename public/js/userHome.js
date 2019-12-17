$(document).ready(function () {

  $('#saved-news').on('click','.newsCard' ,function () {

      const id = $(this).data('id');
      const articleId = {
        id: id
      }
      $.post('/user/dashboard',articleId,function(e){      
          //redirects user to dashboard page 
          window.location.href = "/user/dashboard";
          
      })
     
    });

});