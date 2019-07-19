//Using AJAX to call 12 Random Userers 
function capital(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
//Using AJAX to call 12 Random Userers 
let jsonData
$.ajax({
    url: 'https://randomuser.me/api/?results=12&nat=US',
    dataType: 'json',
    success: function (data) {
        // console.log(data);
        jsonData = data.results;
        //Looping through each user and pulling JSON info
        jsonData.forEach(person => {
            const picture = person.picture.large;
            const firstName = person.name.first;
            const lastName = person.name.last;
            const email = person.email;
            const locCity = person.location.city;
            const locState = person.location.state

            //Adding HTML elements of user's gallery cards dynamicaly
            const gallCard =
                `<div class ="card">
<div class="card-img-container">
    <img class="card-img" src="${picture}" alt="profile picture">
</div>
<div class="card-info-container">
    <h3 id="name" class="card-name cap">${firstName} ${lastName}</h3>
    <p class="card-text">${email}</p>
    <p class="card-text cap">${locCity}, ${locState}</p>
</div>`
            //Appending HTML to id gallery div
            $('#gallery').append(gallCard);
        });
    }
});
//Creating Modal Window for each user, to be created only when the user's card is cliked
function modalWindow(i) {
    const picture = jsonData[i].picture.large;
    const fName = jsonData[i].name.first;
    const lName = jsonData[i].name.last;
    const email = jsonData[i].email;
    const city = capital(jsonData[i].location.city);
    const street = capital(jsonData[i].location.street);
    const state = capital(jsonData[i].location.state);
    const postcode = jsonData[i].location.postcode;
    const phone = jsonData[i].phone;
    let dob = jsonData[i].dob.date;
    dob = dob.slice(5, 7) + "/" + dob.slice(8, 10) + "/" + dob.slice(0, 4)


    const modWin =
        `<div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${picture}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${fName} ${lName}</h3>
                        <p class="modal-text">${email}</p>
                        <p class="modal-text cap">${city}</p>
                        <hr>
                        <p class="modal-text">${phone}</p>
                        <p class="modal-text">${street}, ${city}, ${state} ${postcode}</p>
                        <p class="modal-text">Birthday: ${dob}</p>
                    </div>
                </div>`
    $('body').append(modWin);
    //Listening for Modal Window to be clicked / then closes Modal Window

    $("#modal-close-btn").on('click', function () {
        //console.log("hello");
        $(".modal-container").remove();
    });
};
//Listening for each user gallery card to e clicked, then opens modal window
$('#gallery').on('click', '.card', function () {
    i = ($(this).index());
    modalWindow(i);
});

/*function modalWindow(i) {
    if (i === 0) {
        $('.modal-prev').remove()
    } else if (i === 11) {
        $('.modal-next').remove()
    }
}
$('.modal-next').on('click', function () {
    $('.modal-container').remove();
    i++
    modalWindow(i);
});
$('.modal-prev').on('click', function () {
    $('.modal-container').remove();
    i--
    modalWindow(i);
});*/