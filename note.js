
const fs = require("fs");
const chalks = require("chalk");

// console.log(fs);
const filePath = "notes.json";

const loadNotes = ()=>{
    try{
        const dataBuffer = fs.readFileSync(filePath);
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }catch(e){
        return [];
    }
}
// console.log(loadNotes())
const saveNote = (notes)=>{
    const dataJSON = JSON.stringify(notes, null, 2);
    fs.writeFileSync(filePath,dataJSON);
}

const addNote = (title,body)=>{
   const notes = loadNotes();
   const duplicateNotes = notes.find(note => note.title===title);

   if(!duplicateNotes){
    notes.push({
        title,
        body
    });
    saveNote(notes);
    console.log(chalks.green("New note added"));
   }else{
    console.log(chalks.red("Note title taken"));

   }
};

const removeNote = (title)=>{
    const notes = loadNotes();
    const notesToKeep = notes.filter(note => note.title!==title);
        saveNote(notesToKeep);
        console.log(chalks.green("Note removed"));
    
};

const listNotes = ()=>{
    const notes = loadNotes();
    console.log(chalks.green("Your notes:"));
    notes.forEach(note => console.log(note.title));
}

const readNote = (title)=>{
    const notes = loadNotes();
    const note = notes.find(note => note.title===title);
    if(note){
        console.log(chalks.green(note.title));
        console.log(note.body);
    }else{
        console.log(chalks.red("Note not found"));
    }
}

module.exports = { addNote, removeNote, listNotes, readNote};
