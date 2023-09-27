const FORM = document.querySelector("form");

const PopupWindow = () => {
  const mypopup = document.getElementById("mypopup");
  const style = getComputedStyle(mypopup);
  if (style.display != "none") {
    mypopup.style.display = "none";
  } else {
    mypopup.style.display = "block";
    FORM.addEventListener("submit", handleFormData);
    FORM.addEventListener("click", event => clearInputField(event))
    changeFile();
  }
}

const changeFile = () => {
  const uploadButton = document.getElementById("upload-button");
  const fileInput = document.querySelector("input[type=file]");
  const avatar = document.getElementById("avatar");
  const removeButton = document.getElementById('remove-image-button');

  uploadButton.addEventListener("click", () => fileInput.click());

  fileInput.addEventListener("change", event => {
    clearErrorText();

    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        avatar.setAttribute("aria-label", file.name);
        avatar.style.background = `url(${reader.result}) center center/cover`;
        avatar.classList.remove('image');
        uploadButton.style.display = "none";
      };
      removeButton.disabled = false;
    } else {
      avatar.style.background = '';
      removeButton.disabled = true;
    }
  });

  removeButton.addEventListener('click', event => {
    uploadButton.style.display = "block"
    avatar.classList.add('image');
    fileInput.value = '';
    avatar.style.background = '';
    removeButton.disabled = true;
  })
}

const showError = (field, errorText) => {
  field.classList.add("error");

  const errorElement = document.createElement("small");
  errorElement.classList.add("error-text");
  errorElement.innerText = errorText;

  field.closest(".form-group").appendChild(errorElement);
}

const handleFormData = (e) => {
  if (e.which == 13) {
    alert(e.target.id + '---' + e.target.value);
  }

  e.preventDefault();

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const telephoneInput = document.getElementById("telephone");
  const orientationInput = document.getElementById("orientation");
  const chiefInput = document.getElementById("chief");
  const avatar = document.getElementById("avatar");

  const nameLabel = document.getElementById("nameLabel").innerHTML;
  const telephoneLabel = document.getElementById("telephoneLabel").innerHTML;
  const emailLabel = document.getElementById("emailLabel").innerHTML;
  const chiefLabel = document.getElementById("chiefLabel").innerHTML;

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const telephone = telephoneInput.value;
  const orientation = orientationInput.value;
  const chief = chiefInput.value;

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  const numberPattern = /^[0-9]+$/;

  document.querySelectorAll(".form-group .error").forEach(field => field.classList.remove("error"));
  document.querySelectorAll(".error-text").forEach(errorText => errorText.remove());

  if (avatar.style.background === "" ) {
    showError(avatar, "Сделайте выбор логотипа");
  }
  if (name === "" || nameLabel !== "") {
    showError(nameInput, "Введите название организации");
  }
  if (!emailPattern.test(email) || emailLabel !== "") {
    showError(emailInput, "Введите действительный адрес электронной почты");
  }
  if (!numberPattern.test(telephone) || telephone === "" || telephoneLabel !== "") {
    showError(telephoneInput, "Введите свой номер телефона");
  }
  if (orientation === "" ) {
    showError(orientationInput, "Выберите нужное направление деятельности");
  }
  if (chief === "" || chiefLabel !== "") {
    showError(chiefInput, "Введите руководителя");
  }

  const errorInputs = document.querySelectorAll(".form-group .error");
  if (errorInputs.length > 0) return;

  FORM.submit();
}

const clearInputField = (e) => {
  clearErrorText();

  const values = ["name", "telephone", "email",  "chief", "avcInput", "facebookInput", "okInput", "instaInput", "youtubeInput", "vkInput"];
  const id = e.target.id;

  if (values.indexOf(id) != -1) {
    const idInput = e.target.id;
    const nameInput = document.getElementById(idInput);
    nameInput.value = "";

    const nameLabel = document.getElementById(idInput + 'Label');
    const value = nameLabel !== null ? nameLabel.innerText : "Найти в соцсети";

    nameInput.placeholder = value;
    if (nameLabel !== null) nameLabel.innerHTML = "";
  }
}

const clearErrorText = () => {
  const documentErrors = document.getElementsByClassName("error-text");
  const arrayErrors = [...documentErrors];

  arrayErrors.forEach(function (element) {
    element.innerText = "";
  });
}
