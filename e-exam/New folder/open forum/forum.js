var DATA = [];
var showFav = false;

const questionForm = document.getElementById('question');
const subjecti=document.getElementById('subject');
const quesi=document.getElementById('ques');
const welcome = document.getElementById('welcome');
const response = document.getElementById('response');
const quesInfo = document.getElementById('ques-info');
const resolveBtn = document.getElementById('resolve');
const quesList = document.getElementsByTagName('ul')[1];
const newQuesBtn = document.getElementById('new-ques');
const responseBtn = document.getElementById('response-submit');
const noMatchFound = document.getElementById('no-match-found');
const responseForm = document.getElementById('responseForm');
const responseList = document.getElementById('responseList');
const index = document.getElementById('pos');
// const favBtn = document.getElementById('favs');
const allQuesBtn = document.getElementById('all');
const sub_err=document.getElementById('sub_err');
const que_err=document.getElementById('que_err');
const hi=document.getElementById("hid");
const hello=document.getElementById("name");



// favBtn.addEventListener('click', () => {
//     showFav = true;
//     favBtn.classList.add('d-none');
//     allQuesBtn.classList.remove('d-none');
//     renderQuestionList(DATA);
// });

allQuesBtn.addEventListener('click', () => {
    showFav = false;
    allQuesBtn.classList.add('d-none');
    favBtn.classList.remove('d-none');
    renderQuestionList(DATA);
});

newQuesBtn.addEventListener('click', () => {
    response.classList.add('d-none');
    welcome.classList.remove('d-none');
    newQuesBtn.classList.add("hde");
    hid.classList.remove("hde")
});



function renderResponseList(responses,names) {
    responseList.innerHTML = '';
    for(let i=0;i<responses.length;i++)
    {

        let div = createBox(responses[i],names[i]);
        div.classList.add('bg-light');
        div.classList.add('my-2');
        div.classList.remove('border-bottom');


        let iconBar = document.createElement('div');
        iconBar.setAttribute('class', 'mr-2 d-flex justify-content-end');
        
        div.append(iconBar);
        responseList.appendChild(div);
    };
}

function renderQuestionInfo(question) {
    let div = creatBox(question.subject, question.question);

    // let star = createStarIcon();
    // star.style.cursor = 'pointer';
    // star.style.color = 'rgb(248, 196, 23)';
    // if(question.isFavourite) star.classList.add('fas');
    // else star.classList.add('far');

    // star.addEventListener('click', () => {
    //     DATA[index.value].isFavourite = !DATA[index.value].isFavourite;
    //     localStorage.setItem('DATA', JSON.stringify(DATA));
    //     displayResponseArea(index.value);
    //     renderQuestionList(DATA);
    // });

    let iconBar = document.createElement('div');
    iconBar.setAttribute('class', 'mr-2 ml-auto d-flex justify-content-end');

    // iconBar.appendChild(star);

    div.appendChild(iconBar);
    
    div.classList.add('bg-light');
    div.classList.remove('border-bottom');
    quesInfo.innerHTML = '';
    quesInfo.appendChild(div);
}

const resp=async(data)=>{
    const response=await fetch('http://localhost:5000/api/reply',{
        method:"PATCH",
        mode:"cors",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify(data),
        credentials: 'omit',
    });
}


function addResponse(e) {
    e.preventDefault();
    let message = responseForm.response.value;
    if(message.trim().length===0)
    {
        return false;
    }
    responseForm.response.value = '';
    let q = DATA[responseForm.qId.value];
    console.log(q);
    let data={id:q.id,userId:q.userId,message:message}
    resp(data);
    let uid=localStorage.getItem("itemKey")
    uid=JSON.parse(uid);
    q.reply.push(message);
    q.name.push(uid.name);
    localStorage.setItem('DATA', JSON.stringify(DATA));
    renderResponseList(q.reply,q.name);
}

function displayResponseArea(pos) {
    hid.classList.add("hde");
    newQuesBtn.classList.remove("hde");
    index.value = pos;
    welcome.classList.add('d-none');
    response.classList.remove('d-none');
    renderQuestionInfo(DATA[pos]);
    renderResponseList(DATA[pos].reply,DATA[pos].name);
}


