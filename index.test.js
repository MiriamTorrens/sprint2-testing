const {Room, Booking, totalOccupancyPercentage, availableRooms } = require('./index');

const roomTemplate = {
    name: 'Ocean View Suite',
    rate: 20100,
    discount: 0,
}

describe('Room - isOccupied', () => {
  it('No existen reservas para esa habitación', () => {
    const room = new Room({...roomTemplate, bookings: []})
    expect(room.isOccupied(new Date(2022, 11, 3))).toBe(false);
  });

  it('Un Booking - La habitación está disponible para esa fecha', () => {
    const room = new Room({...roomTemplate, bookings: []})
    const booking1 = new Booking({
      name:"Levi Jacobson",
      email: "Osbaldo_OKeefe67@hotmail.com",
      checkin: new Date(2022, 11, 1),
      checkout: new Date(2022, 11, 4),
      discount: 0,
      room: room
    });
    room.bookings.push(booking1);
    expect(room.isOccupied(new Date(2022, 12, 7))).toBe(false);
  });

  it('Un Booking - La habitación no está disponible para esa fecha', () => {
    const room = new Room({...roomTemplate, bookings: []})
    const booking1 = new Booking({
      name:"Levi Jacobson",
      email: "Osbaldo_OKeefe67@hotmail.com",
      checkin: new Date(2022, 11, 1),
      checkout: new Date(2022, 11, 4),
      discount: 0,
      room: room
    });
    room.bookings.push(booking1);
    expect(room.isOccupied(new Date(2022, 11, 3))).toBe("Levi Jacobson");
  });

  it('Varios Bookings - La habitación está disponible para esa fecha', () => {
    const room = new Room({...roomTemplate, bookings: []})
    const booking1 = new Booking({
      name:"Levi Jacobson",
      email: "Osbaldo_OKeefe67@hotmail.com",
      checkin: new Date(2022, 7, 1),
      checkout: new Date(2022, 7, 16),
      discount: 0,
      room: room
    });
    const booking2 = new Booking({
      name:"Katie Mitchell",
      email: "Ambrose.OConner37@hotmail.com",
      checkin: new Date(2022, 10, 1),
      checkout: new Date(2022, 10, 4),
      discount: 0,
      room: room
    });
    const booking3 = new Booking({
      name:"Cecil Heaney",
      email: "Lisa_Mayer@yahoo.com",
      checkin: new Date(2022, 9, 1),
      checkout: new Date(2022, 9, 4),
      discount: 0,
      room: room
    });
    room.bookings.push(booking1, booking2, booking3);
    expect(room.isOccupied(new Date(2022, 12, 3))).toBe(false);
  });

  it('Varios Bookings - La habitación no está disponible para esa fecha', () => {
    const room = new Room({...roomTemplate, bookings: []})
    const booking1 = new Booking({
      name:"Levi Jacobson",
      email: "Osbaldo_OKeefe67@hotmail.com",
      checkin: new Date(2022, 7, 1),
      checkout: new Date(2022, 7, 16),
      discount: 0,
      room: room
    });
    const booking2 = new Booking({
      name:"Katie Mitchell",
      email: "Ambrose.OConner37@hotmail.com",
      checkin: new Date(2022, 10, 1),
      checkout: new Date(2022, 10, 4),
      discount: 0,
      room: room
    });
    const booking3 = new Booking({
      name:"Cecil Heaney",
      email: "Lisa_Mayer@yahoo.com",
      checkin: new Date(2022, 9, 1),
      checkout: new Date(2022, 9, 4),
      discount: 0,
      room: room
    });
    room.bookings.push(booking1, booking2, booking3);
    expect(room.isOccupied(new Date(2022, 10, 2))).toBe("Katie Mitchell");
  });
});

