{

    // method to attach ajax delete to all existing post

    let attachAjaxDeleteToPosts = function() {

        let posts = $('#post-list-container>ul>li');
        
        for(post of posts) {
            deletePost($(' .delete-post-button',post));
        }
    }


    // method to submit the form data for new post using ajax
    let createPost = function() {


        let newPostForm = $('#new-post-form');
        newPostForm.submit((e)=>{

            e.preventDefault();

            $.ajax({
                type : 'post',
                url : '/posts/create-post',

                data : newPostForm.serialize(),

                success : function(data) {

                    let newPost = newPostDom(data.data.post,data.data.name);

                    $('#post-list-container>ul').prepend(newPost);

                    displayNotification('success','Post created.');

                    deletePost($(' .delete-post-button',newPost));

                },error : function(error) {

                    displayNotification('error',error);
                    console.log(error.responseText);
                }
            })
        });

    }

    let newPostDom = function(post,name) {

        return $(`<li id="post-${post._id}">
    
                <h3 class="text-primary d-inline mr-2">${post.content}</h3>
            
                <a class="btn btn-sm btn-danger delete-post-button" href="/posts/destroy/${post._id}">Delete Post</a>
                
                <div class = "post-comments" >

                <form action="/comment/create/${post._id}" method="POST" class="form-inline mt-3">
                    <small>
                        ${name}
                    </small>
                    <div class="form-group mx-sm-3 mb-2">
                        <label for="inputComment" class="sr-only">Comment</label>
                        <input type="hidden" name = "post" value="${post._id}" >
                        <input required type="text" class="form-control" id="inputComment" placeholder="comment" name="content">
                    </div>
                    <button type="submit" class="btn btn-primary mb-2">Submit</button>
                </form>
            
                
                    <div class="post-comments-list">
                        <ul id="post-comments-${post._id}">

                        </ul>
                    </div>
                </div>
            
            </li>`)
    }


    // method to delete a post
    let deletePost = function(deleteLink) {

        $(deleteLink).click((e)=>{
            e.preventDefault();

            $.ajax({
                type : 'get',
                url : $(deleteLink).prop('href'),
                success : (data)=>{
                    $(`#post-${data.data.post_id}`).remove();
                    displayNotification('success','Post deleted.');
                }, error : (error)=>{
                    console.log(error);
                }
            });
        });
    }


    let displayNotification = function(type, message) {
        new Noty({
            theme : 'relax',
            text: message,
            type : type,
            layout : 'topRight',
            timeout : 1500
        }).show();
    }


    attachAjaxDeleteToPosts();
    createPost();
}