console.log("this is the common script for all routes");
let timeout = null;

// Update a specific note
async function updateNote(button) {
  const card = button.closest(".card");

  const heading = card.querySelector(".card-title");
  const para = card.querySelector(".note-body");
  const cardId = card.querySelector(".card-id");
  let id = cardId.innerText;
  let title = heading.innerText;
  let body = para.innerText;
  try {
    const response = await fetch(`http://localhost:4000/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        body: body,
      }),
    });

    if (response.ok) {
      const { message } = await response.json();
      console.log(message);
      const toast = document.querySelector(".toast");
      if (toast == null) {
        document.body.innerHTML += `<div class="toast show my-2 bg-success">
            <div class="toast-header">
              <strong class="me-auto">Success!</strong>
              <button type="button" class="btn-close" id="toastClose" data-bs-dismiss="toast"></button>
            </div>
            <div class="progress" role="progressbar" aria-label="Basic example"  aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar"></div>
            </div>
            <div class="toast-body">
                <p id="noteMessage" style="text-transform: capitalize;">${message}</p>
            </div>
        </div>`;
        let closebtn = document.querySelector("#toastClose");
        
        timeout = setTimeout(() => {
          closebtn.click();
        }, 3000);
      } else {
        if (toast.classList.contains("bg-danger")) {
          toast.classList.remove("bg-danger");
          toast.classList.add("bg-success");
          toast.querySelector("#noteMessage").innerText = message;
          toast.classList.add("show");
          let closebtn = toast.querySelector("#toastClose");
        if (timeout !== null) {
            clearTimeout(timeout);
            timeout = null;
            closebtn.click();
            setTimeout(()=>{
                toast.classList.remove("hide");
                toast.classList.add("show");
                timeout = setTimeout(() => {
                     closebtn.click();
                }, 3000);
            }, 500)
        }   
        
        } else {
            let closebtn = toast.querySelector("#toastClose");
            if (timeout !== null) {
                clearTimeout(timeout);
                timeout = null;
                closebtn.click();
                setTimeout(()=>{
                    toast.classList.remove("hide");
                    toast.classList.add("show");
                    timeout = setTimeout(() => {
                         closebtn.click();
                    }, 3000);
                }, 500)
                
            }
          //toast.classList.add("show");
          //let closebtn = toast.querySelector("#toastClose");
        //if (timeout !== null) {
            //clearTimeout(timeout)
            //timeout = null;
        //}
        //timeout = setTimeout(() => {
            //closebtn.click();
          //}, 3000);
        }
      }
    } else {
      console.error(`Error: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    console.error(error);
  }
}

// Delete a specific note
async function deleteNote(button) {
  const card = button.closest(".card");
  const heading = card.querySelector(".card-title");
  const para = card.querySelector(".note-body");
  const cardId = card.querySelector(".card-id");
  let id = cardId.innerText;
  let title = heading.innerText;
  let body = para.innerText;
  try {
    const response = await fetch(`http://localhost:4000/notes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        body: body,
      }),
    });

    if (response.ok) {
      const { message } = await response.json();
      // remove the note from dom
      document.getElementById(id).remove();
      console.log(message);
      const toast = document.querySelector(".toast");
      if (toast == null) {
        document.body.innerHTML += `<div class="toast show my-2 bg-danger">
            <div class="toast-header">
              <strong class="me-auto">Success!</strong>
              <button type="button" class="btn-close" id="toastClose" data-bs-dismiss="toast"></button>
            </div>
            <div class="progress" role="progressbar" aria-label="Basic example"  aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar"></div>
            </div>
            <div class="toast-body">
                <p id="noteMessage" style="text-transform: capitalize;">${message}</p>
            </div>
        </div>`;
        let closebtn = document.querySelector("#toastClose");
        timeout = setTimeout(() => {
          closebtn.click();
        }, 3000);
      } else {
        if (toast.classList.contains("bg-success")) {
          console.log("here");
          toast.classList.remove("bg-success");
          toast.classList.add("bg-danger");
          toast.querySelector("#noteMessage").innerText = message;
          toast.classList.add("show");
          let closebtn = toast.querySelector("#toastClose");
          if (timeout !== null) {
            clearTimeout(timeout);
            timeout = null;
            closebtn.click();
            setTimeout(()=>{
                toast.classList.remove("hide");
                toast.classList.add("show");
                timeout = setTimeout(() => {
                    closebtn.click();
                }, 3000);
            }, 500)
          } 
          //timeout = setTimeout(() => {
            //closebtn.click();
          //}, 3000);
        } else {
            let closebtn = toast.querySelector("#toastClose");
            if (timeout !== null) {
                clearTimeout(timeout);
                timeout = null;
                closebtn.click();
                setTimeout(()=>{
                    toast.classList.remove("hide");
                    toast.classList.add("show");
                    timeout = setTimeout(() => {
                         closebtn.click();
                    }, 3000);
                }, 500)
                
            }
            //toast.classList.remove("hide");
            //toast.classList.add("show");
            
            
            
            
            
            
        }
      }
    } else {
      console.error(`Error: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    console.error(error);
  }
}
