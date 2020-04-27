const empdb=require('../model/empModel');
let employeeSerive={}
const validator=require('../utilities/validator');




//get details of all employees
employeeSerive.getAllEmployees=()=>{
    return empdb.getAllEmployees().then(data=>{
        if(data==null){
            let err=new Error("There are no registered employee yet!");
            err.status=404;
            throw err;
        }
        else{
            return data;
        }
    })
}

//get detail of an employee based on empId
employeeSerive.getEmployeeById = ((employeeId) => {
    console.log(employeeId);
    return empdb.findEmployee(employeeId).then((emp) => {
        if (emp == null) {
            let err = new Error("Employee details not available!! Please Register");
            err.status = 404;
            throw err;
        } else {
                return emp;
        }
    })
})




//verify empId and password
employeeSerive.loginEmployee=(staffId,password)=>{
    return empdb.loginEmployee(staffId,password)
    .then((response)=>{
        if(response==null){
            let err=new Error("Wrong Credential")
            err.status=404;
            throw err
        }
        else {
            return {"message":"Login Successful "};
        }
    })
    }


//register employee
employeeSerive.registerEmployee=((empObj)=>{
    console.log(empObj.staffId);
    validator.validateempId(empObj.staffId);
    validator.validatepassword(empObj.password);
    return empdb.findEmployee(empObj.staffId).then(object=>{
        if(object!=null){
            let err= new Error("Employee already registered with the employeeID ");
            err.status=404;
            throw err;
        }else{
            return empdb.registerEmployee(empObj).then((data)=>{
                if(data){
                return {"message": "Successfully registered employee with ID: "+data}
            }
                else{
                    let err= new Error("Employee Details not Inserted");
                    err.status=500;
                    throw err;
                }
            })}})})

//delete employee
employeeSerive.deleteEmployee=(empId)=>{
    return empdb.findEmployee(empId).then(object=>{
        if(object==null){
            let err= new Error("Employee not registered!!");
            err.status=404;
            throw err;
        }else{
    return empdb.deleteEmployee(empId).then(data=>{

        if(data){
            return {"message":"Deleted Employee with ID: "+data};
        }
        else{
            let err=new Error("Failed to delete the Employee");
            err.status=403;
            throw err;
        }
    })
}
    })
}


//update password
employeeSerive.updateEmployee=((employeeId,password)=>{
    return empdb.findEmployee(employeeId).then(object=>{
        if(object==null){
            let err= new Error("Employee not  registered!!");
            err.status=404;
            throw err;
        }else{
    validator.validatepassword(password);
    return empdb.updateEmployee(employeeId,password).then(data=>{
        if(data){
            return {"message": "Successfully updated password of employee with ID: "+data}
        }
        else{
            let err= new Error("Sorry!! Failed to update employee details");
            err.status=403;
            throw err;
        }
    })
}
    })
})

module.exports=employeeSerive;