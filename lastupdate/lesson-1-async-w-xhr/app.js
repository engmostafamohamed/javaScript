(function () {
    const form = document.querySelector('#submit-btn');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('click', function (e) {
        e.preventDefault();
        responseContainer.innerHTML='';
        searchedForText=searchField.value;
        const xhr=new XMLHttpRequest();
        const url="https://api.unsplash.com/search/photos?page=1&query="+searchedForText+"&client_id=tzxKo-a3lt6eQ55O4nk0mmB-xYhLXp8m5byzoV1kBLk";
        xhr.responseType='json';
        xhr.open('GET',url);
        //xhr.onload=addImage;
        xhr.send();


        // $.ajax({
        //     url:"https://api.unsplash.com/search/photos?page=1&query="+searchedForText+"&client_id=tzxKo-a3lt6eQ55O4nk0mmB-xYhLXp8m5byzoV1kBLk"
        // }).done(addTextImage);


        const mhr=new XMLHttpRequest();
        const url2="http://api.nytimes.com/svc/search/v2/articlesearch.json?q="+searchedForText+"&api-key=IHGGWV0yQ5V2MK2taG3SNzjVLm6PSF7m";
        // mhr.responseType='json';
        mhr.open('GET',url2);
        mhr.onload=addTextImage;
        mhr.send();

        // $.ajax({
        //     url2="http://api.nytimes.com/svc/search/v2/articlesearch.json?q="+searchedForText+"&api-key=IHGGWV0yQ5V2MK2taG3SNzjVLm6PSF7m"
        // }).done(addTextImage);

        function addTextImage(){
            // console.log( xhr.response );
            // console.log( data ); 
            let htmlContent2='';
            const data = JSON.parse( this.responseText );// convert data from JSON to a JavaScript object
            //const data2 = JSON.parse(this.responseText);
            //if(data2&&data2.results&&data2.results[0]&&data.response&&data.response.docs&&data.response.docs.length>1){
            if(xhr.response&&xhr.response.results&&xhr.response.results[0]&&data.response&&data.response.docs&&data.response.docs.length>1){
                for(let i=0;i<10;i++){
                    let htmlContent='';
                    
                    //const photo=data2.results[i];

                    const photo=xhr.response.results[i];
                    htmlContent=`<figure>
                        <img src="${photo.urls.regular}" alt="${searchedForText}">
                        <figcaption>${searchedForText}by${photo.user.username}</figcaption>
                    </figure> `;
                   
                    const text=data.response.docs[i];
                     htmlContent2='<ul>'+`<li class="article">
                        <h2><a href="${text.web_url}">${text.headline.main}</a></h2>
                        <p>${text.snippet}</p>
                    </li>` +'</ul>';
                    
                    responseContainer.insertAdjacentHTML('beforeend',htmlContent+htmlContent2);
                }
            }
            else{

                htmlContent='<div class="error-no-image">No image available</div>';
                htmlContent2='<div class="error-no-article">No articles  available</div>';
                responseContainer.insertAdjacentHTML('beforeend',htmlContent+htmlContent2);
            }

        }
    });
})();
