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
        tableBodyDom.innerHTML += `<tr>
        <td>${data[i]._id}</td>
        <td>${data[i].name}</td>
        <td>${data[i].department}</td>
        <td>${data[i].batch}</td>
        <td>${data[i].team}</td>
        <td>${data[i].work}</td>
        <td>${data[i].facultyMentor}</td>
        <td>${data[i].taskAssigned}</td>
        <td><a>${data[i].githubLink || "no link"}</a></td>
        <td><a>${data[i].linkedinLink || "no link"}</a></td>
        <td>${new Date(data[i].startDate).toDateString()}</td>
        <td>${new Date(data[i].endDate).toDateString()}</td>
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
    .get("https://wdmc.onrender.com/studentTeam/get/all")
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
    const name = document.getElementById("addStudentname").value;
    const department = document.getElementById("adddepartment").value;
    const batch = document.getElementById("addbatch").value;
    const team = document.getElementById("addteam").value;
    const work = document.getElementById("addwork").value;
    const facultyMentor = document.getElementById("addfacultyMentor").value;
    const taskAssigned = document.getElementById("addtaskAssigned").value;
    const githubLink = document.getElementById("addgithubLink").value;
    const linkedinLink = document.getElementById("addlinkedinLink").value;
    const startDate=document.getElementById("addstartdate").value;
    const endDate=document.getElementById("addenddate").value;

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

    axios
        .post("https://wdmc.onrender.com/studentTeam/", {
            name: name,
            department: department || "",
            batch: batch,
            team:team,
            work:work,
            facultyMentor:facultyMentor,
            taskAssigned:taskAssigned,
            githubLink:githubLink || "",
            linkedinLink:linkedinLink || "",
            startDate:startDate,
            endDate:endDate,
            sourceOfInfo: sourceOfInfo,
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
    const name = document.getElementById("editname").value;
    const department = document.getElementById("editdepartment").value;
    const batch = document.getElementById("editbatch").value;
    const team = document.getElementById("editteam").value;
    const work = document.getElementById("editwork").value;
    const facultyMentor = document.getElementById("editfacultyMentor").value;
    const taskAssigned = document.getElementById("edittaskAssigned").value;
    const githubLink = document.getElementById("editgithubLink").value;
    const linkedinLink = document.getElementById("editlinkedinLink").value;
    const startDate=document.getElementById("addstartdate").value;
    const endDate=document.getElementById("addenddate").value;

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

    axios
        .patch(`https://wdmc.onrender.com/studentTeam/${id}`, {
            name: name,
            department: department,
            batch: batch,
            team:team,
            work:work,
            facultyMentor:facultyMentor,
            taskAssigned:taskAssigned,
            githubLink:githubLink,
            linkedinLink:linkedinLink,
            startDate:startDate,
            endDate:endDate,
            sourceOfInfo: sourceOfInfo,
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