function creatBox(title, name) {
    let h5 = document.createElement('h5');
    h5.setAttribute('class', 'mb-1');
        let header = document.createTextNode(title);
        h5.appendChild(header);

    let p = document.createElement('p');
    p.setAttribute('class', 'text-secondary mb-1');
   
        let body = document.createTextNode(name);
        p.appendChild(body);

    let div = document.createElement('div');
    div.setAttribute('class', 'border-bottom pl-4 py-2');
    div.appendChild(h5);
    div.appendChild(p);
    
    return div;
}


function createBox(title, name) {
    let h5 = document.createElement('h5');
    h5.setAttribute('class', 'mb-1');
        let header = document.createTextNode(title);
        h5.appendChild(header);

    let p = document.createElement('p');
    p.setAttribute('class', 'text-secondary mb-1');
   
        let body = document.createTextNode("created by : "+name);
        p.appendChild(body);

    let div = document.createElement('div');
    div.setAttribute('class', 'border-bottom pl-4 py-2');
    div.appendChild(h5);
    div.appendChild(p);
    
    return div;
}


function createStarIcon() {
    let star = document.createElement('i');
    star.setAttribute('class', 'fa-star fa-lg');
    return star;
}

function createCountLabel(count) {
    let span = document.createElement('span');
    span.innerText = count;
    return span;
}

function renderQuestionList(questions, ) {
    questions.forEach((obj, pos) => {
            let div = createBox(obj.subject, obj.username);
            // let star = createStarIcon();
            // star.style.color = 'rgb(248, 196, 23)';
            // if(obj.isFavourite) star.classList.add('fas');
            // else star.classList.add('far');

            let iconBar = document.createElement('div');
            iconBar.setAttribute('class', 'mr-2 ml-auto d-flex justify-content-end');
    
            // iconBar.appendChild(star);

            div.appendChild(iconBar);
            let but = document.createElement('button');
            but.innerHTML='Reply';
            but.addEventListener('click', () => displayResponseArea(pos));
            let li = document.createElement('li');
            
            div.appendChild(but)
            li.appendChild(div);
            quesList.appendChild(li);
    });
}

function renderNoMatchFound() {
    quesList.innerHTML = '';
    noMatchFound.classList.remove('d-none');
}
const clearerr=()=>{
        que_err.classList.remove('err1');
        que_err.classList.add('err');

        sub_err.classList.remove('err1');
        sub_err.classList.add('err');
}

const disdb=async(data)=>{
    const response =await fetch("http://localhost:5000/api/discuss",{
        method:"POST",
        mode:"cors",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify(data)
    });

}

questionForm.addEventListener('submit', (e) => {
    clearerr();
    e.preventDefault();
    let ques = questionForm.ques.value.trim(), subj = questionForm.subject.value.trim();
    var fl=true;
    if(ques.length===0)
    {
        que_err.classList.remove('err');
        que_err.classList.add('err1');
        fl=false;
    }
    if(subj.length===0)
    {
        sub_err.classList.remove('err');
        sub_err.classList.add('err1');
        fl=false;
    }
    if(fl===false)
        return fl;
    questionForm.ques.value = '';
    questionForm.subject.value = '';
    
    uid=localStorage.getItem("itemKey");
    uid=JSON.parse(uid);
    let data={userId:uid.userId,subject:subj,question:ques};
    disdb(data);

    location.reload();
});

responseForm.addEventListener('submit', addResponse);

const setup=async()=>{

    const response=await fetch("http://localhost:5000/api/getdis");
    let data=await response.json();
    console.log(data);
    for(let i=0;i<data.dis.length;i++)
    {
        DATA.push(data.dis[i]);
    }
    renderQuestionList(DATA);
    welcome.classList.remove('d-none');
    uid=localStorage.getItem("itemKey");
    uid=JSON.parse(uid);
    hello.innerHTML=`Hello, ${uid.name}`;
}

setup();