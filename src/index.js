//the build page function renders the page after DOM contet has loaded
const buildPage = function(){
// The result details div is created and appended
    const resultDetailsDiv = document.createElement('div');
    resultDetailsDiv.id = 'result_details_div';
    document.body.appendChild(resultDetailsDiv);
// The verses div is created and appended
    const versesDiv = document.createElement('div');
    versesDiv.id = 'verses_div';
    versesDiv.textContent = "Your search results will appear here. Provide the details for your search then press the search button."
    document.body.appendChild(versesDiv);
// Function calls for the three search alternatives provided
    searchForChapter();
    searchForVerse();
    searchForVerseByKeyword();

// First function definition
function searchForChapter(){
    // Variable name assigned to the search input field
    // Search is done using a chapter number from the user, passed into the endpoint url  
    let chapterNumberProvided = document.querySelector('#search_for_chapter');
    // Event listener added to search button to execute fetch from the relevant API endpoint
    // User input is injected into the url on fetch as the parameters for the search
    document.querySelector('#search_button').addEventListener('click', () => {
    fetch(`http://api.alquran.cloud/v1/surah/${chapterNumberProvided.value}/en.pickthall`)
    .then(function(response){return response.json()})
    .then(function(data){
        
        const resultsSurah = data.data.ayahs;// array of verses assigned to a variable
        versesDiv.textContent = ''; // Verses div is emptied before new search results arrive
        // A for loop is then used to iterate through the verses and display each inside a list element
        for (let i = 0; i < resultsSurah.length; i++){
            const searchResults = document.createElement('li');
            // The chapter and verse numbers are displayed just before the verse text
            searchResults.textContent = `[${data.data.number}:${data.data.ayahs[i].numberInSurah}] ${data.data.ayahs[i].text}`;
            versesDiv.appendChild(searchResults);
            // Details of the search results are displayed above the results in the result details div
            resultDetailsDiv.textContent = `CHAPTER ${data.data.number}: ${data.data.englishName} (${data.data.englishNameTranslation})`;

        }
        })
        .catch(function(error){alert('Please make sure the chapter number you entered is valid')});
        chapterNumberProvided.value = ''; // search input field is cleared for the next search
    })
}

// Second function definition
function searchForVerse(){
    // Variable names assigned to the two search input fields
    // Search is done using a chapter number and a verse number from the user, passed into the endpoint url  
    let chapterNumberProvided2 = document.querySelector('#search_for_chapter2');
    let verseNumberProvided = document.querySelector('#search_for_verse');
    // Event listener added to search button to execute fetch from the relevant API endpoint
    // User input is injected into the url on fetch as the parameters for the search
    document.querySelector('#search_button2').addEventListener('click', () => {
    fetch(`http://api.alquran.cloud/v1/ayah/${chapterNumberProvided2.value}:${verseNumberProvided.value}/en.pickthall`)
    .then(function(response){return response.json()})
    .then(function(data){

        versesDiv.textContent = ''; // Verses div is emptied before new search results arrive
        const searchResults2 = document.createElement('li');
        // The chapter and verse numbers are displayed just before the verse text
        searchResults2.textContent = `[${data.data.surah.number}:${data.data.numberInSurah}] ${data.data.text}`;
        versesDiv.appendChild(searchResults2);
        // Details of the search results are displayed above the results in the result details div
        resultDetailsDiv.textContent = `CHAPTER ${data.data.surah.number}: ${data.data.surah.englishName} (${data.data.surah.englishNameTranslation}) - VERSE: ${data.data.numberInSurah}`;

        })
        .catch(function(error){alert('Please make sure the verse and chapter number you entered are valid')});
        chapterNumberProvided2.value = ''; // search input fields are cleared for the next search
        verseNumberProvided.value = '';
    })
}

// Third function definition
function searchForVerseByKeyword(){
    // Variable names assigned to the two search input fields
    // Search is done using a keyword and a chapter number from the user, passed into the endpoint url  
    let keywordProvided = document.querySelector('#search_for_keyword');
    let chapterNumberProvided3 = document.querySelector('#search_for_chapter3');
    // Event listener added to search button to execute fetch from the relevant API endpoint
    // User input is injected into the url on fetch as the parameters for the search
    document.querySelector('#search_button3').addEventListener('click', () => {
        fetch(`http://api.alquran.cloud/v1/search/${keywordProvided.value}/${chapterNumberProvided3.value}/en.pickthall`)
        .then(function(response){return response.json()})
        .then(function(data){

            const results = data.data.matches;// array of verses
            versesDiv.textContent = ''; // Verses div is emptied before new search results arrive
            // A for loop is then used to iterate through the verses and display each inside a list element
            for (let i = 0; i < results.length; i++){
                const searchResults3 = document.createElement('li');
                // The chapter and verse numbers are displayed just before the verse text
                searchResults3.textContent = `[${data.data.matches[i].surah.number}:${data.data.matches[i].numberInSurah}] ${data.data.matches[i].text}`;
                versesDiv.appendChild(searchResults3);
                // Details of the search results are displayed above the results in the result details div
                resultDetailsDiv.textContent = `Search results for keyword:`
            }

        })
        .catch(function(error){alert('Please make sure the keyword and chapter number you entered are valid')});
        keywordProvided.value = ''; // search input fields are cleared for the next search
        chapterNumberProvided3.value = '';
    })
}
}

document.addEventListener('DOMContentLoaded', buildPage);