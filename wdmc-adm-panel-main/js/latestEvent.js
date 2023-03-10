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
        let dataSourceOfInfo = data[i].sourceOfInfo;
        tableBodyDom.innerHTML += `<tr>
        <td>${data[i]._id}</td>
        <td>${data[i].title}</td>
        <td>${data[i].desc}</td>
        <td>${data[i].link || "No link"}</td>
        <td>${new Date(data[i].createdAt).toDateString()}</td>
        <td>${new Date(data[i].updatedAt).toDateString()}</td>
                
        <td>${dataSourceOfInfo.name} ${dataSourceOfInfo.designation || ""} ${dataSourceOfInfo.email || ""} ${dataSourceOfInfo.department || ""}</td>
        <td>${data[i].image || "No Image"}</td>

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
    .get("https://wdmc.onrender.com/latestEvent/get/all")
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
    const title = document.getElementById("addtitle").value;
    const desc = document.getElementById("addtext").value;
    const link = document.getElementById("addlink").value;
    const image = document.getElementById("addImageLink").value;

    if (title == "") {
        alert("Please enter title");
        return;
    }

    let sourceOfInfo = {
        name: document.getElementById("addname").value || defaultSourceOfInfo.name,
        email: document.getElementById("addemail").value || defaultSourceOfInfo.email,
        designation: document.getElementById("adddesignation").value || defaultSourceOfInfo.designation,
        department: document.getElementById("adddepartment").value || defaultSourceOfInfo.department,
    };

    axios
        .post("https://wdmc.onrender.com/latestEvent/", {
            title: title,
            desc: desc || "",
            link: link || "",
            sourceOfInfo: sourceOfInfo,
            image: image || "",
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
    const title = document.getElementById("edittitle").value;
    const desc = document.getElementById("edittext").value;
    const link = document.getElementById("editlink").value;
    const image = document.getElementById("editImageLink").value;

    if (title == "") {
        alert("Please enter title");
        return;
    }

    let sourceOfInfo = {
        name: document.getElementById("editname").value || defaultSourceOfInfo.name,
        email: document.getElementById("editemail").value || defaultSourceOfInfo.email,
        designation: document.getElementById("editdesignation").value || defaultSourceOfInfo.designation,
        department: document.getElementById("editdepartment").value || defaultSourceOfInfo.department,
    };

    axios
        .patch(`https://wdmc.onrender.com/latestEvent/${id}`, {
            title: title,
            desc: desc || "",
            link: link || "",
            sourceOfInfo: sourceOfInfo,
            image: image || "",
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
