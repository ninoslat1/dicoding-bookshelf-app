const SuccessToast = () => {
    return Toastify({
        text: "This is a toast",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          }
        }).showToast();
}

const FailedToast = (text) => {
    return Toastify({
        text,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          }
        }).showToast();
}