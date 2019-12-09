'use strict'

const searchURL = 'https://api.github.com/';

function displayResults(responseJson) {
    console.log(responseJson);
    $('#results-list').empty();
    for (let i=0; i< responseJson.length; i++) {
        $('#results-list').append(
            `<li><h3><a href="${responseJson[i].html_url}" target="_blank">${responseJson[i].name}</a></h3></li>`
        )};
    $('#results').removeClass('hidden');
};

function getRepos(handle) {
    const url = `${searchURL}users/${handle}/repos`;
    console.log(url);
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}
function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const handle = $('#js-handle').val();
        getRepos(handle);
    });
}

$(watchForm());