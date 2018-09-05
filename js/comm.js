function getRooms(response){
  var scriptRoomHtml = $("#rooms-template").html();
  var htmlRoomTemplate = Handlebars.compile(scriptRoomHtml);
  var htmlRoomVal = htmlRoomTemplate({rooms:response.dropDownAttributes.roomTypes});
  $("#rooms").append(htmlRoomVal);
};

function getTypes(response){
  var scriptTypetHtml = $("#types-template").html();
  var htmlTypeTemplate = Handlebars.compile(scriptTypetHtml);
  var htmlTypeVal = htmlTypeTemplate({types:response.dropDownAttributes.tankTypes});
  $("#types").append(htmlTypeVal);
};

function getLabels(response){
  var scriptLabeltHtml = $("#labels-template").html();
  var htmlLabelTemplate = Handlebars.compile(scriptLabeltHtml);
  var htmlLabelVal = htmlLabelTemplate({labels:response.dropDownAttributes.labelTypes});
  $("#labels").append(htmlLabelVal);
};

function getRoomAndTanks(response){
  var scriptTankListtHtml = $("#Room-Tank-template").html();
  var htmlTankListTemplate = Handlebars.compile(scriptTankListtHtml);
  var htmlTankListVal = htmlTankListTemplate({rooms:response.rooms});
  $("#main").append(htmlTankListVal);
};

var greyTankStyle={
		greyStyleClass:"greyOut",
		greyStyleById:"greyOut"
};

function searchTanks(response)
{
	var searchParams = {
		roomType:$("#input-room").val(),
		tankType:$("#input-type").val(),
		labelType:$("#input-property").val(),
	};
response.rooms.forEach(room=>filterTanks(room.tanks,searchParams));
}

function filterTanks(tanks,searchParams)
{
  tanks.forEach(tank=>filterTank(tank,searchParams));
}

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

function equals(tankAttribute,searchCriteria)
{
  return searchCriteria!=""?(tankAttribute!=searchCriteria?true:false):false;
}

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
  window.alert(tankId);
  window.tank = tankId;
  var viewTankDetailsWindow=window.open("tankdetails.html","_self");
}
