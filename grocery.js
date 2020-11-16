class store{
    static displayLists(){
        var xhttp =new XMLHttpRequest();
        xhttp.onreadystatechange =function (){
        if(this.readyState==4 && this.status == 200){
            var val=JSON.parse(this.responseText);
            var list=val.list;
            var output = "";
            list.forEach(function(value){
                    output += "<tr class=jsonfile><td><input type=checkbox id=\"check\"></td><td>"+ value.slno+"</td><td>"+ value.name+"</td><td>"+value.quantity+"</td><td>"+value.unit+"</td><td>"+value.department+"</td><td>"+value.notes+"</td><td><a href=\"#\">X</a></td></tr>";
            })
            document.getElementById("contents").innerHTML = output;
        
        }
    }
    xhttp.open("GET","Grocery.json",true);
    xhttp.send();
    }
}


document.querySelector('#contents').addEventListener('click',clickContent);

function clickContent(e){
    let child=e.target;
    if(child.tagName=="INPUT"){
        let parent=e.target.parentElement.parentElement;
        parent.style.textDecoration="line-through";
        
    }
    // console.log(child.tagName);
    if(child.tagName== "A"){
        let parent=e.target.parentElement.parentElement;
        parent.remove();
    }

     if(child.tagName=="INPUT" &&child.checked==false){
        let parent=e.target.parentElement.parentElement;
        parent.style.textDecoration="none";
    }
}


class Item{
    constructor(slno,name,quantity,unit,department,notes){
            this.slno=slno;
            this.unit=unit;
            this.department=department;
            this.name=name;
            this.notes=notes;
            this.quantity=quantity
    }
}
class UI{
    //add item from form to list
    addItemToList(item){
        const list=document.getElementById('contents');

        const row=document.createElement('tr');
    
        row.innerHTML=
        `
        <td><input type=checkbox id=\"check\"></td>
        <td>${item.slno}</td>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>${item.unit}</td>
        <td>${item.department}</td>
        <td>${item.notes}</td>
        <td><a href="#">X</a> </td>
        `
        list.appendChild(row);
        alert("Item added Succesfully");
    }
    clearFields(){
        document.getElementById('name').value='';
        document.getElementById('slno').value='';
        document.getElementById('quantity').value='';
        document.getElementById('unit').value='';
        document.getElementById('department').value='';
        document.getElementById('notes').value='';
    }
}
document.getElementById('item-form').addEventListener('submit',function(e){
    //////adding value from form
    const  slno=document.getElementById('slno').value,
            name=document.getElementById('name').value,
            quantity=document.getElementById('quantity').value,
           unit=document.getElementById('unit').value,
           department=document.getElementById('department').value,
           notes=document.getElementById('notes').value;
    
    //create a new variable 'item' using constructor Item
    const item=new Item(slno,name,quantity,unit,department,notes);

    //create a new variable 'ui' using constructor UI
    if(item.slno=="" ||item.name=="" ||item.quantity=="" ||item.department=="" ||item.unit==""){
        alert("Kindly fill all the fields");
    }
    else{
        const ui=new UI();
        ui.addItemToList(item);
        ui.clearFields();
    }
    
    e.preventDefault();
}); 




document.addEventListener('DOMContentLoaded',store.displayLists);

