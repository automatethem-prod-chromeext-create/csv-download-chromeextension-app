console.log("I am background.js");

const saveCsv = async () => {
  const [{result: dataUrl}] = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    args: [scrollCount],
    function: async () => {
      
      const csvContent = await chrome.runtime.sendMessage({ action: 'getCsvContent' });
      //console.log(csvContent);

      /*
      //https://github.com/arktiv/table-csv-chrome/blob/master/Download%20table%20as%20CSV/downloadcsv.js#L36C80-L36C94
      const downloadLink = document.createElement("a");
      //const dataBlob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
      const BOM = '\uFEFF';
      const dataBlob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8" }); //엑셀에서 한글 깨짐
      //const dataBlob = new Blob([csvContent], { type: "text/csv;charset=EUC-KR" });
      const dataUrl = window.URL.createObjectURL(dataBlob);
      downloadLink.href = dataUrl;
      downloadLink.download = "outputs/naver-band-data.csv"; //outputs_naver-band-data.csv 로 저장됨
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
      console.log(dataUrl);
      //*/
      return dataUrl;
    }
  });
  //console.log(dataUrl);

  /*
  */    
  ///*
  const downloadId = await chrome.downloads.download({
    url: dataUrl,
    filename: 'outputs/naver-band-data.csv',
    //saveAs: true // 파일 저장 대화 상자 표시
  });
  //console.log(downloadId);
  //*/
}

//메시지 수신
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  //console.log(sender); //{id: 'gcdhhmflajlggbbomekbgplpmfmgpngl', url: 'chrome-extension://gcdhhmflajlggbbomekbgplpmfmgpngl/popup.html', origin: 'chrome-extension://gcdhhmflajlggbbomekbgplpmfmgpngl'}
  if (message.action === 'saveCsv') {
    (async function() { //비동기시
      await saveCsv();
      sendResponse('saveCsv response'); //응답 리턴
    })();
    return true; //비동기시
  } 
});





