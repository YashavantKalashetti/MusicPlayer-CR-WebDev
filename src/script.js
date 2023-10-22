
// window.alert("Welcome to our PlayList");

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");

let gifSong = document.getElementById("gifSong");

let loopButton = document.getElementById("loopButton");
let shuffleButton = document.getElementById("shuffleButton");
let loopMusic = 1;

let songs = [
    {songName: "Alone - Allan Walker", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Kar Har Maidaan - Shreya Ghoshal", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Magenta Riddim - DJ Snake", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Agar Tum Saath Ho - Arijit Singh", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Badtameez Dil", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Let Me Love You - DJ Snake", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Linkin Park - In The End", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Kesariya - Brahmastra", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},    
    {songName: "Hold My Hand - Lady Gaga", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Pyar Ki Ek Kahani - Sonu Nigam", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
    {songName: "Señorita - Camila Cabello ", filePath: "songs/11.mp3", coverPath: "covers/11.jpg"},
    {songName: "Zindagi Do Pal Ki - KK", filePath: "songs/12.mp3", coverPath: "covers/12.jpg"},
    {songName: "Chaleya - Arijit Singh  ", filePath: "songs/13.mp3", coverPath: "covers/13.jpg"},
    {songName: "Perfect - Ed Sheeran", filePath: "songs/14.mp3", coverPath: "covers/14.jpg"},
    {songName: "Despacito - Luis Fonsi", filePath: "songs/15.mp3", coverPath: "covers/15.jpg"},
];

// getting total listed songs for looping and updation
let totalSongs = songs.length;

// songs.forEach((i)=>{
//     html = 
//     `<div class="songItem">
//         <img alt="Song Poster" class="songImage">
//         <span class="songName">${i}</span>
//         <span class="songlistplay">
//             <span class="play"><i id="${i}" class="songItemPlay fa fa-2x fa-play-circle"></i></span>
//         </i></span>
//     </div>`;

//     document.querySelector(".songItemContainer").innerHTML += html;
// })

let songItems = Array.from(document.getElementsByClassName('songItem')) ;

songItems.forEach((element,i)=>{
    console.log(element,i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerHTML = songs[i].songName;
})


// Event Handling

// Volume changes 
let vol = document.querySelector('#volumeButton');
vol.oninput = function(){
    audioElement.volume = vol.value/100;
    if(audioElement.muted){
        document.getElementById('muted').style.display = 'none';
        document.getElementById('unmuted').style.display = 'block';
        audioElement.muted = !audioElement.muted;
    }
}

//Play and Pause
masterPlay.addEventListener('click', ()=> {
    if(audioElement.paused  || audioElement.currentTime <=0){
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        gif.style.opacity = 1;

        // changes
        let change = document.getElementById(`${songIndex}`);
        change.classList.remove('fa-play-circle');
        change.classList.add('fa-pause-circle');
    }else{
        audioElement.pause();
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        gif.style.opacity = 0;

        // changes
        let change = document.getElementById(`${songIndex}`);
        change.classList.remove('fa-pause-circle');
        change.classList.add('fa-play-circle');
    }
})


// Updating the Progress Bar automatically
audioElement.addEventListener('timeupdate', ()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    let minutes = ~~(audioElement.currentTime / 60);
    let extraSeconds = Math.floor((audioElement.currentTime % 60));

    let total_minutes = ~~ (audioElement.duration / 60);
    let total_seconds = ~~ Math.floor((audioElement.duration % 60));

    document.getElementById('duration').innerText = `${minutes}:${extraSeconds} / ${total_minutes}:${total_seconds}`;
    myProgressBar.value = progress;

    // Looping for Music
    
    if(progress >= 100){

        if(loopMusic == 1){
            // Songs to be Played Serially
            songIndex = (songIndex+1) % totalSongs;
        }else if(loopMusic == 2){
            // Songs to be played Randomly
            songIndex = Math.floor((Math.random() * 15));
        }

        audioElement.src = `songs/${songIndex+1}.mp3`;
        audioElement.currentTime = 0;
        myProgressBar.value = 0 ;
        gifSong.innerHTML = songs[songIndex].songName;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        makeAllPlays();
        // changes
        let change = document.getElementById(`${songIndex}`);
        change.classList.remove('fa-play-circle');
        change.classList.add('fa-pause-circle');
    }
    
})

// Updating the Progress Bar as user changes    
myProgressBar.addEventListener('change',()=>{   
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
});

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        audioElement.currentTime = 0;
        gifSong.innerHTML = songs[songIndex].songName;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
    })
})

document.getElementById('next').addEventListener("click",()=>{
    songIndex = (songIndex+1) % totalSongs;
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    gifSong.innerHTML = songs[songIndex].songName;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    makeAllPlays();
    // changes
    let change = document.getElementById(`${songIndex}`);
    change.classList.remove('fa-play-circle');
    change.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener("click",()=>{
    if(songIndex <= 0){
        // Making song index to go to the last music of the PlayList
        songIndex = totalSongs-1;
    }else{
        songIndex = (songIndex - 1) % totalSongs;
    }

    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    gifSong.innerHTML = songs[songIndex].songName;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    makeAllPlays();
    // changes
    let change = document.getElementById(`${songIndex}`);
    change.classList.remove('fa-play-circle');
    change.classList.add('fa-pause-circle');
})


// looping action - music button toggle
loopButton.addEventListener("click", ()=>{
    loopMusic = 1;
    loopButton.style.display = 'none';
    shuffleButton.style.display = 'inline';
    alert('Now all Songs will be Played serially.');
})

shuffleButton.addEventListener("click",()=>{
    loopMusic = 2;
    shuffleButton.style.display = 'none';
    singleLoop.style.display = 'inline';
    alert('Now Songs will Shuffle');
})


singleLoop.addEventListener('click',()=>{
    loopMusic = 3;
    singleLoop.style.display = 'none';
    loopButton.style.display = 'inline';
    alert('Only one song will be Looped.');
})


document.getElementById('unmuted').addEventListener('click',()=>{
    document.getElementById('unmuted').style.display = 'none';
    document.getElementById('muted').style.display = 'inline';
    // alert('muted');
    audioElement.muted = !audioElement.muted;
})

document.getElementById('muted').addEventListener('click',()=>{
    document.getElementById('muted').style.display = 'none';
    document.getElementById('unmuted').style.display = 'inline';
    // alert('un-muted');
    audioElement.muted = !audioElement.muted;
})
