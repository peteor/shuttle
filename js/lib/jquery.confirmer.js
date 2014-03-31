/**
 * Confirmer
 * JQuery plugin to place a confirm interstitial
 * before a method is called
 * // Usage
    $(function() {
       var success = function () {
             $(this).hide();
         };
        $(".js--confirm").confirmer({confirmed : success});
    });
 */


(function ( $ ) {
    $.fn.confirmer = function( options ) {
 
        // Defaults 
        var settings = $.extend({
            color: "#556b2f",
            text: "Sure? ✔",
          confirmed: function () {
            console.log("action confirmed");
          },
        }, options );
        
       return this.each(function() {
         var $this = $(this);
         var originalText = $this.html();

         // Methods
         
         /**
          * resetConfirm
          * reset the button/input to its original state and binds the confirm handler
          */
         
         function resetConfirm () {
           $this.text(originalText).removeClass("js--confirm__required").unbind();
            $this.click(function(){
             runConfirm();
           });
         }
         
         /**
          * runConfirm
          * Handles what happens after confirm has been clicked
          */
         
         function runConfirm () {
           // Set up confirm message
           // Show conf msg, bind confirmed method,
           $this.text(settings.text).addClass("js--confirm__required").unbind();
           console.log("Confirm barrier hit");

           // If confirmed run completion method and reset button
           $this.click(function(){
             settings.confirmed.call(this);
             resetConfirm();
           });
         }
         
        /**
         * Initial event handler
         */
        
         $this.click(function(e){
           e.preventDefault();
           runConfirm();
         });
    });
    };
}( jQuery ));


