

//Creating nav bar
var nav_bar=document.createElement("nav");
nav_bar.setAttribute("class","navbar navbar-expand-sm bg-dark justify-content-center");

var nav_an=document.createElement("a");
nav_an.setAttribute("class","navbar-brand");
nav_an.href="#";

//Adding items to navbar
var nav_ul=document.createElement("ul");
nav_ul.setAttribute("class","navbar-nav");

var li_home=createNavItem("li","nav-item");
var home_a=createNavLink("a","nav-link",'#',"home",'HOME');

li_home.appendChild(home_a);

var li_world=createNavItem("li","nav-item");
var world_a=createNavLink("a","nav-link",'#','world','WORLD');
li_world.appendChild(world_a);

var li_politics=createNavItem("li","nav-item");
var politics_a=createNavLink("a","nav-link",'#','politics','POLITICS');
li_politics.appendChild(politics_a);

var li_magazine=createNavItem("li","nav-item");
var magazine_a=createNavLink("a","nav-link",'#','magazine','MAGAZINE');
li_magazine.appendChild(magazine_a);

var li_tech=createNavItem("li","nav-item");
var tech_a=createNavLink("a","nav-link",'#','technology','TECHNOLOGY');
li_tech.appendChild(tech_a);

var li_science=createNavItem("li","nav-item");
var science_a=createNavLink("a","nav-link",'#','science','SCIENCE');
li_science.appendChild(science_a);

var li_health=createNavItem("li","nav-item");
var health_a=createNavLink("a","nav-link",'#','health','HEALTH');
li_health.appendChild(health_a);

var li_sports=createNavItem("li","nav-item");
var sports_a=createNavLink("a","nav-link",'#','sports','SPORTS');
li_sports.appendChild(sports_a);

var li_arts=createNavItem("li","nav-item");
var arts_a=createNavLink("a","nav-link",'#','arts','ARTS');
li_arts.appendChild(arts_a);

var li_fashion=createNavItem("li","nav-item");
var fashion_a=createNavLink("a","nav-link",'#','fashion','FASHION');
li_fashion.appendChild(fashion_a);

var li_food=createNavItem("li","nav-item");
var food_a=createNavLink("a","nav-link",'#','food','FOOD');
li_food.appendChild(food_a);

var li_travel=createNavItem("li","nav-item");
var travel_a=createNavLink("a","nav-link",'#','travel','TRAVEL');
li_travel.appendChild(travel_a);

nav_ul.append(li_home,li_world,li_politics,li_magazine,li_tech,li_science,li_health,li_sports,li_arts,li_fashion,li_food,li_travel);
nav_bar.append(nav_an,nav_ul);



function createNavItem(tag_name,class_name,id_name){
    var li_item=document.createElement(tag_name);
    li_item.setAttribute("class",class_name);
        return li_item;

}


function createNavLink(anc,c_name,h,idval,val){
    var item=document.createElement(anc);
    item.setAttribute("class",c_name);
    item.setAttribute('onclick','displaySection("'+idval+'")');
    item.href=h;
    item.innerHTML=val;
    return item;
}

//Fetching information from API using async function
async function displaySection(sec_name){
    try{
        console.log("In section "+sec_name);
    let url = await fetch("https://api.nytimes.com/svc/topstories/v2/"+sec_name+".json?api-key=vyhLKSwPCgQ31pjm8v7ALZuZM3QHAaVw");
    let res = await url.json();
    printCardData(res);
    }
   catch(er){
       console.log("Error "+er);
   }
   
}

var  container=document.createElement("div");
container.setAttribute("class","container");

//Printing retrieved API information using bootstrap cards
function printCardData(data){
  console.log(data);
     container.innerHTML="";
    var row=createSub("div","row");
    var j=0;
   for(var i=0;i<data.num_results;i++){
   var card=createSub("div","col-lg-12 col-md-12 col-sm-12 col-xs-12","card");
   var cardType=createSub("div","card text-black bg-light mb-4");
   var cardbody=createSub("div","card-body");
   var card_row=createSub("div","row");
   var card_col_left=createSub("div","card-body-left col-sm-7");

   var card_sec=createSub("div","section-card");                     //Adding section to card
   card_sec.innerText=(data.section).toUpperCase();
   var card_date=createSub("p","date-card");                        //Adding created date to card
   card_date.innerText=new Date((data.results[j].created_date)).toString().substring(0,15);
   var card_title=createSub("p","title-card");                      //Adding title to card and by line
   card_title.innerHTML="<b>"+data.results[j].title+"</b>"+" - <i>"+data.results[j].byline+"</i>";
   var card_abs=createSub("p","abstarct-card");  
   card_abs.innerHTML=data.results[j].abstract;                      //Adding abstract to card
   var card_itemtype=createSub("p","item-card");
   card_itemtype.innerHTML="Item Type : <i>"+data.results[j].item_type+"</i>"; //Adding item type to card
   var cont_link=document.createElement("a");      
   cont_link.setAttribute("class","card-link");                      //Adding continue reading link
   cont_link.innerText="Continue reading";
   cont_link.href=data.results[j].short_url;
   card_abs.innerHTML=data.results[j].abstract;
   
    var card_col_right=createSub("div","card-body-right col-sm-5");  //Adding image to right side of the card
    var card_img=createSub("img","img-thumbnail img-fluid");
    if(data.results[j].multimedia!=null){
        var mul_len=data.results[j].multimedia.length;
        if(data.results[j].multimedia.length>=1)
        card_img.setAttribute("src",data.results[j].multimedia[(mul_len-1)].url);
        }
      
    card_col_left.append(card_sec,card_date,card_title,card_abs,card_itemtype,cont_link);
    card_col_right.append(card_img);
    card_row.append(card_col_left,card_col_right);
  

     cardbody.append(card_row);
     cardType.appendChild(cardbody);
     card.appendChild(cardType);
  
   row.appendChild(card);
         j++;
 
    }
container.appendChild(row);
}

//Creating HTML elements 
function createSub(d,cl_name){
    var elem=document.createElement(d);
    elem.setAttribute("class",cl_name);
    return elem;
  }

 displaySection("home");

document.body.append(nav_bar,container);