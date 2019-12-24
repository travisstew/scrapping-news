$(document).ready(function () {

  $('#saved-news').on('click','.newsCard' ,function () {
      const id = $(this).data('id');
      const articleId = {
        id: id
      }
      $.post('/user/dashboard',articleId,function(e){      
          
          window.location.href = "/user/dashboard";         
      });
    });

    $("#noted-news").on('click','.noteCard',function () { 
      const id = $(this).data('id');
      const newNote = $(`#${id}`).val();
      const notes = {
        note:newNote
      }
      $.ajax({url:`/user/note/${id}`,method:'PUT',data:notes}).then(function () {
              window.location.href = "/user/dashboard"
          });
        });

     $("#noted-news").on('click','.deleteCard',function () {
            const id = $(this).data('id');
            const deleteId = {
              id:id,
            }
        $.ajax({url:'/user/delete', method:'DELETE', data:deleteId}).then(function () { 
             window.location.href = "/user/dashboard"
         })
        });
    
    
});