    

    $(document).scroll(function() {
        var y = $(this).scrollTop();
        if (y > 100) {
            $('.media-controls-container').fadeIn();
            $('.media-controls-container').css({
                "display": "flex"
            });
        } 
    });


    function show(shown, hidden) {

      document.getElementById(shown).style.display='block';
      document.getElementById(hidden).style.display='none';
      console.log(shown);   
      if(shown == "page2") {
        document.getElementById(shown).style.display='flex';
      }
      window.scrollTo(0, 0);
      return false;
    }
