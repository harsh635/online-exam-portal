
var email=document.getElementById("txt-input");
var password=document.getElementById("pwd");
var error1=document.getElementById("error1");
var error2=document.getElementById("error2");
var error3=document.getElementById("error3");
var log=document.getElementById("login");

let redirect=true;

const fnc=async(data)=>{
    let response=await fetch('http://localhost:5000/api/login',{
        method:"POST",
        mode:"cors",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify(data),
        credentials: 'omit',
    });
    
    let dat=await response.json();
    if(dat.message=="Not Found")
    {
        error3.classList.remove("err1");
        error3.classList.add("err");
        console.log(dat);
        redirect=false;
        return;
    }
    localStorage.setItem('itemKey', JSON.stringify(dat));
    console.log(dat);
}


log.onclick=async()=>{
    redirect=true;
    event.preventDefault();
    var fl=true;
    loi=true;
    if(email.value.includes('@') && email.value.includes('.') && email.value.length>4 && email.value.trim().length>4)
    {
        error1.classList.remove('err');
        error1.classList.add('err1');
    }
    else
    {
        error1.classList.remove('err1');
        error1.classList.add('err');
        fl=false;
    }
    if(password.value.length>=6 && password.value.trim().length>=6)
    {
        error2.classList.remove('err');
        error2.classList.add('err1');
    }
    if(password.value.length<6 || password.value.trim().length<6)
    {
        error2.classList.remove('err1');
        error2.classList.add('err');
        fl=false;
    }
    if(!fl)
    {
        return false;
    }
    data={email:email.value.trim(),password:password.value.trim()}
    await fnc(data);
    if(!redirect)
    {
        return false;
    }
    window.location='/index';
    return true;
}