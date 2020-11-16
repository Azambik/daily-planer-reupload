var task = [];
var index = 0;
setInterval(function(){
getDateTime();
var datetime = new Date().today() +" "+ new Date().timeNow()
$("#currentDay").text(datetime);
//console.log(hr);
},1000);
setInterval(function(){
    auditTask();
},1000*60*5);

//gets date and time
function getDateTime(){
    //for date now
    Date.prototype.today = function () { 
        return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
    }
    
    // For the time now
    Date.prototype.timeNow = function () {
         return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
    }
};
//click on task to edit it
$(".container").on("click","p", function() {
    var text = $(this).text().trim();
    
    $(this).replaceWith($("<input type=text>").attr({id: $(this).attr('id') ,value: text}));
    $(this).trigger("focus");
});

$(".container").on("blur", "input", function() {
    var text = $(this).val();
    var id = $(this).get(0).id;

    task[id] = text;
    saveTasks();

    $(this).replaceWith($('<p>').attr('id', id));
    $('#' + id).html(text); 
});

var auditTask = function(){ 
//credit to Mila and Shohan for helping debugg this block of code
for(i = 0; i < 23; i++){
    //remove classes before loop to prevent conflict
    $("." + i +"t").removeClass("past present future");
    // setting background red to show task is in past
    if (moment().hour()-1 > i) {
        $("." + i +"t").addClass("past");
    }
    //seting background yellow to show taks is current task
    else if(moment().hour()-1 === i){
        $("." + i +"t").addClass("present");
    }
    //setting background to whit to show task is in the future
    else {
        $("." + i + "t").addClass("future");
    }
}
};
var saveTasks = function() {
    localStorage.setItem("task", JSON.stringify(task));
  };

var populateLocalStorage = function() {
    var storageVals = JSON.parse(localStorage.getItem("task"));

    // check if there's data saved in local storage
    if (storageVals === null || storageVals === undefined) {
        // if data wasn't saved, save the generic data automatically
        for(i=0;i<23;i++){
            var textselector = document.getElementById(i);
            if (textselector !== null && textselector !== undefined){
                var text = textselector.innerHTML.trim();
                task[i] = text;
            }
        }
        saveTasks();
    }
    else {
        // data was found in localstorage, apply it to elements and task[]
        for(let i = 0; i < storageVals.length; i++ ) {
            task[i] = storageVals[i];
            var textselector = document.getElementById(i);
            if (textselector !== null && textselector !== undefined){
                textselector.innerHTML = task[i];
            }
            
        }
    }
}

populateLocalStorage();
auditTask();
