(function($) {
    
    $(function() {
        const giphy = {
            topics_array: ["Rocky", "Avengers Infinity War", "The Godfather", "The Terminator","Fight Club","Home Alone","The Green Mile","Titanic","The Shawshank Redemption","The Dark Knight Rises","Pulp Fiction","Harry Potter and the Deathly Hallows","Gangs of New York"],
            init() {
                this.dom_cache();
                this.event_binding();
                this.topics_btns();
            },
            dom_cache() {
                this.$btns_container = $('#btns-topics');
                this.$list = $('#list');
                this.$input = $('input');
                this.$add_film_btn = $('#add-film');
                this.$msg = $('#msg');
            }, 
            event_binding() {
                this.$btns_container.on('click', 'button.topics', this.get_gifs.bind(this)); 
                this.$list.on('click', '.topic-img', this.gify.bind(this));     
                this.$add_film_btn.on('click', this.create_btn.bind(this));  
            }, 
            topics_btns() { // Create buttons 
                this.$btns_container.html('');   // Make sure the container is empty
                for(let i = 0; i < this.topics_array.length; i++){
                    let btn = $(`<button class="topics" data-name="${this.topics_array[i]}">${this.topics_array[i]}</button>`); // Create a button for every topic in the array and passed the value/text to the data-name attr
                    this.$btns_container.append(btn);   // Show the buttons in the page
                }
            },
            get_gifs(e){
                const topic = $(e.target).attr('data-name');    // Get the data-name attr from the clicked button
                const k = "lFF9Yxkitf2ugL6Waes2cFHNZ8UE1h5i";    // API Key
                const l = "10";  // Limit of results
                const reqURL = `https://api.giphy.com/v1/gifs/search?q=${topic}&api_key=${k}&limit=${l}`;
                
                $.ajax({    // Initialize AJAX request to GIPHY API
                    url: reqURL,
                    request: 'GET'
                }).done( res => {
                    console.log(res);   
                    this.$list.html('');  
                    
                    for(let j = 0; j < res.data.length; j++) {  
                        let rating = `${res.data[j].rating.toUpperCase()}`;   // Get the rating
                        let img_src = `${res.data[j].images["480w_still"].url}`;    // Get the url
                        let gif_src = `${res.data[j].images.downsized.url}`;
                        
                        const rating_p = $(`<p class="topic-p"><strong>Rating:</strong> ${rating}</p>`) 
                        const static_img = $(`<img class="topic-img" src="${img_src}" data-status="static" data-img="${img_src}" data-gif="${gif_src}">`);   
                        const item_container = $(`<div class="item-container">`);   // Create a <div> to hold each <img> and <p>
                        
                        item_container.append(rating_p, static_img); 
                        this.$list.append(item_container);  // Attach the container to the page
                    }
                });
            },
            gify(e){    
                const $target = $(e.target);
                const $gif_src = $target.attr('data-gif');   
                const $img_src = $target.attr('data-img');  
                const $status = $target.attr('data-status');
              
                if($status === 'static') {
                    $target.attr('data-status', 'animated');
                    $target.attr('src', $gif_src);
                    console.log($target);
                } 
                else {
                    $target.attr('data-status', 'static');
                    $target.attr('src', $img_src);
                }
            },
            create_btn(){
                const new_topic = this.$input.val().toUpperCase();
                const already_in_arr = this.topics_array.indexOf(new_topic);

                if (already_in_arr < 0){    // Check if the button doesn't exist
                    this.topics_array.push(new_topic);
                    this.$input.val('');    // Clear the input
                    this.topics_btns(); // Render the buttons including the new button
                }
                else {  // If the item alreay exists in the array
                    this.$msg.html(`You already created <i>${new_topic}</i>!`);     // Inform the user  
                    setTimeout(this.clear_msg.bind(this), 3000);    // Clear the message after 3 secs
                }
            },
            clear_msg() {
                this.$msg.html('');
            }
        }
        giphy.init();
    });
    
})(jQuery); 