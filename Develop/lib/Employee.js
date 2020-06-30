// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name, id, email){
        this.name = name; 
        this.id = id; 
        this.email = email; 
        this.role = 'Employee';
    }
}

Employee.prototype.getName = function() {
    return this.name; 
}

Employee.prototype.getId = function() {
    return this.id; 
}

Employee.prototype.getEmail = function() {
    return this.email; 
}

Employee.prototype.getRole = function() {
    return this.role; 
}

module.exports = Employee; 
// email 
// id 
// specific information 


// employee -- name, id, email 
// intern  --  name, id, email, school 
// engineer -- name, id, email, github username 
// manager --  name, id, email , officer number