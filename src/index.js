const buildPage = function(){
    const versesDiv = document.createElement('div');
    versesDiv.id = 'verses_div';
    document.body.appendChild(versesDiv);

    searchForChapter();
    searchForVerse();
    searchForVerseByKeyword();

function searchForChapter(){
    let chapterNumberProvided = document.querySelector('#search_for_chapter');
    document.querySelector('#search_button').addEventListener('click', () => {
    fetch(`http://api.alquran.cloud/v1/surah/${chapterNumberProvided.value}/en.pickthall`)
    .then(function(response){return response.json()})
    .then(function(data){
        console.log(data);
        
        const resultsSurah = data.data.ayahs;// array of verses
        console.log(data.data.ayahs[0].text);
        
        versesDiv.textContent = '';
        for (let i = 0; i < resultsSurah.length; i++){
            const searchResults3 = document.createElement('li');
            searchResults3.textContent = `[${data.data.number}:${data.data.ayahs[i].numberInSurah}] ${data.data.ayahs[i].text}`;
            versesDiv.appendChild(searchResults3);
        }
        })
        .catch(function(error){alert('Please make sure the chapter number you entered is valid')});
        chapterNumberProvided.value = '';
        
    })
}
function searchForVerse(){
    let chapterNumberProvided2 = document.querySelector('#search_for_chapter2');
    let verseNumberProvided = document.querySelector('#search_for_verse');
    document.querySelector('#search_button2').addEventListener('click', () => {
    fetch(`http://api.alquran.cloud/v1/ayah/${chapterNumberProvided2.value}:${verseNumberProvided.value}/en.pickthall`)
    .then(function(response){return response.json()})
    .then(function(data){
        console.log(data);
        console.log(data.data.text);

        versesDiv.textContent = '';
        const searchResults2 = document.createElement('li');
        searchResults2.textContent = `[${data.data.surah.number}:${data.data.numberInSurah}] ${data.data.text}`;
        versesDiv.appendChild(searchResults2);
        })
        .catch(function(error){alert('Please make sure the verse and chapter number you entered are valid')});
        chapterNumberProvided2.value = '';
        verseNumberProvided.value = '';
    })
}
function searchForVerseByKeyword(){
    let keywordProvided = document.querySelector('#search_for_keyword');
    let chapterNumberProvided3 = document.querySelector('#search_for_chapter3');
    document.querySelector('#search_button3').addEventListener('click', () => {
        fetch(`http://api.alquran.cloud/v1/search/${keywordProvided.value}/${chapterNumberProvided3.value}/en.pickthall`)
        .then(function(response){return response.json()})
        .then(function(data){
            console.log(data);
            console.log(data.data.matches[0].text);

            const results = data.data.matches;// array of verses
            versesDiv.textContent = '';
            for (let i = 0; i < results.length; i++){
                console.log(`${results.length}`);
                const searchResults = document.createElement('li');
                searchResults.textContent = `[${data.data.matches[i].surah.number}:${data.data.matches[i].numberInSurah}] ${data.data.matches[i].text}`;
                versesDiv.appendChild(searchResults);
            }
        })
        .catch(function(error){alert('Please make sure the keyword and chapter number you entered are valid')});
        keywordProvided.value = '';
        chapterNumberProvided3.value = '';
    })
}





}

document.addEventListener('DOMContentLoaded', buildPage);