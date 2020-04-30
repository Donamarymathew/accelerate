const collection=require('../utilities/connection');
const EmployeeDatabase=[
    {
        
        staffId:100001,
        firstName:"Noble",
        lastName:"Jose",
        password:"$2b$10$a2J2hoJ1.Ksaf2vEvmrI1eBPvBmMRoII7dfVzjJ1aqXLOv8UvEdeu"
    },
    {
       
         staffId:100002,
        firstName:"Niharika",
        lastName:"Banerjee",
        password: "$2b$10$2pChY593J36T1eO1HBWuYutW2cM39yqeeCfJwc/56XITuehVrcUfm"
    }
]

exports.setupDb=()=>{
    return collection.getEmployeeCollection().then((emp)=>{
        return emp.deleteMany().then(()=>{return emp.insertMany(EmployeeDatabase).then((data)=>{
            if(data){
                return "Insertion Succcessful"
            }
            else{
                let err=new Error("Insertion Failed");
                err.status=400;
                throw err;
            }
        })})
    })
}


const EventDatabase=[
    {
        "location": {
            "lattitude": "18.567",
            "longitude": "16.88"
        },
        "eventId": 3,
        "title": "yoga",
        "description": "yoga class",
        "eventDateTime": "2020-09-01 09:01:15",
        "empId": "1",
        "rewardPoints": "5"
    },
    {
        "location": {
            "lattitude": "18.567",
            "longitude": "16.88"
        },
        "eventId": 2,
        "title": "cycle",
        "description": "cycle class",
        "eventDateTime": "2020-09-01 09:01:15",
        "empId": "1",
        "rewardPoints": "10"
    },
    {
        "location": {
            "lattitude": "18.567",
            "longitude": "16.88"
        },
        "eventId": 1,
        "title": "kungfu",
        "description": "fight class",
        "eventDateTime": "2020-09-01 09:01:15",
        "empId": "1",
        "rewardPoints": "10"
    }
]

exports.eventSetupDb=()=>{
    return collection.getEventCollection().then((event)=>{
        return event.deleteMany().then(()=>{return event.insertMany(EventDatabase).then((data)=>{
            if(data){
                return "Insertion Succcessful";
            }
            else{
                let err=new Error("Insertion Failed");
                err.status=400;
                throw err;
            }
        })})
    })
}
