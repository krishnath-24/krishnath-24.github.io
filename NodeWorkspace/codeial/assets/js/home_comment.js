{
    let postComment = function() {

        let newCommentForm = $('#new-comment-form');

        newCommentForm.submit((event)=>{
            event.preventDefault();
            console.log(post._id);
            return;
            // $.ajax({
            //     type : 'post',
            //     url : '/comment/create/${post._id}'
            // })
        });
    }

    postComment();
}