const API_KEY='AIzaSyBYK7oZM_WJTUXH6LM4EXgONJHL6c0X0Zc';
const dat=new Date();
const year=dat.getFullYear();
const month=dat.getMonth();
const day=dat.getDate();
const publishedAfter=new Date(year,month,day-3).toISOString();

async function fetchvideo() {
    try{

    
    const q=document.querySelector('input').value.trim();
    if(!q){
        document.getElementById('sec').innerHTML="";
        return;
    }
    const url=`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&order=viewCount&publishedAfter=${publishedAfter}&q=${q}&type=video&videoDuration=short&key=${API_KEY}&safeSearch=strict&relevanceLanguage=ar`;
    const res = await fetch(url);
    const data= await res.json();
    document.getElementById('sec').innerHTML="";
    console.log(data);
    data.items.forEach(element => {
        const videoid=element.id.videoId;
        document.querySelector('section').innerHTML+=`
        <a class="video-card" target="_blank" href="https://www.youtube.com/watch?v=${videoid}">
        <div class="video-info">
        <h3 class="video-title">${element.snippet.title}</h3>
      </div>
        <div class="thumbnail-wrapper">
        <img src="${element.snippet.thumbnails.high.url}">
      </div>
        </a>
        `;
    })}catch(error){
        console.log("An error Exist:"+error)
    }

}

document.getElementById('search-btn').addEventListener('click',fetchvideo);
