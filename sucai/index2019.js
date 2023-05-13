var flag = true;

function keyControl(evt){
	if(!evt) evt = window.event;
	var currentCode = evt.keyCode;
	
	if(currentCode == 13){
	   //document.getElementById("tax").blur();
		document.getElementById("btnCalc").click();
		cancelKey(evt);
	}
}
function cancelKey(evt) {
    if (evt.preventDefault) {
        evt.stopPropagation();
        evt.preventDefault();
    }
    else {
        evt.cancelBubble = true;
        evt.returnValue = false;
    }
}

$().ready(function(){
	if($("#txtIncome").length > 0) {
		$("#txtIncome")[0].focus();
	}
}) 

function taxTypeChange() {
    if(document.all.taxType.value==0){
		location=location.href; return;
	}
	location=document.all.taxType.value;
}

function incomeChange() {
    var income = $("#txtIncome").val();
    if(!isNaN(income)) {
        $("#txtIncome").val(income);
		var taxPeriod = $("#taxPeriod").val();
		$("#txtIncomeAll").val(income*taxPeriod);
    }
    
}
function insureChange() {
    var insure = $("#txtInsure").val();
    if(!isNaN(insure)) {
        $("#txtInsure").val(insure);
		var taxPeriod = $("#taxPeriod").val();
		$("#txtInsureAll").val(insure*taxPeriod);
    }
    
}
function zxfjChange() {
    var zxfj = $("#txtZXFJ").val();
    if(!isNaN(zxfj)) {
        $("#txtZXFJ").val(zxfj);
		var taxPeriod = $("#taxPeriod").val();
		$("#txtZXFJAll").val(zxfj*taxPeriod);
    }
}
function taxPeriodChange() {
	incomeChange();
	insureChange();
	zxfjChange();
}

