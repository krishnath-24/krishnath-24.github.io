{

    // method to submit form data for a new post using ajax
    let createPost = function() {

        let newPostForm = $('#new-post-form');

        newPostForm.submit((e)=>{
            e.preventDefault();
        console.log('here');
            
            $.ajax({
                type : 'POST',
                url : '/posts/create-post',
                data : newPostForm.serialize(),
                success : function(data) {
                    console.log(data);
                },
                error : function(error) {
                    console.log(error.responseText);
                }
            })
        });
    }

    createPost();
}