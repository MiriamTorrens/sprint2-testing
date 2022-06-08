class Room {
    constructor(params){
        this.name = params.name; 
        this.bookings = params.bookings; 
        this.rate = params.rate; 
        this.discount = params.discount;
    }
    isOccupied(date){
    //Devuelve false si no está ocupada y devuelve el huésped si está ocupada
        const bookings = this.bookings;
        if(this.bookings.length){
            for(let i = 0; i < bookings.length; i++){
                if(date >= bookings[i].checkin && date <= bookings[i].checkout) return bookings[i].name;
            }
            return false;
        }
        return false;
    }
    occupancyPercentage(startDate, endDate){
    //Devuelve el porcentaje de días con ocupación entre el rango de fechas proporcionado
        const bookings = this.bookings;
        const daysOccupied = []; //Array con los días de ocupación de cada booking
        let totalDays; //Suma del total de días de ocupación de todos los bookings
        const daysDate = parseInt((endDate - startDate)/86400000); //Rango de días a comprobar
        if(this.bookings.length){
            for(let i = 0; i < bookings.length; i++){
                if(bookings[i].checkin >= startDate && bookings[i].checkin <= endDate){
                    daysOccupied.push((bookings[i].checkout - bookings[i].checkin)/86400000);
                }
                totalDays = daysOccupied.reduce((a, b) => a + b, 0);
            }
            const percentage = ((totalDays*100)/daysDate) > 100 ? 100 : parseInt((totalDays*100)/daysDate);
            return percentage;
        }
        return 0;
    }
}
class Booking{
    constructor(params){
        this.name = params.name 
        this.email = params.email 
        this.checkin = params.checkin 
        this.checkout = params.checkout 
        this.discount = params.discount 
        this.room = params.room 
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
    const ocuppancyDays = []; //Array con los días de ocupación de cada booking
    let totalDays;  //Suma del total de días de ocupación de todos los bookings
    const daysDate = parseInt((endDate - startDate)/86400000); ////Rango de días a comprobar
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
    if(Available.length) return Available.toString();
    return "No room available";
}

module.exports = { Room, Booking, totalOccupancyPercentage, availableRooms }

