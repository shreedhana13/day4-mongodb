{
   // "users" 
   [
      {
        "user_id": 1,
        "name": "shreedhana",
        "email": "shreedhanakathiravan@gmail.comn",
        "mentor_id": 101
        
      },
      
    ],
  
    //"codekata"
    [
      {
        "user_id": 1,
        "student name": "shreedhana",
        "problems_solved": 50,
        
      },
      
    ],
  
   // "attendance"
    [
      {
        "user_id": 1,
        "student name": "shreedhana",
        "status": "present"
      },
      
    ],
  
    //"topics"
    [
      {
        "topic_id": 101,
        "name": "MongoDB Basics",
      },
    
    ],
  
    //"tasks"
    [
      {
        "user_id": 1,
        "submission_status": "Not Submitted",
        
      },
      
    ],
  
    //"company_drives"
    [
      {
        "drive_id": 201,
        "name": "Tech Company X",
        
      },
     
    ],
  
    //"mentors"
    [
      {
        "mentor_id": 101,
        "name": "Sanjay",
        "batch": "B51WD2"
        
      },
      
    ]
  }

//Find all the topics and tasks which are thought in the month of October
db.topics.find({}).pretty();
db.tasks.find({ "date": { $gte: Date("2020-10-01T00:00:00Z"), $lte: ISODate("2020-10-31T23:59:59Z") } }).pretty();

//Find all the company drives which appeared between 15 oct-2020 and 31-oct-2020
db.company_drives.find({ "date": { $gte: Date("2020-10-15T00:00:00Z"), $lte: ISODate("2020-10-31T23:59:59Z") } }).pretty();

//Find all the company drives and students who are appeared for the placement.
db.company_drives.find({}).pretty();
db.users.find({ "user_id": { $in: [] } }).pretty();

//Find the number of problems solved by the user in codekata
db.codekata.aggregate([
    { $match: { "user_id": 1 } },
    { $group: { _id: null, total_problems_solved: { $sum: "$problems_solved" } } }
  ]).pretty();
  
//Find all the mentors with who has the mentee's count more than 15
db.mentors.find({ "mentee_count": { $gt: 15 } }).pretty();

//Find the number of users who are absent and task is not submitted  between 15 oct-2020 and 31-oct-2020
db.users.find({
    "user_id": {
      $in: db.attendance.find({
        "status": "Absent",
        "date": { $gte: ISODate("2020-10-15T00:00:00Z"), $lte: ISODate("2020-10-31T23:59:59Z") }
      }).map(att => att.user_id)
    },
    "user_id": {
      $in: db.tasks.find({
        "submission_status": "Not Submitted",
        "date": { $gte: ISODate("2020-10-15T00:00:00Z"), $lte: ISODate("2020-10-31T23:59:59Z") }
      }).map(task => task.user_id)
    }
  }).count();
  
  