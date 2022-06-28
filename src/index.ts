
export interface IRoom{
    name: string,
    bookings: IBooking[],
    rate: number,
    discount: number,
}

export interface IBooking{
    name: string,
    email: string, 
    checkin: Date,
    checkout: Date, 
    discount: number, 
    room: IRoom
}

export class Room implements IRoom{
    name;
    bookings;
    rate;
    discount;

    constructor({name, bookings, rate, discount}: IRoom){
        this.name = name; 
        this.bookings = bookings; 
        this.rate = rate; 
        this.discount = discount;
    }
 
    isOccupied(date: Date): boolean|string{
    //Devuelve false si no está ocupada y devuelve el huésped si está ocupada
        for(let booking of this.bookings){
            if(date >= booking.checkin && date < booking.checkout) return booking.name;
        } 
        return false;
    }

    occupancyPercentage(startDate: Date, endDate: Date):number{
    //Devuelve el porcentaje de días con ocupación entre el rango de fechas proporcionado
        const rangeDates = getRange(startDate, endDate);
        //Calcular los días de ocupación de cada booking
        const daysOccupied: Date[] =  []; 
        for(let day of rangeDates){
            this.isOccupied(day) ? daysOccupied.push(day) : 0;
        }
        //Calcular el porcentaje de ocupación, sin devolver nunca más de 100%
        const occupancyPercentage:number = (daysOccupied.length/rangeDates.length)*100;
        return occupancyPercentage < 100 ? occupancyPercentage : 100;
    }
}

export class Booking implements IBooking{
    name;
    email; 
    checkin;
    checkout; 
    discount; 
    room: IRoom;

    constructor({name, email, checkin, checkout, discount, room}: IBooking){
        this.name = name 
        this.email = email 
        this.checkin = checkin 
        this.checkout = checkout 
        this.discount = discount 
        this.room = room 
    }
    
    getFee(): number{
    //Devuelve tarifa incluyendo los descuentos de la habitación y del cliente
        const rate: number = this.room.rate;
        const discountRoom: number = rate*(this.room.discount/100);
        const discountBooking: number = rate*(this.discount/100);
        const totalDiscount: number = discountRoom+discountBooking;
        //El precio nunca debe ser menos de 0 aplicando los descuentos
        const price: number = totalDiscount > rate ? 0 : (rate-totalDiscount);
        return price;
    }
}

export function totalOccupancyPercentage(rooms: Room[], startDate: Date, endDate: Date): number{
//Devuelve el porcentaje de ocupación total de las habitaciones que incluyamos en el array
    const rangeDates = getRange(startDate, endDate);
   //Calcular el total de días ocupados de cada habitación
    const daysOccupied: Date[] = []; 
    for(let room of rooms){
        for(let day of rangeDates){
            room.isOccupied(day) ? daysOccupied.push(day) : 0;
        } 
    }
    //Calcular el porcentaje de ocupación, sin devolver nunca más de 100%
    const totalOccupancyPercentage = (daysOccupied.length/rangeDates.length)*100;
    return totalOccupancyPercentage < 100 ? totalOccupancyPercentage : 100;
}

export function availableRooms(rooms: Room[], startDate: Date, endDate: Date): string[]| string{
//Devuelve las habitaciones que están disponibles en esas fechas
   const rangeDates = getRange(startDate, endDate);
   //Guardar habitaciones que están disponibles
    const available: string[] = [];
    for (let room of rooms) {
        for (let day of rangeDates){
            if(room.isOccupied(day)){
                 break;
            }
            if(!available.includes(room.name)){
                available.push(room.name);
            }
        }
    }
    return available.length ? available : "No room available";
}

//Calcular el rango de días a comprobar
function getRange(startDate: Date, endDate: Date):Date[]{
    let range: Date[] = [];
    const theDate = new Date(startDate);
    while (theDate < endDate) {
        range = [...range, new Date(theDate)];
        theDate.setDate(theDate.getDate() + 1);
    };
    return range;
}

module.exports = { Room, Booking, totalOccupancyPercentage, availableRooms }