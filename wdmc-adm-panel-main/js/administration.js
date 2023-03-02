//import dom
const tableBodyDom = document.getElementById("tablebody");

const addFormDom = document.getElementById("addForm");
const editFormDom = document.getElementById("editForm");

const defaultSourceOfInfo = {
    name: "WebMaster",
    email: "webmaster@nitj.ac.in",
    designation: "WebMaster",
    department: "WebMaster",
};

//function to add data to table
function addDataToTable(data) {
    for (let i = 0; i < data.length; i++) {
        let dataSourceOfInfo = data[i].sourceOfInfo || "";
        let {degree,university,year}=data[i].qualification;
        let contactArray=Object.values(data[i].contact);
        let contactString=contactArray.join(" ");
        tableBodyDom.innerHTML += `<tr>
        <td>${data[i]._id}</td>
        <td>${data[i].name}</td>
        <td>${data[i].designation}</td>
        <td>${data[i].department}</td>
        <td>${degree} ${university} ${year}</td>
        <td><a>${data[i].image}</a></td>
        <td>${data[i].messageText.substring(0,50)} ...</td>
        <td>${contactString}</td>
        <td>${data[i].createdAt}</td>        
        <td>${data[i].updatedAt}</td>        
        <td>${dataSourceOfInfo.name} ${dataSourceOfInfo.designation || ""} ${dataSourceOfInfo.email || ""} ${dataSourceOfInfo.department || ""}</td>
   
        <td>
        <button type="button" class="btn btn-success btn-xs">View</button>
            <button type="button" class="btn btn-primary btn-xs ">Edit</button>
            <button type="button" class="btn btn-danger btn-xs">Delete</button>

        </td>
    </tr>`;
    }
}

//fetch data from server
axios
    .get("https://wdmc.onrender.com/administration/get/all")
    .then((response) => {
        console.log(response.data);
        addDataToTable(response.data);
    })
    .catch((error) => {
        console.error(error);
        alert("Error occured while fetching data from server");
    });

//add form event
addFormDom.addEventListener("submit", (e) => {
    e.preventDefault();
    const department = document.getElementById("adddepartment").value;
    const profileLink = document.getElementById("addprofileLink").value;
    const degree = document.getElementById("adddegree").value;
    const university = document.getElementById("adduniversity").value;
    const year = document.getElementById("addyear").value;

    const messageText = document.getElementById("addmessageText").value;
    const name = document.getElementById("addname").value;
    const designation = document.getElementById("adddesignation").value;
    const image = document.getElementById("addimage").value;

    if (name == "") {
        alert("Please enter name");
        return;
    }
    let sourceOfInfo = {
        name: document.getElementById("addname").value || defaultSourceOfInfo.name,
        email: document.getElementById("addemail").value || defaultSourceOfInfo.email,
        designation: document.getElementById("adddesignation").value || defaultSourceOfInfo.designation,
        department: document.getElementById("adddepartment").value || defaultSourceOfInfo.department,
    };
    let contact = {
        email: document.getElementById("addemail").value,
        telno: document.getElementById("addtelno").value,
        EPABX: document.getElementById("addEPABX").value,
        Extn: document.getElementById("addExtn").value,
        fax: document.getElementById("addfax").value,
    };

    axios
        .post("https://wdmc.onrender.com/administration/", {
            messageText: messageText,
            name: name,
            designation: designation || "",
            department: department,
            profileLink: profileLink,
            qualification: {
                degree: degree,
                university: university,
                year: year,
            },

            image: image,
            sourceOfInfo: sourceOfInfo,
            contact: contact,
        })
        .then((response) => {
            console.log(response);
            alert("Data added successfully");
            location.reload();
        })
        .catch((error) => {
            console.error(error);
            alert("Error occured while adding data to server");
        });
});

//edit form event
editFormDom.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = document.getElementById("editid").value;

    const department = document.getElementById("editdepartment").value;
    const profileLink = document.getElementById("editprofileLink").value;
    const degree = document.getElementById("editdegree").value;
    const university = document.getElementById("edituniversity").value;
    const year = document.getElementById("edityear").value;

    const messageText = document.getElementById("editmessageText").value;
    const name = document.getElementById("editname").value;
    const designation = document.getElementById("editdesignation").value;
    const image = document.getElementById("editimage").value;

    if (name == "") {
        alert("Please enter name");
        return;
    }

    let sourceOfInfo = {
        name: document.getElementById("editname").value || defaultSourceOfInfo.name,
        email: document.getElementById("editemail").value || defaultSourceOfInfo.email,
        designation: document.getElementById("editdesignation").value || defaultSourceOfInfo.designation,
        department: document.getElementById("editdepartment").value || defaultSourceOfInfo.department,
    };
    let contact = {
        email: document.getElementById("editemail").value,
        telno: document.getElementById("edittelno").value,
        EPABX: document.getElementById("editEPABX").value,
        Extn: document.getElementById("editExtn").value,
        fax: document.getElementById("editfax").value,
    };

    axios
        .patch(`https://wdmc.onrender.com/administration/${id}`, {
            messageText: messageText,
            name: name,
            designation: designation || "",
            department: department,
            profileLink: profileLink,
            qualification: {
                degree: degree,
                university: university,
                year: year,
            },

            image: image,
            sourceOfInfo: sourceOfInfo,
            contact: contact,
        })
        .then((response) => {
            console.log(response);
            alert("Data updated successfully");
            location.reload();
        })
        .catch((error) => {
            console.error(error);
            alert("Error occured while updating data to server");
        });
});
