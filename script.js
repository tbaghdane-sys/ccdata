function saveData() {

    let srno = document.getElementById("srno").value;
    let collegeCode = document.getElementById("collegeCode").value;
    let collegeName = document.getElementById("collegeName").value;
    let status = document.getElementById("status").value;

    fetch("http://localhost:3000/save", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            srno: srno,
            collegeCode: collegeCode,
            collegeName: collegeName,
            status: status
        })
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        loadData();
    });
}
function loadData() {

    fetch("http://localhost:3000/users")
        .then(response => response.json())
        .then(data => {

            let output = `
                <table border="1">
                    <tr>
                        <th>Sr. No.</th>
                        <th>College Code</th>
                        <th>College Name</th>
                        <th>Status</th>
                    </tr>
            `;

            data.forEach(item => {
                output += `
                    <tr>
                        <td>${item.srno}</td>
                        <td>
                             <a href="details.html?code=${item.collegeCode}">
                                ${item.collegeCode}
                            </a>
                        </td>
                        <td>${item.collegeName}</td>
                        <td>${item.status}</td>
                    </tr>
                `;
            });

            output += "</table>";

            document.getElementById("output").innerHTML = output;
        });

}
loadData();