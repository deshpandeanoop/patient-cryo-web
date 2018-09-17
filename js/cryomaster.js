var getResponsePromise = (reqUrl,method,data)=>$.ajax({url:reqUrl,type:method,data:data,contentType:'application/json',
  async:false});

// can also be replaced with closure or modular design pattern
const cryoMasterUrls = {
  hostUrl:"http://localhost:8081/cm-cryo-service",
  allTanks:"/loadApp",
  tankDetail:"/getTankDetail",
  getAllTanksUrl :()=>cryoMasterUrls.hostUrl+cryoMasterUrls.allTanks,
  getTankDetailUrl :()=>cryoMasterUrls.hostUrl+cryoMasterUrls.tankDetail,
};
Object.freeze(cryoMasterUrls);
