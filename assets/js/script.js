const openingElement = $('.opening');
const btnStopMusic = $('.btn-music.stop');
const btnPlayMusic = $('.btn-music.play');
const music = document.getElementById('music');
// get name of invited person
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const invitedPerson = urlParams.get('to');

const invitedPersonElement = $('#invited-person');
invitedPersonElement.text(invitedPerson);

const listComments = document.getElementsByClassName('list-comments');
// end get name of invited person

// btn open invitation
if( window.screen.width <= 768 ) {
    openingElement.css('height', window.screen.height)
}
const btnOpenInvitation = $('.btn-open-invitation');
if( btnOpenInvitation ) {
    btnOpenInvitation.click( function() {
        openingElement.css( 'display', 'none' );
        btnStopMusic.css( 'display', 'inline-block' );
        music.play()
    } );
}
btnStopMusic.on('click', function() {
    btnStopMusic.css('display', 'none')
    btnPlayMusic.css( 'display', 'inline-block' );
    music.pause()
})
btnPlayMusic.on('click', function() {
    btnPlayMusic.css('display', 'none')
    btnStopMusic.css( 'display', 'inline-block' );
    music.play()
})
// end btn open invitation

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";
import { getDatabase, ref, set, get, child, update, remove } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyB-KdGd2_-N8sf0VKWoMGijqRbzGxtM9Hw",
    authDomain: "wedding-invitation-9a217.firebaseapp.com",
    projectId: "wedding-invitation-9a217",
    storageBucket: "wedding-invitation-9a217.appspot.com",
    messagingSenderId: "118278211647",
    appId: "1:118278211647:web:2d8fa4f3a97897090a108a",
    databaseURL: "https://wedding-invitation-9a217-default-rtdb.asia-southeast1.firebasedatabase.app/"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase();

function getComments() {
    const databaseRef = ref(database);
    listComments.innerHTML = '';

    get( child( databaseRef, "comments/" ) )
        .then( (snapshot) => {
            if( snapshot.exists() ) {
                const datas = snapshot.val();
                console.log( datas )
                for (const data in datas) {
                    if (Object.hasOwnProperty.call(datas, data)) {
                        const element = datas[data];
                        
                        const commentCard = `
                            <div class="comment">
                                <img src="assets/images/placeholder-1.png" alt="">
                                <div class="comment-card">
                                    <div class="header font-weight-500">
                                        <p>${element.name}</p>
                                        <p class="badge-state font-weight-600">${element.state}</p>
                                    </div>
                                    <p class="font-weight-500">${element.comment}</p>
                                </div>
                            </div>
                        `;
                        listComments[0].innerHTML += commentCard;
                    }
                }
            }
        } )
}
getComments();

const btnCopyText = $('.btn-copy-text')
if( btnCopyText ) {
    btnCopyText.click( function() {
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val(this.dataset.account).select();
        document.execCommand("copy");
        $temp.remove();
    } )
}

function countdownTimer() {
    const daysElement = $('#days');
    const hoursElement = $('#hours');
    const minutesElement = $('#minutes');
    const secondsElement = $('#seconds');
    const countdownDate = new Date('Dec 8, 2022 10:00:00').getTime();

    const x = setInterval(function() {
        let now = new Date().getTime();
        let distance = countdownDate - now;

        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        if (days < 10) days = `0${days}`;
        if (hours < 10) hours = `0${hours}`;
        if (minutes < 10) minutes = `0${minutes}`;
        if (seconds < 10) seconds = `0${seconds}`;

        daysElement.text( days );
        hoursElement.text( hours );
        minutesElement.text( minutes );
        secondsElement.text( seconds );

        if( distance < 0 ) {
            clearInterval(x);
        }
    }, 1000);
}
countdownTimer();

$('#btn-form-comment').on("click", function(event) {
    event.preventDefault();

    const id = Date.now();
    const nameInput = $('#name');
    const commentInput = $('#comment');
    const stateInput = $('#state');
    
    set( ref( database, "comments/" + id ), {
        name: nameInput.val(),
        comment: commentInput.val(),
        state: stateInput.val(),
    } )
        .then( (result) => {
            location.reload();
        } )
})