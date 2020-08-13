{
    let postComment = function() {

        let newCommentForm = $('#new-comment-form');

        newCommentForm.submit((event)=>{

            event.preventDefault();
            var arr = event.target.action.split('/');
            const postId = arr[arr.length-1];

            $.ajax({
                type : 'post',
                url : `/comment/create/${postId}`,
                data : newCommentForm.serialize(),
                success : function(data) {
                    console.log('ajax call made');
                    let newComment = createCommentDom(data.data.comment);
                    $(`#comment-container-${postId}`).innerHTML += (newComment);
                    console.log(data);
                },
                error : (error)=>{
                    console.log(error);
                }
            });
        });
    }


    let createCommentDom = function(comment) {

    return $(` <span id="comment-${comment.id }" style="list-style: none;">
                    <p class="text-success d-inline">${comment.content }</p> 
                    <a href="/comment/delete/${comment.id}" class="btn btn-sm p-1 btn-danger">Delete comment</a>
            </span>`)
    }


    
    postComment();
}