describe('Room - occupancyPercentage',() => {
  it('Ocupación 0 si no existen reservas', () => {
    const room = new Room({...roomTemplate, bookings: []})
    expect(room.occupancyPercentage(new Date(2022, 11, 3), new Date(2022, 12, 3))).toBe(0);
  });
  
  it('Un Booking - Ocupación 0 en las fechas comprobadas', () => {
    const room = new Room({...roomTemplate, bookings: []})
    const booking1 = new Booking({
      name:"Levi Jacobson",
      email: "Osbaldo_OKeefe67@hotmail.com",
      checkin: new Date(2022, 11, 1),
      checkout: new Date(2022, 11, 4),
      discount: 0,
      room: room
    });
    room.bookings.push(booking1);
    expect(room.occupancyPercentage(new Date(2022, 11, 5), new Date(2022, 12, 10))).toBe(0);
  });
  
  it('Un Booking - Ocupación 50 en las fechas comprobadas', () => {
    const room = new Room({...roomTemplate, bookings: []})
    const booking1 = new Booking({
      name:"Levi Jacobson",
      email: "Osbaldo_OKeefe67@hotmail.com",
      checkin: new Date(2022, 11, 1),
      checkout: new Date(2022, 11, 4),
      discount: 0,
      room: room
    });
    room.bookings.push(booking1);
    expect(room.occupancyPercentage(new Date(2022, 11, 1), new Date(2022, 11, 7))).toBe(50);
  });
  
  it('Un Booking - Ocupación 100 en las fechas comprobadas', () => {
    const room = new Room({...roomTemplate, bookings: []})
    const booking1 = new Booking({
      name:"Levi Jacobson",
      email: "Osbaldo_OKeefe67@hotmail.com",
      checkin: new Date(2022, 11, 1),
      checkout: new Date(2022, 11, 4),
      discount: 0,
      room: room
    });
    room.bookings.push(booking1);
    expect(room.occupancyPercentage(new Date(2022, 11, 1), new Date(2022, 11, 3))).toBe(100);
  });
  
  it('Varios Bookings - Ocupación 0 en las fechas comprobadas', () => {
    const room = new Room({...roomTemplate, bookings: []})
    const booking1 = new Booking({
      name:"Levi Jacobson",
      email: "Osbaldo_OKeefe67@hotmail.com",
      checkin: new Date(2022, 11, 1),
      checkout: new Date(2022, 11, 4),
      discount: 0,
      room: room
    });
    const booking2 = new Booking({
      name:"Katie Mitchell",
      email: "Ambrose.OConner37@hotmail.com",
      checkin: new Date(2022, 7, 1),
      checkout: new Date(2022, 7, 4),
      discount: 0,
      room: room
    });
    const booking3 = new Booking({
      name:"Cecil Heaney",
      email: "Lisa_Mayer@yahoo.com",
      checkin: new Date(2022, 8, 1),
      checkout: new Date(2022, 8, 4),
      discount: 0,
      room: room
    });
    room.bookings.push(booking1, booking2, booking3);
    expect(room.occupancyPercentage(new Date(2022, 9, 1), new Date(2022, 9, 31))).toBe(0);
  });
  
  it('Varios Bookings - Ocupación 50 en las fechas comprobadas', () => {
    const room = new Room({...roomTemplate, bookings: []})
    const booking1 = new Booking({
      name:"Levi Jacobson",
      email: "Osbaldo_OKeefe67@hotmail.com",
      checkin: new Date(2022, 7, 1),
      checkout: new Date(2022, 7, 16),
      discount: 0,
      room: room
    });
    const booking2 = new Booking({
      name:"Katie Mitchell",
      email: "Ambrose.OConner37@hotmail.com",
      checkin: new Date(2022, 10, 1),
      checkout: new Date(2022, 10, 4),
      discount: 0,
      room: room
    });
    const booking3 = new Booking({
      name:"Cecil Heaney",
      email: "Lisa_Mayer@yahoo.com",
      checkin: new Date(2022, 9, 1),
      checkout: new Date(2022, 9, 4),
      discount: 0,
      room: room
    });
    room.bookings.push(booking1, booking2, booking3);
    expect(room.occupancyPercentage(new Date(2022, 7, 1), new Date(2022, 7, 31))).toBe(50);
  });
  
  it('Varios Bookings - Ocupación 100 en las fechas comprobadas', () => {
    const room = new Room({...roomTemplate, bookings: []})
    const booking1 = new Booking({
      name:"Levi Jacobson",
      email: "Osbaldo_OKeefe67@hotmail.com",
      checkin: new Date(2022, 9, 1),
      checkout: new Date(2022, 9, 5),
      discount: 0,
      room: room
    });
    const booking2 = new Booking({
      name:"Katie Mitchell",
      email: "Ambrose.OConner37@hotmail.com",
      checkin: new Date(2022, 9, 5),
      checkout: new Date(2022, 9, 15),
      discount: 0,
      room: room
    });
    const booking3 = new Booking({
      name:"Cecil Heaney",
      email: "Lisa_Mayer@yahoo.com",
      checkin: new Date(2022, 9, 15),
      checkout: new Date(2022, 10, 1),
      discount: 0,
      room: room
    });
    room.bookings.push(booking1, booking2, booking3);
    expect(room.occupancyPercentage(new Date(2022, 9, 1), new Date(2022, 9, 31))).toBe(100);
  });
});

