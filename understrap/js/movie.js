// Developed By: Sunit 
/** Get movie run time by IMDB Id from API */
function get_movie_run_time(imdb_id){
    var return_var;
    jQuery.ajax({
        async: false,
        type: "GET",
        url: 'https://www.omdbapi.com/?i='+imdb_id+'&apikey=455a0a4b',
        dataType: "json",
        success: function(data) {
            return_var = data.Runtime;
        }
    });
    return return_var;
}
jQuery(document).ready(function($){
    /** Click event on search button */
    $("#search").click(function(){
        var movie_name = $("#text").val(); // Value from the input type movie name
        if(movie_name != ''){
            let url = "https://www.omdbapi.com/?s="+movie_name+"&apikey=455a0a4b";
            $.ajax({
                url: url,
                type: "GET",
                dataType: "json",
                beforeSend: function() {
                    $('.block_listing_wrap').addClass('loading'); // Add loading class on wrap
                },
                success: function (data) {
                    var append_result = '';
                    var search_res =  data.Search;
                    // Looping every result coming from API
                    $.each(search_res, function(i, item) {
                        var run_time = get_movie_run_time(search_res[i].imdbID); // Getting movie run time by IMDB Id.
                        var title = search_res[i].Title;
                        var custfilter = new RegExp(movie_name, "ig"); // Find the searched movie name.
                        var repstr = "<span class='highlight "+movie_name+"'>"+movie_name+"</span>";
                        var heighlighted_title = title.replace(custfilter, repstr); // Add the heighlight to the searched word.
                        append_result += '<div class="block_cta">'+
                            '<div class="block_content_wrap">'+
                                '<div class="block_content">'+
                                    '<h3>'+heighlighted_title+'</h3>'+
                                    '<ul>'+
                                        '<li><span>Year:</span> '+search_res[i].Year+'</li>'+
                                        '<li><span>Runtime:</span> '+run_time+'</li>'+
                                    '</ul>'+
                                '</div>'+
                            '</div>'+
                            '<div class="block_img">'+
                                '<div class="bg_img" style="background-image: url('+search_res[i].Poster+')"></div>'+
                            '</div>'+
                        '</div>';
                    });
                    $('.block_listing_wrap').removeClass('loading');
                    $(".block_listing_wrap").html(append_result); // Appending the HTML into the block listing
                }
            });
        }
        else{
            alert('Name is required'); // Validation to input name
        }
    });
    /** Enter keyboard event to trigger search button click */
    $('#text').keypress(function (e) {
        var key = e.which;
        if(key == 13){
           $('#search').click();
           return false;  
        }
    }); 
});