// It might be a good idea to add event listener to make sure this file 
// only runs after the DOM has finshed loading. 
document.addEventListener("DOMContentLoaded", function () {

    const urlQ = "http://localhost:3000/quotes?_embed=likes"
    const urlLike = "http://localhost:3000/likes"

 
    
    function fetchAndRenderQuotes () {
        fetch(urlQ)
            .then(resp => resp.json())
            .then(renderQuotes);
    };

    function renderQuotes(quotes) { 
        for (const quote of quotes) { 
            renderQ(quote)
        }     
    }
       
    const ulListQuotes = document.querySelector("#quote-list") 


    function renderQ(quote) {
        const liQuote = document.createElement('li') 
        liQuote.classList = 'quote-card'

        const blockQuote = document.createElement('blockquote') 
        blockQuote.classList= "blockquote"

        const pQuote = document.createElement('p')
        pQuote.className.add = "mb-0"
        pQuote.innerText = quote.quote

        const footerQuote = document.createElement('footer')
        footerQuote.classList = "blockquote-footer"
        footerQuote.innerText = quote.author

        const btnSucces = document.createElement('button')
        btnSucces.classList = 'btn-success'
        btnSucces.innerText = "Likes: "

        ///LIKE UPDATE
        btnSucces.addEventListener("click", function (e) {
            updateLikes(quote)
            
                .then(++spanQ.innerText)
        })


        const spanQ = document.createElement('span')
        spanQ.innerText = quote.likes.length

        btnSucces.appendChild(spanQ)

        const brQ = document.createElement('br')

        const btnDanger = document.createElement('button')
        btnDanger.classList = 'btn-danger'
        btnDanger.innerText = "Delete "
       


        ////DELETE
        btnDanger.addEventListener("click", function (e) {
            destroyQuote(quote)
                .then(liQuote.remove())
        })


        blockQuote.append(pQuote, footerQuote, brQ, btnSucces, btnDanger)
        liQuote.appendChild(blockQuote)
        ulListQuotes.appendChild(liQuote)

    }



    //form + create new quote
    newForm = document.querySelector("#new-quote-form")
    newForm.addEventListener('submit', function (e) {
        e.preventDefault
        const newQuote = document.querySelector("#new-quote").value
        const newAuthor = document.querySelector("#author").value
       
        let quoteBody = {
            quote: newQuote,
            author: newAuthor
        }
        
        createNewQuote(quoteBody)
        .then (renderQ)          

    })

    function createNewQuote(quote) { 

        const configurationObject = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(quote)
        }

        return fetch(urlQ, configurationObject)
            .then(resp => resp.json())
    }
    


    function destroyQuote(quote) { 
        const configurationObject = {
            method: "DELETE"
        }
        return fetch('http://localhost:3000/quotes/' + quote.id, configurationObject)
         .then(resp => resp.json())
    }




    function updateLikes(quote) { 
        const configurationObject = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                quoteId: quote.id,
                createdAt: Date.now()
            })
        }

        return fetch(urlLike, configurationObject)
            .then(resp => resp.json())

    }
 

   


 fetchAndRenderQuotes()
})