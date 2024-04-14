async function displayAllEmployees() {
    try {
        const response = await fetch('http://localhost:3001/api/employees');
        if (!response.ok) {
            throw new Error('Failed to fetch employees');
        }

        const employees = await response.json();

        const employeesList = document.querySelector('.container-workers .list-group');
        const employeeInfo = document.querySelector('.container-details')

        employeesList.innerHTML = '';
        document.querySelector('.container-details .row').innerHTML = '';

        employees.forEach(employee => {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
            const span = document.createElement('span');
            span.textContent = employee.name.toUpperCase();
            const showBtn = document.createElement('button');
            showBtn.classList.add('btn', 'me-2');
            showBtn.textContent = "ИЗБЕРИ";
            showBtn.dataset.employeeId = employee.id;
            listItem.appendChild(span);
            listItem.appendChild(showBtn);
            employeesList.appendChild(listItem);
        
            showBtn.addEventListener('click', async () => {
                try {
                    const employeeId = showBtn.dataset.employeeId;
                    const employeeDetailsResponse = await fetch(`http://localhost:3001/api/employees/${employeeId}`);
                    if (!employeeDetailsResponse.ok) {
                        throw new Error('Failed to fetch employee details');
                    }
                    const employeeDetails = await employeeDetailsResponse.json();
                    
                    const imageUrl = employee.imageUrl.replace('public', '..');
                    employeeInfo.innerHTML = `
                        <h3 class="mb-3">ДЕТАЙЛИ</h3>
                        <div class="row col-md-12 m-0 p-0 d-flex">
                            <div class="container-image col-md-6 m-0 p-0">
                                <img src="${imageUrl}" alt="Worker Image" class="img-fluid">
                            </div>
                            <div class="container-header-details col-md-6 p-4 d-flex flex-column justify-content-center">
                                <h4>${employeeDetails.name.toUpperCase()}</h4>
                                <p class="mb-3">${employeeDetails.position}</p>
                                <h5 class="mt-3">ПРОФЕСИОНАЛЕН ОПИТ</h5>
                                <p>${employeeDetails.exp}</p>
                            </div>
                        </div>`;
                } catch (error) {
                    console.error('Error showing employee info', error);
                }
            });
        });        
    } catch (error) {
        console.error('Error:', error.message);
    }
}

document.addEventListener('DOMContentLoaded', displayAllEmployees());