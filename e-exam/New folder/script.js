const log=document.getElementById("logbut");
const nav=document.getElementById("nav");
hello=document.getElementById('name');

const fnc=()=>{
    let data=window.localStorage.getItem("itemKey");
    if(!data)
    {
        log.innerHTML=`Log In`;
        nav.innerHTML=`<ul class="navul">
        <li><a href="/login">E-Exam</a></li>
        <li><a href="/login">Open Forum</a></li>
        <li><a href="/login">E-Repository</a></li>
        <li><a href="/login">My-Wall</a></li>
    </ul>`
    }
    else
    {
        log.innerHTML=`Log Out`
        nav.innerHTML=`<ul class="navul">
        <li><a href="/exam">E-Exam</a></li>
        <li><a href="/forum">Open Forum</a></li>
        <li><a href="/repo">E-Repository</a></li>
        <li><a href="/mywall">My-Wall</a></li>
    </ul>`
    }
    data=JSON.parse(data);
    hello.innerHTML=`Hello, ${data.name}`;
}

log.onclick=()=>{
    window.localStorage.clear();
}
fnc();