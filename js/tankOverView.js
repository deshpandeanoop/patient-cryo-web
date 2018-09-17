function loadTankDetails()
{
  getResponsePromise(cryoMasterUrls.getAllTanksUrl(),"GET").done((data)=>sessionStorage.setItem("response",JSON.stringify(data)));
  renderCryoMaster(JSON.parse(sessionStorage.getItem("response")));
  if(null != sessionStorage.getItem("searchCriteria"))
  {
    populateSearchFields(JSON.parse(sessionStorage.getItem("searchCriteria")));
    searchTanks(JSON.parse(sessionStorage.getItem("response")));
    // removing attribute corresponding to tank details view page to avoid non-consistent results
    sessionStorage.removeItem("searchCriteria");
    sessionStorage.removeItem("tankId");
  }
};

var populateSearchFields = function(searchCriteria)
{
  $("#input-room").val(searchCriteria.roomType);
  $("#input-type").val(searchCriteria.tankType);
  $("#input-property").val(searchCriteria.labelType);
};


function renderCryoMaster(response)
{
    renderRoomTypeDropDown(response.dropDownAttributes.roomTypes);
    renderTankTypeDropDown(response.dropDownAttributes.tankTypes);
    renderLabelTypeDropDown(response.dropDownAttributes.labelTypes);
    renderTanksByRooms(response.rooms);
}

var renderRoomTypeDropDown=(roomTypes)=>$("#rooms").append(getDynamicHTML($("#rooms-template").html(),{rooms:roomTypes}));
var renderTankTypeDropDown=(tankTypes)=>$("#types").append(getDynamicHTML($("#types-template").html(),{types:tankTypes}));
var renderLabelTypeDropDown=(labelTypes)=>$("#labels").append(getDynamicHTML($("#labels-template").html(),{labels:labelTypes}));
var renderTanksByRooms=(roomsWithTanks)=>$("#main").append(getDynamicHTML($("#Room-Tank-template").html(),{rooms:roomsWithTanks}));

function getDynamicHTML(template,data)
{
  var compiledFunction = Handlebars.compile(template);
  return compiledFunction(data);
};

var greyTankStyle={
		greyStyleClass:"greyOut",
		greyStyleById:"greyOut"
};

var search = ()=>getResponsePromise(cryoMasterUrls.getAllTanksUrl(),"GET").done((data)=>searchTanks(data));
var searchTanks = (response)=>response.rooms.forEach(room=>filterTanks(room.tanks,getSearchParams()));

function getSearchParams()
{
  return {
		roomType:$("#input-room").val(),
		tankType:$("#input-type").val(),
		labelType:$("#input-property").val()
	};
}
var filterTanks=(tanks,searchParams)=>tanks.forEach(tank=>filterTank(tank,searchParams));

function filterTank(tank,searchParams)
{
  var canBeGreyedOut = equals(tank.room,searchParams.roomType)||equals(tank.type,searchParams.tankType)||equals(tank.label,searchParams.labelType);
  if(canBeGreyedOut){
    greyOutTank(tank);
  }
  else {
    setOriginalStyling(tank);
  }
}

var equals=(tankAttribute,searchCriteria)=>searchCriteria!=""?(tankAttribute!=searchCriteria?true:false):false;

function greyOutTank(tank)
{
  $("#tank"+tank.id).attr("class",$("#tank"+tank.id).attr("class")+" "+greyTankStyle.greyStyleClass);
  $("#label"+tank.id).children().attr("id",greyTankStyle.greyStyleById);
  $("#tankViewDetail"+tank.id).attr("class",$("#tankViewDetail"+tank.id).attr("class")+" "+greyTankStyle.greyStyleClass);
}

function setOriginalStyling(tank)
{
  var tankDivClassName =$("#tank"+tank.id).attr("class");
  var tankViewDetailViewClassName =  $("#tankViewDetail"+tank.id).attr("class");
  $("#tank"+tank.id).attr("class",subString(tankDivClassName,greyTankStyle.greyStyleClass));
  $("#label"+tank.id).children().attr("id","");
  $("#tankViewDetail"+tank.id).attr("class",subString(tankViewDetailViewClassName,greyTankStyle.greyStyleClass));
}

function subString(parentString,subString)
{
  var index = parentString.indexOf(subString);
  return parentString.substring(0,index==-1?parentString.length:index);
}

function viewTankDetails(tankId)
{
  sessionStorage.setItem("searchCriteria",JSON.stringify(getSearchParams())); // used to restore search results when user comes back to parent window from tank details
  sessionStorage.setItem("tankId",tankId); // used in tank details page to display selcted tank details
  window.open("tankdetails.html","_self");
}
