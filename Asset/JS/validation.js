let checkValid;
const checkAll = () => {
    /* Check empty */
    checkValid =
        checkEmpty("nameCustomer", "name__error") &
        checkEmpty("emailCustomer", "email__error") &
        checkEmpty("phoneNumber", "phone__error") &
        checkEmpty("feedbackCustomer", "message__error")

        /* Check form email */
        & checkEmail("emailCustomer", "email__error")
        /* Check form phone */
        & checkPhone("phoneNumber", "phone__error");

    return checkValid;
};

const checkEmpty = (inputId, error) => {
    let input = document.getElementById(inputId);
    if (input.value.trim() === "") {
        document.getElementById(error).innerHTML = "*" + input.name + " của bạn không để trống nha 🥺.";
        document.getElementById(error).style.display = "block";
        return false;
    } else {
        document.getElementById(error).innerHTML = "";
        document.getElementById(error).style.display = "none";
        return true;
    }
};

const checkEmail = (inputId, error) => {
    let input = document.getElementById(inputId);
    const regexEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (regexEmail.test(input.value)) {
        document.getElementById(error).innerHTML = "";
        document.getElementById(error).style.display = "none";
        return true;
    } else {
        document.getElementById(error).innerHTML = "*Email của bạn đang bị sai định dạng 😥.";
        document.getElementById(error).style.display = "block";
        return false;
    }
};

const checkPhone = (inputId, error) => {
    let input = document.getElementById(inputId);
    const regexPhone = /^(0|\+84)(3[2-9]|5[689]|7[06-9]|8[1-689]|9[0-46-9])\d{7}$/;
    if (regexPhone.test(input.value)) {
        document.getElementById(error).innerHTML = "";
        document.getElementById(error).style.display = "none";
        return true;
    } else {
        document.getElementById(error).innerHTML = "*SĐT của bạn đang bị sai định dạng 😥.";
        document.getElementById(error).style.display = "block";
        return false;
    }
};

document.getElementById("nameCustomer").onblur = () => {
    checkEmpty("nameCustomer", "name__error");
};
document.getElementById("emailCustomer").onblur = () => {
    checkEmpty("emailCustomer", "email__error");
    checkEmail("emailCustomer", "email__error");
};
document.getElementById("phoneNumber").onblur = () => {
    checkEmpty("phoneNumber", "phone__error");
    checkPhone("phoneNumber", "phone__error")
};
document.getElementById("feedbackCustomer").onblur = () => {
    checkEmpty("feedbackCustomer", "message__error");
};

document.getElementById("sendFeedback").onclick = () => {
    checkAll();
};
