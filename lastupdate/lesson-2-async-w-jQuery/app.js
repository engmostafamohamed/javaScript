/* eslint-env jquery */

(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        
        $.ajax({
            url:"https://api.unsplash.com/search/photos?page=1&query="+searchedForText+"&client_id=tzxKo-a3lt6eQ55O4nk0mmB-xYhLXp8m5byzoV1kBLk"
        }).done(addImage)
        .fail(function(err){
            requestError(err,'image');
        });

        $.ajax({
            url:"http://api.nytimes.com/svc/search/v2/articlesearch.json?q="+searchedForText+"&api-key=IHGGWV0yQ5V2MK2taG3SNzjVLm6PSF7m"
        }).done(addArticles)
        .fail(function(err){
            requestError(err,'articles');
        });

        function addImage(data){
            let htmlContent='';
            console.log(data);
            if(data&&data.results&&data.results.length>1){
               const firstImage= data.results[0];
               htmlContent=`<figure>
               <img src="${firstImage.urls.regular} alt="${searchedForText}">
               <figcaption>${searchedForText}by${firstImage.user.name}</figcaption>
               <figure>`
            }
            else{
                htmlContent='<div class="error-no-image">No Image Available</div>';
            }
            responseContainer.insertAdjacentHTML("afterbegin",htmlContent);
        }
        function addArticles(data){
            let htmlContent='';
            if(data.response && data.response.docs&&data.response.docs.length>1){
                const articles=data.response.docs;
                htmlContent='<ul>'+articles.user.map(article=>`<li class="article">
                        <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
                        <p>${article.snippet}</p>
                    </li>`
                ).join('')+'</ul>';
            }
            else{
                htmlContent='<div class="error-no-image">No article Available</div>';
            }
            responseContainer.insertAdjacentHTML("beforeend",htmlContent);
        }
        function requestError(e,part){
            responseContainer.insertAdjacentHTML('beforeend',`<p class="network-warning-error">NETWORK ERROR </p>`)
        }

    });
})();
