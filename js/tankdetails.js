function onLoad()
{
  window.alert("On Load");
  var rooms = JSON.parse(sessionStorage.getItem("response")).rooms;
  alert(rooms);
  var tank = rooms.forEach(room=>room.tanks.filter(tank=>tank.id===sessionStorage.getItem("tankId")));
  alert(tank);
  renderTankHeader();
}

var renderTankHeader = (tank)=>$("#tankHeaderId").append(getDynamicHTML($("#tankHeader-template").html(),{selectedTank:tank}));

function getDynamicHTML(template,data)
{
  var compiledFunction = Handlebars.compile(template);
  return compiledFunction(data);
};