////////////////////////total_index
function btnCalc_onClick_total_index(type)
{
	clearResult_all_index();
	checkData_all_index(type);
	if(!flag) {
		return;
	}
    var taxPeriod = parseFloat($("#taxPeriod").val());
	var income = parseFloat($("#txtIncome").val());
	var incomeAll = parseFloat($("#txtIncomeAll").val());
	var lastIncome = incomeAll - income;
    var insure = parseFloat($("#txtInsure").val());
	var insureAll = parseFloat($("#txtInsureAll").val());
	var lastInsure = insureAll - insure;
	var zxfj = parseFloat($("#txtZXFJ").val());
	var zxfjAll = parseFloat($("#txtZXFJAll").val());
	var lastZXFJ = zxfjAll - zxfj;
	
    var baseLine=5000;
    //calc___A
    var taxableIncome = incomeAll - insureAll - zxfjAll - baseLine*taxPeriod;
	var R=0,Q=0;
    var A=taxableIncome;
    A=A.toFixed(2);
	var res = calcRQ_all_index(A);
	R = res[0];
	Q = res[1];
	var taxAll=taxableIncome * R -Q;
	taxAll = Math.round(taxAll*100)/100;
	
	//calc___A2
	var R2=0,Q2=0,lastTaxAll=0;
	var lastTaxableIncome=0;
	if(taxPeriod>1){
		lastTaxableIncome = lastIncome - lastInsure - lastZXFJ - baseLine*(taxPeriod-1);
		var A2=lastTaxableIncome;
		A2=A2.toFixed(2);
		res = calcRQ_all_index(A2);
		R2 = res[0];
		Q2 = res[1];
		lastTaxAll=lastTaxableIncome * R2 -Q2;
		lastTaxAll = Math.round(lastTaxAll*100)/100;
	}
    
    tax = taxAll - lastTaxAll;
	tax = Math.round(tax*100)/100;
	taxTmp = tax>0?tax:0
    var realIncome=income - insure - taxTmp;
	realIncome = Math.round(realIncome*100)/100;
	
    $("#lblTaxableIncome")[0].innerText=taxableIncome.toFixed(2);
    $("#lblTaxRate")[0].innerText=R*100;
    $("#lblQuick")[0].innerText=Q;
	$("#txtTaxAll")[0].value=taxAll;
	$("#txtTaxAlready")[0].value=lastTaxAll;
	$("#txtTax")[0].value=tax;
    $("#txtRealIncome")[0].value=realIncome;
	
	var geshui100Tips=document.getElementById("geshui100Tips");
	if(geshui100Tips){
		document.getElementById("geshui100Tips").style.display="block";//显示
	}
}
function clearResult_all_index()
{
    $("#lblTaxableIncome")[0].innerText="0";
    $("#lblTaxRate")[0].innerText="0";
    $("#lblQuick")[0].innerText="0";
    $("#txtTax")[0].value="";
	$("#txtTaxAll")[0].value="";
	$("#txtTaxAlready")[0].value="";
    $("#txtRealIncome")[0].value="";
}
function checkData_all_index(type)
{
    //工资收入
	var income = parseFloat($("#txtIncome").val());
    if(isNaN(income) && type==1) {
        alert("无效的本月工资");
        $("#txtIncome")[0].focus();
        $("#txtIncome")[0].select();
		flag = false;
        return;
    }
    $("#txtIncome").val(income);
	
	var incomeAll = parseFloat($("#txtIncomeAll").val());
    if(isNaN(incomeAll)) {
        alert("无效的累计工资");
        $("#txtIncomeAll")[0].focus();
        $("#txtIncomeAll")[0].select();
        return;
    }
    $("#txtIncomeAll").val(incomeAll);
	
	//社保
	var insure = parseFloat($("#txtInsure").val());
    if(isNaN(insure)) {
        alert("无效的各项社会保险费金额");
        $("#txtInsure")[0].focus();
        $("#txtInsure")[0].select();
        return;
    }
    $("#txtInsure").val(insure);
	
	var insureAll = parseFloat($("#txtInsureAll").val());
    if(isNaN(insureAll)) {
        alert("无效的累计各项社会保险费金额");
        $("#txtInsureAll")[0].focus();
        $("#txtInsureAll")[0].select();
        return;
    }
    $("#txtInsureAll").val(insureAll);
	
	//专项附加扣除
	var zxfj = parseFloat($("#txtZXFJ").val());
    if(isNaN(zxfj)) {
        alert("无效的专项附加扣除金额");
        $("#txtZXFJ")[0].focus();
        $("#txtZXFJ")[0].select();
        return;
    }
    $("#txtZXFJ").val(zxfj);
	
	var zxfjAll = parseFloat($("#txtZXFJAll").val());
    if(isNaN(zxfjAll)) {
        alert("无效的累计专项附加扣除金额");
        $("#txtZXFJAll")[0].focus();
        $("#txtZXFJAll")[0].select();
        return;
    }
    $("#txtZXFJAll").val(zxfjAll);
	flag = true;
}
function calcRQ_all_index(A)
{
	if(A<=36000){
		R=0.03;
		Q=0;
	}
	else if (A>36000 && A<=144000){
		R=0.1;
		Q=2520;
	}else if(A>144000 && A<=300000){
		R=0.2;
		Q=16920;
	}else if(A>300000 && A<=420000){
		R=0.25;
		Q=31920;
	}else if(A>420000 && A<=660000){
		R=0.3;
		Q=52920;
	}else if(A>660000 && A<=960000){
		R=0.35;
		Q=85920;
	}else{
		R=0.45;
		Q=181920;
	}
	
	return new Array(R,Q);
}
function btnReset_onClick_total_index()
{
    clearResult_all_index();
    $("#txtInsure")[0].value="0";
	$("#txtInsureAll")[0].value="0";
	$("#txtZXFJ")[0].value="0";
	$("#txtZXFJAll")[0].value="0";
    $("#txtIncome")[0].value="";
	$("#txtIncomeAll")[0].value="0";
    $("#txtIncome")[0].focus();    
    $("#txtIncome")[0].select();
    
}