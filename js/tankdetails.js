function onLoad()
{
  var rooms = JSON.parse(sessionStorage.getItem("response")).rooms;
  var tanks =[];
  rooms.forEach(room=>tanks=tanks.concat(room.tanks));
  renderTankHeader(tanks.filter(tank=>tank.id==sessionStorage.getItem("tankId"))[0]);
};

var renderTankHeader = (tank)=>$("#tankHeaderId").append(getDynamicHTML($("#tankHeader-template").html(),{selectedTank:tank}));

function getDynamicHTML(template,data)
{
  var compiledFunction = Handlebars.compile(template);
  return compiledFunction(data);
};
