const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createEmployee(employeeData) {
    try {
        const newEmployee = await prisma.employee.create({
            data: employeeData,
        });
        return newEmployee;
    } catch (error) {
        throw new Error('Error creating employee');
    }
}

async function getEmployees() {
    try {
        const employees = await prisma.employee.findMany();
        return employees;
    } catch (error) {
        throw new Error('Error getting employees');
    }
}

async function getEmployeeById(employeeId) {
    try {
        const employee = await prisma.employee.findUnique({
            where: {
                id: parseInt(employeeId),
            },
        });
        return employee;
    } catch (error) {
        throw new Error('Error getting employee by ID');
    }
}

async function updateEmployee(employeeId, employeeData) {
    try {
        const updatedEmployee = await prisma.employee.update({
            where: {
                id: parseInt(employeeId),
            },
            data: employeeData,
        });
        return updatedEmployee;
    } catch (error) {
        throw new Error('Error updating employee');
    }
}

async function deleteEmployee(employeeId) {
    try {
        const deletedEmployee = await prisma.employee.delete({
            where: {
                id: parseInt(employeeId),
            },
        });
        return deletedEmployee;
    } catch (error) {
        throw new Error('Error deleting employee');
    }
}

module.exports = {
    createEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
};