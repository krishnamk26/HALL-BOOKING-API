const express =require('express');
const app =express();
app.use(express.json());
const { response } = require('express');

const PORT =process.env.PORT||8000;



// Local variable to store data

const rooms =[
    {
    roomID:0,
    roomName:"100",
    NoOfSeatsAvailable:2,
    amenities:["cold","hot","coldHot"],
    pricePerHour:4000,
    bookedStatus:false,
    customerDetails:{
        customerName:"shubham",
        date:"15/08/2023",
        startTime:"9:30",
        endTime:"10:30",
    }
},
{

    roomID:1,
    roomName:"200",
    NoOfSeatsAvailable:2,
    amenities:["cold","hot","coldHot"],
    pricePerHour:12000,
    bookedStatus:true,
    customerDetails:{
        customerName:"Krishna",
        date:"20/08/2023",
        startTime:"12:30",
        endTime:"1:30",
    }
},
{
    roomID:2,
    roomName:"300",
    NoOfSeatsAvailable:2,
    amenities:["cold","hot","coldHot"],
    pricePerHour:11000,
    bookedStatus:false,
    customerDetails:{
        customerName:"Ajay",
        date:"22/08/2023",
        startTime:"4:30",
        endTime:"10:30",
    }
},
{
    roomID:3,
    roomName:"400",
    NoOfSeatsAvailable:2,
    amenities:["cold","hot","coldHot"],
    pricePerHour:6000,
    bookedStatus:false,
    customerDetails:{
        customerName:"Harish",
        date:"30/08/2023",
        startTime:"2:30",
        endTime:"4:30",
    }
}
];

//Home page route

app.get('/',(request,response)=>{
    response.send("Welcome to Hall Booking API")
})

app.post('/rooms/create',(request,response)=>{
    const newroom= request.body;
    rooms.push(newroom);
    response.send("room booked successfully")
})

//to book room

app.post('/rooms',(request,response)=>{
    const booking =request.body;

  rooms.map((room)=>{
        if (room.roomID === booking.roomID){
            if (room.customerDetails.date !== booking.customerDetails.date){
            room.customerDetails.customerName = booking.customerDetails.customerName;
            room.customerDetails.date =booking.customerDetails.date;
            room.customerDetails.startTime=booking.customerDetails.startTime;
            room.customerDetails.endTime=booking.customerDetails.endTime;
            rooms.push(booking)
           response.send("Room booked successfully")
        }
        else{
            response.send("room booked already....please select another room")
        }
        return room;
    }
})
})

// rooms.push(booking)
//            response.send("Room booked successfully")

//list all booked rooms data

app.get('/booked',(request,response)=>{
    response.send(
        rooms.map((room)=>{
            if (room.bookedStatus==true){
                return{
                    "Room Name":room.roomName,
                    "Booked Status":"Booked",
                    "Start Time":room.customerDetails.startTime,
                    "End Time":room.customerDetails.endTime,
                    "Date":room.customerDetails.date,
                    "Customer Name":room.customerDetails.customerName,
                }
            }
            else{
            return{"Room Name":room.roomName,"Booked Status":"Room is Available"}}
        })
    )
})

//list all customer with booked data

app.get('/book/custom',(request,response)=>{
    response.send(
      rooms.filter((room)=>{
   if (room.bookedStatus === true){
    return room;
   }
})
 .map((room)=>{
    return{
        'Customer Name':room.customerDetails.customerName,
        'Room Name':room.roomName,
        'Date':room.customerDetails.date,
        'Start Time':room.customerDetails.startTime,
        "End Time":room.customerDetails.endTime
    }
 })
    )
})

app.listen(PORT,()=>console.log("server has started at:",PORT));