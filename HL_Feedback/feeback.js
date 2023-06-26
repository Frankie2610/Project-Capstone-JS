let customerData = [];

URL6 = "https://6426b4b4556bad2a5b55dbf6.mockapi.io/feedback";
getFeedback();
async function getFeedback() {
  try {
    const { data: customerData } = await axios.get(URL6);
    renderFeedbackCustomer(customerData);
  } catch (error) {
    alert("Lấy dữ liệu phản hồi Khách hàng thất bại");
  }
}

async function deleteFeedback(feedbackId) {
  try {
    await axios.delete(`${URL6}/${feedbackId}`);
    getFeedback();
  } catch (error) {
    alert("Xóa phản hồi Khách hàng thất bại");
  }
}

//Dùng hàm reduce
function renderFeedbackCustomer(customerData) {
  debugger;
  let html = customerData.reduce((result, customer, index) => {
    return (
      result +
      `
        <tr>
          <td>${customer.name}</td>
          <td>${customer.email}</td>
          <td>${customer.phone}</td>
          <td>${customer.feedback}</td>
          <td>
          <button class="btn btn-danger me-2" onclick="deleteFeedback(${customer.id})">Delete</button>
          </td>
        </tr>
        
        `
    );
  }, "");
  document.getElementById("feedbackTable").innerHTML = html;
}

//Dùng hàm map
// function renderFeedbackCustomer(customerData) {
//   debugger;
//   let html = customerData.map((customer) => {
//     return `
//       <tr key=${customer.id}>
//         <td>${customer.name}</td>
//         <td>${customer.email}</td>
//         <td>${customer.phone}</td>
//         <td>${customer.feedback}</td>
//       </tr>
//       `;
//   });
//   document.getElementById("feedbackTable").innerHTML = html;
// }
