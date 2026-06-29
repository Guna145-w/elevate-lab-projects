const analyzeBtn =
document.getElementById("analyzeBtn");

const resumeInput =
document.getElementById("resumeInput");

const result =
document.getElementById("analysisContent");

const loading =
document.getElementById("loading");

const darkModeBtn =
document.getElementById("darkModeBtn");

darkModeBtn.addEventListener(
"click",
()=>{
document.body.classList.toggle("dark");
}
);

analyzeBtn.addEventListener(
"click",
analyzeResume
);

async function analyzeResume(){

const resume =
resumeInput.value.trim();

if(!resume){

alert(
"Please paste your resume first."
);

return;

}

loading.style.display =
"block";

result.innerHTML =
"";

try{

const response =
await fetch(
"http://localhost:3000/chat",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
message:`

Analyze the following resume and provide:

1. Professional Summary

2. Key Strengths

3. Weaknesses

4. Missing Skills

5. ATS Score out of 100

6. Suggestions for Improvement

Resume:

${resume}

`
})
}
);

const data =
await response.json();

result.innerHTML =
data.reply;

}
catch(error){

result.innerHTML =
"Error analyzing resume.";

}

loading.style.display =
"none";

}