describe('Booking - getFee', () => {
  it('Sin ningún descuento', () =>{
    const room = new Room({...roomTemplate, bookings: []});
    const booking = new Booking({
      name:"Levi Jacobson",
      email: "Osbaldo_OKeefe67@hotmail.com",
      checkin: new Date(2022, 7, 1),
      checkout: new Date(2022, 7, 16),
      discount: 0,
      room: room
    });
    room.bookings.push(booking);
    expect(booking.getFee()).toBe(201);
  });

  it('Descuento 15% en Room', () =>{
    const room = new Room({...roomTemplate, bookings: [], discount: 15});
    const booking = new Booking({
      name:"Levi Jacobson",
      email: "Osbaldo_OKeefe67@hotmail.com",
      checkin: new Date(2022, 7, 1),
      checkout: new Date(2022, 7, 16),
      discount: 0,
      room: room
    });
    room.bookings.push(booking);
    expect(booking.getFee()).toBe(170.85);
  });

  it('Descuento 20% para el cliente', () =>{
    const room = new Room({...roomTemplate, bookings: []});
    const booking = new Booking({
      name:"Levi Jacobson",
      email: "Osbaldo_OKeefe67@hotmail.com",
      checkin: new Date(2022, 7, 1),
      checkout: new Date(2022, 7, 16),
      discount: 20,
      room: room
    });
    room.bookings.push(booking);
    expect(booking.getFee()).toBe(160.8);
  });

  it('Descuento 15% en Room y 20% para el cliente', () =>{
    const room = new Room({...roomTemplate, bookings: [], discount: 15});
    const booking = new Booking({
      name:"Levi Jacobson",
      email: "Osbaldo_OKeefe67@hotmail.com",
      checkin: new Date(2022, 7, 1),
      checkout: new Date(2022, 7, 16),
      discount: 20,
      room: room
    });
    room.bookings.push(booking);
    expect(booking.getFee()).toBe(130.65);
  });

  it('Descuento 50% en Room y 60% para el cliente', () =>{
    const room = new Room({...roomTemplate, bookings: [], discount: 50});
    const booking = new Booking({
      name:"Cecil Heaney",
      email: "Lisa_Mayer@yahoo.com",
      checkin: new Date(2022, 7, 1),
      checkout: new Date(2022, 7, 16),
      discount: 60,
      room: room
    });
    room.bookings.push(booking);
    expect(booking.getFee()).toBe(0);
  });
});

