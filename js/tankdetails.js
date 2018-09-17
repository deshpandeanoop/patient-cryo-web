function onLoad()
{
  var searchCriteria = JSON.parse(sessionStorage.getItem("searchCriteria"));
  var reqParam={
    tankId:sessionStorage.getItem("tankId"),
    registrationId:searchCriteria.reg_id,
    patientLastName:searchCriteria.patientLastName,
    hrnNumber:searchCriteria.hrnNumber,
    nirc:searchCriteria.nirc
  };
getResponsePromise(cryoMasterUrls.getTankDetailUrl(),"GET",reqParam).done((data)=>renderTankDetails(data));
// carry over the values from the previous screen
if(reqParam.patientLastName != "0")
{
  $("#input-wife-nric").val(reqParam.patientLastName);
}
if(reqParam.registrationId != "0")
{
  $("#input-reg_id").val(reqParam.registrationId);
}
};

function renderTankDetails(tankDetail)
{
  sessionStorage.setItem("tankDetail",JSON.stringify(tankDetail.tank));
  renderTankHeader(tankDetail.tank)
  renderDoctorsDropDown(tankDetail.doctors);
  renderCanisters(tankDetail.tank.canisters);
}
var renderTankHeader = (tank)=>$("#tankHeaderId").append(getDynamicHTML($("#tankHeader-template").html(),{selectedTank:tank}));

var renderDoctorsDropDown = (doctors)=>$("#doctorsDropDown").append(getDynamicHTML($("#doctorsDropDown-template").html(),{doctors:doctors}));

var renderCanisters = (canisters)=>$("#canistersDetail").html(getDynamicHTML($("#canisters-template").html(),{canisters:canisters}));

var renderDetailPanel = (tank) =>$("#main-card").html(getDynamicHTML($("#card-template").html(),{tank:tank}));


function getDynamicHTML(template,data)
{
  var compiledFunction = Handlebars.compile(template);
  return compiledFunction(data);
};

function showDetailsOnCard(canister_number,level_number)
{
  var tank = JSON.parse(sessionStorage.getItem("tankDetail"));
  var canisters = tank.canisters.filter(canister=>canister.canisterNumber==canister_number);
  // since canister_number is unique for tank, filtered array has only one element
  var levels = canisters[0].levels.filter(level=>level.levelNumber == level_number);
  // since one canister is associated with only level, filtered array contain only one element
  var canister = canisters[0];
  canister.level = levels[0];
  tank.canister=canister;
  renderDetailPanel(tank);
}

function search()
{
  var reqParam={
    tankId:sessionStorage.getItem("tankId"),
    registrationId:$("#input-reg_id").val().trim()===''?0:$("#input-reg_id").val(),
    patientLastName:$("#input-wife-nric").val().trim()===''?0:$("#input-wife-nric").val(),
    hrnNumber:"0",
    nirc:0
  };
  getResponsePromise(cryoMasterUrls.getTankDetailUrl(),"GET",reqParam).done((data)=>renderCanisters(data));
}

function renderSearchResults()
{

}
