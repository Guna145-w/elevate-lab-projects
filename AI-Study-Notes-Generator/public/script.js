const topicInput =
document.getElementById("topicInput");

const instructionsInput =
document.getElementById("instructionsInput");

const generateBtn =
document.getElementById("generateBtn");

const notesOutput =
document.getElementById("notesOutput");

const copyBtn =
document.getElementById("copyBtn");

const downloadBtn =
document.getElementById("downloadBtn");

const clearBtn =
document.getElementById("clearBtn");

const darkModeBtn =
document.getElementById("darkModeBtn");

generateBtn.addEventListener(
"click",
generateNotes
);

copyBtn.addEventListener(
"click",
copyNotes
);

downloadBtn.addEventListener(
"click",
downloadNotes
);

clearBtn.addEventListener(
"click",
clearNotes
);

darkModeBtn.addEventListener(
"click",
toggleDarkMode
);

async function generateNotes(){

    const topic =
    topicInput.value.trim();

    const instructions =
    instructionsInput.value.trim();

    if(!topic){

        alert(
        "Please enter a topic."
        );

        return;
    }

    notesOutput.innerHTML =
    "Generating notes...";

    try{

        const response =
        await fetch(
        "/generate-notes",
        {
            method:"POST",

            headers:{
                "Content-Type":
                "application/json"
            },

            body:JSON.stringify({
                topic,
                instructions
            })
        }
        );

        const data =
        await response.json();

        notesOutput.innerHTML =
        data.notes;

    }
    catch(error){

        notesOutput.innerHTML =
        "Error generating notes.";

    }

}

function copyNotes(){

    navigator.clipboard.writeText(
    notesOutput.innerText
    );

    alert(
    "Notes copied successfully!"
    );

}

function downloadNotes(){

    const text =
    notesOutput.innerText;

    const blob =
    new Blob(
    [text],
    {
        type:"text/plain"
    }
    );

    const link =
    document.createElement("a");

    link.href =
    URL.createObjectURL(blob);

    link.download =
    "Study_Notes.txt";

    link.click();

}

function clearNotes(){

    topicInput.value = "";

    instructionsInput.value = "";

    notesOutput.innerHTML =
    "Your notes will appear here...";

}

function toggleDarkMode(){

    document.body.classList.toggle(
    "dark-mode"
    );

}