describe('totalOccupancyPercentage', () => {
  it('Dos habitaciones - Ocupación 100 en las fechas comprobadas', () =>{
    const rooms = [];
    const room1 = new Room({...roomTemplate, bookings: []})
    const room2 = new Room({...roomTemplate, name:'Minimal Suite', bookings: []})
    const booking1 = new Booking({
      name:"Levi Jacobson",
      email: "Osbaldo_OKeefe67@hotmail.com",
      checkin: new Date(2022, 11, 1),
      checkout: new Date(2022, 11, 4),
      discount: 0,
      room: room1
    });
    const booking2 = new Booking({
      name:"Cecil Heaney",
      email: "Lisa_Mayer@yahoo.com",
      checkin: new Date(2022, 11, 1),
      checkout: new Date(2022, 11, 4),
      discount: 0,
      room: room2
    });
    rooms.push(room1, room2);
    room1.bookings.push(booking1);
    room2.bookings.push(booking2);
    expect(totalOccupancyPercentage(rooms, new Date(2022, 11, 1), new Date(2022, 11, 3))).toBe(100);
  });

  it('Dos habitaciones - Ocupación 50 en las fechas comprobadas', () =>{
    const rooms = [];
    const room1 = new Room({...roomTemplate, bookings: []})
    const room2 = new Room({...roomTemplate, name:'Minimal Suite', bookings: []})
    const booking1 = new Booking({
      name:"Levi Jacobson",
      email: "Osbaldo_OKeefe67@hotmail.com",
      checkin: new Date(2022, 11, 1),
      checkout: new Date(2022, 11, 5),
      discount: 0,
      room: room1
    });
    const booking2 = new Booking({
      name:"Cecil Heaney",
      email: "Lisa_Mayer@yahoo.com",
      checkin: new Date(2022, 11, 6),
      checkout: new Date(2022, 11, 17),
      discount: 0,
      room: room2
    });
    rooms.push(room1, room2);
    room1.bookings.push(booking1);
    room2.bookings.push(booking2);
    expect(totalOccupancyPercentage(rooms, new Date(2022, 11, 1), new Date(2022, 11, 31))).toBe(50);
  });

  it('Dos habitaciones - Ocupación 0 en las fechas comprobadas', () =>{
    const rooms = [];
    const room1 = new Room({...roomTemplate, bookings: []})
    const room2 = new Room({...roomTemplate, name:'Minimal Suite', bookings: []})
    const booking1 = new Booking({
      name:"Levi Jacobson",
      email: "Osbaldo_OKeefe67@hotmail.com",
      checkin: new Date(2022, 11, 1),
      checkout: new Date(2022, 11, 4),
      discount: 0,
      room: room1
    });
    const booking2 = new Booking({
      name:"Cecil Heaney",
      email: "Lisa_Mayer@yahoo.com",
      checkin: new Date(2022, 11, 1),
      checkout: new Date(2022, 11, 4),
      discount: 0,
      room: room2
    });
    rooms.push(room1, room2);
    room1.bookings.push(booking1);
    room2.bookings.push(booking2);
    expect(totalOccupancyPercentage(rooms, new Date(2022, 12, 5), new Date(2022, 12, 10))).toBe(0);
  });

  it('Cinco habitaciones - Ocupación 100 en las fechas comprobadas', () =>{
    const rooms = [];
    const room1 = new Room({...roomTemplate, bookings: []})
    const room2 = new Room({...roomTemplate, name:'Minimal Suite', bookings: []});
    const room3 = new Room({...roomTemplate, name:'Orange Suite', bookings: []});
    const room4 = new Room({...roomTemplate, name:'Blue Suite', bookings: []});
    const room5 = new Room({...roomTemplate, name:'Green Suite', bookings: []});
    const booking1 = new Booking({
      name:"Levi Jacobson",
      email: "Osbaldo_OKeefe67@hotmail.com",
      checkin: new Date(2022, 11, 1),
      checkout: new Date(2022, 11, 5),
      discount: 0,
      room: room1
    });
    const booking2 = new Booking({
      name:"Cecil Heaney",
      email: "Lisa_Mayer@yahoo.com",
      checkin: new Date(2022, 11, 5),
      checkout: new Date(2022, 11, 15),
      discount: 0,
      room: room1
    });
    const booking3 = new Booking({
      name:"Cecil Heaney",
      email: "Lisa_Mayer@yahoo.com",
      checkin: new Date(2022, 11, 5),
      checkout: new Date(2022, 11, 15),
      discount: 0,
      room: room2
    });
    const booking4 = new Booking({
      name:"Cecil Heaney",
      email: "Lisa_Mayer@yahoo.com",
      checkin: new Date(2022, 11, 15),
      checkout: new Date(2022, 11, 20),
      discount: 0,
      room: room3
    });
    const booking5 = new Booking({
      name:"Cecil Heaney",
      email: "Lisa_Mayer@yahoo.com",
      checkin: new Date(2022, 11, 20),
      checkout: new Date(2022, 11, 25),
      discount: 0,
      room: room4
    });
    const booking6 = new Booking({
      name:"Cecil Heaney",
      email: "Lisa_Mayer@yahoo.com",
      checkin: new Date(2022, 11, 25),
      checkout: new Date(2022, 11, 31),
      discount: 0,
      room: room5
    });
    rooms.push(room1, room2, room3, room4, room5);
    room1.bookings.push(booking1, booking2);
    room2.bookings.push(booking3);
    room3.bookings.push(booking4);
    room4.bookings.push(booking5);
    room5.bookings.push(booking6);
    expect(totalOccupancyPercentage(rooms, new Date(2022, 11, 1), new Date(2022, 11, 31))).toBe(100);
  });

  it('Cinco habitaciones - Ocupación 50 en las fechas comprobadas', () =>{
    const rooms = [];
    const room1 = new Room({...roomTemplate, bookings: []})
    const room2 = new Room({...roomTemplate, name:'Minimal Suite', bookings: []});
    const room3 = new Room({...roomTemplate, name:'Orange Suite', bookings: []});
    const room4 = new Room({...roomTemplate, name:'Blue Suite', bookings: []});
    const room5 = new Room({...roomTemplate, name:'Green Suite', bookings: []});
    const booking1 = new Booking({
      name:"Levi Jacobson",
      email: "Osbaldo_OKeefe67@hotmail.com",
      checkin: new Date(2022, 11, 1),
      checkout: new Date(2022, 11, 5),
      discount: 0,
      room: room1
    });
    const booking2 = new Booking({
      name:"Cecil Heaney",
      email: "Lisa_Mayer@yahoo.com",
      checkin: new Date(2022, 12, 5),
      checkout: new Date(2022, 12, 15),
      discount: 0,
      room: room1
    });
    const booking3 = new Booking({
      name:"Cecil Heaney",
      email: "Lisa_Mayer@yahoo.com",
      checkin: new Date(2022, 11, 5),
      checkout: new Date(2022, 11, 16),
      discount: 0,
      room: room2
    });
    const booking4 = new Booking({
      name:"Cecil Heaney",
      email: "Lisa_Mayer@yahoo.com",
      checkin: new Date(2022, 8, 15),
      checkout: new Date(2022, 8, 20),
      discount: 0,
      room: room3
    });
    const booking5 = new Booking({
      name:"Cecil Heaney",
      email: "Lisa_Mayer@yahoo.com",
      checkin: new Date(2022, 2, 20),
      checkout: new Date(2022, 2, 25),
      discount: 0,
      room: room4
    });
    const booking6 = new Booking({
      name:"Cecil Heaney",
      email: "Lisa_Mayer@yahoo.com",
      checkin: new Date(2022, 6, 25),
      checkout: new Date(2022, 6, 31),
      discount: 0,
      room: room5
    });
    rooms.push(room1, room2, room3, room4, room5);
    room1.bookings.push(booking1, booking2);
    room2.bookings.push(booking3);
    room3.bookings.push(booking4);
    room4.bookings.push(booking5);
    room5.bookings.push(booking6);
    expect(totalOccupancyPercentage(rooms, new Date(2022, 11, 1), new Date(2022, 11, 31))).toBe(50);
  });
  it('Cinco habitaciones - Ocupación 0 en las fechas comprobadas', () =>{
    const rooms = [];
    const room1 = new Room({...roomTemplate, bookings: []})
    const room2 = new Room({...roomTemplate, name:'Minimal Suite', bookings: []});
    const room3 = new Room({...roomTemplate, name:'Orange Suite', bookings: []});
    const room4 = new Room({...roomTemplate, name:'Blue Suite', bookings: []});
    const room5 = new Room({...roomTemplate, name:'Green Suite', bookings: []});
    const booking1 = new Booking({
      name:"Levi Jacobson",
      email: "Osbaldo_OKeefe67@hotmail.com",
      checkin: new Date(2022, 10, 1),
      checkout: new Date(2022, 10, 5),
      discount: 0,
      room: room1
    });
    const booking2 = new Booking({
      name:"Cecil Heaney",
      email: "Lisa_Mayer@yahoo.com",
      checkin: new Date(2022, 12, 5),
      checkout: new Date(2022, 12, 15),
      discount: 0,
      room: room1
    });
    const booking3 = new Booking({
      name:"Cecil Heaney",
      email: "Lisa_Mayer@yahoo.com",
      checkin: new Date(2022, 1, 5),
      checkout: new Date(2022, 1, 16),
      discount: 0,
      room: room2
    });
    const booking4 = new Booking({
      name:"Cecil Heaney",
      email: "Lisa_Mayer@yahoo.com",
      checkin: new Date(2022, 8, 15),
      checkout: new Date(2022, 8, 20),
      discount: 0,
      room: room3
    });
    const booking5 = new Booking({
      name:"Cecil Heaney",
      email: "Lisa_Mayer@yahoo.com",
      checkin: new Date(2022, 2, 20),
      checkout: new Date(2022, 2, 25),
      discount: 0,
      room: room4
    });
    const booking6 = new Booking({
      name:"Cecil Heaney",
      email: "Lisa_Mayer@yahoo.com",
      checkin: new Date(2022, 6, 25),
      checkout: new Date(2022, 6, 31),
      discount: 0,
      room: room5
    });
    rooms.push(room1, room2, room3, room4, room5);
    room1.bookings.push(booking1, booking2);
    room2.bookings.push(booking3);
    room3.bookings.push(booking4);
    room4.bookings.push(booking5);
    room5.bookings.push(booking6);
    expect(totalOccupancyPercentage(rooms, new Date(2022, 11, 1), new Date(2022, 11, 31))).toBe(0);
  });

});


