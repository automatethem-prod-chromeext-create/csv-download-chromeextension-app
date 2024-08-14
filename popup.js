console.log("I am popup.js");

document.querySelector('#button1').addEventListener("click", async () => {
  var csvContent = "Name,Url,Description\n";
  csvContent += "Name1,Url1,\"한글내용1\"\n";
  csvContent += "Name2,Url2,\"한글내용2\"\n";
  csvContent += "Name3,Url3,\"한글내용3-1\"\"한글내용3-2\"\"\"\n";

  /*
  const downloadLink = document.createElement("a");
  //const dataBlob = new Blob([csvContent], { type: "text/csv;charset=utf-8" }); //엑셀에서 한글 깨짐
  const BOM = '\uFEFF';
  const dataBlob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8" });
  //const dataBlob = new Blob([csvContent], { type: "text/csv;charset=EUC-KR" });
  downloadLink.href = window.URL.createObjectURL(dataBlob);
  downloadLink.download = "outputs/data.csv"; //outputs_data.csv 로 저장됨
  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  */
  ///*
  //const dataBlob = new Blob([csvContent], { type: "text/csv;charset=utf-8" }); //엑셀에서 한글 깨짐
  const BOM = '\uFEFF';
  const dataBlob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8" });
  //const dataBlob = new Blob([csvContent], { type: "text/csv;charset=EUC-KR" });
  const dataUrl = window.URL.createObjectURL(dataBlob);
  // chrome.downloads.download를 사용하여 파일을 다운로드합니다.
  const downloadId = await chrome.downloads.download({
    url: dataUrl,
    filename: 'outputs/data.csv',
    //saveAs: true // 파일 저장 대화 상자 표시
  });
  //console.log(downloadId);
  //*/
});

document.querySelector('#button2').addEventListener("click", async () => {
  const response = await chrome.runtime.sendMessage({
    action: 'saveCsv'
  });
  console.log(response);
});
