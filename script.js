const currentClass=document.getElementById('currentClass');
const classList=document.getElementById('classList');

const state={
    classes:[],
    current:null
}

window.addEventListener("hashchange", ()=>{
    selectClass();
})

function selectClass(){
    getEventFromHash();
    renderClassDetails();
    //Thanks Morgan
    window.scroll({
        top:0,
        left:0,
        behavior:"smooth"
    })
}

function getEventFromHash(){
    const name=window.location.hash.slice(1);
    const theClass=state.classes.find((cls)=>{
        return cls.name===name;
    })
    state.current=theClass;
    console.log(state);
}

function renderClassDetails(){
    if(state.current){
        getSingleClass();
    }
}

async function getSingleClass(){
    const classData=await fetch(`https://www.dnd5eapi.co/api/classes/${state.current.index}`);
    const theClassData=await classData.json();
    state.current=theClassData;
    console.log('state-->'+state);
    const subClass=state.current.subclasses.map((sub)=>{
        console.log('sub-->'+sub);
        return `<p>${sub.name}</p>`;
    });
    currentClass.innerHTML=`<h1>${state.current.name}</h1>
    <h2>Subclasses</h2>`+subClass.join('');
}


async function getClassList(){
    const info=await fetch('https://www.dnd5eapi.co/api/classes/');
    const json=await info.json();
    //console.log(json.results);
    state.classes=json.results;
    console.log(state);
}

function renderList(){
    const html=state.classes.map((cls)=>{
        return `<div>
            <a href=#${cls.name}>${cls.name}<a>
        </div>`
    });
    console.log("html:"+html);
    classList.innerHTML=html.join('');
}

async function render(){
    await getClassList();
    renderList();
    selectClass();
}

render();