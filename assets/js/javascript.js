var courseName=document.querySelector("#courseName");
var courseCategory=document.querySelector("#courseCategory");
var coursePrice=document.querySelector("#coursePrice");
var courseDescription=document.querySelector("#courseDescription");
var courseCapacity=document.querySelector("#courseCapacity");
var addBtn=document.querySelector("#click");
var updateBtn=document.querySelector("#click2");
var search=document.getElementById("search");
var inputs=document.querySelectorAll(".inputs");
var nameError=document.querySelector(".nameError");
var resetbtn=document.getElementById("resetbtn");
var deleteBtn=document.getElementById("deleteBtn");
var isNameTrue=false;
var courses=[];

if (JSON.parse(localStorage.getItem("courses")) == null) {
    var courses = [];
} else {
    courses = JSON.parse(localStorage.getItem("courses"));
    displaydata();
}

addBtn.addEventListener("click", function (e) {
    e.preventDefault();
    addCourse();
    clearInputs();
    displaydata();
    
    
});

function addCourse(){
    var course = {
        name:courseName.value,
        Category:courseCategory.value,
        Price:coursePrice.value,
        Description:courseDescription.value,
        Capacity:courseCapacity.value,
    }

    courses.push(course);
    localStorage.setItem("courses",JSON.stringify(courses));
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Course Added Successfully',
        showConfirmButton: false,
        timer: 1500
    })
    
}

resetbtn.addEventListener('click',function(){
    clearInputs();
    addBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");
})

function clearInputs(){
    for(var i=0;i<inputs.length;i++){
        inputs[i].value="";
    }
    addBtn.setAttribute("disabled","disabled");
    updateBtn.setAttribute("disabled","disabled");
    courseName.classList.remove('is-invalid');
    courseName.classList.remove('is-valid');    
    nameError.style.cssText="display:none !important ;";

}

function displaydata(){
    var result="";
    for(var i=0;i<courses.length;i++){
        result+=`
        <tr>
        <td>${i}</td>
        <td>${courses[i].name}</td>
        <td>${courses[i].Category}</td>
        <td>${courses[i].Price}</td>
        <td>${courses[i].Description}</td>
        <td>${courses[i].Capacity}</td>
        <td><button class='btn btn-outline-info' onclick='ShowUpdatebtn(${i})'>Update</button></td>
        <td><button class='btn btn-outline-danger' onclick='deleteCourse(${i})'>Delete</button></td>
        </tr>
        `
    }

    document.getElementById("data").innerHTML=result;


}

function deleteCourse(id) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            courses.splice(id, 1);
            localStorage.setItem("courses",JSON.stringify(courses));
            displaydata();
            swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
            )
        }
    })




    
}

search.addEventListener('keyup',function(e){
    console.log(e.target.value);

    var result="";
    for(var i=0;i<courses.length;i++){
        
        if(courses[i].name.toLowerCase().includes(e.target.value.toLowerCase())){
        result+=`
        <tr>
        <td>${i}</td>
        <td>${courses[i].name}</td>
        <td>${courses[i].Category}</td>
        <td>${courses[i].Price}</td>
        <td>${courses[i].Description}</td>
        <td>${courses[i].Capacity}</td>
        <td><button class='btn btn-outline-info'>Update</button></td>
        <td><button class='btn btn-outline-danger' onclick='deleteCourse(${i})'>Delete</button></td>
        </tr>
        `
        }
    }
    document.getElementById("data").innerHTML=result;
})


courseName.addEventListener('keyup',function(){

    var pattern=/^[A-Z][a-z]{3,10}$/;

        courseName.classList.remove('is-invalid');
        courseName.classList.remove('is-valid');
    

    if(pattern.test(courseName.value)){
        courseName.classList.add('is-valid');
        nameError.style.cssText="display:none !important;";
        isNameTrue=true;
    }
    else{
        
        courseName.classList.add('is-invalid');
        nameError.style.cssText="display:block !important;";
        isNameTrue=false;
    }

    if(isNameTrue){
        addBtn.removeAttribute("disabled");
        updateBtn.removeAttribute("disabled");
    }
    else{
        addBtn.setAttribute("disabled","disabled");
        updateBtn.setAttribute("disabled","disabled");
    }
})

function ShowUpdatebtn(id) {
    addBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");

    returnElementToForm(id);
    updateBtn.removeAttribute("disabled");
    
    updateBtn.addEventListener("click", function updateClickHandler(e) {
        e.preventDefault();
        console.log(id);
        updateElements(id);
        displaydata();
        //clearInputs();
        addBtn.classList.remove("d-none");
        updateBtn.classList.add("d-none");
        localStorage.setItem("courses", JSON.stringify(courses));
    
        // Remove the event listener after it has been triggered
        updateBtn.removeEventListener("click", updateClickHandler);

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Course Updated Successfully',
            showConfirmButton: false,
            timer: 1500
        })
        clearInputs();
    });
    
}

function returnElementToForm(i){
    courseName.value=courses[i].name;
    courseCategory.value=courses[i].Category;
    coursePrice.value=courses[i].Price;
    courseDescription.value=courses[i].Description;
    courseCapacity.value=courses[i].Capacity;
}

function updateElements(i){
    courses[i].name=courseName.value;
    courses[i].Category=courseCategory.value;
    courses[i].Price=coursePrice.value;
    courses[i].Description=courseDescription.value;
    courses[i].Capacity=courseCapacity.value;    
}

deleteBtn.addEventListener("click",function(){

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            courses=[];
            displaydata();
            localStorage.setItem("courses",JSON.stringify(courses));
            swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
            )
        }
    })



    
})



