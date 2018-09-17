function onLoad()
{
  alert("OnLoad");
  var reqParam = {
    "tankId":1,
    "patientLastName":" ",
    "hrnNumber":" ",
    "nirc":0
  };
  $.ajax({url:cryoMasterUrls.getTankDetailUrl(),type:"GET",data:reqParam,contentType:'application/json'}).done((data)=>alert(JSON.stringify(data)));
//  $.post(cryoMasterUrls.getTankDetailUrl(),JSON.stringify(reqParam));
  //getPostResponsePromise(cryoMasterUrls.getTankDetailUrl(),"POST",JSON.parse(reqParam)).done((data)=>alert(JSON.stringify(data)));
  // var rooms = JSON.parse(sessionStorage.getItem("response")).rooms;
  // var tanks =[];
  // rooms.forEach(room=>tanks=tanks.concat(room.tanks));
  // renderTankHeader(tanks.filter(tank=>tank.id==sessionStorage.getItem("tankId"))[0]);
};

var renderTankHeader = (tank)=>$("#tankHeaderId").append(getDynamicHTML($("#tankHeader-template").html(),{selectedTank:tank}));

function getDynamicHTML(template,data)
{
  var compiledFunction = Handlebars.compile(template);
  return compiledFunction(data);
};
