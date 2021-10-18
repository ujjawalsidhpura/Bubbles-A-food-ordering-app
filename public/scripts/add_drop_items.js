//  $(document).ready(function() {
export const add_drop_button_event = function(){
  let quantity = 0;

  $("button.add-button").click(function(){
    console.log("hello");
    quantity ++;
    $(this).siblings(".quantity").text(quantity);
  })

  $("button.drop-button").click(function(){
    if(quantity > 0){
      console.log("hello");
      quantity --;
      $(this).siblings(".quantity").text(quantity);
    }
  })

  $(".quantity").on("mouseenter", function() {
    $(this).css("color","#fad390");
  });

  $(".quantity").on("mouseleave", function() {
    $(this).css("color","#60a3bc");
  });

  $(".card").on("mouseenter", function() {
    $(this).css("box-shadow", "10px 5px 5px #60a3bc");
    const tweets_footer = $(this).children(".card-footer");
    tweets_footer.css("box-shadow", "0px 10px #60a3bc");
  });

  $(".card").on("mouseleave", function() {
    $(this).css("box-shadow", "none");
    const tweets_footer = $(this).children(".card-footer");
    tweets_footer.css("box-shadow", "none");
  });
}


// })
