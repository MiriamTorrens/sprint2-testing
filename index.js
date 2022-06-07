class Room {
    constructor(params){
        this.name = params.name; //String
        this.bookings = params.bookings; //Array de bookings
        this.rate = params.rate; //Precio en céntimos
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
        //Devuelve tarifa incluyendo los descuentos de room y booking
    }
}

function totalOccupancyPercentage(rooms, startDate, endDate){
    //Devuelve el porcentaje de ocupación total de las habitaciones que incluyamos en el array
}

function availableRooms(rooms, startDate, endDate){
    //Devuelve las habitaciones que están disponibles en esas fechas
}

module.exports = { Room, Booking }

