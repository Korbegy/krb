let aioutput = ""
const generated_pre = document.getElementById("generated_pre")
var copyButton = document.getElementById("copyButton");
const input_by_user = document.getElementById("input_by_user")

input_by_user.focus()

function generateContent(userinput){
  var xhr = new XMLHttpRequest();
xhr.open('POST', 'https://ai-server.regem.in/api/ai.php');
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    aioutput = xhr.responseText
    copyButton.style.display = "block"
    if(aioutput.includes("Try Again! or May be Server is Down!")){
        aioutput = "Try Again, Sorry about it."
    }
    else if( aioutput.includes("regem") ){
        console.log("on")
        aioutput = aioutput.replaceAll("regem", "openai")
        
    }
    else if( aioutput.includes("Regem") ){
        console.log("on")

        aioutput = aioutput.replaceAll("Regem", "Openai")
    }
    generated_pre.innerText = aioutput

    setTimeout(()=>{
        generated_pre.style.color = "black"
    }, 400)

  }
};

xhr.send('input=' + encodeURIComponent(userinput));   
}


const generate_btn = document.getElementById("generate_btn")

generate_btn.addEventListener("click", function(){
    let inputText = input_by_user.value
    generated_pre.style.color = "#857aff"
    generated_pre.innerText  = "Generating..."
    generateContent(inputText)

})

function copyToClipboard() {
    // Get the text to copy
    var textToCopy = document.getElementById("generated_pre").innerText;
  
    // Create a temporary textarea element and set its value to the text to copy
    var tempTextArea = document.createElement("textarea");
    tempTextArea.value = textToCopy;
  
    // Hide the textarea from the user
    tempTextArea.style.position = "fixed";
    tempTextArea.style.top = 0;
    tempTextArea.style.left = 0;
    tempTextArea.style.opacity = 0;
  
    // Append the textarea to the DOM
    document.body.appendChild(tempTextArea);
  
    // Select the text in the textarea
    tempTextArea.select();
  
    // Copy the selected text to the clipboard
    document.execCommand("copy");
  
    // Remove the temporary textarea from the DOM
    document.body.removeChild(tempTextArea);
  
    // Provide some visual feedback to the user (optional)
    copyButton.innerText = "Copied!";
    setTimeout(function() {
      copyButton.innerText = "Copy Generated Text";
    }, 1500);
  }
  