describe('availableRooms', () => {
  it('Dos habitaciones - Ninguna disponible en las fechas comprobadas', () =>{
    const rooms = [];
    const room1 = new Room({...roomTemplate, bookings: []})
    const room2 = new Room({...roomTemplate, name:'Minimal Suite', bookings: []})
    const booking1 = new Booking({
      name:"Levi Jacobson",
      email: "Osbaldo_OKeefe67@hotmail.com",
      checkin: new Date(2022, 11, 1),
      checkout: new Date(2022, 11, 4),
      discount: 0,
      room: room1
    });
    const booking2 = new Booking({
      name:"Cecil Heaney",
      email: "Lisa_Mayer@yahoo.com",
      checkin: new Date(2022, 11, 1),
      checkout: new Date(2022, 11, 4),
      discount: 0,
      room: room2
    });
    rooms.push(room1, room2);
    room1.bookings.push(booking1);
    room2.bookings.push(booking2);
    expect(availableRooms(rooms, new Date(2022, 11, 1), new Date(2022, 11, 8))).toBe("No room available");
  });

  it('Dos habitaciones - Ambas disponibles en la fechas comprobadas', () =>{
    const rooms = [];
    const room1 = new Room({...roomTemplate, bookings: []})
    const room2 = new Room({...roomTemplate, name:'Minimal Suite', bookings: []})
    const booking1 = new Booking({
      name:"Levi Jacobson",
      email: "Osbaldo_OKeefe67@hotmail.com",
      checkin: new Date(2022, 3, 1),
      checkout: new Date(2022, 3, 5),
      discount: 0,
      room: room1
    });
    const booking2 = new Booking({
      name:"Cecil Heaney",
      email: "Lisa_Mayer@yahoo.com",
      checkin: new Date(2022, 8, 6),
      checkout: new Date(2022, 8, 17),
      discount: 0,
      room: room2
    });
    rooms.push(room1, room2);
    room1.bookings.push(booking1);
    room2.bookings.push(booking2);
    expect(availableRooms(rooms, new Date(2022, 11, 1), new Date(2022, 11, 31))).toBe("Ocean View Suite,Minimal Suite");
  });

  it('Dos habitaciones - Una disponible en las fechas comprobadas', () =>{
    const rooms = [];
    const room1 = new Room({...roomTemplate, bookings: []})
    const room2 = new Room({...roomTemplate, name:'Minimal Suite', bookings: []})
    const booking1 = new Booking({
      name:"Levi Jacobson",
      email: "Osbaldo_OKeefe67@hotmail.com",
      checkin: new Date(2022, 11, 1),
      checkout: new Date(2022, 11, 4),
      discount: 0,
      room: room1
    });
    const booking2 = new Booking({
      name:"Cecil Heaney",
      email: "Lisa_Mayer@yahoo.com",
      checkin: new Date(2022, 12, 1),
      checkout: new Date(2022, 12, 4),
      discount: 0,
      room: room2
    });
    rooms.push(room1, room2);
    room1.bookings.push(booking1);
    room2.bookings.push(booking2);
    expect(availableRooms(rooms, new Date(2022, 12, 1), new Date(2022, 12, 31))).toBe("Ocean View Suite");
  });

  it('Cinco habitaciones - Ninguna disponible en las fechas comprobadas', () =>{
    const rooms = [];
    const room1 = new Room({...roomTemplate, bookings: []})
    const room2 = new Room({...roomTemplate, name:'Minimal Suite', bookings: []});
    const room3 = new Room({...roomTemplate, name:'Orange Suite', bookings: []});
    const room4 = new Room({...roomTemplate, name:'Blue Suite', bookings: []});
    const room5 = new Room({...roomTemplate, name:'Green Suite', bookings: []});
    const booking1 = new Booking({
      name:"Levi Jacobson",
      email: "Osbaldo_OKeefe67@hotmail.com",
      checkin: new Date(2022, 12, 1),
      checkout: new Date(2022, 12, 5),
      discount: 0,
      room: room1
    });
    const booking2 = new Booking({
      name:"Cecil Heaney",
      email: "Lisa_Mayer@yahoo.com",
      checkin: new Date(2022, 12, 5),
      checkout: new Date(2022, 12, 15),
      discount: 0,
      room: room1
    });
    const booking3 = new Booking({
      name:"Cecil Heaney",
      email: "Lisa_Mayer@yahoo.com",
      checkin: new Date(2022, 12, 5),
      checkout: new Date(2022, 12, 16),
      discount: 0,
      room: room2
    });
    const booking4 = new Booking({
      name:"Cecil Heaney",
      email: "Lisa_Mayer@yahoo.com",
      checkin: new Date(2022, 12, 15),
      checkout: new Date(2022, 12, 20),
      discount: 0,
      room: room3
    });
    const booking5 = new Booking({
      name:"Cecil Heaney",
      email: "Lisa_Mayer@yahoo.com",
      checkin: new Date(2022, 12, 20),
      checkout: new Date(2022, 12, 25),
      discount: 0,
      room: room4
    });
    const booking6 = new Booking({
      name:"Cecil Heaney",
      email: "Lisa_Mayer@yahoo.com",
      checkin: new Date(2022, 12, 25),
      checkout: new Date(2022, 12, 31),
      discount: 0,
      room: room5
    });
    rooms.push(room1, room2, room3, room4, room5);
    room1.bookings.push(booking1, booking2);
    room2.bookings.push(booking3);
    room3.bookings.push(booking4);
    room4.bookings.push(booking5);
    room5.bookings.push(booking6);
    expect(availableRooms(rooms, new Date(2022, 12, 1), new Date(2022, 12, 31))).toBe("No room available");
  });

  it('Cinco habitaciones - Todas Disponibles en las fechas comprobadas', () =>{
    const rooms = [];
    const room1 = new Room({...roomTemplate, bookings: []})
    const room2 = new Room({...roomTemplate, name:'Minimal Suite', bookings: []});
    const room3 = new Room({...roomTemplate, name:'Orange Suite', bookings: []});
    const room4 = new Room({...roomTemplate, name:'Blue Suite', bookings: []});
    const room5 = new Room({...roomTemplate, name:'Green Suite', bookings: []});
    const booking1 = new Booking({
      name:"Levi Jacobson",
      email: "Osbaldo_OKeefe67@hotmail.com",
      checkin: new Date(2022, 7, 1),
      checkout: new Date(2022, 7, 5),
      discount: 0,
      room: room1
    });
    const booking2 = new Booking({
      name:"Cecil Heaney",
      email: "Lisa_Mayer@yahoo.com",
      checkin: new Date(2022, 8, 5),
      checkout: new Date(2022, 8, 15),
      discount: 0,
      room: room1
    });
    const booking3 = new Booking({
      name:"Cecil Heaney",
      email: "Lisa_Mayer@yahoo.com",
      checkin: new Date(2022, 10, 5),
      checkout: new Date(2022, 10, 16),
      discount: 0,
      room: room2
    });
    const booking4 = new Booking({
      name:"Cecil Heaney",
      email: "Lisa_Mayer@yahoo.com",
      checkin: new Date(2022, 1, 15),
      checkout: new Date(2022, 1, 20),
      discount: 0,
      room: room3
    });
    const booking5 = new Booking({
      name:"Cecil Heaney",
      email: "Lisa_Mayer@yahoo.com",
      checkin: new Date(2022, 4, 20),
      checkout: new Date(2022, 4, 25),
      discount: 0,
      room: room4
    });
    const booking6 = new Booking({
      name:"Cecil Heaney",
      email: "Lisa_Mayer@yahoo.com",
      checkin: new Date(2022, 5, 25),
      checkout: new Date(2022, 5, 31),
      discount: 0,
      room: room5
    });
    rooms.push(room1, room2, room3, room4, room5);
    room1.bookings.push(booking1, booking2);
    room2.bookings.push(booking3);
    room3.bookings.push(booking4);
    room4.bookings.push(booking5);
    room5.bookings.push(booking6);
    expect(availableRooms(rooms, new Date(2022, 12, 1), new Date(2022, 12, 31))).toBe("Ocean View Suite,Minimal Suite,Orange Suite,Blue Suite,Green Suite");
  });

  it('Cinco habitaciones - Tres disponible en las fechas comprobadas', () =>{
    const rooms = [];
    const room1 = new Room({...roomTemplate, bookings: []})
    const room2 = new Room({...roomTemplate, name:'Minimal Suite', bookings: []});
    const room3 = new Room({...roomTemplate, name:'Orange Suite', bookings: []});
    const room4 = new Room({...roomTemplate, name:'Blue Suite', bookings: []});
    const room5 = new Room({...roomTemplate, name:'Green Suite', bookings: []});
    const booking1 = new Booking({
      name:"Levi Jacobson",
      email: "Osbaldo_OKeefe67@hotmail.com",
      checkin: new Date(2022, 6, 1),
      checkout: new Date(2022, 6, 5),
      discount: 0,
      room: room1
    });
    const booking2 = new Booking({
      name:"Cecil Heaney",
      email: "Lisa_Mayer@yahoo.com",
      checkin: new Date(2022, 7, 5),
      checkout: new Date(2022, 7, 15),
      discount: 0,
      room: room1
    });
    const booking3 = new Booking({
      name:"Cecil Heaney",
      email: "Lisa_Mayer@yahoo.com",
      checkin: new Date(2022, 12, 5),
      checkout: new Date(2022, 12, 16),
      discount: 0,
      room: room2
    });
    const booking4 = new Booking({
      name:"Cecil Heaney",
      email: "Lisa_Mayer@yahoo.com",
      checkin: new Date(2022, 12, 15),
      checkout: new Date(2022, 12, 20),
      discount: 0,
      room: room3
    });
    const booking5 = new Booking({
      name:"Cecil Heaney",
      email: "Lisa_Mayer@yahoo.com",
      checkin: new Date(2022, 12, 20),
      checkout: new Date(2022, 12, 25),
      discount: 0,
      room: room4
    });
    const booking6 = new Booking({
      name:"Cecil Heaney",
      email: "Lisa_Mayer@yahoo.com",
      checkin: new Date(2022, 6, 25),
      checkout: new Date(2022, 6, 31),
      discount: 0,
      room: room5
    });
    rooms.push(room1, room2, room3, room4, room5);
    room1.bookings.push(booking1, booking2);
    room2.bookings.push(booking3);
    room3.bookings.push(booking4);
    room4.bookings.push(booking5);
    room5.bookings.push(booking6);
    expect(availableRooms(rooms, new Date(2022, 12, 1), new Date(2022, 12, 31))).toBe("Ocean View Suite,Green Suite");
  });
});




