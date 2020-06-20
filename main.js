const userInput = [
    ["hi", "hey", "hello", "good morning", "good afternoon", "good evening"],
    ["how are you", "how is life", "how are things"],
    ["what are you doing", "what is going on", "what is up"],
    ["how old are you"],
    ["who are you", "are you human", "are you bot", "are you human or bot"],
    ["who created you", "who made you"],
    ["your name please", "your name", "may i know your name", "what is your name", "what call yourself", "please what is your name"],
    ["i love you"],
    ["happy", "good", "fun", "wonderful", "fantastic", "cool"],
    ["bad", "bored", "tired"],
    ["help me", "tell me a story", "tell me a joke"],
    ["ah", "yes", "ok", "okay", "nice"],
    ["thanks", "thank you"],
    ["bye", "good bye", "goodbye", "see you later"],
    ["what should i eat today"],
    ["bro", "guy", "paddy"],
    ["what", "why"],
    ["how"],
    ["when", "where"]
];

const botReply = [
    ["Hello!", "Hi!", "Hey!", "Hi there!", "What is up?"],
    ["Fine... how are you?", "Pretty well, how are you?", "Fantastic, how are you?"],
    ["Nothing much", "About to go to sleep", "Can you guess?", "I don't know actually" ],
    ["I am infinite"],
    ["I am just a bot", "I am a bot. What are you?"],
    ["The one true God, JavaScript"],
    ["I am nameless", "I don't have a name"],
    ["I love you too", "Me too"],
    ["Have you ever felt bad?", "Glad to hear it"],
    ["Why?", "Why? You shouldn't!", "Try watching TV"],
    ["What about?", "Once upon a time..."],
    ["Tell me a story", "Tell me a joke", "Tell me about yourself"],
    ["You're welcome"],
    ["Bye", "Goodbye", "See you later"],
    ["Sushi", "Pizza"],
    ["Bro!",  "What's up?", "Yes baba!"],
    ["Guess!", "Nothing", "Don't know", "Try guessing"],
    ["I can't tell", "Beyond my comprehension"],
    ["Today", "My place in the sky", "Not disclosable", "Check the clock"]
];

const unknownInputReply = [ "Same", "Go on...", "What do you wnat?...", "I am sick of you", "I'm listening...", "Can you please make some sense" ];
const coronavirus = ["Please stay home"];

let board = document.querySelector(".chat-screen"); // global variable

document.addEventListener("DOMContentLoaded", () => {
    const textField = document.getElementById("message-box");

    textField.addEventListener("keydown", (e) =>{
        if ( e.code === "Enter" ){
            let textFieldValue = textField.value;
            textField.value = "";
            inputModifier(textFieldValue)
        }
    })
})

let inputModifier = (textFieldValue) => { // turns input to lowercase and removes any non-alphanumeric value excluding space
    let finalResponse;
    let newInputValue = textFieldValue.toLowerCase().replace(/[^\w\s\d]/gi, "");
    
    // modifying input value further
    newInputValue = newInputValue
        .replace(/whats/g, "what is")
        .replace(/what's/g, "what is")
        .replace(/ please/g, "please");

//  assigning the returned value to the variable "finalResponse" if condtion is true;
    if( compareArray(userInput, botReply, newInputValue) ) finalResponse = compareArray(userInput, botReply, newInputValue) 
      else if ( newInputValue.match(/coronavirus/gi) ) finalResponse = coronavirus[Math.floor(Math.random() * coronavirus.length)];    //  picking replies randomly
      else if (newInputValue.match(/clear/gi)) {
        board.innerHTML = "";   
        return;  
    } else finalResponse = unknownInputReply[Math.floor(Math.random() * unknownInputReply.length)]; // picking replies randomly

    publishToPage(newInputValue, finalResponse);
}

let compareArray = (userInput, botReply, userText) => { // loops through arrays and compares user's word with the elements of the userInputArray
    let response, newResponseArray;
    for (let x = 0; x < userInput.length; x++) {
        for (let y = 0; y < botReply.length; y++){
            if ( userInput[x][y] == userText ) {
                newResponseArray = botReply[x]; // copies botReply array to a new variable to avoid mutation
                response = newResponseArray[Math.floor(Math.random() * newResponseArray.length)]; // picking replies randomly
            }
        }
    }
    return response;
}

let publishToPage = (userText, botResponse) => { // displays conversation to screen
    let list = document.createElement("li"); 
    list.className = "userTag";
    list.innerHTML = `Me: <span class="userValue">${userText}</span>`;
    board.appendChild(list);

    // bot section
    let botList = document.createElement("li");
    botList.className = "botTag";
    botList.innerHTML = `Paddy: <span class="paddyValue">${botResponse}</span>`;
    board.appendChild(botList);

    let view = document.querySelector(".paddyValue");   //  scroll to view
    view.scrollIntoView(true);
}
