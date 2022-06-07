const {Room, Booking } = require('./index');

const roomTemplate = {
    name: 'Ocean View Suite',
    rate: 20100,
    discount: 0.2,
}

//Función isOccupied
test('isOccupied: No existen reservas para esa habitación', () => {
    const room = new Room({...roomTemplate, bookings: []})
    expect(room.isOccupied(new Date(2022, 11, 3))).toBe(false);
});

test('isOccupied: Un Booking - La habitación está disponible para esa fecha', () => {
  const room = new Room({...roomTemplate, bookings: []})
  const booking1 = new Booking({
    name:"Levi Jacobson",
    email: "Osbaldo_OKeefe67@hotmail.com",
    checkin: new Date(2022, 11, 1),
    checkout: new Date(2022, 11, 4),
    discount: 0,
    room: 'Ocean View Suite'
  });
  room.bookings.push(booking1);
  expect(room.isOccupied(new Date(2022, 12, 7))).toBe(false);
});

test('isOccupied: Un Booking - La habitación no está disponible para esa fecha', () => {
  const room = new Room({...roomTemplate, bookings: []})
  const booking1 = new Booking({
    name:"Levi Jacobson",
    email: "Osbaldo_OKeefe67@hotmail.com",
    checkin: new Date(2022, 11, 1),
    checkout: new Date(2022, 11, 4),
    discount: 0,
    room: 'Ocean View Suite'
  });
  room.bookings.push(booking1);
  expect(room.isOccupied(new Date(2022, 11, 3))).toBe("Levi Jacobson");
});

test('isOccupied: Varios Bookings - La habitación está disponible para esa fecha', () => {
  const room = new Room({...roomTemplate, bookings: []})
  const booking1 = new Booking({
    name:"Levi Jacobson",
    email: "Osbaldo_OKeefe67@hotmail.com",
    checkin: new Date(2022, 7, 1),
    checkout: new Date(2022, 7, 16),
    discount: 0,
    room: 'Ocean View Suite'
  });
  const booking2 = new Booking({
    name:"Katie Mitchell",
    email: "Ambrose.OConner37@hotmail.com",
    checkin: new Date(2022, 10, 1),
    checkout: new Date(2022, 10, 4),
    discount: 0,
    room: 'Ocean View Suite'
  });
  const booking3 = new Booking({
    name:"Cecil Heaney",
    email: "Lisa_Mayer@yahoo.com",
    checkin: new Date(2022, 9, 1),
    checkout: new Date(2022, 9, 4),
    discount: 0,
    room: 'Ocean View Suite'
  });
  room.bookings.push(booking1, booking2, booking3);
  expect(room.isOccupied(new Date(2022, 12, 3))).toBe(false);
});

test('isOccupied: Varios Bookings - La habitación no está disponible para esa fecha', () => {
  const room = new Room({...roomTemplate, bookings: []})
  const booking1 = new Booking({
    name:"Levi Jacobson",
    email: "Osbaldo_OKeefe67@hotmail.com",
    checkin: new Date(2022, 7, 1),
    checkout: new Date(2022, 7, 16),
    discount: 0,
    room: 'Ocean View Suite'
  });
  const booking2 = new Booking({
    name:"Katie Mitchell",
    email: "Ambrose.OConner37@hotmail.com",
    checkin: new Date(2022, 10, 1),
    checkout: new Date(2022, 10, 4),
    discount: 0,
    room: 'Ocean View Suite'
  });
  const booking3 = new Booking({
    name:"Cecil Heaney",
    email: "Lisa_Mayer@yahoo.com",
    checkin: new Date(2022, 9, 1),
    checkout: new Date(2022, 9, 4),
    discount: 0,
    room: 'Ocean View Suite'
  });
  room.bookings.push(booking1, booking2, booking3);
  expect(room.isOccupied(new Date(2022, 10, 2))).toBe("Katie Mitchell");
});

//Función occupancyPercentage
test('occupancyPercentage: Ocupación 0 si no existen reservas', () => {
  const room = new Room({...roomTemplate, bookings: []})
  expect(room.occupancyPercentage(new Date(2022, 11, 3), new Date(2022, 12, 3))).toBe(0);
});

test('occupancyPercentage: Un Booking - Ocupación 0 en las fechas comprobadas', () => {
  const room = new Room({...roomTemplate, bookings: []})
  const booking1 = new Booking({
    name:"Levi Jacobson",
    email: "Osbaldo_OKeefe67@hotmail.com",
    checkin: new Date(2022, 11, 1),
    checkout: new Date(2022, 11, 4),
    discount: 0,
    room: 'Ocean View Suite'
  });
  room.bookings.push(booking1);
  expect(room.occupancyPercentage(new Date(2022, 11, 5), new Date(2022, 12, 10))).toBe(0);
});

