//Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);


//Save the bookmark
function saveBookmark(e) {
    //Get form values
    var siteName = document.getElementById('siteName').value;
    var siteAdress = document.getElementById('siteAdress').value;
    
    document.getElementById('siteName').value = '';
    document.getElementById('siteAdress').value = '';
    
    if (!siteName || !siteAdress) {
        alert('Please fill in the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!siteAdress.match(regex)) {
        alert('Please input a valid URL');
        return false;
    }

    var bookmark = {
        name: siteName,
        adress: siteAdress
    }

    if(localStorage.getItem('bookmarks') === null) {
        
        var bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    } else {
        
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    }

    fetchBookmarks();

    // Prevent form submit
    e.preventDefault();
}

function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    var bookmarksResults = document.getElementById('bookmarksResults');

    bookmarksResults.innerHTML = '';
    
    if(!(bookmarks === null)) {
        
        for (var i = 0; i < bookmarks.length; i++) {
            var name = bookmarks[i].name;
            var adress = bookmarks[i].adress;
            bookmarksResults.innerHTML += 
            '<div class="jumbotron h-25 bg-grey">'
            + '<h3 class="text-primary">'+ name +'</h3>'
            + '<a class="btn btn-primary mx-2" target="_blank" href="'+adress+'">Visit</a>'
            + '<a class="btn btn-danger" onclick="deleteBookmark(\''+adress+'\')" href="#">Delete</a>'
            +'</div>';
        }
    }

}

function deleteBookmark(adress) {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].adress == adress) {
            bookmarks.splice(bookmarks[i], 1);
        }
    }

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    fetchBookmarks();
}