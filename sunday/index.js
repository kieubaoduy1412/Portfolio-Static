const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");
const pwd = get("#pwd");

// Icons made by Freepik from www.flaticon.com
const BOT_IMG = "monday.jpg";
const PERSON_IMG = "duy.png";
const BOT_NAME = "Sunday";
const PERSON_NAME = "DuyKB";
let key = "";

var ErrorMessage = document.getElementById("error-message");
var PwdContainer = document.getElementById("pwd-container");

msgerForm.addEventListener("submit", event => {
  event.preventDefault();

  const msgText = msgerInput.value;
  if (!msgText) return;

  appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
  msgerInput.value = "";

   // Gọi hàm để gửi prompt lên API
   callOpenAICompletionAPI(msgText, key);

//   appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
//   msgerInput.value = "";
//   botResponse();
});

function appendMessage(name, img, side, text) {
  //   Simple solution for small apps
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>

        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}

// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}

function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();

  return `${h.slice(-2)}:${m.slice(-2)}`;
}

// Gọi API Completion của OpenAI
function callOpenAICompletionAPI(prompt, key) {
    // Địa chỉ API của OpenAI
    const apiUrl = 'https://y8gb1dtcai.execute-api.ap-northeast-1.amazonaws.com/prod/Sunday-openAI';
  
    // Dữ liệu yêu cầu gửi lên API
    const requestData = {
      prompt: prompt,
      key: key
    };
  
    // Cấu hình request
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(requestData)
    };
    
    showLoadingIcon()
    // Gửi request đến API
    fetch(apiUrl, requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.data == "") {
          hideLoadingIcon()
          appendMessage(BOT_NAME, BOT_IMG, "left", "F5 nhập password đi bạn ơi");     
        } else {
          hideLoadingIcon()
          // Thực hiện các hành động khác với kết quả
          appendMessage(BOT_NAME, BOT_IMG, "left", data.data); 
        }
             
      })
      .catch(error => {
        hideLoadingIcon()
        appendMessage(BOT_NAME, BOT_IMG, "left", "Lỗi rồi bạn ei. Nhập lại câu hỏi giúp mình dzới");     
      });
}

function showLoadingIcon(){
  const msgHTML = `
  <div class="msg left-msg" id="loading-icon">
    <div
      class="msg-img"
      style="background-image: url(monday.jpg)"
    ></div>

    <div class="msg-text">
      <img src="loading.gif" alt="Animated GIF">
    </div>
  </div>
`;

msgerChat.insertAdjacentHTML("beforeend", msgHTML);
msgerChat.scrollTop += 500;
}
 
function hideLoadingIcon(){
  const divToRemove = document.getElementById('loading-icon');
  divToRemove.remove();
}

document.getElementById("pwd").addEventListener("keypress", function(event) {
  ErrorMessage.style.display = "none";
  if (event.key === "Enter") {
    var value = pwd.value;
    // Địa chỉ API của OpenAI
    const apiUrl = 'https://y8gb1dtcai.execute-api.ap-northeast-1.amazonaws.com/prod/Sunday-openAI';
  
    // Dữ liệu yêu cầu gửi lên API
    const requestData = {
      pwd: value
    };
  
    // Cấu hình request
    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify(requestData)
    };

    fetch(apiUrl, requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.data == "") {
          ErrorMessage.style.display = "block";
        } else {
          ErrorMessage.style.display = "block";
          PwdContainer.style.display = "none"; 
          key = data.data
        }
      })
      .catch(error => {
        console.log(error)      
      });
  }
});