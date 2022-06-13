class Room {
    constructor({name, bookings, rate, discount}){
        this.name = name; 
        this.bookings = bookings; 
        this.rate = rate; 
        this.discount = discount;
    }
    

    isOccupied(date){
    //Devuelve false si no está ocupada y devuelve el huésped si está ocupada
        for(let booking of this.bookings){
            if(date >= booking.checkin && date < booking.checkout) return booking.name;
        } 
        return false;
    }

    occupancyPercentage(startDate, endDate){
    //Devuelve el porcentaje de días con ocupación entre el rango de fechas proporcionado
        const rangeDates = getRange(startDate, endDate);
        //Calcular los días de ocupación de cada booking
        const daysOccupied = []; 
        for(let day of rangeDates){
            this.isOccupied(day) ? daysOccupied.push(day) : 0;
        }
        //Calcular el porcentaje de ocupación, sin devolver nunca más de 100%
        const occupancyPercentage = (daysOccupied.length/rangeDates.length)*100;
        return occupancyPercentage < 100 ? occupancyPercentage : 100;
    }
}
class Booking{
    constructor({name, email, checkin, checkout, discount, room}){
        this.name = name 
        this.email = email 
        this.checkin = checkin 
        this.checkout = checkout 
        this.discount = discount 
        this.room = room 
    }
    getFee(){
    //Devuelve tarifa incluyendo los descuentos de la habitación y del cliente
        const rate = this.room.rate;
        const discountRoom = rate*(this.room.discount/100);
        const discountBooking = rate*(this.discount/100);
        const totalDiscount = discountRoom+discountBooking;
        //El precio nunca debe ser menos de 0 aplicando los descuentos
        const price = totalDiscount > rate ? 0 : (rate-totalDiscount);
        return price;
    }
}

function totalOccupancyPercentage(rooms, startDate, endDate){
//Devuelve el porcentaje de ocupación total de las habitaciones que incluyamos en el array
    const rangeDates = getRange(startDate, endDate);
   //Calcular el total de días ocupados de cada habitación
    const daysOccupied = []; 
    for(let room of rooms){
        for(let day of rangeDates){
            room.isOccupied(day) ? daysOccupied.push(day) : 0;
        } 
    }
    //Calcular el porcentaje de ocupación, sin devolver nunca más de 100%
    const totalOccupancyPercentage = (daysOccupied.length/rangeDates.length)*100;
    return totalOccupancyPercentage < 100 ? totalOccupancyPercentage : 100;
}

function availableRooms(rooms, startDate, endDate){
//Devuelve las habitaciones que están disponibles en esas fechas
   const rangeDates = getRange(startDate, endDate);
   //Guardar habitaciones que están disponibles
    const available = [];
    for (let room of rooms) {
        for (let day of rangeDates){
            if(room.isOccupied(day)){
                 break;
            }
            available.push(room.name);
        }
    }
    return available.length ? available : "No room available";
}

//Calcular el rango de días a comprobar
function getRange(startDate, endDate){
    let range = [];
    const theDate = new Date(startDate);
    while (theDate < endDate) {
        range = [...range, new Date(theDate)];
        theDate.setDate(theDate.getDate() + 1);
    };
    return range;
}

module.exports = { Room, Booking, totalOccupancyPercentage, availableRooms }

