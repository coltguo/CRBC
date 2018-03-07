$( window ).on( 'load', function () {
    $( "#clients-slider" ).slick( {
        autoplay : true,
        autoplaySpeed : 2000,
        infinite : true,
        arrows : true
    } );
    $( "#clients-mob-slider" ).slick( {
        autoplay : false,
        infinite : false,
        slidesToShow : 1,
        slidesToScroll : 1,
        variableWidth : true,
        arrows : false,
    } );
} );