test('occupancyPercentage: Un Booking - Ocupación 50 en las fechas comprobadas', () => {
  const room = new Room({...roomTemplate, bookings: []})
  const booking1 = new Booking({
    name:"Levi Jacobson",
    email: "Osbaldo_OKeefe67@hotmail.com",
    checkin: new Date(2022, 11, 1),
    checkout: new Date(2022, 11, 4),
    discount: 0,
    room: 'Ocean View Suite'
  });
  room.bookings.push(booking1);
  expect(room.occupancyPercentage(new Date(2022, 11, 1), new Date(2022, 11, 7))).toBe(50);
});

test('occupancyPercentage: Un Booking - Ocupación 100 en las fechas comprobadas', () => {
  const room = new Room({...roomTemplate, bookings: []})
  const booking1 = new Booking({
    name:"Levi Jacobson",
    email: "Osbaldo_OKeefe67@hotmail.com",
    checkin: new Date(2022, 11, 1),
    checkout: new Date(2022, 11, 4),
    discount: 0,
    room: 'Ocean View Suite'
  });
  room.bookings.push(booking1);
  expect(room.occupancyPercentage(new Date(2022, 11, 1), new Date(2022, 11, 3))).toBe(100);
});

test('occupancyPercentage: Varios Bookings - Ocupación 0 en las fechas comprobadas', () => {
  const room = new Room({...roomTemplate, bookings: []})
  const booking1 = new Booking({
    name:"Levi Jacobson",
    email: "Osbaldo_OKeefe67@hotmail.com",
    checkin: new Date(2022, 11, 1),
    checkout: new Date(2022, 11, 4),
    discount: 0,
    room: 'Ocean View Suite'
  });
  const booking2 = new Booking({
    name:"Katie Mitchell",
    email: "Ambrose.OConner37@hotmail.com",
    checkin: new Date(2022, 7, 1),
    checkout: new Date(2022, 7, 4),
    discount: 0,
    room: 'Ocean View Suite'
  });
  const booking3 = new Booking({
    name:"Cecil Heaney",
    email: "Lisa_Mayer@yahoo.com",
    checkin: new Date(2022, 8, 1),
    checkout: new Date(2022, 8, 4),
    discount: 0,
    room: 'Ocean View Suite'
  });
  room.bookings.push(booking1, booking2, booking3);
  expect(room.occupancyPercentage(new Date(2022, 9, 1), new Date(2022, 9, 31))).toBe(0);
});

test('occupancyPercentage: Varios Bookings - Ocupación 50 en las fechas comprobadas', () => {
  const room = new Room({...roomTemplate, bookings: []})
  const booking1 = new Booking({
    name:"Levi Jacobson",
    email: "Osbaldo_OKeefe67@hotmail.com",
    checkin: new Date(2022, 7, 1),
    checkout: new Date(2022, 7, 16),
    discount: 0,
    room: 'Ocean View Suite'
  });
  const booking2 = new Booking({
    name:"Katie Mitchell",
    email: "Ambrose.OConner37@hotmail.com",
    checkin: new Date(2022, 10, 1),
    checkout: new Date(2022, 10, 4),
    discount: 0,
    room: 'Ocean View Suite'
  });
  const booking3 = new Booking({
    name:"Cecil Heaney",
    email: "Lisa_Mayer@yahoo.com",
    checkin: new Date(2022, 9, 1),
    checkout: new Date(2022, 9, 4),
    discount: 0,
    room: 'Ocean View Suite'
  });
  room.bookings.push(booking1, booking2, booking3);
  expect(room.occupancyPercentage(new Date(2022, 7, 1), new Date(2022, 7, 31))).toBe(50);
});

test('occupancyPercentage: Varios Bookings - Ocupación 100 en las fechas comprobadas', () => {
  const room = new Room({...roomTemplate, bookings: []})
  const booking1 = new Booking({
    name:"Levi Jacobson",
    email: "Osbaldo_OKeefe67@hotmail.com",
    checkin: new Date(2022, 9, 1),
    checkout: new Date(2022, 9, 5),
    discount: 0,
    room: 'Ocean View Suite'
  });
  const booking2 = new Booking({
    name:"Katie Mitchell",
    email: "Ambrose.OConner37@hotmail.com",
    checkin: new Date(2022, 9, 5),
    checkout: new Date(2022, 9, 15),
    discount: 0,
    room: 'Ocean View Suite'
  });
  const booking3 = new Booking({
    name:"Cecil Heaney",
    email: "Lisa_Mayer@yahoo.com",
    checkin: new Date(2022, 9, 15),
    checkout: new Date(2022, 10, 1),
    discount: 0,
    room: 'Ocean View Suite'
  });
  room.bookings.push(booking1, booking2, booking3);
  expect(room.occupancyPercentage(new Date(2022, 9, 1), new Date(2022, 9, 31))).toBe(100);
});





