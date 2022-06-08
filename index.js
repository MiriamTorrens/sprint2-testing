class Room {
    constructor(params){
        this.name = params.name; //String
        this.bookings = params.bookings; //Array de bookings
        this.rate = params.rate; //Cent
        this.discount = params.discount; //Int percentage
    }
    isOccupied(date){
        //Devuelve false si no está ocupada y devuelve el huésped si está ocupada
        const bookings = this.bookings;
        if(this.bookings.length){
            for(let i = 0; i < bookings.length; i++){
                if(date >= bookings[i].checkin && date <= bookings[i].checkout){
                    return bookings[i].name;
                }
            }
            return false;
        }else{
            return false;
        }
    }
    occupancyPercentage(startDate, endDate){
        //Devuelve el porcentaje de días con ocupación entre el rango de fechas proporcionado
        const bookings = this.bookings;
        const daysOccupied = []; //Días de ocupación de cada booking
        let totalDays; //Total de días de ocupación de todos los bookings
        const daysDate = parseInt((endDate - startDate)/86400000); //Total de días a comprobar
        if(this.bookings.length){
            for(let i = 0; i < bookings.length; i++){
                if(bookings[i].checkin >= startDate && bookings[i].checkin <= endDate){
                    daysOccupied.push((bookings[i].checkout - bookings[i].checkin)/86400000);
                }
                totalDays = daysOccupied.reduce((a, b) => a + b, 0);
            }
            const percentage = ((totalDays*100)/daysDate) > 100 ? 100 : parseInt((totalDays*100)/daysDate);
            return percentage;
        }else{
            return 0;
        }
    }
}
class Booking{
    constructor(params){
        this.name = params.name //String
        this.email = params.email //String
        this.checkin = params.checkin //Date
        this.checkout = params.checkout //Date
        this.discount = params.discount //Int percentage
        this.room = params.room //Object
    }
    getFee(){
        //Devuelve tarifa incluyendo los descuentos de la habitación y del cliente
        const rate = this.room.rate;
        const discountRoom = rate*(this.room.discount/100);
        const discountBooking = rate*(this.discount/100);
        const totalDiscount = discountRoom+discountBooking;
        const price = totalDiscount > rate ? 0 : (rate-totalDiscount)/100;
        return price;
    }
}

function totalOccupancyPercentage(rooms, startDate, endDate){
    //Devuelve el porcentaje de ocupación total de las habitaciones que incluyamos en el array
    const ocuppancyDays = [];
    let totalDays;  //Total de días ocupados
    const daysDate = parseInt((endDate - startDate)/86400000); //Días a comprobar
    for(let i = 0; i < rooms.length; i++){
        for(let j = 0; j < rooms[i].bookings.length; j++){
            const bookings = rooms[i].bookings[j];
            if(bookings.checkin >= startDate && bookings.checkin <= endDate){
                ocuppancyDays.push((bookings.checkout - bookings.checkin)/86400000);
            }
           totalDays = ocuppancyDays.reduce((a, b) => a + b, 0);
        }
    }
    const percentage = ((totalDays*100)/daysDate) > 100 ? 100 : parseInt((totalDays*100)/daysDate);
    return percentage;
}

function availableRooms(rooms, startDate, endDate){
    //Devuelve las habitaciones que están disponibles en esas fechas
    const Available = [];
    for(let i = 0; i < rooms.length; i++){
        for(let j = 0; j < rooms[i].bookings.length; j++){
            const bookings = rooms[i].bookings[j];
            if(bookings.checkin >= startDate && bookings.checkout <= endDate){
                continue;
            }else{
                if(!Available.includes(bookings.room.name)){
                    Available.push(bookings.room.name);
                }  
            }
        }
    }
    if(Available.length){
        return Available.toString();
    }else{
        return "No room available";
    }
    
}

module.exports = { Room, Booking, totalOccupancyPercentage, availableRooms }

