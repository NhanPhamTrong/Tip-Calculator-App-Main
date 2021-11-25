var bill = $("#billInput");
var customTip = $("#select-tip input");
var error = $("span");
var numberOfPeople = $("#numberOfPeopleInput");
var resetButton = $("#right input");
var selectTip = $("#select-tip p");
var tip = $(".tip-price");
var total = $(".total-price");

var billValue = 0;
var customValue = 0;
var numberOfPeopleValue = 0;
var tipAmount;
var tipPercent = 0;
var tipText = "";
var totalAmount;

var numberOnly = [bill, customTip, numberOfPeople];


// FLOAT only
function GetNumberOnly(event) {
  if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
    event.preventDefault();
  }
}

function CheckNumberOfPeople() {
  if (parseInt(numberOfPeopleValue) === 0) {
    error.show();
    numberOfPeople.addClass("error");
  } else {
    error.hide();
    numberOfPeople.removeClass("error");
  }
}

function GetTipPercent() {
  if (parseInt(customValue) === 0) {
    tipPercent = tipText == "" ? 0 : parseFloat(tipText.slice(0, tipText.length - 1)) / 100;
  } else {
    selectTip.removeClass("active");
    tipPercent = parseFloat(customValue) / 100;
  }
}

function CalculateTipAmount() {
  tipAmount = billValue * tipPercent / numberOfPeopleValue;
  tip.text("$" + Math.floor(100 * tipAmount) / 100); // Get 2 digits Math.floor(100 * ...) / 100
}

function CalculateTotal() {
  totalAmount = billValue / numberOfPeopleValue + tipAmount;
  total.text("$" + Math.floor(100 * totalAmount) / 100);
}

function ShowPrices() {
  if (parseInt(numberOfPeopleValue) === 0) {
    tip.text("$0");
    total.text("$0");
  } else {
    CalculateTipAmount();
    CalculateTotal();
  }
}

function ShowPricesByEnter(event) {
  if (event.which == 13) {
    billValue = isNaN(parseFloat(bill.val())) ? 0 : parseFloat(bill.val());
    customValue = isNaN(parseFloat(customTip.val())) ? 0 : parseFloat(customTip.val());
    numberOfPeopleValue = isNaN(parseFloat(numberOfPeople.val())) ? 0 : parseFloat(numberOfPeople.val());
    GetTipPercent();
    CheckNumberOfPeople();
    ShowPrices();
  }
}

function ChangeScreenWidth() {
  if ($(window).width() <= 375) {
    $("section .px-4").removeClass("px-4").addClass("px-0");
  }
  else {
    $("section .px-0").removeClass("px-0").addClass("px-4");
  }
}


for (var i = 0; i < numberOnly.length; i++) {
  numberOnly[i].keypress(GetNumberOnly);
  numberOnly[i].keypress(ShowPricesByEnter);
}

ChangeScreenWidth();
$(window).resize(function() {
  ChangeScreenWidth();
});

error.hide();

selectTip.click(function() {
  customValue = 0;
  customTip.val("");
  if (!$(this).hasClass("active")) {
    selectTip.removeClass("active");
    $(this).addClass("active");
    tipText = $(this).text();
  }
  else {
    selectTip.removeClass("active");
    tipText = "";
  }
  GetTipPercent();
  CheckNumberOfPeople();
  ShowPrices();
});

resetButton.click(function() {
  billValue = 0;
  numberOfPeopleValue = 0;
  tipAmount = 0;
  tipPercent = 0;
  totalAmount = 0;
  bill.val("");
  selectTip.removeClass("active");
  customTip.val("");
  numberOfPeople.val("");
  ShowPrices();
});
