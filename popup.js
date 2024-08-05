console.log("I am popup.js");

const button = document.querySelector('#button');
button.addEventListener("click", async () => {
  var csvContent = "Name,Url,Description\n";
  csvContent += "Name1,Url1,\"Description1\"\n";
  csvContent += "Name2,Url2,\"Description2\"\n";
  csvContent += "Name3,Url3,\"Description3-1\"\"Description3-2\"\"\"\n";

  const downloadLink = document.createElement("a");
  const dataBlob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
  downloadLink.href = window.URL.createObjectURL(dataBlob);
  downloadLink.download = "data.csv";
  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
});
