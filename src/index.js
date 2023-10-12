const buildPage = function(){
    let chapterNumberProvided = document.querySelector('#search_for_chapter');
    document.querySelector('#search_button').addEventListener('click', () => {
    fetch(`http://api.alquran.cloud/v1/surah/${chapterNumberProvided.value}/en.pickthall`)
    .then(function(response){return response.json()})
    .then(function(data){
        console.log(data);
        
        const resultsSurah = data.data.ayahs;// array of verses
        console.log(data.data.ayahs[0].text);

        for (let i = 0; i < resultsSurah.length; i++){
            
            //ayat3.textContent = `${data.data.ayahs[i].text}`;
            const ayat3 = document.createElement('div');
            ayat3.className = 'ayat3';
            document.body.appendChild(ayat3);
            const searchResults3 = document.createElement('li');
            searchResults3.textContent = '';
            searchResults3.textContent = `${data.data.ayahs[i].numberInSurah})  ${data.data.ayahs[i].text}`;
            ayat3.appendChild(searchResults3);
        }
        });
    })

    let chapterNumberProvided2 = document.querySelector('#search_for_chapter2');
    let verseNumberProvided = document.querySelector('#search_for_verse');
    document.querySelector('#search_button2').addEventListener('click', () => {
        fetch(`http://api.alquran.cloud/v1/ayah/${chapterNumberProvided2.value}:${verseNumberProvided.value}/en.pickthall`)
    .then(function(response){return response.json()})
    .then(function(data){
        console.log(data);
        
        console.log(data.data.text);

        const ayat2 = document.createElement('div');
        ayat2.className = 'ayat2';
        document.body.appendChild(ayat2);
        const searchResults2 = document.createElement('li');
        searchResults2.textContent = `${data.data.text}`;
        ayat2.appendChild(searchResults2);

        });
    })

    let keywordProvided = document.querySelector('#search_for_keyword');
    let chapterNumberProvided3 = document.querySelector('#search_for_chapter3');

    document.querySelector('#search_button3').addEventListener('click', () => {
        fetch(`http://api.alquran.cloud/v1/search/${keywordProvided.value}/${chapterNumberProvided3.value}/en.pickthall`)
        .then(function(response){return response.json()})
        .then(function(data){
            console.log(data);
            
            console.log(data.data.matches[0].text);
            const results = data.data.matches;// array of verses
    
            for (let i = 0; i < results.length; i++){
                console.log(`${results.length}`);
                const ayat = document.createElement('div');
                ayat.className = 'ayat';
                document.body.appendChild(ayat);
                const searchResults = document.createElement('li');
                searchResults.textContent = `${data.data.matches[i].text}`;
                ayat.appendChild(searchResults);
    
            }
        });
    })
}



document.addEventListener('DOMContentLoaded', buildPage);